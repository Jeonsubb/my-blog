import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function parseCommentId(value: unknown) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function hashCommentPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

function isPasswordValid(storedPassword: string, inputPassword: string) {
  const hashedInput = hashCommentPassword(inputPassword);
  return storedPassword === inputPassword || storedPassword === hashedInput;
}

export async function GET(request: Request) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json([]);
  }

  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return errorResponse("Post ID is required", 400);
  }

  const { data, error } = await supabase
    .from("comments")
    .select("id, content, username, created_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) {
    return errorResponse(error.message, 500);
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return errorResponse("댓글 기능을 사용하려면 Supabase 환경 변수가 필요합니다.", 503);
  }

  const body = await request.json();
  const postId = normalizeText(body.postId, 120);
  const content = normalizeText(body.content, 1200);
  const username = normalizeText(body.username, 40);
  const password = normalizeText(body.password, 120);

  if (!postId || !content || !username || !password) {
    return errorResponse("모든 항목을 입력해주세요.", 400);
  }

  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        post_id: postId,
        content,
        username,
        password: hashCommentPassword(password),
      },
    ])
    .select("id, content, username, created_at");

  if (error) {
    return errorResponse(error.message, 500);
  }

  return NextResponse.json({ success: true, data });
}

export async function DELETE(request: Request) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return errorResponse("댓글 기능을 사용하려면 Supabase 환경 변수가 필요합니다.", 503);
  }

  const body = await request.json();
  const commentId = parseCommentId(body.commentId);
  const password = normalizeText(body.password, 120);

  if (!commentId || !password) {
    return errorResponse("삭제할 댓글과 비밀번호가 필요합니다.", 400);
  }

  const { data: comment, error: commentError } = await supabase
    .from("comments")
    .select("password")
    .eq("id", commentId)
    .single();

  if (commentError || !comment) {
    return errorResponse("댓글을 찾을 수 없습니다.", 404);
  }

  if (!isPasswordValid(comment.password, password)) {
    return errorResponse("비밀번호가 올바르지 않습니다.", 403);
  }

  const { error } = await supabase.from("comments").delete().eq("id", commentId);

  if (error) {
    return errorResponse(error.message, 500);
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return errorResponse("댓글 기능을 사용하려면 Supabase 환경 변수가 필요합니다.", 503);
  }

  const body = await request.json();
  const commentId = parseCommentId(body.commentId);
  const password = normalizeText(body.password, 120);
  const newContent = normalizeText(body.newContent, 1200);

  if (!commentId || !password || !newContent) {
    return errorResponse("수정 내용과 비밀번호를 모두 입력해주세요.", 400);
  }

  const { data: comment, error: commentError } = await supabase
    .from("comments")
    .select("password")
    .eq("id", commentId)
    .single();

  if (commentError || !comment) {
    return errorResponse("댓글을 찾을 수 없습니다.", 404);
  }

  if (!isPasswordValid(comment.password, password)) {
    return errorResponse("비밀번호가 올바르지 않습니다.", 403);
  }

  const { error } = await supabase
    .from("comments")
    .update({ content: newContent })
    .eq("id", commentId);

  if (error) {
    return errorResponse(error.message, 500);
  }

  return NextResponse.json({ success: true });
}
