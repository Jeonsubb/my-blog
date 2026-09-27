import { readFile, readdir } from "node:fs/promises";
import { loadEnvFile } from "node:process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const BLOG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_STUDY_DIRECTORY = path.resolve(BLOG_ROOT, "../financial-it-study/blog-posts");
const REQUIRED_METADATA = ["title", "slug", "description"];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parseArguments(argumentsList) {
  const options = {
    dryRun: true,
    all: false,
    studyDirectory: DEFAULT_STUDY_DIRECTORY,
    target: null,
  };

  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index];

    if (argument === "--publish") {
      options.dryRun = false;
    } else if (argument === "--dry-run") {
      options.dryRun = true;
    } else if (argument === "--all") {
      options.all = true;
    } else if (argument === "--study-dir") {
      const directory = argumentsList[index + 1];

      if (!directory || directory.startsWith("--")) {
        throw new Error("--study-dir 옵션에는 디렉터리 경로가 필요합니다.");
      }

      options.studyDirectory = path.resolve(directory);
      index += 1;
    } else if (argument.startsWith("--")) {
      throw new Error(`알 수 없는 옵션입니다: ${argument}`);
    } else if (options.target) {
      throw new Error("한 번에 글 하나만 지정하거나 --all을 사용하세요.");
    } else {
      options.target = argument;
    }
  }

  if (options.all && options.target) {
    throw new Error("--all과 개별 글 이름을 함께 사용할 수 없습니다.");
  }

  if (!options.all && !options.target) {
    throw new Error("게시할 글 이름 또는 --all을 지정하세요.");
  }

  return options;
}

export function parseStudyPost(markdown, sourceLabel = "study post") {
  const normalized = markdown.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/);

  if (!match) {
    throw new Error(`${sourceLabel}: 문서 맨 앞에 --- front matter ---가 필요합니다.`);
  }

  const metadata = {};

  for (const line of match[1].split("\n")) {
    if (!line.trim()) {
      continue;
    }

    const separator = line.indexOf(":");

    if (separator <= 0) {
      throw new Error(`${sourceLabel}: 잘못된 메타데이터 형식입니다: ${line}`);
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    metadata[key] = value.replace(/^(["'])(.*)\1$/, "$2");
  }

  const content = match[2].trim();

  for (const key of REQUIRED_METADATA) {
    if (!metadata[key]?.trim()) {
      throw new Error(`${sourceLabel}: 필수 메타데이터 '${key}'가 없습니다.`);
    }
  }

  if (!SLUG_PATTERN.test(metadata.slug)) {
    throw new Error(`${sourceLabel}: slug는 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.`);
  }

  if (!content) {
    throw new Error(`${sourceLabel}: 글 본문이 비어 있습니다.`);
  }

  return {
    title: metadata.title.trim().slice(0, 200),
    slug: metadata.slug.trim(),
    description: metadata.description.trim().slice(0, 500),
    category: metadata.category?.trim().slice(0, 80) || "Study",
    series: metadata.series?.trim().slice(0, 120) || "금융 IT 30일 학습",
    tags: (metadata.tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 20),
    thumbnail: metadata.thumbnail?.trim() || null,
    content,
  };
}

export async function publishPost(post, configuration, fetchImplementation = fetch) {
  const supabaseUrl = configuration.supabaseUrl?.replace(/\/$/, "");
  const serviceRoleKey = configuration.serviceRoleKey;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "my-blog/.env.local에 NEXT_PUBLIC_SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY를 설정해야 실제 게시할 수 있습니다.",
    );
  }

  const baseHeaders = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
  const lookupUrl = new URL(`${supabaseUrl}/rest/v1/posts`);
  lookupUrl.searchParams.set("slug", `eq.${post.slug}`);
  lookupUrl.searchParams.set("select", "id,slug");

  const lookupResponse = await fetchImplementation(lookupUrl, { headers: baseHeaders });

  if (!lookupResponse.ok) {
    throw new Error(`기존 글 조회 실패 (${lookupResponse.status}): ${await lookupResponse.text()}`);
  }

  const existingPosts = await lookupResponse.json();

  if (!Array.isArray(existingPosts)) {
    throw new Error("기존 글 조회 결과 형식이 올바르지 않습니다.");
  }

  if (existingPosts.length > 1) {
    throw new Error(`같은 slug를 가진 글이 여러 개입니다: ${post.slug}`);
  }

  const existingPost = existingPosts[0];
  const mutationUrl = new URL(`${supabaseUrl}/rest/v1/posts`);

  if (existingPost) {
    mutationUrl.searchParams.set("id", `eq.${existingPost.id}`);
  }

  const mutationResponse = await fetchImplementation(mutationUrl, {
    method: existingPost ? "PATCH" : "POST",
    headers: {
      ...baseHeaders,
      Prefer: "return=representation",
    },
    body: JSON.stringify(post),
  });

  if (!mutationResponse.ok) {
    throw new Error(`글 게시 실패 (${mutationResponse.status}): ${await mutationResponse.text()}`);
  }

  const savedPosts = await mutationResponse.json();
  const savedPost = Array.isArray(savedPosts) ? savedPosts[0] : savedPosts;

  if (!savedPost?.slug) {
    throw new Error("게시 결과에서 저장된 글의 slug를 확인하지 못했습니다.");
  }

  return {
    action: existingPost ? "updated" : "created",
    post: savedPost,
  };
}

async function findPostFiles(options) {
  if (options.all) {
    const entries = await readdir(options.studyDirectory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => path.join(options.studyDirectory, entry.name))
      .sort();
  }

  const filename = options.target.endsWith(".md") ? options.target : `${options.target}.md`;

  if (path.basename(filename) !== filename) {
    throw new Error("글 이름만 지정하세요. 경로 변경은 --study-dir 옵션을 사용합니다.");
  }

  return [path.join(options.studyDirectory, filename)];
}

async function main() {
  const options = parseArguments(process.argv.slice(2));

  try {
    loadEnvFile(path.join(BLOG_ROOT, ".env.local"));
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const files = await findPostFiles(options);

  if (files.length === 0) {
    throw new Error(`게시 가능한 Markdown 파일이 없습니다: ${options.studyDirectory}`);
  }

  for (const file of files) {
    const post = parseStudyPost(await readFile(file, "utf8"), file);
    const siteUrl = (process.env.SITE_URL || "https://www.jeonsubb.com").replace(/\/$/, "");

    if (options.dryRun) {
      console.log(`[DRY RUN] ${post.title}`);
      console.log(`  source: ${file}`);
      console.log(`  url: ${siteUrl}/blog/${post.slug}`);
      console.log(`  category: ${post.category}`);
      console.log(`  series: ${post.series}`);
      console.log(`  tags: ${post.tags.join(", ") || "없음"}`);
      console.log(`  content: ${post.content.length} characters`);
      continue;
    }

    const result = await publishPost(post, {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    });

    console.log(`[${result.action.toUpperCase()}] ${post.title}`);
    console.log(`  ${siteUrl}/blog/${result.post.slug}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(`[ERROR] ${error.message}`);
    process.exitCode = 1;
  });
}
