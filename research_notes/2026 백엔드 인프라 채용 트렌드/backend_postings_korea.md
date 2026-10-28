# Korean Backend Developer (백엔드/서버 개발자) Job Postings: Tech Stack and Requirements, 2025–2026

Research date: 2026-10-18. Scope: South Korean job market. Data from 2025–2026 is preferred; anything older is labeled **[HISTORICAL]**.

Method note: Most company-posting details below came from posting pages on wanted.co.kr, toss.im, careers.daangn.com, zighang.com, bzpp.co.kr, linkareer.com, and similar sites. Only one posting (토스페이먼츠 Server Developer 3년 이상) was fetched and read in full. Many of the others were read through search-result excerpts of the cited URL. Several of these postings are closed or have no visible posting date, so treat them as representative examples of 2025-era requirements, not as currently open roles.

---

## Q1. Which languages and frameworks dominate Korean backend postings, and how has the mix shifted between 2024 and 2026? Any platform statistics?

### Takeaway
I found no 2025–2026 platform statistic that ranks languages or frameworks by share of backend postings. 사람인/점핏, 원티드, 프로그래머스 and the others have published role-level demand, experience-level, and salary-by-stack figures, but not stack shares of postings. Qualitatively, Java/Kotlin + Spring Boot (+ JPA) is the default requirement at almost every large and IT company sampled: 토스, 배민, 카카오페이, 쿠팡, 당근 페이 teams, and 카카오뱅크. Node.js/NestJS, Python (FastAPI), Go, and PHP appear mainly at startups or specific teams. The most recent quantitative stack-share data is 점핏's 2022 annual summary, where Java was #1 at 35.7% of postings.

