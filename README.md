# 전섭의 블로그

개인 기술 블로그 플랫폼입니다.  
Next.js App Router와 Supabase를 기반으로 글 작성, 공개 포스트 조회, 댓글, 관리자 인증, AI 보조 기능을 함께 다룹니다.

배포 주소: `https://www.jeonsubb.com`

## 포인트

- 미니멀한 개인 기술 블로그 UI
- Supabase 기반 포스트/댓글 데이터 구조
- `bcryptjs` 해시 비교 + `httpOnly` 세션 쿠키 기반 관리자 인증
- `/admin` 경로 `middleware` 보호
- 관리자 에디터용 AI 보조 기능
  - 요약 생성
  - 태그 추천
  - SEO description 초안
- 공개 포스트 상세용 소형 AI 카드
  - AI 3줄 요약
  - AI 읽기 가이드

## 기술 스택

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase
- Vercel AI SDK
- Google Gemini Provider
- bcryptjs
- remark / remark-html

## 관리자 인증 방식

- 관리자 비밀번호 원문은 저장하지 않습니다.
- `ADMIN_PASSWORD_HASH`에 bcrypt 해시를 저장하고 서버에서 `compare`로 검증합니다.
- 인증 성공 시 서명된 세션 값을 `httpOnly` 쿠키로 발급합니다.
- `/admin` 경로는 `middleware.ts`에서 먼저 보호합니다.
- 관리자 API도 쿠키 세션을 다시 검증하므로 클라이언트 체크만으로 우회되지 않습니다.

## 환경변수

루트에 `.env.local` 파일을 만들고 아래 값을 설정합니다.

```bash
SITE_URL=https://www.jeonsubb.com

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_or_publishable_key
# 또는
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

ADMIN_PASSWORD_HASH=your_bcrypt_hash
ADMIN_SESSION_SECRET=replace_this_with_a_long_random_string

GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
GOOGLE_GENERATIVE_AI_MODEL=gemini-2.5-flash
# 선택
# GOOGLE_GENERATIVE_AI_BASE_URL=https://your-proxy-endpoint

```

`SITE_URL`은 canonical URL, Open Graph URL, `robots.txt`, `sitemap.xml`의
기준 주소로 사용됩니다. 값을 생략하면 `https://www.jeonsubb.com`을 사용합니다.

`ADMIN_PASSWORD_HASH`는 bcrypt 해시라 `$` 문자가 포함됩니다.  
Next 환경변수에서 값이 깨지지 않도록 `.env.local`에는 `\$`로 이스케이프해서 넣는 것을 권장합니다.

### bcrypt 해시 생성 예시

프로젝트 의존성 설치 후 아래 명령으로 로컬 개발용 해시를 만들 수 있습니다.

```bash
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('your-password', 12).then(console.log)"
```

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

관리자 로그인 화면은 `http://localhost:3000/admin/login` 입니다.

## 스터디 기록 자동 게시

`../financial-it-study/blog-posts/*.md`에 보관한 Markdown 문서를 이 블로그의
Supabase `posts` 테이블로 등록하거나 수정할 수 있습니다.

```bash
# 글 형식과 게시 경로만 확인합니다. 인증 정보가 없어도 실행됩니다.
npm run study:preview -- day-01-java-basics

# .env.local의 Supabase 관리자 키로 실제 게시합니다.
npm run study:publish -- day-01-java-basics

# 전체 글을 순서대로 게시하거나 수정합니다.
npm run study:publish -- --all

# 외부 네트워크 없이 파이프라인 동작을 검증합니다.
npm run test:study-pipeline
```

실제 게시에는 `.env.local`의 `NEXT_PUBLIC_SUPABASE_URL`과
`SUPABASE_SERVICE_ROLE_KEY`가 필요합니다. 서비스 키는 Git에 커밋하지 않습니다.
이미 같은 `slug`가 존재하면 중복 글을 만들지 않고 기존 글을 수정합니다.

Markdown 파일은 아래 형식을 사용합니다.

```markdown
---
title: 금융 IT Day 1 — Java 기본기
slug: financial-it-day-01-java-basics
description: 계좌 도메인으로 Java 기본기를 공부한다.
category: Financial IT
series: 금융 IT 30일 학습
tags: java, collections, fintech
---

## 본문

공부한 내용을 작성합니다.
```

## AI 기능 사용 방법

### 관리자 에디터

1. `/admin/login`에서 로그인합니다.
2. `/admin/write`에서 제목과 본문 초안을 입력합니다.
3. `AI 요약`, `태그 추천`, `SEO 초안` 버튼을 눌러 보조 결과를 확인합니다.
4. SEO 초안과 태그 추천은 에디터 폼에 바로 반영됩니다.

### 공개 포스트 상세

- 글 상세 페이지의 `AI 노트` 카드에서 3줄 요약과 읽기 가이드를 확인할 수 있습니다.
- `GOOGLE_GENERATIVE_AI_API_KEY`가 없으면 UI는 유지되고 기능만 비활성화됩니다.

## 주요 경로

- `/` : 홈
- `/blog` : 글 목록
- `/blog/[slug]` : 글 상세
- `/tags/[tag]` : 태그별 글
- `/series/[series]` : 시리즈별 글
- `/admin/login` : 관리자 로그인
- `/admin/write` : 관리자 글 작성

## Supabase 참고

포스트 저장용 `posts` 테이블에는 아래 컬럼이 필요합니다.

```sql
alter table posts add column if not exists series text;
alter table posts add column if not exists tags text[] default '{}';
```

댓글 기능을 사용 중이라면 기존 `comments` 테이블도 함께 준비되어 있어야 합니다.

## Vercel 배포 시 환경변수

Vercel Project Settings > Environment Variables에 아래 값을 등록합니다.

- `SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 또는 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD_HASH`
- `ADMIN_SESSION_SECRET`
- `GOOGLE_GENERATIVE_AI_API_KEY`
- `GOOGLE_GENERATIVE_AI_MODEL`
- `GOOGLE_GENERATIVE_AI_BASE_URL` (사용하는 경우만)

## 방문 로그 / 크롤러 / 보안 이벤트 확인

1. Supabase 대시보드의 SQL Editor에서 `scripts/sql/traffic-logs.sql` 내용을 한 번 실행해
   `traffic_logs` 테이블을 만듭니다.
2. 배포하면 `middleware.ts`가 검색엔진과 AI 크롤러의 방문을 기록하고,
   로그인 API가 관리자 로그인 성공/실패를 기록합니다.
3. 관리자로 로그인한 뒤 `/admin/stats`에서 크롤러별 방문 횟수와 로그인 이벤트를 확인합니다.
4. 방문자 통계는 Vercel 대시보드의 Analytics 탭에서 "Enable"을 눌러야 수집이 시작됩니다.
   (`@vercel/analytics` 패키지는 이미 설치되어 있습니다.)

## Projects 페이지

`/projects`는 GitHub 계정(Jeonsubb)의 공개 저장소 목록을 1시간 간격 캐시로 보여줍니다.
로컬에만 있는 포트폴리오 프로젝트도 GitHub에 올리면 자동으로 이 페이지에 나타납니다.

## RSS와 구조화 데이터

- RSS 피드: `https://www.jeonsubb.com/feed.xml`
- 각 글에는 JSON-LD(BlogPosting) 구조화 데이터가 포함되어 검색엔진과 AI 검색이
  글의 제목, 작성일, 작성자를 정확히 인식합니다.

## Spring Boot 전환 계획

`docs/SPRING-MIGRATION-PLAN.md`에 단계별 로드맵이 정리되어 있습니다.
