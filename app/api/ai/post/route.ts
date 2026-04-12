import { NextRequest, NextResponse } from "next/server";
import {
  extractContentSignals,
  generatePublicAi,
  isAiConfigured,
  type PublicAiTask,
} from "@/lib/ai";

export const runtime = "nodejs";

const PUBLIC_AI_TASKS: PublicAiTask[] = ["summary", "guide"];

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  if (!isAiConfigured) {
    return NextResponse.json({ error: "AI 기능이 설정되지 않았습니다." }, { status: 503 });
  }

  const body = await request.json();
  const task = typeof body.task === "string" ? body.task : "";
  const title = normalizeText(body.title, 200);
  const description = normalizeText(body.description, 300);
  const content = typeof body.content === "string" ? body.content.trim() : "";

  if (!PUBLIC_AI_TASKS.includes(task as PublicAiTask)) {
    return NextResponse.json({ error: "지원하지 않는 AI 작업입니다." }, { status: 400 });
  }

  if (!title && !content) {
    return NextResponse.json({ error: "AI 보조를 위한 글 내용이 부족합니다." }, { status: 400 });
  }

  try {
    const result = await generatePublicAi(task as PublicAiTask, {
      title,
      description,
      content,
      signals: extractContentSignals(content),
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
