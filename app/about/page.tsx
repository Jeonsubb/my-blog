import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "전섭의 빌드 로그를 만든 배경과 기술 방향을 소개합니다.",
};

export default function About() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="rounded-[2.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_24px_60px_rgba(25,33,50,0.08)] backdrop-blur sm:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--accent)]">
          About this project
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold tracking-[-0.06em] text-[color:var(--foreground)]">
          기록과 제품 감각을 같이 보여주기 위한
          <br />
          개인 블로그 플랫폼입니다
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
          {siteConfig.name}는 Next.js 기반의 블로그를 직접 설계하고 다듬으며,
          데이터 엔진 전환, 댓글 API, SEO, 에디터 확장성까지 한 번에 묶어
          보여주기 위해 만든 포트폴리오 프로젝트입니다.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Problem",
            body: "파일 시스템 기반 블로그는 시작은 빠르지만, 글 작성과 운영 경험을 제품 관점으로 확장하기엔 한계가 있었습니다.",
          },
          {
            title: "Approach",
            body: "Supabase로 데이터 원천을 옮기고, 페이지와 API, 사이트맵이 같은 흐름을 바라보도록 구조를 정리했습니다.",
          },
          {
            title: "Outcome",
            body: "단순한 개인 블로그를 넘어, 작은 콘텐츠 플랫폼처럼 설명할 수 있는 구조와 화면을 갖추게 되었습니다.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6"
          >
            <p className="font-display text-3xl font-bold tracking-[-0.05em]">
              {item.title}
            </p>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
              {item.body}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--accent)]">
            Core stack
          </p>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-[color:var(--muted)]">
            <li>Next.js App Router 기반 페이지와 라우트 핸들러</li>
            <li>Supabase로 게시글과 댓글 데이터를 관리하는 구조</li>
            <li>Tailwind CSS로 일관된 에디토리얼 UI 시스템 구성</li>
            <li>동적 메타데이터, 사이트맵, robots 설정으로 SEO 대응</li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(25,33,50,0.96),rgba(31,41,55,0.92))] p-8 text-white">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/70">
            What I wanted to prove
          </p>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-white/80">
            <li>프론트엔드 구현만이 아니라 데이터 흐름과 제품 구조까지 설계할 수 있다는 점</li>
            <li>작은 기능도 UX와 설명력을 의식하며 끝까지 다듬는 태도</li>
            <li>미완성 기능은 숨기지 않고, 다음 단계로 자연스럽게 연결하는 제품 감각</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
