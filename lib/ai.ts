import "server-only";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

export type AdminAiTask = "summary" | "tags" | "seo";
export type PublicAiTask = "summary" | "guide";

export type ContentSignals = {
  headingCount: number;
  codeBlockCount: number;
  codeLanguages: string[];
  listCount: number;
};

type AssistSource = {
  title: string;
  description?: string;
  content: string;
  tags?: string[];
  signals?: ContentSignals;
};

type SummaryResult = {
  summary: string;
};

type TagResult = {
  tags: string[];
};

type PublicSummaryResult = {
  lines: string[];
};

type GuideResult = {
  concepts: string[];
  prerequisites: string[];
  focus: string;
};

const geminiApiKey =
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.OPENAI_API_KEY;

export const isAiConfigured = Boolean(geminiApiKey);

function getGeminiModelId() {
  const preferredModel = process.env.GOOGLE_GENERATIVE_AI_MODEL;

  if (preferredModel) {
    return preferredModel;
  }

  const legacyModel = process.env.OPENAI_MODEL;

  if (legacyModel?.startsWith("gemini")) {
    return legacyModel;
  }

  return "gemini-2.5-flash";
}

function getLanguageModel() {
  if (!geminiApiKey) {
    return null;
  }

  const provider = createGoogleGenerativeAI({
    apiKey: geminiApiKey,
    baseURL:
      process.env.GOOGLE_GENERATIVE_AI_BASE_URL ||
      process.env.OPENAI_BASE_URL ||
      undefined,
  });

  return provider(getGeminiModelId());
}

export function extractContentSignals(content: string): ContentSignals {
  const lines = content.split(/\r?\n/);
  const codeLanguages = new Set<string>();
  let codeBlockCount = 0;
  let isInCodeBlock = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const fenceMatch = line.match(/^```([a-zA-Z0-9_-]+)?/);

    if (!fenceMatch) {
      continue;
    }

    if (!isInCodeBlock) {
      codeBlockCount += 1;
      isInCodeBlock = true;

      if (fenceMatch[1]) {
        codeLanguages.add(fenceMatch[1].toLowerCase());
      }
    } else {
      isInCodeBlock = false;
    }
  }

  const headingCount = (content.match(/^#{1,6}\s.+$/gm) ?? []).length;
  const unorderedListCount = (content.match(/^\s*[-*+]\s+/gm) ?? []).length;
  const orderedListCount = (content.match(/^\s*\d+\.\s+/gm) ?? []).length;

  return {
    headingCount,
    codeBlockCount,
    codeLanguages: Array.from(codeLanguages).slice(0, 5),
    listCount: unorderedListCount + orderedListCount,
  };
}

function getSourceMaterial(source: AssistSource) {
  const structureSummary = source.signals
    ? [
        "Document signals:",
        `- Headings: ${source.signals.headingCount}`,
        `- Code blocks: ${source.signals.codeBlockCount}`,
        `- Lists: ${source.signals.listCount}`,
        `- Code languages: ${
          source.signals.codeLanguages.length > 0
            ? source.signals.codeLanguages.join(", ")
            : "none"
        }`,
      ].join("\n")
    : null;

  return [
    `Title: ${source.title || "Untitled"}`,
    source.description ? `Current description: ${source.description}` : null,
    source.tags && source.tags.length > 0 ? `Current tags: ${source.tags.join(", ")}` : null,
    structureSummary,
    "Content:",
    source.content.trim().slice(0, 7000) || "No content",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function extractJsonObject<T>(value: string) {
  const fenced = value.match(/```json\s*([\s\S]*?)```/i)?.[1]?.trim();
  const raw = fenced ?? value.trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("AI 응답을 해석하지 못했습니다.");
  }

  return JSON.parse(raw.slice(start, end + 1)) as T;
}

async function generateJson<T>(prompt: string) {
  const model = getLanguageModel();

  if (!model) {
    throw new Error("AI 기능이 아직 설정되지 않았습니다.");
  }

  const { text } = await generateText({
    model,
    temperature: 0.2,
    system: [
      "You are an assistant for a Korean developer blog.",
      "Return JSON only.",
      "Write the actual field values in natural Korean.",
      "Do not add markdown fences unless necessary.",
    ].join(" "),
    prompt,
  });

  return extractJsonObject<T>(text);
}

function normalizeString(value: unknown, maxLength = 300) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeStringList(value: unknown, maxItems: number, maxLength = 80) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeString(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

export async function generateAdminAi(task: AdminAiTask, source: AssistSource) {
  const material = getSourceMaterial(source);

  switch (task) {
    case "summary": {
      const result = await generateJson<SummaryResult>(`
Write a concise Korean summary for a developer blog draft.
- Maximum 2 sentences
- Focus on implementation, tradeoffs, or the problem being solved
- Maximum 220 characters
- Return JSON: {"summary":"..."}

${material}
`);

      return {
        summary: normalizeString(result.summary, 220),
      };
    }

    case "tags": {
      const result = await generateJson<TagResult>(`
Recommend technical tags for this developer blog draft.
- Return 3 to 5 tags
- Prefer lowercase English tags when natural
- Avoid duplicates
- Return JSON: {"tags":["nextjs","security"]}

${material}
`);

      return {
        tags: normalizeStringList(result.tags, 5, 30),
      };
    }

    case "seo": {
      const result = await generateJson<SummaryResult>(`
Write a Korean SEO description draft for this developer blog post.
- One sentence only
- Between 90 and 150 characters
- Avoid clickbait
- Return JSON: {"summary":"..."}

${material}
`);

      return {
        seoDescription: normalizeString(result.summary, 160),
      };
    }
  }
}

export async function generatePublicAi(task: PublicAiTask, source: AssistSource) {
  const material = getSourceMaterial(source);

  switch (task) {
    case "summary": {
      const result = await generateJson<PublicSummaryResult>(`
Summarize this developer blog post into 3 short Korean lines.
- Keep each line under 75 characters
- Avoid repeating the same phrase
- Return JSON: {"lines":["...","...","..."]}

${material}
`);

      return {
        lines: normalizeStringList(result.lines, 3, 90),
      };
    }

    case "guide": {
      const result = await generateJson<GuideResult>(`
Create a compact Korean reading guide for a technical blog post.
- "concepts": 2 to 3 core concepts from the post
- "prerequisites": 1 to 2 things the reader should know first
- "focus": one short sentence explaining what to pay attention to while reading
- Use the document signals when they are helpful
- Return JSON: {"concepts":["..."],"prerequisites":["..."],"focus":"..."}

${material}
`);

      return {
        concepts: normalizeStringList(result.concepts, 3, 36),
        prerequisites: normalizeStringList(result.prerequisites, 2, 40),
        focus: normalizeString(result.focus, 100),
        signals: source.signals,
      };
    }
  }
}
