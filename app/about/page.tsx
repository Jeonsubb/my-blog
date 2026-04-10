import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "전섭의 빌드 로그를 만든 배경과 기술 방향을 소개합니다.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <section className="border-b border-[color:var(--border)] pb-8">
        <h1 className="text-4xl font-semibold tracking-[-0.05em]">About</h1>
        <p className="mt-5 text-base leading-8 text-[color:var(--muted)]">
          {siteConfig.name}는 Next.js 기반의 블로그를 직접 설계하고 다듬으며,
          데이터 엔진 전환, 댓글 API, SEO, 에디터 확장성까지 한 번에 묶어
          보여주기 위해 만든 포트폴리오 프로젝트입니다.
        </p>
      </section>

      <section className="py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-medium">핵심</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              파일 기반 구조에서 시작한 블로그를 Supabase 중심 구조로 옮기고,
              게시글 조회, 댓글 CRUD, SEO, 작성 경험까지 연결하는 데 초점을
              두었습니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium">기술 스택</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-[color:var(--muted)]">
              <li>Next.js App Router</li>
              <li>Supabase</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-medium">의도</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              단순한 블로그 UI가 아니라, 데이터 구조와 운영 흐름까지 포함해
              설명할 수 있는 프로젝트로 정리하고 싶었습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
