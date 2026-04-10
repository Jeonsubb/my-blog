import { remark } from "remark";
import html from "remark-html";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { getPlainTextExcerpt, getReadingTimeMinutes } from "@/lib/site";

type SupabasePostRecord = {
  id: number | string;
  slug: string;
  title: string;
  content: string;
  description: string | null;
  thumbnail: string | null;
  category: string | null;
  series?: string | null;
  tags?: string[] | string | null;
  created_at: string;
};

export interface PostData {
  id: number | string;
  slug: string;
  title: string;
  created_at: string;
  description: string;
  thumbnail?: string | null;
  category?: string | null;
  series?: string | null;
  tags: string[];
  content?: string;
  contentHtml?: string;
  readingTimeMinutes: number;
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeTags(tags: unknown) {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => normalizeText(tag))
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function mapSupabasePost(post: SupabasePostRecord, contentHtml?: string): PostData {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    created_at: post.created_at,
    description: post.description || getPlainTextExcerpt(post.content),
    thumbnail: post.thumbnail,
    category: post.category || "General",
    series: normalizeText(post.series) || null,
    tags: normalizeTags(post.tags),
    content: post.content,
    contentHtml,
    readingTimeMinutes: getReadingTimeMinutes(post.content),
  };
}

export function getPostSourceLabel() {
  return isSupabaseConfigured ? "Supabase Live Data" : "Supabase Environment Missing";
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    console.error("글 조회 실패:", error);
    return null;
  }

  const processedContent = await remark().use(html).process(post.content);

  return mapSupabasePost(post, processedContent.toString());
}

export async function getSortedPostsData(): Promise<PostData[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("목록 조회 실패:", error);
    return [];
  }

  return (posts as SupabasePostRecord[]).map((post) => mapSupabasePost(post));
}

export function getUniqueTags(posts: PostData[]) {
  return [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b, "ko"),
  );
}

export function getUniqueSeries(posts: PostData[]) {
  return [...new Set(posts.map((post) => post.series).filter(Boolean) as string[])].sort(
    (a, b) => a.localeCompare(b, "ko"),
  );
}
