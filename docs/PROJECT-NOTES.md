# my-blog 프로젝트 노트

> 2026-08 기준. 현재 구조 이해 + 앞으로 하고 싶은 것 정리.
> 배포: https://www.jeonsubb.com (Vercel) / 레포: github.com/Jeonsubb/my-blog

---

## 1. 현재 구조 이해

Next.js 16 App Router + React 19 + Supabase 기반 개인 기술 블로그. 소스 약 3,900줄.

### 핵심 흐름 4개

**① 공개 글 읽기**
```
방문자 → app/blog/[slug]/page.tsx (서버 컴포넌트)
       → lib/posts.ts getPostData()
       → Supabase (anon 키, posts 테이블)
       → remark로 마크다운 → HTML → 렌더
```
- 홈 / blog / tags/[tag] / series/[series] 전부 같은 패턴.
- 모든 공개 페이지가 `force-dynamic` → 매 요청마다 DB 조회 (캐시 없음).
- 글 데이터의 단일 통로 = `lib/posts.ts`. **여기만 갈아끼우면 데이터 소스 교체 가능** → 마이그레이션의 핵심 지점.

**② 관리자 인증 + 글쓰기**
```
/admin/login → POST /api/admin/session
             → bcrypt.compare(입력, ADMIN_PASSWORD_HASH)
             → HMAC-SHA256 서명 토큰을 httpOnly 쿠키로 발급 (7일)
middleware.ts → /admin/* 접근 시 쿠키 검증
/admin/write (AdminEditor.tsx, 737줄 단일 컴포넌트)
             → POST/PATCH/DELETE /api/admin/posts
             → 쿠키 재검증 → Supabase service-role 키로 조작
             → revalidatePath 호출 (force-dynamic이라 실효 없음)
```
- 인증 관련 파일: `lib/admin-password.ts`(해시 비교), `lib/admin-session.ts`(토큰 발급/검증, 사실상 수제 JWT), `lib/admin-guard.ts`(API 가드).
- 오픈 리다이렉트 방지(`sanitizeAdminRedirect`)까지 챙겨져 있음.

**③ 댓글 (익명 CRUD)**
```
CommentSection.tsx → /api/comments (GET/POST/PATCH/DELETE)
                   → anon 키로 comments 테이블 직접 조작
                   → 수정/삭제는 sha256 해시된 댓글 비밀번호로 본인 확인
```

**④ AI 보조 (Gemini 2.5 Flash, Vercel AI SDK)**
```
관리자용: AdminEditor → /api/admin/ai (요약/태그/SEO) — 세션 필요
공개용:  PostAiAssistant → /api/ai/post (3줄 요약/읽기 가이드) — 인증 없음
둘 다 → lib/ai.ts → generateText → JSON 파싱
```

### 파일 맵

| 영역 | 파일 |
|---|---|
| 공개 페이지 | `app/page.tsx`, `app/blog/`, `app/tags/`, `app/series/`, `app/about/` |
| 관리자 | `app/admin/login/`, `app/admin/write/`, `middleware.ts` |
| API | `app/api/admin/{session,posts,ai}/`, `app/api/{comments,ai/post}/` |
| 로직 | `lib/{posts,site,slug,ai,admin-*,supabase*}.ts` |
| UI | `components/` 9개 (AdminEditor 737줄, CommentSection 350줄이 큰 축) |
| SEO | `app/{sitemap,robots}.ts`, layout.tsx 메타데이터, 구글 서치콘솔 인증 |

### 알려진 이슈 (2026-08 분석)

