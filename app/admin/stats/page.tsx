import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type TrafficLog = {
  id: number;
  occurred_at: string;
  kind: string;
  path: string | null;
  user_agent: string | null;
  ip: string | null;
  detail: string | null;
};

const BOT_LABELS: Array<[RegExp, string]> = [
  [/googlebot/i, "Googlebot (구글)"],
  [/bingbot/i, "Bingbot (마이크로소프트)"],
  [/yeti/i, "Yeti (네이버)"],
  [/gptbot|oai-searchbot/i, "GPTBot (OpenAI)"],
  [/claudebot|claude-web|anthropic/i, "ClaudeBot (Anthropic)"],
  [/perplexity/i, "PerplexityBot"],
  [/bytespider/i, "Bytespider (바이트댄스)"],
  [/amazonbot/i, "Amazonbot"],
  [/petalbot/i, "PetalBot (화웨이)"],
  [/yandex/i, "YandexBot"],
  [/baiduspider/i, "Baiduspider"],
  [/duckduck/i, "DuckDuckBot"],
  [/facebookexternalhit|meta-externalagent/i, "Meta 크롤러"],
];

function botLabel(userAgent: string | null) {
  if (!userAgent) {
    return "알 수 없음";
  }

  for (const [pattern, label] of BOT_LABELS) {
    if (pattern.test(userAgent)) {
      return label;
    }
  }

  return userAgent.slice(0, 60);
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminStatsPage() {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold">방문 로그</h1>
        <p className="mt-4 leading-8 text-[color:var(--muted)]">
          SUPABASE_SERVICE_ROLE_KEY가 설정되지 않아 로그를 조회할 수 없습니다.
        </p>
      </div>
    );
  }

  const [crawlerResult, loginResult] = await Promise.all([
    supabase
      .from("traffic_logs")
      .select("*")
      .eq("kind", "crawler")
      .order("occurred_at", { ascending: false })
      .limit(100),
    supabase
      .from("traffic_logs")
      .select("*")
      .in("kind", ["admin_login_failure", "admin_login_success"])
      .order("occurred_at", { ascending: false })
      .limit(50),
  ]);

  if (crawlerResult.error || loginResult.error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-2xl font-semibold">방문 로그</h1>
        <p className="mt-4 leading-8 text-[color:var(--muted)]">
          traffic_logs 테이블을 조회하지 못했습니다. Supabase 대시보드의 SQL Editor에서
          scripts/sql/traffic-logs.sql 파일의 내용을 먼저 실행해 주세요.
        </p>
      </div>
    );
  }

  const crawlerLogs = (crawlerResult.data || []) as TrafficLog[];
  const loginLogs = (loginResult.data || []) as TrafficLog[];
  const failureCount = loginLogs.filter((log) => log.kind === "admin_login_failure").length;

  const botCounts = new Map<string, number>();

  for (const log of crawlerLogs) {
    const label = botLabel(log.user_agent);
    botCounts.set(label, (botCounts.get(label) || 0) + 1);
  }

  const sortedBotCounts = [...botCounts.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <section className="border-b border-[color:var(--border)] pb-8">
        <h1 className="text-3xl font-semibold tracking-[-0.04em]">방문 로그</h1>
        <p className="mt-3 leading-8 text-[color:var(--muted)]">
          최근 크롤러 방문 {crawlerLogs.length}건, 관리자 로그인 이벤트 {loginLogs.length}건
          (실패 {failureCount}건)을 보여줍니다. 방문자 통계는 Vercel 대시보드의 Analytics
          탭에서 확인합니다.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">크롤러별 방문 횟수 (최근 100건 기준)</h2>
        {sortedBotCounts.length === 0 ? (
          <p className="mt-3 leading-8 text-[color:var(--muted)]">
            아직 기록된 크롤러 방문이 없습니다. 배포 후 검색엔진이 다녀가면 여기에
            나타납니다.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {sortedBotCounts.map(([label, count]) => (
              <li
                key={label}
                className="flex items-center justify-between rounded-xl border border-[color:var(--border)] px-4 py-3 text-sm"
              >
                <span>{label}</span>
                <span className="text-[color:var(--muted)]">{count}회</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">최근 크롤러 방문</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {crawlerLogs.slice(0, 30).map((log) => (
            <li
              key={log.id}
              className="rounded-xl border border-[color:var(--border)] px-4 py-3 text-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium">{botLabel(log.user_agent)}</span>
                <span className="text-[color:var(--muted)]">{formatDateTime(log.occurred_at)}</span>
              </div>
              <div className="mt-1 text-[color:var(--muted)]">{log.path}</div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">관리자 로그인 이벤트</h2>
        <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
          짧은 시간에 실패가 반복되면 누군가 비밀번호를 추측하고 있다는 신호입니다.
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {loginLogs.length === 0 ? (
            <li className="text-sm text-[color:var(--muted)]">기록된 이벤트가 없습니다.</li>
          ) : (
            loginLogs.map((log) => (
              <li
                key={log.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[color:var(--border)] px-4 py-3 text-sm"
              >
                <span
                  className={
                    log.kind === "admin_login_failure" ? "font-medium text-red-500" : "font-medium"
                  }
                >
                  {log.kind === "admin_login_failure" ? "로그인 실패" : "로그인 성공"}
                </span>
                <span className="text-[color:var(--muted)]">
                  {log.ip || "IP 미상"} · {formatDateTime(log.occurred_at)}
                </span>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
