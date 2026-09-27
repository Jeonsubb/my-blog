type TrafficLogEntry = {
  kind: "crawler" | "admin_login_failure" | "admin_login_success";
  path: string;
  userAgent?: string | null;
  ip?: string | null;
  detail?: string | null;
};

const CRAWLER_PATTERN =
  /bot|crawler|spider|crawl|slurp|yeti|bingpreview|gptbot|oai-searchbot|claudebot|claude-web|anthropic-ai|perplexity|amazonbot|bytespider|petalbot|duckduck|baiduspider|yandex|facebookexternalhit|meta-externalagent/i;

export function isCrawlerUserAgent(userAgent: string) {
  return CRAWLER_PATTERN.test(userAgent);
}

export async function recordTrafficLog(entry: TrafficLogEntry) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return;
  }

  try {
    await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/traffic_logs`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        kind: entry.kind,
        path: entry.path.slice(0, 300),
        user_agent: entry.userAgent?.slice(0, 400) || null,
        ip: entry.ip?.slice(0, 100) || null,
        detail: entry.detail?.slice(0, 300) || null,
      }),
    });
  } catch {
    // 로그 기록 실패가 실제 페이지 응답을 막으면 안 되므로 조용히 무시한다.
  }
}
