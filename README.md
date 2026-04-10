# 전섭의 빌드 로그

Next.js와 Supabase를 기반으로 만든 에디토리얼 블로그 플랫폼입니다.
단순한 개인 블로그를 넘어서, 게시글 데이터 엔진 전환, 댓글 CRUD API, SEO, 에디터 확장성까지 함께 보여주는 포트폴리오 프로젝트로 다듬었습니다.

배포 주소: `https://my-blog-xi-flame.vercel.app`

## 주요 포인트

- Supabase 기반 게시글 조회 구조
- 댓글 조회, 작성, 수정, 삭제 API
- 동적 메타데이터, `sitemap.xml`, `robots.txt`
- 카테고리 필터 + 검색이 가능한 글 목록
- 포트폴리오 설명력을 높이는 About / Editor Lab 화면
- Supabase 환경 변수가 없을 때도 로컬 마크다운으로 미리보기 가능한 fallback

## 기술 스택

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase
- remark / remark-html

## 로컬 실행

의존성 설치 후 개발 서버를 실행합니다.

```bash
npm install
npm run dev
```

## 환경 변수

프로덕션과 같은 Supabase 데이터를 사용하려면 루트에 `.env.local` 파일을 만들고 아래 값을 넣어주세요.

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

환경 변수가 없으면 게시글은 `posts/` 폴더의 로컬 마크다운 데이터를 fallback으로 사용하고, 댓글 API는 비활성화됩니다.

## 주요 경로

- `/` : 프로젝트 랜딩 페이지
- `/blog` : 글 목록 및 필터
- `/blog/[slug]` : 글 상세
- `/about` : 프로젝트 소개
- `/admin/write` : 에디터 프로토타입 페이지

## 다음 확장 아이디어

- 관리자 인증이 포함된 실제 게시글 발행 기능
- Supabase Storage 기반 이미지 업로드
- 태그 / 시리즈 / 추천 글 구조
- RSS 피드 생성
- 댓글 비밀번호 해시 마이그레이션과 관리자 moderation 기능
