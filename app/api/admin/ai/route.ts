import { NextRequest, NextResponse } from "next/server";
import { generateAdminAi, isAiConfigured, type AdminAiTask } from "@/lib/ai";
import { hasAdminSessionFromRequest, unauthorizedAdminResponse } from "@/lib/admin-guard";

export const runtime = "nodejs";

const ADMIN_AI_TASKS: AdminAiTask[] = ["summary", "tags", "seo"];

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function normalizeTags(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((tag) => normalizeText(tag, 40))
    .filter(Boolean)
    .slice(0, 10);
}

export async function POST(request: NextRequest) {
  const isAuthenticated = await hasAdminSessionFromRequest(request);

  if (!isAuthenticated) {
    return unauthorizedAdminResponse();
  }

  if (!isAiConfigured) {
    return NextResponse.json({ error: "AI 기능이 설정되지 않았습니다." }, { status: 503 });
  }

  const body = await request.json();
  const task = typeof body.task === "string" ? body.task : "";
  const title = normalizeText(body.title, 200);
  const description = normalizeText(body.description, 300);
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const tags = normalizeTags(body.tags);

  if (!ADMIN_AI_TASKS.includes(task as AdminAiTask)) {
    return NextResponse.json({ error: "지원하지 않는 AI 작업입니다." }, { status: 400 });
  }

  if (!title && !content) {
    return NextResponse.json({ error: "제목이나 본문을 입력해 주세요." }, { status: 400 });
  }

  try {
    const result = await generateAdminAi(task as AdminAiTask, {
      title,
      description,
      content,
      tags,
    });

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
