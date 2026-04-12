import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { hasAdminSessionFromRequest, unauthorizedAdminResponse } from "@/lib/admin-guard";
import { slugify } from "@/lib/slug";
import { getSupabaseAdminClient, isAdminDatabaseConfigured } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type PostMutationPayload = {
  title: string;
  slug: string;
  description: string;
  category: string | null;
  series: string | null;
  tags: string[];
  thumbnail: string | null;
  content: string;
};

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function normalizeId(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return null;
}

function parseTags(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((tag) => normalizeText(tag, 40))
      .filter(Boolean)
      .slice(0, 20);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 20);
  }

  return [];
}

function getPostPayload(body: Record<string, unknown>): PostMutationPayload {
  const title = normalizeText(body.title, 200);
  const description = normalizeText(body.description, 500);
  const category = normalizeText(body.category, 80);
  const series = normalizeText(body.series, 120);
  const thumbnail = normalizeText(body.thumbnail, 500);
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const requestedSlug = normalizeText(body.slug || body.title, 200);

  return {
    title,
    slug: slugify(requestedSlug),
    description,
    category: category || null,
    series: series || null,
    tags: parseTags(body.tags),
    thumbnail: thumbnail || null,
    content,
  };
}

async function getAuthenticatedSupabase(request: NextRequest) {
  const isAuthenticated = await hasAdminSessionFromRequest(request);

  if (!isAuthenticated) {
    return { error: unauthorizedAdminResponse(), supabase: null };
  }

  if (!isAdminDatabaseConfigured) {
    return {
      error: errorResponse(
        "관리자 글 기능을 사용하려면 Supabase 환경변수를 먼저 설정해 주세요.",
        503,
      ),
      supabase: null,
    };
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      error: errorResponse("관리자 데이터베이스 설정을 불러오지 못했습니다.", 503),
      supabase: null,
    };
  }

  return { error: null, supabase };
}

function revalidatePostPaths(slugs: string[]) {
  const uniqueSlugs = [...new Set(slugs.filter(Boolean))];

  // Keep the public list pages fresh after any mutation.
  revalidatePath("/", "page");
  revalidatePath("/blog", "page");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/tags/[tag]", "page");
  revalidatePath("/series/[series]", "page");
  revalidatePath("/sitemap.xml");

  for (const slug of uniqueSlugs) {
    revalidatePath(`/blog/${slug}`);
  }
}

function mapPostResponse(post: Record<string, unknown>) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    series: post.series,
    tags: Array.isArray(post.tags) ? post.tags : [],
    thumbnail: post.thumbnail,
    content: post.content,
    created_at: post.created_at,
  };
}

function handleMutationError(error: { code?: string; message: string }) {
  if (error.code === "23505") {
    return errorResponse("같은 slug가 이미 존재합니다. 제목을 조정해 주세요.", 409);
  }

  return errorResponse(error.message, 500);
}

export async function POST(request: NextRequest) {
  const { error: authError, supabase } = await getAuthenticatedSupabase(request);

  if (authError || !supabase) {
    return authError;
  }

  const body = (await request.json()) as Record<string, unknown>;
  const payload = getPostPayload(body);

  if (!payload.title || !payload.description || !payload.content) {
    return errorResponse("제목, 설명, 본문은 모두 입력해 주세요.", 400);
  }

  const { data, error } = await supabase
    .from("posts")
    .insert([payload])
    .select("id, slug, title, description, category, series, tags, thumbnail, content, created_at")
    .single();

  if (error || !data) {
    return handleMutationError(error || { message: "글을 저장하지 못했습니다." });
  }

  revalidatePostPaths([String(data.slug)]);

  return NextResponse.json({
    success: true,
    action: "created",
    data: mapPostResponse(data),
    path: `/blog/${data.slug}`,
  });
}

export async function PATCH(request: NextRequest) {
  const { error: authError, supabase } = await getAuthenticatedSupabase(request);

  if (authError || !supabase) {
    return authError;
  }

  const body = (await request.json()) as Record<string, unknown>;
  const postId = normalizeId(body.id);
  const previousSlug = normalizeText(body.previousSlug, 200);
  const payload = getPostPayload(body);

  if (!postId) {
    return errorResponse("수정할 글 정보를 찾지 못했습니다.", 400);
  }

  if (!payload.title || !payload.description || !payload.content) {
    return errorResponse("제목, 설명, 본문은 모두 입력해 주세요.", 400);
  }

  const { data, error } = await supabase
    .from("posts")
    .update(payload)
    .eq("id", postId)
    .select("id, slug, title, description, category, series, tags, thumbnail, content, created_at")
    .single();

  if (error || !data) {
    return handleMutationError(error || { message: "글을 수정하지 못했습니다." });
  }

  revalidatePostPaths([previousSlug, String(data.slug)]);

  return NextResponse.json({
    success: true,
    action: "updated",
    data: mapPostResponse(data),
    path: `/blog/${data.slug}`,
  });
}

export async function DELETE(request: NextRequest) {
  const { error: authError, supabase } = await getAuthenticatedSupabase(request);

  if (authError || !supabase) {
    return authError;
  }

  const body = (await request.json()) as Record<string, unknown>;
  const postId = normalizeId(body.id);

  if (!postId) {
    return errorResponse("삭제할 글 정보를 찾지 못했습니다.", 400);
  }

  const { data: existingPost, error: selectError } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", postId)
    .single();

  if (selectError || !existingPost) {
    return errorResponse("삭제할 글을 찾지 못했습니다.", 404);
  }

  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    return errorResponse(error.message, 500);
  }

  revalidatePostPaths([String(existingPost.slug)]);

  return NextResponse.json({
    success: true,
    action: "deleted",
    slug: existingPost.slug,
  });
}
