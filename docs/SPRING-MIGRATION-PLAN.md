# Spring Boot 전환 계획 (초보자용 로드맵)

> 2026-08 작성. 진행 중인 금융 IT Java 학습과 연계하여, 블로그 백엔드를
> Spring Boot로 옮기는 과정을 그 자체로 포트폴리오 프로젝트로 만드는 것이 목표.

## 0. 어떤 방식으로 옮길 것인가

두 가지 선택지가 있다.

| 방식 | 내용 | 장점 | 단점 |
|---|---|---|---|
| 전면 재작성 | 화면까지 전부 Spring(Thymeleaf 등)으로 다시 만든다 | 스택이 하나로 통일된다 | 잘 동작하는 Next.js 화면을 버리게 되고, 작업량이 매우 크다 |
| **하이브리드 (권장)** | 화면은 Next.js 유지, API 서버만 Spring Boot로 신설한다 | 화면 코드 재사용, 단계적 전환 가능, 실무에서 흔한 구조 | 서버가 2개가 되어 배포처가 하나 늘어난다 |

하이브리드를 권장하는 이유: 실무에서 "프런트엔드(React/Next.js) + 백엔드(Spring Boot)"
조합이 가장 흔하고, 취업 포트폴리오로서의 가치도 이 구조가 더 크다.

## 1. 옮길 대상 정리

현재 Next.js의 API 라우트가 담당하는 기능이 전부 이관 대상이다.

- `POST/DELETE /api/admin/session` → 관리자 로그인/로그아웃 (Spring Security로 재구현)
- `GET/POST/PATCH/DELETE /api/admin/posts` → 글 CRUD (JPA)
- `GET/POST/PATCH/DELETE /api/comments` → 익명 댓글 (비밀번호 해시 검증 포함)
- `POST /api/admin/ai`, `POST /api/ai/post` → Gemini 호출 (Spring AI 또는 WebClient)

데이터베이스는 새로 만들 필요 없이 Supabase의 PostgreSQL에 그대로 접속한다.
Supabase 대시보드 > Settings > Database에서 JDBC 접속 정보를 확인할 수 있다.

## 2. 단계별 마일스톤

### 1단계: 개발 환경과 Hello World (예상 1주)
- JDK 21 LTS 설치, IntelliJ IDEA Community 설치.
- https://start.spring.io 에서 프로젝트 생성.
  - 의존성: Spring Web, Spring Data JPA, PostgreSQL Driver, Lombok, Validation
- `GET /api/health`가 `{"status":"ok"}`를 반환하는 컨트롤러를 만들고 실행해 본다.
- 배우는 것: 프로젝트 구조, Gradle, 컨트롤러와 어노테이션 기초.

### 2단계: 글 읽기 API (예상 1~2주)
- `application.yml`에 Supabase PostgreSQL 접속 정보 설정 (비밀번호는 환경변수로).
- `Post` 엔티티를 기존 `posts` 테이블에 매핑 (`spring.jpa.hibernate.ddl-auto=none`으로
  두어 스프링이 테이블을 건드리지 못하게 한다. 기존 데이터 보호에 중요).
- `GET /api/posts`, `GET /api/posts/{slug}` 구현.
- 배우는 것: JPA 엔티티, 리포지토리, DTO 변환, 계층 구조(Controller-Service-Repository).

### 3단계: Next.js 연결 (예상 1주)
- `lib/posts.ts`가 Supabase 대신 Spring API를 호출하도록 교체.
  이 파일이 데이터 조회의 단일 통로이므로 여기만 바꾸면 된다.
- 로컬에서 Next.js(3000)와 Spring(8080)을 동시에 띄우고 CORS 설정을 배운다.
- 배우는 것: CORS, 환경변수로 API 주소 관리, 프런트와 백의 계약(contract).

### 4단계: 인증 (예상 2~3주, 학습 효과가 가장 큰 구간)
- Spring Security + 세션 또는 JWT로 관리자 인증 재구현.
- 현재의 수제 HMAC 토큰 방식과 비교하면서, 프레임워크가 대신 처리해 주는
  부분(필터 체인, 비밀번호 인코더, CSRF)을 이해한다.
- 글 CRUD API를 인증 뒤로 보호한다.
- 배우는 것: Spring Security 필터 체인, BCryptPasswordEncoder, 인증/인가 구분.

### 5단계: 댓글과 AI 기능 (예상 1~2주)
- 댓글 CRUD 이관. 비밀번호는 BCrypt로 해시하여 비교.
- Gemini 호출을 WebClient 또는 Spring AI로 이관.
- 배우는 것: 외부 API 연동, 예외 처리, 요청 검증(@Valid).

### 6단계: 배포 (예상 1주)
- Vercel은 Spring을 실행하지 못하므로 별도 배포처가 필요하다.
  - 무료~소액: Railway, Fly.io, Koyeb / 학습 가치: AWS EC2 또는 Elastic Beanstalk
- Dockerfile을 작성해 컨테이너로 배포하면 어디서든 동일하게 동작한다.
- Next.js의 API 주소 환경변수를 운영 주소로 바꾸면 전환 완료.
- 배우는 것: Docker, 환경 분리(dev/prod), 헬스체크.

## 3. 주의 사항

- 각 단계마다 기존 Next.js API를 지우지 말고, Spring API가 검증된 뒤에 교체한다.
  두 서버가 같은 DB를 보므로 병행 운영이 가능하다.
- Supabase 무료 플랜은 외부 직접 접속(Direct Connection) 대신
  Connection Pooler(포트 6543, Session mode) 사용을 권장한다.
- 서비스 롤 키와 DB 비밀번호는 절대 Git에 커밋하지 않는다.

## 4. 함께 만들면 좋은 포트폴리오 연계

- 이 전환 과정 자체를 "Next.js 블로그 백엔드를 Spring Boot로 이관하기" 시리즈로
  블로그에 연재하면, 학습 기록과 포트폴리오가 동시에 완성된다.
- 금융 IT 학습 프로젝트(계좌 도메인 등)를 같은 Spring 서버에 모듈로 추가하면
  하나의 백엔드 포트폴리오로 묶을 수 있다.