1. **[심각] 댓글 보안 우회 가능** — `/api/comments`가 공개 anon 키로 password 조회·delete·update를 수행. RLS가 이를 허용해야 동작하므로, 누구든 anon 키로 Supabase REST를 직접 호출하면 비밀번호 검증 없이 아무 댓글이나 삭제/수정 가능. → 쓰기 계열은 service-role로 옮기고 RLS 잠그기.
2. **[심각] 댓글 비밀번호가 salt 없는 SHA-256** + 평문 비교 레거시 경로(`storedPassword === inputPassword`) 잔존. → bcrypt 통일.
3. **[중간] 공개 AI 엔드포인트 남용 방어 없음** — `/api/ai/post`가 무인증·무제한으로 임의 content를 Gemini에 전달 = 무료 LLM 프록시. → slug만 받아 서버에서 본문 조회 + 포스트별 캐시 + rate limit.
4. **[중간] force-dynamic 남용** — revalidatePath가 무의미. ISR로 전환 필요.
5. **[정리]** `.codex-temp/` 로그 커밋됨(gitignore 누락), `favicon1.ico` 중복, `lib/emojis.ts` 잔재, 테스트/CI 없음.

---

## 2. 하고 싶은 것 (목표)

### A. Spring Boot 마이그레이션
- **방식: 프론트 Next.js 유지 + 백엔드만 Spring Boot로 분리** (Thymeleaf 전면 재작성 아님).
- 옮길 대상: API 라우트 5개 + `lib/` 로직 → Spring 컨트롤러/서비스.
- Next.js 쪽은 `lib/posts.ts`와 각 컴포넌트의 fetch 주소만 교체.
- 마이그레이션하면서 챙길 것:
  - Spring Security + JWT/세션 (수제 HMAC 쿠키 대체)
  - Supabase의 Postgres에 JPA 직결 (서버가 유일한 DB 통로 → 이슈 1 해소)
  - 댓글 bcrypt 통일 (이슈 2), rate limit (이슈 3)
- policy-finance-dashboard와 같은 "Spring Boot + React 분리" 패턴 → 기업은행/산업은행 포트폴리오 서사와 일치.

### B. 로컬 프로젝트(트레이딩 봇 등) 연동 — 프로젝트 관제탑
- 제약: 블로그는 공개 서버, 봇은 로컬 → **서버가 로컬로 못 들어옴. 방향을 뒤집는 Push 모델.**
```
[로컬] auto-trading-bot ──매일 결과 POST (API 키 인증)──▶ [Spring Boot] ──▶ DB
                                                             │
[블로그 /admin/dashboard] ◀── 플릿 11전략 수익률, KIS 봇 상태 조회
```
- 다른 프로젝트(fraud-detection 등)도 같은 리포팅 API로 상태 보고 → 전 프로젝트 현황판.
- 봇 원격 조작이 필요하면: 봇이 서버에 폴링하는 command-queue 방식만 (실계좌 봇을 터널로 인터넷 노출하는 건 지양). 조작 범위는 조회 + 긴급정지 정도로 제한.

### C. 글쓰기 자동화
- 스프링에 **API 키 인증 봇 전용 글 생성 엔드포인트** 추가.
- posts에 `status(draft/published)` 컬럼 추가 — **자동 생성 글은 반드시 draft로 들어와서 수동 검수 후 발행** (shorts-factory와 같은 원칙).
- 활용 예:
  - 트레이딩 봇 주간 성과 리포트: `@Scheduled` 집계 → Gemini로 마크다운 초안 → draft 저장 → 검수 발행
  - 로컬에서 쓴 글을 CLI 스크립트로 업로드

---

## 3. 로드맵 (권장 순서)

1. **Spring Boot 백엔드 신설** — Gradle 골격, JPA 엔티티(posts/comments), Spring Security 인증, posts/comments/AI API 이식. 기존 보안 이슈 1~3을 여기서 함께 해소.
2. **Next.js를 스프링 API에 연결** — `lib/posts.ts` + fetch 경로 교체, force-dynamic → ISR 정리.
3. **프로젝트 리포팅 API + 관리자 대시보드** — API 키 발급, 봇 push 연동.
4. **자동 발행 파이프라인** — draft 검수 흐름, 주간 리포트 스케줄러, 업로드 CLI.