### Cited Findings
**Platform-level demand (2025)**
- 사람인+점핏 joint report (published 2025-08-27; covers H1 2025, ~100,000 developer postings and ~2.6M applications): 서버/백엔드 개발 was the #1 job category with **16.2% of all developer postings**. Next were SW/솔루션 11.3%, 프론트엔드 11.1%, and DevOps/시스템 엔지니어 11.1%. — [이투데이, 2025-08-27](https://www.etoday.co.kr/news/view/2500510)
- Same report: 서버/백엔드 also drew the **largest share of applications, 23.5%**, ahead of 프론트엔드 15.5% and DevOps 10.2%. — [이투데이, 2025-08-27](https://www.etoday.co.kr/news/view/2500510)
- 원티드랩 "2025 채용시장 설문" (HR managers, published 2024-12-23): **개발 was the #1 job family companies planned to focus hiring on in 2025, at 31.7%**. Next were 영업·제휴 22.8% and 마케팅·홍보 12.9%. — [전자신문, 2024-12-23](https://www.etnews.com/20241223000072); [스타트업엔](https://www.startupn.kr/news/articleView.html?idxno=49958)
- 원티드랩 2026 채용 트렌드 서베이 (153 company HR managers, published 2025-12-08): 개발 was again the top focus job family at **28.1%**, down from 31.7% a year earlier. **AI·데이터 활용 역량 (24.2%)** ranked as the 4th most important talent requirement. — [전자신문, 2025-12-08](https://www.etnews.com/20251208000036); [AI타임스](https://www.aitimes.com/news/articleView.html?idxno=204611)

**Salary by backend stack (2025, a proxy for stack value, not frequency)**
- 점핏 "2025 개발자 연봉 리포트" (published 2025-10-31; ~10,000 developers who changed jobs via 점핏/사람인 in 2025). Top backend average salaries were **C++ 5,748만원, PHP 5,339만원, Python 5,078만원**. — [전자신문, 2025-10-31](https://www.etnews.com/20251031000354)
- Same report: **Java 5,005만원, Spring Boot 4,739만원**. These come from a search-result excerpt of the article, not a full read. — [브랜드뉴스](https://www.ibrandnews.com/news/articleView.html?idxno=11086)

**[HISTORICAL] Stack share of postings (점핏, 2022)**
- 점핏 2022 annual summary (released Jan 2023), counting multiple stacks per posting: **Java 35.7%**, JavaScript 28.1%, Python 23.5% of company postings. Spring Boot was **not** in the top 10 posting stacks. Among individual developers' registered stacks, Spring Boot was 17.7%. — [사람인 news (점핏 2022 결산)](https://www.saramin.co.kr/zf_user/help/live/view?idx=108925&listType=news); [파이낸셜뉴스, 2023-01-05](https://www.fnnews.com/news/202301050929529152)
- 점핏 earlier analysis (exact year unclear, probably 2021–2022): Java was **32.1%** of all 점핏 postings and Spring **7.8%**, counting multiple stacks per posting. — [사람인 news (점핏 분석)](https://www.saramin.co.kr/zf_user/help/live/view?idx=108524&listType=news)
- Developers registered an average of 7.3 tech stacks on 점핏 (2022 data). — [파이낸셜뉴스, 2023-01-05](https://www.fnnews.com/news/202301050929529152); [ZDNet Korea, 2023-01-05](https://zdnet.co.kr/view/?no=20230105082540)

**Qualitative evidence of the language mix in 2025-era postings**
- Spring/JVM-centric: 토스페이먼츠 lists Java, Kotlin, Spring MVC/WebFlux/Batch, JPA, Spring Cloud Gateway/Config, and Netty. — [토스 채용, Server Developer (3년 이상)](https://toss.im/career/job-detail?job_id=5028079003). 토스뱅크 lists Kotlin, Spring Boot, Spring WebFlux, Netty, Kafka, and Kubernetes. — [원티드 토스뱅크 Server Developer](https://www.wanted.co.kr/wd/203977)
- Kotlin is now standard alongside Java at fintech and platform companies. 토스, 카카오페이 (one 마이데이터 posting requires "Kotlin 기반 소프트웨어 설계·개발 능력"), 당근페이 ("Kotlin·Spring Boot 기반 JVM 환경"), and Krafton (Kotlin / Spring Boot 3.x) all show this. — [카카오페이 채용 (마이데이터)](https://kakaopay.career.greetinghr.com/en/be-mydata); [당근 Backend - 당근페이](https://about.daangn.com/jobs/4511184003/); [Krafton greenhouse](https://job-boards.greenhouse.io/krafton/jobs/8460159002)
- Go appears in specific 당근 teams. 인프라/콘텐츠 서빙 uses Kotlin and Go. 피드 ML Data Platform uses Go, gRPC, Redis, and Kafka, plus Kotlin, Python, and Apache Beam. — [당근 Backend - 인프라](https://careers.daangn.com/jobs/role/7644271003/); [당근 Backend (신입) - 피드 ML Data Platform](https://careers.daangn.com/jobs/role/5823087003/)
- Language-agnostic postings exist. 당근 부동산 accepts "TypeScript, Go, Java, Kotlin, Python, Ruby 중 하나 이상" and prefers Node.js, Go, and GraphQL. — [당근 Backend - 부동산](https://careers.daangn.com/jobs/role/5296522003/); [원티드 당근 부동산(Node.js)](https://www.wanted.co.kr/wd/226305)
- Startup postings in a crawler of 원티드 backend postings (587 postings total; page showed 30) include **TypeScript/NestJS + PostgreSQL (Supabase) + Prisma + AWS (ECS/SQS/S3/Lambda) + Redis/BullMQ**, Python production backends, and PHP/Laravel + MySQL. The same crawler also shows Java/Kotlin + Spring/JPA + MSA at a 7년+ role (부릉). — [RBYE (Requirements By Years of Experience)](https://rbye.vercel.app/t/server)

### Inferences
- **Java/Kotlin + Spring Boot + JPA remains the dominant requirement set** in Korean backend postings at 대기업, IT 대기업, fintech, and e-commerce. The supporting evidence is consistent but qualitative: every large or fintech company sampled lists it. The only hard share figure, Java at 35.7% in 2022 for all developer roles, is historical.
- The visible shift from 2024 to 2026 is not a change in which language leads. It is (a) **Kotlin moving to co-equal status with Java** in the JVM stack at tech/fintech firms; (b) **TypeScript/NestJS and Python/FastAPI rising at startups**, especially AI-adjacent ones; and (c) **AI-tool fluency appearing as a requirement**, for example 주니어 postings asking candidates to explain code produced by AI coding tools (see Q5). (b) and (c) rest on a small sample of postings, not statistics.
- Developers' 2025 salaries are higher for C++, PHP, and Python than for Java (5,005만원) or Spring Boot (4,739만원). A plausible reading is that Java/Spring is the abundant, mainstream skill rather than a scarce one. The sample is only job-switchers, so this is a weak signal.

### Gaps
- **No 2025 or 2026 stack-share-of-postings statistic was found** from 점핏, 원티드, 프로그래머스, 잡코리아, 사람인, 리멤버, 로켓펀치, or 그룹바이. The 점핏 2024 결산 and any 2025 결산 stack ranking could not be located. 점핏's 2025 salary report has stack salaries but no posting shares.
- I could not find a 프로그래머스 2025 or 2026 developer survey or hiring report with backend-language data.
- An unsourced blog claim that "약 60~70% of Korean backend postings require Java + Spring" surfaced in search. Its origin could not be verified, so it should not be used.
- One bootcamp blog (내일배움캠프) cites an "OKKY Feb 2025 survey" in which backend was **38% of 신입 hiring demand**. The underlying OKKY source was not found, so treat it as unverified. — [내일배움캠프 블로그](https://nbcamp.spartaclub.kr/blog/2025-%EB%B0%B1%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%ED%98%84%ED%99%A9-%EC%96%B8%EC%96%B4-%EC%8A%A4%ED%83%9D%EA%B3%BC-%EC%97%B0%EB%B4%89-%EA%B3%B5%EB%B6%80-%EB%B0%A9%EB%B2%95%EA%B9%8C%EC%A7%80-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-44452)
- I found no 2026-dated (Jan–Oct 2026) statistical report on backend postings.

---

## Q2. Which databases, caches, and messaging systems are commonly required?

### Takeaway
In sampled 2025-era postings, the typical baseline is **MySQL (plus Oracle at banks and payments) + JPA**, **Redis**, and **Kafka**. Redis and Kafka experience is usually a 우대사항 (preferred qualification), not a hard requirement. Elasticsearch shows up for search and log teams. PostgreSQL is more common in startup and TypeScript stacks. MongoDB appears occasionally, for example at Krafton. No quantitative frequency data was found.

### Cited Findings
- 토스페이먼츠 Server Developer (3년 이상) lists **MySQL, Redis, ElasticSearch, Kafka, Oracle** in its stack. Its 우대사항 say verbatim: "Redis와 Kafka를 사용한 경험을 보유하신 분이면 더 좋아요" and "RDBMS에 대한 높은 이해도를 보유하신 분이라면 더 좋아요". — [토스 채용](https://toss.im/career/job-detail?job_id=5028079003)
- 토스증권 Server Developer (5년 이상) prefers "Redis, Kafka, ELK 스택 운영경험", plus troubleshooting across "Spring Framework, Tomcat, JVM, OS, 네트워크, 인프라". — [원티드 토스증권](https://www.wanted.co.kr/wd/204287)
- 토스뱅크 Server Developer (계정계) requires "Oracle, MySQL 등 데이터베이스를 설계하여 서비스를 기획 및 운영해 본 경험" and familiarity with "트랜잭션과 유량제어 방법론". It prefers Redis and Kafka. — [토스 채용 Server Developer (계정계)](https://toss.im/career/job-detail?job_id=5939812003); [원티드 토스뱅크](https://www.wanted.co.kr/wd/203977)
- 카카오페이 정산플랫폼 requires **MySQL 모델링·튜닝** ability. 카카오페이 전사 생산성 and 머니서비스 postings prefer **RDBMS 쿼리 최적화와 인덱스 튜닝**. An older 결제서비스 posting prefers **Kafka·RabbitMQ** messaging experience. — [원티드 카카오페이 정산플랫폼](https://www.wanted.co.kr/wd/132119); [비즈니스피플 카카오페이 전사 생산성](https://www.bzpp.co.kr/biz/businessDetailView/BR251119A00266); [비즈니스피플 카카오페이 머니서비스](https://www.bzpp.co.kr/biz/businessDetailView/BR251119A00262); [사람인 카카오페이 서버 개발자 (older)](https://www.saramin.co.kr/zf_user/jobs/view?rec_idx=38042975)
- 배민 검색플랫폼팀 서버 개발자 requires **5년 이상 Elasticsearch/Solr** search-engine build and operation experience in a 대용량 트래픽 environment. — [직행 우아한형제들 검색플랫폼팀](https://zighang.com/recruitment/9e1f5d21-8e54-401f-851c-c9b131f3460f)
- 배민 postings consistently list **JPA**. Examples: "Java, Kotlin, Spring, JPA, gRPC" at 배민공통서비스개발팀; "ORM(JPA, Hibernate)" at CS 프로덕트실. — [직행 배민공통서비스개발팀](https://zighang.com/recruitment/bfc89828-b8c5-491e-a2d9-baef444500e5); [원티드 배민 CS 프로덕트실](https://www.wanted.co.kr/wd/254673)
- Krafton backend: Kotlin/Spring Boot 3.x, **MongoDB, Redis**, AWS (S3, SES, SQS, EKS), and **Kafka-based event-driven architecture**. — [Krafton greenhouse](https://job-boards.greenhouse.io/krafton/jobs/8460159002)
- Startup TypeScript example: NestJS + **PostgreSQL (Supabase) + Prisma** + **Redis/BullMQ** + AWS SQS. A separate posting in the same crawl lists Java/Spring/JPA + **Kafka, Redis, MySQL**. — [RBYE](https://rbye.vercel.app/t/server)
- 금융권/SI: Java + **Oracle** + SQL + Unix + 전자정부프레임워크 (애니링커 금융 SI). C, Java, **Oracle, Pro-C, ProFrame** (신한투자증권 차세대 SI vendor). 카카오뱅크 금융회계 백엔드: Java/Spring Boot + **Oracle·MySQL**. — [더팀스 애니링커](https://www.theteams.kr/recruit/wanted/1909901); [직행 새한정보 신한투자증권 차세대](https://zighang.com/recruitment/f9307885-e16c-40c9-acc9-80fd7a64ed6f); [인디스워크 카카오뱅크](https://inthiswork.com/archives/327668)

### Inferences
- The modal Korean backend "data layer" requirement is **RDBMS (MySQL; Oracle in finance) + JPA**, with **Redis + Kafka as the standard 우대 pair**. This pairing appears almost word-for-word across 토스 entities.
- QueryDSL is widely used in the Korean Spring ecosystem, but none of the sampled postings named it explicitly. It may sit under "JPA" rather than being listed on its own.
- Oracle is a marker of finance, banking, and SI postings. PostgreSQL and Prisma point to startups and TypeScript shops.

### Gaps
- There is no quantitative frequency data, such as "% of backend postings mentioning Redis/Kafka/PostgreSQL". No platform publishes this, and no community crawl analysis with numbers was found.
- No sampled posting explicitly mentioned QueryDSL or MongoDB at a major Korean portal (네이버, 카카오), so their prevalence is unverified.

---

## Q3. Which architecture and engineering topics appear as requirements or 우대사항?

### Takeaway
The recurring 우대사항 vocabulary in 2025-era Korean backend postings is: **대용량 트래픽 / 대규모 실시간 트래픽**, **MSA (often via Spring Cloud)**, **고가용성·확장성 설계**, **성능 최적화/튜닝 (JVM, query, index)**, **장애 대응/트러블슈팅**, **테스트 코드/TDD/클린 코드/OOP/리팩토링**, **AWS/Kubernetes/Docker**, and **CI/CD**. Fintech postings add **트랜잭션·유량제어** and **장애 복구 시나리오**. AI-tool fluency is a new 2025–2026 entrant.

### Cited Findings
- **대용량 트래픽.** 토스뱅크: "대용량 트래픽을 안정적으로 운영해본 경험이 있는 분이면 좋아요". Another 토스 posting: "고가용성의 확장 가능한 시스템을 설계하고 운영해본 경험, 대규모의 실시간 트래픽을 처리하는 시스템 개발 경험이 있으면 좋아요" and "성능 최적화와 운영 자동화를 위한 지속적인 노력". — [원티드 토스뱅크](https://www.wanted.co.kr/wd/203977); [토스 Server Developer (Platform)](https://toss.im/career/job-detail?job_id=4521687003)
- 배민 그로스 프로덕트팀 (posted 2025-09-18, 경력 5~10년) prefers "대용량 트래픽 시스템의 아키텍처 설계와 성능 개선 경험". 배민공통서비스개발팀 (posted 2025-10-01) prefers AWS and operations experience in a high-traffic environment. — [직행 그로스 프로덕트팀](https://zighang.com/recruitment/9a210b88-a097-4f0a-a444-23a80028eb7a); [직행 배민공통서비스개발팀](https://zighang.com/recruitment/bfc89828-b8c5-491e-a2d9-baef444500e5)
- **MSA.** 배민 CS 프로덕트실 lists MSA understanding as a requirement. 카카오페이 postings value "Spring Boot, Spring Cloud를 이용한 마이크로서비스 아키텍처 설계 및 장애 복구 시나리오 구축 경험". 카카오페이 마이데이터 prefers "MSA 기반 서비스 구성 경험" and Docker/Kubernetes. 쿠팡페이 Staff requires Java (Kotlin), Spring, and MSA understanding. — [원티드 배민 CS 프로덕트실](https://www.wanted.co.kr/wd/254673); [비즈니스피플 카카오페이](https://www.bzpp.co.kr/biz/businessDetailView/BR251119A00266); [카카오페이 마이데이터](https://kakaopay.career.greetinghr.com/en/be-mydata); [원티드 쿠팡페이 Staff](https://www.wanted.co.kr/wd/199916)
- **분산 시스템 / messaging / API styles.** A 쿠팡 Senior L5 posting requires understanding of distributed systems, message-based architecture, RESTful/GraphQL/gRPC, and microservices. — [Dreamwork: Coupang Senior Back-end Engineer L5](https://www.dreamworkhq.com/job/e597d14e-3ab0-4ff6-8e8f-961b094482f2)
- **장애 대응 / troubleshooting.** 카카오페이 2025 경력 서버 개발자 requires JVM-language server development and **운영 장애 대응 경험**, and gives extra credit for applying "OOP, MSA 개념을 적극적으로 적용해 코드 품질과 유지보수성을 함께 높여본 역량". 토스증권 values troubleshooting from Spring and Tomcat down through JVM, OS, and network. — [링커리어 카카오페이 서버 개발자 (2025-07)](https://linkareer.com/activity/255993); [원티드 토스증권](https://www.wanted.co.kr/wd/204287)
- **테스트/TDD/엔지니어링 practices.** 토스페이먼츠 says: "Java 기술 생태계 (Kotlin/Spring/JPA)에 대한 이해도와 엔지니어링 역량(OOP/TDD/Refactoring)". 카카오페이 정산플랫폼 says: "TDD 및 Clean Code 지향". 배민 B마트 [HISTORICAL, closed] required 단위·통합 테스트 작성. — [토스 채용](https://toss.im/career/job-detail?job_id=5028079003); [원티드 카카오페이 정산플랫폼](https://www.wanted.co.kr/wd/132119); [원티드 배민 B마트](https://www.wanted.co.kr/wd/35510)
- **동시성 / 트랜잭션.** 토스뱅크 계정계 requires familiarity with "트랜잭션과 유량제어 방법론". 토스증권 prefers 실시간 데이터 처리 and 네트워크 프로그래밍. A startup posting requires async job design that accounts for **재시도·멱등성** (retries and idempotency). — [토스 계정계](https://toss.im/career/job-detail?job_id=5939812003); [원티드 토스증권](https://www.wanted.co.kr/wd/204287); [RBYE](https://rbye.vercel.app/t/server)
- **Cloud / CI/CD.** 배민 딜리버리·라이더 서비스 prefers AWS development and operations experience plus CI/CD [older posting]. 당근 인프라 mentions Kubernetes, GCP, and AWS. — [velog 배민 딜리버리 posting copy](https://velog.io/@gina5757/%EC%9A%B0%EC%95%84%ED%95%9C-%ED%98%95%EC%A0%9C%EB%93%A4-%EB%94%9C%EB%A6%AC%EB%B2%84%EB%A6%AC%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%9D%BC%EC%9D%B4%EB%8D%94%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%B0%B1%EC%97%94%EB%93%9C-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90); [당근 Backend - 인프라](https://careers.daangn.com/jobs/role/7644271003/)
- **System design in hiring process.** 당근페이 includes a system design interview. 당근 피드 ML Data Platform includes live coding. — [당근 Backend - 당근페이](https://about.daangn.com/jobs/4511184003/); [당근 피드 ML Data Platform](https://careers.daangn.com/jobs/role/5823087003/)
- **AI 활용 역량 (2025–2026).** 원티드 2026 survey: AI·데이터 활용 역량 was the 4th most important talent requirement, at 24.2%. — [전자신문, 2025-12-08](https://www.etnews.com/20251208000036). Startup postings now ask junior candidates to explain code produced by AI coding tools, or ask 2–5년 candidates to have shipped a service end to end with AI coding tools (주니어라이드, 로이드케이). — [RBYE](https://rbye.vercel.app/t/server). LG CNS evaluates 생성형 AI 활용 역량 in its hiring tests, split into 코딩형 and 기획형; the article's year was not confirmed. — [시사저널e](https://www.sisajournal-e.com/news/articleView.html?idxno=423616)
- A career blog summarizing 사람인/점핏 data lists required skills as data structures/algorithms, SQL/NoSQL optimization, AWS/GCP, MSA design, and LLM/NLP integration into backends. No frequencies are given and this is a secondary source. — [Prime Career](https://prime-career.com/article/11269)

### Inferences
- In Korea, "대용량 트래픽" works as a near-universal 우대 keyword at consumer-scale companies (토스, 배민, 쿠팡, 카카오). MSA is more often stated as a requirement or 우대사항 at fintech and payments firms such as 카카오페이 and 쿠팡페이.
- Fintech postings (토스뱅크 계정계, 카카오페이 머니) put extra weight on **transaction integrity, 유량제어/rate limiting, and failure recovery**. Pure e-commerce and platform postings stress **scale and performance**.
- DDD did not appear explicitly in any sampled posting. OOP, TDD, clean code, and refactoring are the more common wording for engineering-quality expectations.

### Gaps
- No count or percentage was found for how often MSA, 대용량 트래픽, TDD, DDD, or CI/CD appear across postings.
- No 2026-dated posting explicitly listing AI coding tools such as Cursor or Claude Code at a major Korean company was found. Evidence for AI-tool requirements comes from small startups via a crawler page, plus HR survey data.

---

## Q4. What do representative large and tech companies list in current backend postings?

### Takeaway
Across 토스, 배민, 카카오페이, 당근, and 쿠팡, the pattern is: **Java/Kotlin + Spring (Boot) + JPA required; Redis/Kafka/대용량 트래픽/MSA/cloud preferred; mostly 3–5년+ 경력**. 쿠팡 skews senior (Staff/L5+). 네이버, LG CNS, and 삼성SDS hire 신입 through 공채 with language-agnostic coding tests rather than stack lists. Bank and SI postings center on Java + Oracle + 전자정부프레임워크 or proprietary frameworks (ProFrame).

### Cited Findings
**토스 (비바리퍼블리카 and affiliates)**
- 토스페이먼츠 Server Developer (3년 이상). 우대: "Java 기술 생태계 (Kotlin/Spring/JPA)에 대한 이해도와 엔지니어링 역량(OOP/TDD/Refactoring)", "Redis와 Kafka를 사용한 경험", and "RDBMS에 대한 높은 이해도". Stack: Java, Kotlin, Gradle, Spring MVC/Webflux/Batch, JPA, Spring Cloud Gateway/Config, Netty, MySQL, Redis, ElasticSearch, Kafka, Oracle. The posting has no hard-requirement list. The "이런 분과 함께하고 싶어요" section emphasizes growth mindset and "주어진 비즈니스에 대한 이해가 빠르고, 이에 필요한 시스템의 설계가 가능하신 분". — [토스 채용](https://toss.im/career/job-detail?job_id=5028079003)
- 토스증권 Server Developer (5년 이상): "Java/Kotlin, Spring Framework에 능숙하신 분". 우대: Redis/Kafka/ELK operations, multi-layer troubleshooting, and 실시간 데이터 처리. — [원티드 토스증권](https://www.wanted.co.kr/wd/204287)
- 토스뱅크 Server Developer: "Java 혹은 Kotlin으로 Spring Framework 기반의 서비스를 개발한 경험". The 계정계 role adds DB design (Oracle/MySQL) and 트랜잭션/유량제어. 우대: 대용량 트래픽, Redis, and Kafka. 토스뱅크 also ran a **2025 하반기 신입채용 for Server Developer**. — [원티드 토스뱅크](https://www.wanted.co.kr/wd/203977); [토스 계정계](https://toss.im/career/job-detail?job_id=5939812003); [링커리어 토스뱅크 2025 하반기 신입](https://linkareer.com/activity/263236)

**배달의민족 (우아한형제들)**
- 그로스 프로덕트팀 (2025-09-18; 경력 5~10년): Java or Kotlin + Spring Boot + JPA required. 우대: 대용량 트래픽 architecture and performance improvement. — [직행](https://zighang.com/recruitment/9a210b88-a097-4f0a-a444-23a80028eb7a)
- 배민공통서비스개발팀 (2025-10-01): Java, Kotlin, Spring, JPA, gRPC. 우대: 7년+ experience and AWS high-traffic operations. — [직행](https://zighang.com/recruitment/bfc89828-b8c5-491e-a2d9-baef444500e5)
- CS 프로덕트실 (closing 2025-12-20 per one board): Java/Kotlin + Spring web apps, ORM (JPA/Hibernate), and MSA understanding. Experience requirement is listed as 7년+ on one board and 5년+ on another, which conflict. — [원티드](https://www.wanted.co.kr/wd/254673); [비즈니스피플](https://www.bzpp.co.kr/biz/businessDetailView/BR241121A00227)
- 검색플랫폼팀: 5년+ Elasticsearch/Solr at high traffic. — [직행](https://zighang.com/recruitment/9e1f5d21-8e54-401f-851c-c9b131f3460f)
- Context: 배민 announced plans to hire 300+ developers. This is an older SBS Biz article whose date was not verified. — [SBS Biz](https://biz.sbs.co.kr/article/20000052579)

**카카오 계열**
- 카카오페이 (2025 경력 서버 개발자, July 2025): JVM-language server development and 장애 대응 required. OOP/MSA code-quality application is a plus. — [링커리어](https://linkareer.com/activity/255993)
- 카카오페이 머니서비스: 5년+, with rich Java/Kotlin and Spring experience. Also listed: Spring Boot/Cloud MSA design, 장애 복구 scenarios, and RDBMS query and index tuning. — [비즈니스피플](https://www.bzpp.co.kr/biz/businessDetailView/BR251119A00262)
- 카카오페이 마이데이터: 5년+, Kotlin + Spring. Preferred: MSA, Docker, Kubernetes. — [카카오페이 채용](https://kakaopay.career.greetinghr.com/en/be-mydata)
- 카카오스타일 백엔드 (파트너시스템) asks for 5년+. 카카오모빌리티 backend asks for 3년+. These come from search-result excerpts. — [비즈니스피플 카카오스타일](https://www.bzpp.co.kr/biz/businessDetailView/BR250131A00139); [카카오모빌리티 인재영입](https://kakaomobility.career.greetinghr.com/ko/guide)
- 카카오뱅크 금융회계 시스템 백엔드 (closed): Java/Spring Boot, Oracle/MySQL, 1년+ IT development and operations. — [인디스워크](https://inthiswork.com/archives/327668)

**당근**
- 당근페이: 3년+ server development, Kotlin/Spring Boot JVM environment, system design interview. 당근페이 머니 서비스 (Java/Kotlin): 5년+, remittance and payment domain. — [당근 채용](https://about.daangn.com/jobs/4511184003/); [직행](https://zighang.com/recruitment/cb0bec3a-1a16-4052-96c3-fbfd2b8d61a8)
- 인프라 (공통 서비스, 콘텐츠 서빙): Kotlin and Go, plus Kubernetes, GCP, AWS. 5년+ "또는 이에 준하는 역량"; the posting says that even without the stack, "문제 해결력이 있다면 빠르게 적응 가능". — [당근 채용](https://careers.daangn.com/jobs/role/7644271003/)
- 부동산: one or more of TypeScript, Go, Java, Kotlin, Python, Ruby; 산업기능요원 eligible. — [당근 채용](https://careers.daangn.com/jobs/role/5296522003/)
- 신입 roles exist: Backend (신입) for 피드 ML Data Platform, and 전환형 인턴 for 커뮤니티 (Kotlin/Java + Spring). — [당근 피드](https://careers.daangn.com/jobs/role/5823087003/); [freehire 당근 커뮤니티 인턴](https://freehire.me/jobs/software-engineer-backend-jeonhwanhyeong-inteon-keomyuniti-danggeunmakes-lssewnam)

**쿠팡**
- The postings found are mostly Staff, Senior, or Director level. Requirements range across postings from "Java or Kotlin 을 활용한 소프트웨어 설계 및 개발 경력 3년 이상" to 5년+ professional experience, with 8년+ at Staff, 6년+ backend architecture at 쿠팡페이 Staff, and 15년+ at Director. Common threads are Java/Kotlin + Spring, large distributed systems, MSA, and a bachelor's degree at 쿠팡페이. No 신입 backend posting was found. — [원티드 쿠팡페이 Staff](https://www.wanted.co.kr/wd/199916); [Dreamwork Coupang Staff (Core Member & Infra Platform)](https://www.dreamworkhq.com/job/8f8bdde1-25e2-4bc7-9cfd-0242ca44ce85); [Dreamwork Coupang Senior L5](https://www.dreamworkhq.com/job/e597d14e-3ab0-4ff6-8e8f-961b094482f2); [onda Director, Back-end Engineering](https://onda.im/jobs/9DWYYzWV)

**네이버**
- 2025 팀네이버 신입 공채 (Tech). Eligibility: graduating by Feb 2026 (학사/석사, 전공 무관) or already graduated with ≤1 year of experience; candidates with more than 1 year of cumulative experience are excluded. The coding test allows C, C++, Java, JavaScript, Python3, Swift, or Kotlin. No Spring requirement is listed. — [NAVER Careers 2025 팀네이버 신입 공채](https://recruit.navercorp.com/micro/teamnaver2025/tech); [잡플래닛](https://www.jobplanet.co.kr/contents/news-7177)

**SI 대기업 (삼성SDS, LG CNS)**
- LG CNS 2025 하반기 신입 included a DX Engineer (Front-end/Back-end Engineer) track. Eligibility: 학사 이상, 전공 무관, "IT 기본 역량 보유". — [링커리어 LG CNS 2025 하반기](https://linkareer.com/activity/265501)
- 삼성SDS and LG CNS ran 하반기 신입 공채 at the same time. Software-track applicants take a practical SW 역량 테스트 instead of the GSAT, and 생성형 AI 활용 역량 is evaluated in 코딩형 and 기획형 forms. The article year was not confirmed. — [시사저널e](https://www.sisajournal-e.com/news/articleView.html?idxno=423616)
- 삼성SDS and LG CNS reportedly reduced new hiring while strengthening internal AI capability. A search excerpt also attributed a figure of 2,107 new hires at 삼성SDS in 2024, but which source carries it is uncertain. — [SR타임스](http://www.srtimes.kr/news/articleView.html?idxno=182335)

**금융권 / SI vendors**
- 금융 SI (애니링커): "java / sql / Unix / Oracle /전자정부프레임워크". 경력 requires "SI분야 개발 프로젝트 경험 2년이상". — [더팀스](https://www.theteams.kr/recruit/wanted/1909901)
- 신한투자증권 차세대 (SI vendor 새한정보): C, Git, JAVA, Oracle, Pro-C, ProFrame; 3년+. — [직행](https://zighang.com/recruitment/f9307885-e16c-40c9-acc9-80fd7a64ed6f)
- [HISTORICAL] 공공기관 SI (2021): 전자정부프레임워크 + Oracle, 3~8년. — [사람인 하이퍼테크](https://www.saramin.co.kr/zf_user/jobs/view?rec_idx=39443034)
- Community advice: most 금융권 대기업 and major SI firms run coding tests. — [링커리어 커뮤니티](https://community.linkareer.com/STEM_mentoring/4668624)

### Inferences
- The "Korean big-tech backend template" is remarkably uniform: **Java/Kotlin + Spring Boot + JPA + MySQL, with Redis/Kafka/대용량 트래픽/MSA/AWS·K8s as 우대**. Differentiation shows up in domain needs, such as 트랜잭션/유량제어 at banks, Elasticsearch on search teams, and Go on 당근 infra and ML platform, rather than in the core stack.
- 토스 and 당근 explicitly downplay stack prerequisites in some postings. 토스페이먼츠 puts the Spring/JPA ecosystem under "더 좋아요", and 당근 infra says problem-solving ability lets candidates adapt. This suggests top-tier firms screen more on fundamentals and system design than on stack checklists.

### Gaps
- No current (2025–2026) backend posting text was retrieved for **네이버 경력, 카카오 (본사), 라인/LY, 삼성SDS, SK (SK C&C / SK AX), 현대오토에버**, or banks such as KB, 신한, and 하나. Their career pages are mostly JS-rendered, and search did not surface posting text.
- Posting dates and open or closed status were not verifiable for many examples. Several are explicitly closed (배민 B마트, 카카오뱅크 금융회계).

---

## Q5. How do requirements differ between 신입/주니어 and 경력, and across 대기업 / IT 대기업 / 스타트업 / SI·금융권?

### Takeaway
The Korean backend market in 2025 is heavily skewed toward experienced hires. In H1 2025, only **0.8% of developer postings targeted 신입**, but **29.5% of applications came from 신입**. 5–10년 experience was the largest posting band at **39.7%**. Large and IT companies' backend postings are mostly 3–5년+. 신입 entry runs mainly through 공채 (네이버, LG CNS, 삼성SDS, 토스뱅크) that test fundamentals and coding, not stack lists. Startups vary the most in stack (TypeScript, Python, PHP) and increasingly ask for AI-tool-assisted shipping ability. 금융/SI requires Java + Oracle + frameworks such as 전자정부프레임워크 and ProFrame.

### Cited Findings
- **Experience-level skew (H1 2025, 사람인+점핏, ~100,000 postings).** Posting share by required experience: **5~10년 39.7%**, 1년 1.4%, 2년 2.3%, **신입 0.8%**. Application share: **신입 29.5% (#1)**, 1년 10.9%, 2년 10.4%. — [이투데이, 2025-08-27](https://www.etoday.co.kr/news/view/2500510)
- **원티드 2026 survey (2025-12-08).** The focus hiring band is **4~7년차, at 49.7%** of companies. — [전자신문, 2025-12-08](https://www.etnews.com/20251208000036)
- **원티드 2025 survey (2024-12-23)** reported a deepening preference for 경력직 (headline: "경력직 선호 현상 심화"). — [전자신문, 2024-12-23](https://www.etnews.com/20241223000072)
- **Crawler sample of 원티드 backend postings** (RBYE; 30 of 587 shown; data date not given): 0 postings tagged 신입 apart from 1 internship, 10 tagged "3년 이상", 4 "5년 이상", 2 "7년 이상", 1 each for 8, 10, and 13년+, 2 "시니어", and 7 untagged. — [RBYE](https://rbye.vercel.app/t/server)
- **What changes with seniority.** In the same crawler sample:
  - Interns and juniors are asked for JS/TS, Git, web fundamentals, and the ability to explain AI-generated code.
  - 3년+ roles ask for production backends with async, retry, and idempotency design.
  - 5년+ roles ask for API design, 장애 대응, and legacy restructuring.
  - 7년+ roles ask for MSA and query optimization.
  - 8–10년+ roles ask for architecture direction, Tech Lead, and organizational leadership.
  - 13년+ roles ask for designing large-scale data pipelines from scratch.

  — [RBYE](https://rbye.vercel.app/t/server)
- **신입 공채 at large firms is stack-agnostic.** 네이버 accepts multiple coding-test languages and has no stack requirement. LG CNS asks for "IT 기본 역량". 삼성SDS and LG CNS use practical SW tests instead of the GSAT. — [NAVER Careers](https://recruit.navercorp.com/micro/teamnaver2025/tech); [링커리어 LG CNS](https://linkareer.com/activity/265501); [시사저널e](https://www.sisajournal-e.com/news/articleView.html?idxno=423616)
- **Junior roles at IT companies still name the JVM stack.** 당근 커뮤니티 전환형 인턴 asks for familiarity with Kotlin/Java + Spring, with 1+ year of owning a service preferred. 카카오뱅크 금융회계 backend accepts 1년+. — [freehire 당근 인턴](https://freehire.me/jobs/software-engineer-backend-jeonhwanhyeong-inteon-keomyuniti-danggeunmakes-lssewnam); [인디스워크 카카오뱅크](https://inthiswork.com/archives/327668)
- **Hiring-mode shift.** 공채 is shrinking and 상시채용 expanding. 신입 applicants often fail the document screen for lack of project experience. These points come from a secondary career-blog summary, not primary data. — [Prime Career](https://prime-career.com/article/11269)
- **SI·금융권 vs tech.** SI and finance postings name concrete legacy frameworks and DBs (전자정부프레임워크, ProFrame, Pro-C, Oracle, Unix) and count "SI 프로젝트 경험" years. Tech companies name Spring Boot/JPA/Kafka and emphasize traffic and scale. — [더팀스 애니링커](https://www.theteams.kr/recruit/wanted/1909901); [직행 새한정보](https://zighang.com/recruitment/f9307885-e16c-40c9-acc9-80fd7a64ed6f); [토스 채용](https://toss.im/career/job-detail?job_id=5028079003)
- **Startups.** Sampled startup postings show the widest stack diversity: NestJS/Prisma/PostgreSQL, Python production backends, PHP/Laravel, and AI-tool-built products. "연차보다 출시 실적" (shipping record over years of experience) is stated explicitly by one 2–5년 posting (로이드케이). — [RBYE](https://rbye.vercel.app/t/server)
- **Salary context.** A secondary blog gives 신입 average roughly 3,000–3,500만원 and mid-level roughly 4,000–6,000만원, without citing a source. Treat as low-confidence. — [Prime Career](https://prime-career.com/article/11269)

### Inferences
- 신입 backend candidates face a severe supply-demand mismatch: 0.8% of postings against 29.5% of applications in H1 2025. 서버/백엔드 is also the most-applied-to role overall, at 23.5% of applications. The realistic 신입 paths are 대기업/IT 공채, which test CS and coding, plus internship-to-hire tracks (당근 전환형 인턴).
- Seniority changes the requirement axis. Juniors are screened on fundamentals and one stack. Mid-level (3–7년) candidates are screened on the Spring/JPA/RDBMS + Redis/Kafka toolkit and on 대용량 트래픽/장애 대응 experience. Senior and Staff candidates are screened on distributed-system and MSA architecture and on leadership.
- 금융/SI is the segment where specific legacy tools (Oracle, 전자정부프레임워크, ProFrame) work as hard filters. IT companies treat specific tools more loosely and focus on scale and engineering practice.

### Gaps
- I found no breakdown of backend-only postings by experience level. The 0.8% 신입 figure covers all developer postings. I also found no breakdown by company type (대기업 vs 스타트업 vs SI).
- The "경력 채용 30.5% increase" figure on Prime Career has no identifiable source or timeframe, so it is excluded as unverified. — [Prime Career](https://prime-career.com/article/11269)
- I found no 2026 H1 equivalent of the 사람인/점핏 개발자 채용 시장 현황 report, so it is unclear whether the 신입 share changed in 2026.
