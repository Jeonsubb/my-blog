# my-blog 개선 로드맵

> 2026-09-25 작성. 블로그를 검색과 AI에 잘 노출되는 기술 블로그이자
> 금융 IT 포트폴리오 허브로 발전시키기 위한 계획을 정리한 문서입니다.

## 1. 완료된 작업

### SEO / GEO 최적화
- [x] 글 페이지에 JSON-LD(BlogPosting) 구조화 데이터 추가
- [x] 사이트 전체에 JSON-LD(WebSite) 구조화 데이터 추가
- [x] RSS 피드 제공 (`/feed.xml`)
- [x] 기본 Open Graph 이미지 자동 생성 (`app/opengraph-image.tsx`)
- [x] sitemap의 lastmod를 실제 글 작성일 기준으로 수정

### 트래킹 / 크롤러 / 보안 관측
- [x] Vercel Web Analytics 연동 코드 추가
- [x] 미들웨어에서 검색엔진·AI 크롤러 방문을 `traffic_logs` 테이블에 기록
- [x] 관리자 로그인 성공/실패 이벤트를 IP와 함께 기록
- [x] 관리자용 로그 대시보드 페이지 (`/admin/stats`)

### 콘텐츠 파이프라인
- [x] 스터디 Markdown을 Supabase에 게시하는 CLI (`scripts/publish-study-post.mjs`)
- [x] 게시 파이프라인 단위 테스트 (`npm run test:study-pipeline`)
- [x] GitHub 공개 저장소를 보여주는 포트폴리오 페이지 (`/projects`)

## 2. 배포 후 남은 수동 작업

- [ ] Supabase SQL Editor에서 `scripts/sql/traffic-logs.sql` 실행 (로그 테이블 생성)
- [ ] Vercel 대시보드 Analytics 탭에서 수집 활성화
- [ ] Google Search Console에 sitemap 재제출

## 3. 예정된 작업

### 성능과 SEO 심화
- [ ] 공개 페이지의 `force-dynamic`을 ISR(주기적 재생성)로 전환하여 응답 속도 개선
- [ ] 글 수정 시각(updated_at) 컬럼을 도입하여 JSON-LD와 sitemap에 반영

### 보안 강화
- [ ] 댓글 비밀번호 해시를 SHA-256에서 bcrypt로 강화
- [ ] 공개 AI API(`/api/ai/post`)에 호출 횟수 제한 도입

### 백엔드 전환 (장기)
- [ ] Spring Boot 하이브리드 전환: 화면은 Next.js 유지, API 서버만 Spring으로 이관
- [ ] 세부 계획은 `docs/SPRING-MIGRATION-PLAN.md`의 6단계 로드맵을 따름
- [ ] 전환 과정을 블로그 시리즈로 연재하여 학습 기록과 포트폴리오를 동시에 완성

### 포트폴리오 확장
- [ ] 로컬 금융 IT 프로젝트들을 GitHub 저장소로 공개하여 `/projects`에 노출
- [ ] 프로젝트별 소개 글을 `category: Portfolio`로 게시 파이프라인을 통해 발행
