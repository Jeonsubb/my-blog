import { NextRequest, NextResponse } from "next/server";
import { hasAdminSessionFromRequest, unauthorizedAdminResponse } from "@/lib/admin-guard";
import { getSupabaseAdminClient, isAdminDatabaseConfigured } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
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

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return slug || "untitled-draft";
}

export async function POST(request: NextRequest) {
  const isAuthenticated = await hasAdminSessionFromRequest(request);

  if (!isAuthenticated) {
    return unauthorizedAdminResponse();
  }

  if (!isAdminDatabaseConfigured) {
    return errorResponse(
      "관리자 글 작성 기능을 사용하려면 Supabase 환경변수를 설정해야 합니다.",
      503,
    );
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return errorResponse("관리자 글 작성 설정이 비어 있습니다.", 503);
  }

  const body = await request.json();
  const title = normalizeText(body.title, 200);
  const description = normalizeText(body.description, 500);
  const category = normalizeText(body.category, 80);
  const series = normalizeText(body.series, 120);
  const thumbnail = normalizeText(body.thumbnail, 500);
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const slug = slugify(normalizeText(body.slug || body.title, 200));
  const tags = parseTags(body.tags);

  if (!title || !description || !content) {
    return errorResponse("제목, 설명, 본문은 필수입니다.", 400);
  }

  const payload = {
    slug,
    title,
    description,
    category: category || null,
    series: series || null,
    tags,
    thumbnail: thumbnail || null,
    content,
  };

  const { data, error } = await supabase
    .from("posts")
    .insert([payload])
    .select("slug, title")
    .single();

  if (error) {
    if (error.code === "23505") {
      return errorResponse("같은 slug가 이미 존재합니다. 제목을 조정해 주세요.", 409);
    }

    return errorResponse(error.message, 500);
  }

  return NextResponse.json({
    success: true,
    data,
    path: `/blog/${data.slug}`,
  });
}
