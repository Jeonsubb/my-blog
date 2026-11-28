import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  extractContentSignals,
  generatePublicAi,
  isAiConfigured,
  type PublicAiTask,
} from "@/lib/ai";
import { getPostData } from "@/lib/posts";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const PUBLIC_AI_TASKS: PublicAiTask[] = ["summary", "guide"];
const AI_RATE_LIMIT = 10;
const AI_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_CACHED_RESULTS = 200;

type PublicAiResult = Awaited<ReturnType<typeof generatePublicAi>>;

// 글 본문 해시를 키에 넣어서, 글이 수정되면 이전 결과를 쓰지 않고 새로 생성한다.
const resultCache = new Map<string, PublicAiResult>();

function getCacheKey(task: PublicAiTask, slug: string, title: string, content: string) {
  const contentHash = createHash("sha256").update(`${title}\n${content}`).digest("hex");
  return `${task}:${slug}:${contentHash}`;
}

function cacheResult(key: string, result: PublicAiResult) {
  if (resultCache.size >= MAX_CACHED_RESULTS) {
    const oldestKey = resultCache.keys().next().value;

    if (oldestKey !== undefined) {
      resultCache.delete(oldestKey);
    }
  }

  resultCache.set(key, result);
}

export async function POST(request: NextRequest) {
  if (!isAiConfigured) {
    return NextResponse.json({ error: "AI 기능이 설정되지 않았습니다." }, { status: 503 });
  }

  const rateLimit = checkRateLimit(
    `ai-post:${getClientIp(request.headers)}`,
    AI_RATE_LIMIT,
    AI_RATE_LIMIT_WINDOW_MS,
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "AI 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const body = await request.json().catch(() => null);
  const task = typeof body?.task === "string" ? body.task : "";
  const slug = typeof body?.slug === "string" ? body.slug.trim() : "";

  if (!PUBLIC_AI_TASKS.includes(task as PublicAiTask)) {
    return NextResponse.json({ error: "지원하지 않는 AI 작업입니다." }, { status: 400 });
  }

  if (!slug) {
    return NextResponse.json({ error: "AI 보조를 적용할 글이 지정되지 않았습니다." }, { status: 400 });
  }

  // 클라이언트가 보낸 본문을 믿지 않고, 서버가 직접 조회한 글만 AI에 전달한다.
  const post = await getPostData(slug);

  if (!post) {
    return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 });
  }

  const title = post.title.trim().slice(0, 200);
  const description = post.description.trim().slice(0, 300);
  const content = (post.content || "").trim();

  if (!title && !content) {
    return NextResponse.json({ error: "AI 보조를 위한 글 내용이 부족합니다." }, { status: 400 });
  }

  const cacheKey = getCacheKey(task as PublicAiTask, post.slug, title, content);
  const cachedResult = resultCache.get(cacheKey);

  if (cachedResult) {
    return NextResponse.json({ success: true, result: cachedResult });
  }

  try {
    const result = await generatePublicAi(task as PublicAiTask, {
      title,
      description,
      content,
      signals: extractContentSignals(content),
    });

    cacheResult(cacheKey, result);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "AI 응답을 생성하지 못했습니다.",
      },
      { status: 500 },
    );
  }
}
