import type { Metadata } from "next";
import { formatShortDate } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description: "금융 IT 포트폴리오와 공개 프로젝트를 한곳에서 모아 봅니다.",
  alternates: {
    canonical: "/projects",
  },
};

const GITHUB_USERNAME = "Jeonsubb";

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  pushed_at: string;
  fork: boolean;
  archived: boolean;
};

async function getRepositories(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return [];
    }

    const repos = (await response.json()) as GitHubRepo[];

    return repos.filter((repo) => !repo.fork && !repo.archived);
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const repos = await getRepositories();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6">
      <section className="border-b border-[color:var(--border)] pb-8">
        <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em]">Projects</h1>
        <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
          GitHub에 공개한 프로젝트를 모아서 보여주는 페이지입니다. 로컬에서 작업한
          포트폴리오도 GitHub 저장소로 올리면 이 목록에 자동으로 나타납니다.
        </p>
      </section>

      {repos.length === 0 ? (
        <p className="text-base leading-8 text-[color:var(--muted)]">
          표시할 공개 저장소가 없거나 GitHub API 요청이 잠시 제한되었습니다. 잠시 후 다시
          확인해 주세요.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {repos.map((repo) => (
            <li
              key={repo.id}
              className="rounded-2xl border border-[color:var(--border)] p-6 transition hover:border-[color:var(--foreground)]"
            >
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold tracking-[-0.03em]">{repo.name}</h2>
                  <span className="text-sm text-[color:var(--muted)]">
                    ★ {repo.stargazers_count} · {formatShortDate(repo.pushed_at)} 업데이트
                  </span>
                </div>
                {repo.description && (
                  <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                    {repo.description}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-[color:var(--muted)]">
                  {repo.language && (
                    <span className="rounded-full border border-[color:var(--border)] px-3 py-1">
                      {repo.language}
                    </span>
                  )}
                  {(repo.topics || []).slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-[color:var(--border)] px-3 py-1"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
