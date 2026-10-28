# 한국 클라우드/인프라/DevOps/SRE/플랫폼 엔지니어 채용 요구사항 (2025–2026)

> Research date: 2026-10-18. All statistics are labeled with source + date. "Search-snippet" means the claim came from a search-result summary and the underlying page was not fetched directly; treat as lower confidence.

## Q1. Which cloud providers are demanded, in what proportion? How do CSAP and 공공 클라우드 전환 affect domestic-cloud demand?

### Takeaway
I found no source that counts cloud providers across Korean job postings. Usage surveys and the postings I sampled point the same way: AWS is the default skill in the private sector (60.2% of cloud-using firms, and the main provider for 51.5%, per a 2023 survey). 네이버클라우드 is the clear #2 domestic platform. KT Cloud and NHN Cloud matter mostly for the public sector, where the three domestic CSPs hold about 80%. Since global CSPs got CSAP "하" grades (MS 2024-12, Google 2025-02, AWS 2025-03-28), AWS skills also apply to low-sensitivity public systems. The "중/상" grades remain effectively domestic, which keeps NCP/KT/NHN skills relevant for 공공 SI/MSP roles.

### Cited Findings
**Market usage (proxy for posting demand)**
- From 과기정통부 "2023년 부가통신사업 실태조사", cited 2025-04-16, cloud usage rate by provider (multiple response): AWS 60.2%, MS Azure 24.0%, 네이버클라우드 20.5%, Google GCP 19.9%, Oracle 8.2%, KT 8.2%, NHN 7.0%, 삼성SDS 1.2% — [IB토마토, 2025-04-16](https://newstomato.com/ReadNews.aspx?no=1258941)
- Main ("주 이용") provider share in the same article: AWS 51.5%, 네이버클라우드 11.7%, GCP 8.8%, Azure 8.2%, KT 5.3%, NHN 2.3%, 삼성SDS 0.6%. The article does not say which survey this figure comes from. "서비스 품질 우수성" was the top reason for choosing a provider (41.5%) — [IB토마토, 2025-04-16](https://newstomato.com/ReadNews.aspx?no=1258941)
- A separate report put AWS at a 60% share of the Korean cloud market (2023 basis) — [세계일보, 2025-02-16](https://www.segye.com/newsView/20250216507313) (search-snippet; likely the same 2023 survey figure)
- A 공정위 cloud market survey (32 CSPs; about 3,000 customers and partners) found the market concentrated in specific global firms, with Google's and Naver's shares (#3–4) growing. It also found technical-compatibility and data-migration barriers to switching or multi-homing. The search snippet showed no exact percentages and no survey year — [IT World](https://www.itworld.co.kr/article/3558637/) (search-snippet)

**Public sector / CSAP**
- 네이버클라우드, KT클라우드 and NHN클라우드 together hold "약 80%" of the public cloud market — [아이뉴스24, 2025-04-02](https://www.inews24.com/view/1829903)
- CSAP "하" grade awards: MS Azure in 2024-12, Google Cloud in 2025-02, AWS on 2025-03-28. All of the global Big 3 can now bid on low-sensitivity public systems — [아이뉴스24, 2025-04-02](https://www.inews24.com/view/1829903)
- CSAP has had three tiers since 2023, run by KISA. "하" covers public systems with no personal data, "중" covers internal systems with work data, and "상" covers national security and diplomacy systems. BSA has asked the government to open "중/상" to global firms — [IB토마토, 2025-04-16](https://newstomato.com/ReadNews.aspx?no=1258941)
- USTR's report (2025-03-31) argued that only CSPs with CSAP "중" or higher can meaningfully join government digital transformation, and pressed Korea to open that tier. 국정원 N2SF classifies government data as C (기밀), S (민감) and O (공개). Industry expects large-scale public migration only after the "O"-tier classification is settled — [아이뉴스24, 2025-04-02](https://www.inews24.com/view/1829903)
- 국가 AI 컴퓨팅센터 project: proposals opened May 19 (2025), total budget projected up to 5조원, 51% of it public resources — [IB토마토, 2025-04-16](https://newstomato.com/ReadNews.aspx?no=1258941)

**What postings show (sampled, not a count)**
- Every 토스 group infra posting I sampled names AWS. 토스플레이스 SRE and DevOps require "AWS 등 Public Cloud에서 Kubernetes 기반 프로덕션" experience. 토스페이먼츠 SRE lists AWS and OpenStack in its stack — [Remember: 토스플레이스 SRE](https://career.rememberapp.co.kr/job/posting/330118); [Wanted: 토스플레이스 DevOps](https://www.wanted.co.kr/wd/322625); [Remember: 토스페이먼츠 SRE](https://career.rememberapp.co.kr/job/posting/253702)
- 부릉 DevOps (closes 2026-10-28) asks for AWS (EKS, EC2, S3, RDS, CloudFront, Lambda) — [Wanted 389174](https://www.wanted.co.kr/wd/389174)
- 카카오엔터프라이즈 KakaoCloud 기술지원 engineer requires "클라우드 인프라 구축·운영 경험 (OpenStack, AWS, GCP, Azure 등)". Public-cloud architecture and migration experience is preferred — [Remember 259789](https://career.rememberapp.co.kr/job/posting/259789)

### Inferences
- AWS skills are the default currency for private-sector infra/DevOps/SRE hiring. GCP and Azure appear mainly as alternates in "AWS, GCP, Azure 등" lists.
- For 공공·SI·MSP roles, NCP/KT/NHN experience still has value: the three domestic CSPs hold about 80% of public cloud, and the "중/상" CSAP tiers remain closed to global CSPs in practice. Demand for domestic-cloud skills is concentrated in public-sector projects rather than spread across the market.
- "이용률" (multiple response) is not revenue share. The 60% AWS figure measures adoption, not spend.

### Gaps
- I found no 원티드/점핏/사람인/잡코리아 count of postings by cloud provider (e.g., "% of DevOps postings mentioning AWS vs NCP").
- I found no 2024–2026 update to the 공정위 market-share percentages, and no NIPA breakdown of public-sector cloud spend by CSP.
- I found no data on how many public-sector postings explicitly require NCP/KT/NHN experience.

---

## Q2. Which tools dominate (K8s/EKS, Docker, Terraform, Ansible, ArgoCD, Helm, CI tools, Istio, observability stack, Linux/networking)?

### Takeaway
Across the sampled Korean postings, Kubernetes is close to universal for DevOps/SRE roles, usually on AWS (EKS). The other recurring items are IaC (Terraform named explicitly, or "IaC" generically), GitOps with ArgoCD, and the Prometheus/Grafana family (plus Datadog and ELK). Service mesh (Istio) is a strong 토스-group signature. Linux and networking fundamentals (TCP/IP, DNS, LB, firewall) remain hard requirements, especially at CSP/MSP and 기술지원 roles. Fintech SRE roles also often require backend coding (Java/Kotlin/Spring).

### Cited Findings
- **토스플레이스 SRE (7–15년):**
  - Stack: AWS, Kubernetes, Istio, Podman, Containerd; Prometheus, Thanos, Grafana, Chaos Mesh; Git, GoCD, ArgoCD, Vault; Java/Kotlin/Spring, Kafka, Redis, Elasticsearch.
  - Requirements: production-code ability in one or more languages, SLI/SLO definition, and K8s production troubleshooting on public cloud.
  - Preferred: Error Budget, Post-mortem, Istio traffic analysis, Fault Injection.
  - Source: [Remember 330118](https://career.rememberapp.co.kr/job/posting/330118)
- **토스플레이스 DevOps Engineer (6–15년, 상시):** multiple AWS K8s clusters plus an Istio service mesh, capacity planning, CI/CD and GitOps, "IaC 및 Policy as Code", self-service platform tools, and Observability (metric/log). Candidates must trade off "안정성, 성능, 보안, 비용" — [Wanted 322625](https://www.wanted.co.kr/wd/322625)
- **토스뱅크 DevOps Engineer:** K8s + Istio cluster operations, build/deploy system, monitoring, HA architecture, and "보안과 규제를 준수하는 시스템". Preferred: K8s/Istio and on-premise operations. Hiring process: 서류 → 사전 과제 → 직무 인터뷰 → 문화적합성 → 레퍼런스 체크 — [Remember 155696](https://career.rememberapp.co.kr/job/posting/155696)
- **토스페이먼츠 SRE:**
  - Requirements: Java/Kotlin + Spring, performance testing and bottleneck resolution, "리눅스 및 네트워크 시스템에 대한 깊은 이해", and MSA/K8s/Istio/Redis/Kafka/ELK operations.
  - Stack: AWS, OpenStack, GoCD, ArgoCD, Jenkins.
  - Source: [Remember 253702](https://career.rememberapp.co.kr/job/posting/253702)
- **부릉 DevOps (5년+, closes 2026-10-28):** AWS EKS, Docker/K8s, Terraform, Jenkins/ArgoCD/GitHub Actions, Datadog/Prometheus/Grafana/ELK, and Python/Shell/Go automation. Also covers SLI/SLO dashboards, FinOps cost visibility, internal platform tools and post-mortems — [Wanted 389174](https://www.wanted.co.kr/wd/389174)
- **카카오엔터프라이즈 KakaoCloud 기술지원 (마감):**
  - Requirements: Linux (RHEL/CentOS/Ubuntu) 5y+, cloud 2y+, "TCP/IP, DNS, 방화벽, 로드밸런서" knowledge, and Linux kernel/network troubleshooting.
  - Preferred: K8s/Docker, Prometheus/Grafana, scripting, and TAM / CSP SE / MSP experience.
  - Source: [Remember 259789](https://career.rememberapp.co.kr/job/posting/259789)
- **앤서스랩코리아 SRE/DevOps (8년+):** multi-cloud, IaC (Terraform, Packer, Helm), CI/CD and K8s — [Remember 293522](https://career.rememberapp.co.kr/job/posting/293522) (search-snippet)
- **안랩 XDR 클라우드 DevOps/SRE:** K8s-based deploy and operations, Terraform/Ansible IaC. Prometheus/Grafana preferred — via search result (likely [inthiswork](https://inthiswork.com/?p=397172)); search-snippet, URL not verified
- **우아한형제들 플랫폼엔지니어링 (배포시스템, 10년+):** trade-offs in large K8s-based deployments, plus a Harbor-based company-wide container registry. EKS and Terraform are not mentioned — search-snippet from a 우아한형제들 query (specific posting URL not verified; candidates [Wanted 368834](https://www.wanted.co.kr/wd/368834))
- **쿠팡 security architecture posting:** AWS EKS, K8s multi-tenancy, CI/CD security integration — search-snippet ([Coupang jobs link](https://www.coupang.jobs/jp/jobs/8081147/sr-staff-backend-engineer-core-member-infra-platform-team/) returned 404 on fetch 2026-10-18)
- **LINE (LY) Verda private cloud SRE, Japan-based posting:**
  - Platform: an OSS cloud on OpenStack and K8s.
  - Requirements: 3y+ server-side SWE (C/Go/Python), day-2 operations, and network/storage/virtualization knowledge.
  - Preferred: OpenStack/K8s operations and OSS troubleshooting.
  - A 2022-12 posting described 50k+ physical servers (older data).
  - Source: [TokyoDev LINE SRE](https://www.tokyodev.com/companies/line/jobs/site-reliability-engineer-private-cloud-platform/); [LINE careers SRE](https://careers.linecorp.com/jobs/2621) (SLO/error budget, 24x7 on-call, incident commander)

### Inferences
- Tool frequency in my 10-posting sample (qualitative, not a statistical count):
  - Kubernetes ~10/10
  - AWS ~7/10
  - ArgoCD/GitOps ~5
  - Prometheus/Grafana ~5
  - Istio 4 (all 토스 group)
  - Terraform explicitly 4, plus generic "IaC" 2
  - Jenkins/GoCD/GitHub Actions ~4
  - ELK 2
  - Datadog 1
  - Ansible 1, Helm 1
  - OpenStack 3 (토스페이먼츠, 카카오엔터, LINE)
  - Backstage 0, OpenTelemetry 0, Loki 0
- Treat this tally as indicative only.
- The senior-SRE bar at 토스 is "SWE who does reliability": SLO and error budgets, chaos engineering and production coding. It is not a "server-admin" role.
- Ansible appears less often than Terraform in product-company postings. It is more likely in SI/MSP/on-prem contexts. That is an inference: I found no MSP posting text to confirm it.

### Gaps
- I found no Korean quantitative skill-frequency analysis (e.g., crawled 원티드 DevOps postings).
- Global stats exist but are unverified. One LinkedIn post claimed "Terraform 88%" of DevOps postings with no disclosed method, so I excluded it as low quality.
- I could not retrieve current 네이버, 카카오 (본사), 당근, 쿠팡 (full text) or 우아한형제들 (full text) infra postings. Searches did not surface them, and company career sites were not fetched.
- I found no evidence on OpenTelemetry or Loki adoption in Korean postings.

---

## Q3. Emerging themes: platform engineering/IDP, FinOps, DevSecOps, multi-cloud/hybrid, GPU/AI infra, LLMOps

### Takeaway
Platform engineering, FinOps and policy/security-as-code now appear as explicit duties in Korean DevOps postings, though no posting I found names Backstage. Hybrid setups (AWS + OpenStack/on-prem) are common at fintech and CSPs. The strongest 2025–26 shift is GPU/AI infrastructure: MSPs (메가존, 베스핀, 메타넷엑스) are repositioning as "AI 인프라 허브", MSP training now includes GPU/CUDA/MLOps modules, and AI-native firms (42dot) hire for K8s + Slurm GPU clusters.

### Cited Findings
- **Platform engineering / IDP:**
  - 토스플레이스 DevOps requires DevOps "또는 Platform Engineering" roadmap experience and includes building "Self-service 도구와 플랫폼" so developers can do infra work themselves — [Wanted 322625](https://www.wanted.co.kr/wd/322625)
  - 부릉 DevOps includes "개발팀 생산성 향상을 위한 내부 플랫폼·도구 개발" — [Wanted 389174](https://www.wanted.co.kr/wd/389174)
  - 우아한형제들 runs a team named 플랫폼엔지니어링 (배포시스템) — search-snippet (see Q2)
- **Backstage:** I found no Korean company case and no posting naming it. Globally, Spotify says 3,000+ companies have built IDPs on Backstage — [Backstage for All (Spotify)](https://backstage.spotify.com/learn/backstage-for-all)
- **FinOps / cost:**
  - 부릉 lists "클라우드 비용 가시성 확보 및 FinOps 기반 비용 최적화" as a core duty — [Wanted 389174](https://www.wanted.co.kr/wd/389174)
  - 토스플레이스 DevOps requires stability/performance/security/**cost** trade-off decisions — [Wanted 322625](https://www.wanted.co.kr/wd/322625)
  - 토스페이먼츠 SRE prefers "비용 효율적인 시스템 구성 경험" — [Remember 253702](https://career.rememberapp.co.kr/job/posting/253702)
- **DevSecOps / 규제:**
  - 토스플레이스 DevOps: "IaC 및 Policy as Code" — [Wanted 322625](https://www.wanted.co.kr/wd/322625)
  - 토스뱅크 DevOps requires "보안 및 규제 준수에 대한 이해" — [Remember 155696](https://career.rememberapp.co.kr/job/posting/155696)
  - 토스플레이스 SRE stack includes Vault — [Remember 330118](https://career.rememberapp.co.kr/job/posting/330118)
  - 쿠팡 security-architecture role covers EKS multi-tenancy and CI/CD security — search-snippet
  - Security staff are 14.1% of Korea's cloud workforce (2024 basis) — [경기일보, 2026-03-30](https://www.kyeonggi.com/article/20260330580494)
- **Multi-cloud / hybrid:**
  - 토스페이먼츠 runs AWS + OpenStack — [Remember 253702](https://career.rememberapp.co.kr/job/posting/253702)
  - 토스뱅크 prefers on-premise experience — [Remember 155696](https://career.rememberapp.co.kr/job/posting/155696)
  - 앤서스랩 requires multi-cloud — [Remember 293522](https://career.rememberapp.co.kr/job/posting/293522) (search-snippet)
  - 공정위 found switching and multi-homing barriers (compatibility, data migration) — [IT World](https://www.itworld.co.kr/article/3558637/) (search-snippet)
- **GPU / AI infrastructure:**
  - Korea's three big MSPs (메가존클라우드, 메타넷엑스, 베스핀글로벌) are pivoting from cloud management to "AI 인프라 허브"/AX. Reported results for "last year" (2025):
    - 메가존클라우드: revenue 1조7,496억원, operating profit 2억원 (vs. a 340억원 loss in 2024); R&D 236억원.
    - 베스핀글로벌: revenue 5,429억원 (+17.1%), operating loss 29억원; launched "헬프나우 AI 파운드리".
    - 메타넷엑스: revenue 5,541억원 (+11.9%); offers end-to-end AI-native infra services; postponed its IPO because AX is not yet monetized.
    - Source: [MTN, 2026-04-23](https://news.mtn.co.kr/news-detail/2026042215434561189)
  - 메가존클라우드 announced 100 AI hires (80 경력 + 20 신입); 신입 = graduates or ≤1 year experience — [바이라인네트워크, 2025-05-15](https://byline.network/2025/05/15-455/)
  - 42dot AI Infrastructure Engineer: runs thousands of GPUs across multiple data centers with Kubernetes and Slurm; GPU quota management and ML-researcher support — [choppingblock (42dot posting)](https://www.choppingblock.ai/jobs/ai-infrastructure-engineer-at-42dot-6dc5d)
  - 메가존클라우드 KDT cloud-engineer bootcamp (application window 2026-08-28 to 10-01) includes a "GPU and AI infrastructure" module (NVIDIA GPU, CUDA, Hugging Face, Ollama, FastAPI) and an MLOps module (SageMaker, Terraform, GitLab CI/CD) — [TheTeams, Megazone bootcamp](https://www.theteams.kr/activities/page/346493/le)
- **Market context:**
  - Korea's cloud revenue was 9조2,609억원 in 2024 (+25.2% YoY). The article credits generative-AI demand.
  - CMS/MSP revenue grew fastest (+31.4%), and the number of CMS firms rose 47.9% to 139.
  - Source: 과기정통부·NIPA 2025 클라우드 산업 실태조사, released 2026-03-27 — [경기일보, 2026-03-30](https://www.kyeonggi.com/article/20260330580494)

### Inferences
- In Korean postings, "platform engineering" mostly shows up as a duty inside DevOps roles (self-service, GitOps, internal tools), not yet as a separate "Platform Engineer + Backstage" title.
- MSP growth (+31.4% revenue, +47.9% firms) and the AX pivot suggest the next wave of MSP hiring will favor engineers who combine K8s/IaC with GPU scheduling and MLOps.
- I found no Korean posting using the term "LLMOps".

### Gaps
- I found no Korean count of postings mentioning FinOps, Backstage, DevSecOps or GPU.
- I found no LLMOps-titled Korean posting.
- I found no CNCF survey data for Korea specifically.

---

## Q4. How valued are certifications (AWS SAA/SAP, CKA/CKAD, 정보처리기사, 리눅스마스터, 네트워크관리사, NCP)?

### Takeaway
None of the 10 Korean product-company postings I sampled names a certification as required or preferred. They screen on production experience, and 토스 asks for 사전 과제 and evidence of the problems you solved. Certifications show up in three places: 신입/전환 entry (AWS SAA is the most-recommended single cert), MSP/training ecosystems (vouchers, 자격증 수당), and domestic-cloud vendor tracks (NCA/NCP). 정보처리기사 is common among applicants but rarely a differentiator.

### Cited Findings
- None of the sampled 토스/부릉/카카오엔터프라이즈 postings lists a certification in requirements or preferences. The 카카오엔터프라이즈 posting explicitly has none — [Remember 259789](https://career.rememberapp.co.kr/job/posting/259789); [Wanted 389174](https://www.wanted.co.kr/wd/389174); [Remember 330118](https://career.rememberapp.co.kr/job/posting/330118)
- 토스뱅크 asks candidates to describe "해결한 문제, 방법, 결과" and "기술적 의사결정 과정", and adds a 사전 과제 step — [Remember 155696](https://career.rememberapp.co.kr/job/posting/155696)
- Practitioner advice on 코멘토 (community Q&A, not postings):
  - Take AWS SAA before 리눅스마스터 2급. SAA covers VPC/EC2/S3/IAM and architecture, so it works as a baseline proof for majors.
  - 정보처리기사 is "필수는 아니지만 가지고 계신 분들이 많은" baseline.
  - Several answers say project depth (Linux, networking, Docker, basic Terraform/K8s) matters more than more certs.
  - Source: [코멘토 Q&A: 대기업 클라우드 직무 자격증](https://comento.kr/job-questions/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/%EB%8C%80%EA%B8%B0%EC%97%85_%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C_%EC%A7%81%EB%AC%B4%EB%8A%94_%EC%9E%90%EA%B2%A9%EC%A6%9D%EC%9D%B4_%ED%95%84%EC%88%98%EC%A0%81%EC%9D%B8%EA%B0%80%EC%9A%94-549804); [코멘토: 백엔드/클라우드 AWS 자격증](https://www.comento.kr/job-questions/모든회사/모든직무/백엔드클라우드_쪽%20지망하고%20있는데%20aws%20자격증-615173)
- One cloud-engineer posting offers a 자격증 수당 benefit (3년+ experience, AWS/GCP) but names no specific certification as preferred — [Remember 240301](https://career.rememberapp.co.kr/job/posting/240301) (search-snippet)
- 메가존클라우드 KDT bootcamp provides vouchers for AWS and GCP certifications — [TheTeams, Megazone bootcamp](https://www.theteams.kr/activities/page/346493/le)
- 네이버클라우드 certifications have tiers NCA (entry) and NCP (professional), plus NCE. There is no eligibility restriction — [geteduify NCP guide](https://geteduify.com/career-guidance/%eb%84%a4%ec%9d%b4%eb%b2%84%ed%81%b4%eb%9d%bc%ec%9a%b0%eb%93%9c-%ec%9e%90%ea%b2%a9%ec%a6%9d-%ec%a2%85%eb%a5%98-%ec%99%84%eb%b2%bd-%ec%a0%95%eb%a6%ac-nca-ncp-nce-%ec%b0%a8%ec%9d%b4%ec%a0%90%ec%9d%80/)
- As of 2022-05, 2,188 people held NCA and 676 held NCP (older data) — [아주경제, 2022-05-05](https://www.ajunews.com/view/20220505100004871)
- In a 네이버 클라우드 엔지니어 interview Q&A, a respondent said networking certs (e.g., CCNA) plus cloud knowledge help (individual opinion) — [코멘토 NBP 면접](https://comento.kr/job-questions/naverbusinessplatform/모든직무/네이버_클라우드_엔지니어_직군_면접-321774)

### Inferences
- Certifications act mainly as a screening signal for 신입, career-switchers and MSP/SI roles. MSPs bill partner tiers on certified headcount, which is why they subsidize certs (that billing mechanism is inferred, not sourced here). Certifications carry little weight for experienced hires at product companies.
- NCA/NCP likely has the most value for public-sector or NCP-partner MSP roles. I could not confirm this from posting text.

### Gaps
- I found no posting-level frequency data for AWS SAA/SAP, CKA/CKAD, 리눅스마스터, 네트워크관리사 or 정보처리기사 in Korean infra postings.
- I found no MSP posting text listing certs as preferred (메가존, 베스핀, LG CNS, SK AX, 삼성SDS).

---

## Q5. 신입 entry path: direct 신입 hiring vs. backend/sysadmin first; typical employers

### Takeaway
Product companies (토스, 부릉, 우아한형제들, 카카오엔터프라이즈) hire infra/DevOps/SRE almost entirely as 경력직, typically 5–15 years. Fintech SRE roles at 토스 are effectively backend-engineer roles (Java/Kotlin/Spring required). The realistic 신입 entry points are MSP 공채 (메가존클라우드), IT-service 대기업 공채 (LG CNS; DevOps/시스템 관리자, SE, 네트워크 and 보안 tracks), and 채용연계형 KDT bootcamps. A common path runs MSP/TAM to CSP or product company.

### Cited Findings
- **Experience bars in product-company postings:**
  - 토스플레이스 SRE 7–15년 — [Remember 330118](https://career.rememberapp.co.kr/job/posting/330118)
  - 토스플레이스 DevOps 6–15년 — [Wanted 322625](https://www.wanted.co.kr/wd/322625)
  - 부릉 DevOps 5년+ — [Wanted 389174](https://www.wanted.co.kr/wd/389174)
  - 우아한형제들 플랫폼엔지니어링 10년+ (search-snippet)
  - 앤서스랩 SRE 8년+ — [Remember 293522](https://career.rememberapp.co.kr/job/posting/293522) (search-snippet)
  - 카카오엔터프라이즈 기술지원: Linux 5y+ and cloud 2y+ — [Remember 259789](https://career.rememberapp.co.kr/job/posting/259789)
- **Backend-first expectation:** 토스페이먼츠 SRE requires Java/Kotlin + Spring development — [Remember 253702](https://career.rememberapp.co.kr/job/posting/253702). 토스 SRE hires work as "Server Developer" inside the Tech Platform 트라이브 SRE team — search-snippet from [Wanted 376504](https://www.wanted.co.kr/wd/376504)/Remember results.
- **MSP → CSP path:** 카카오엔터프라이즈 prefers "기술지원(TAM, CSP SE 등) 또는 MSP 업무 경력" — [Remember 259789](https://career.rememberapp.co.kr/job/posting/259789)
- **MSP 신입 공채:** 메가존클라우드 2026 신입 공채 (announced 2025-12-10):
  - Size: "두 자릿수" headcount, no education requirement.
  - Tech jobs: 클라우드 엔지니어, 클라우드 매니지드 서비스 엔지니어, AI·ML 엔지니어, SW 개발자, 데이터 엔지니어, 시큐리티 엔지니어·SOC 분석가.
  - Schedule: applications closed 12-19, interviews January, start March 2026.
  - Source: [바이라인네트워크, 2025-12-10](https://byline.network/2025/12/10-579/)
- **IT 대기업 공채:**
  - LG CNS 2026 하반기 신입 (2026-08-30 to 09-14) listed DevOps/시스템 관리자, 시스템엔지니어(SE), 네트워크엔지니어, 보안 엔지니어, Cloud Application Modernization and Architect — [캐치](https://m.catch.co.kr/NCS/RecruitInfoDetails/568653) (search-snippet)
  - LG CNS 2025 상반기 공채: bachelor's or higher in any major, with a coding test for IT roles — [바이라인네트워크, 2025-03-13](https://byline.network/2025/03/13-476/); [한국경제, 2025-03-13](https://www.hankyung.com/article/202503131253i)
- **Bootcamp pipeline:** 메가존클라우드 채용연계형 KDT cloud-engineer bootcamp:
  - Format: about 20 seats, any major, 2026-09-21 to 2027-02-13, 984 hours (300+ project hours), free with up to 40만원/month allowance.
  - Curriculum: TCP/IP, routing, NAT, Linux and shell, then Docker/K8s, AWS VPC/EC2/RDS, Terraform and GitLab CI/CD.
  - Hiring linkage: top graduates get 서류 면제, internship priority, and priority hiring at group companies and partners. The page claims "20+ affiliates, 300+ new hires per year".
  - Source: [TheTeams](https://www.theteams.kr/activities/page/346493/le)
- **Job-board taxonomy:** 신입 infra openings are often titled "DevOps / 시스템 관리자" or "시스템엔지니어(SE)" rather than "클라우드 엔지니어" — [캐치 신입 listing](https://www.catch.co.kr/NCS/RecruitInfoDetails/558726) (search-snippet)
- **Workforce structure:** Korea's cloud workforce was 33,217 in 2024 (+8.4%): 개발자 33.6%, 운영 19.7%, 기획·영업·지원 17.1%, 아키텍트 15.6%, 보안 14.1% — 과기정통부·NIPA 2025 실태조사 via [경기일보, 2026-03-30](https://www.kyeonggi.com/article/20260330580494)
- **Older shortage projection:** 고용노동부/한국직업능력연구원 forecast a cloud shortfall of 18,800 people by 2027, covering both server-operations and system-development staff (2023-08 projection) — [아시아경제, 2023-08-30](https://view.asiae.co.kr/article/2023083015373761202) (search-snippet)
- **Global context:** in the Linux Foundation 2025 tech-talent report, 59% of organizations reported a talent shortage in cloud computing — [CIO Korea](https://www.cio.com/article/4030078/ai-시대-기술-인력-더-뽑는다-리눅스재단-기술-인.html) (search-snippet)

### Inferences
- The market is split. There is a structural shortage (the 18,800 projection and fast MSP growth), yet the top product companies post mostly senior-only infra roles. 신입 therefore enter through MSP, IT-service 공채 or bootcamps, or start as backend developers and move into SRE/platform later.
- Being titled "시스템 관리자/SE" in 공채 and "DevOps/SRE" at product companies means 신입 job searches should cover both labels.

### Gaps
- I found no statistic on the 신입 vs. 경력 share of infra/DevOps postings in Korea (원티드/점핏/사람인).
- 삼성SDS and SK AX (formerly SK C&C) 2025–26 신입 cloud/infra track details were not found.
- 베스핀글로벌 2025–26 신입 hiring was not found.

---

## Q6. Representative current postings (concrete requirements)

### Takeaway
All requirements I could verify come from 토스 group, 부릉, 카카오엔터프라이즈, LINE (Japan) and MSP sources; I could not verify 네이버, 카카오 본사, 쿠팡, 당근 or 우아한형제들 full texts. In the verified postings, the senior bar consists of K8s production on AWS, IaC + GitOps, SLO-driven observability, incident leadership, coding ability, and increasingly cost and policy-as-code.

### Cited Findings
| Company / role | Exp. | Key requirements / stack | Source |
|---|---|---|---|
| 토스플레이스 SRE | 7–15y | Prod code in 1+ language; AWS + K8s prod ops; SLI/SLO; incident/post-mortem; Istio, Prometheus/Thanos/Grafana, Chaos Mesh, ArgoCD/GoCD, Vault | [Remember 330118](https://career.rememberapp.co.kr/job/posting/330118) |
| 토스플레이스 DevOps | 6–15y | Multi-cluster EKS-style K8s + Istio; CI/CD + GitOps; IaC + Policy as Code; self-service platform; cost trade-offs | [Wanted 322625](https://www.wanted.co.kr/wd/322625) |
| 토스뱅크 DevOps | 경력 | Container orchestration ops; large build/deploy/monitoring; 보안·규제; K8s/Istio and on-prem preferred; 사전 과제 | [Remember 155696](https://career.rememberapp.co.kr/job/posting/155696) |
| 토스페이먼츠 SRE | 경력 | Java/Kotlin/Spring; Linux/network depth; MSA/K8s/Istio/Redis/Kafka/ELK; AWS + OpenStack; GoCD/ArgoCD/Jenkins | [Remember 253702](https://career.rememberapp.co.kr/job/posting/253702) |
| 부릉 DevOps (closes 2026-10-28) | 5y+ | AWS (EKS…), K8s, Terraform, Jenkins/ArgoCD/GH Actions, Datadog/Prometheus/Grafana/ELK, Python/Shell/Go, FinOps, SLI/SLO | [Wanted 389174](https://www.wanted.co.kr/wd/389174) |
| 카카오엔터프라이즈 KakaoCloud 기술지원 (closed) | Linux 5y+, cloud 2y+ | OpenStack/AWS/GCP/Azure; TCP/IP, DNS, FW, LB; kernel/network troubleshooting; K8s/Docker, Prometheus/Grafana and MSP/TAM preferred | [Remember 259789](https://career.rememberapp.co.kr/job/posting/259789) |
| LINE Verda SRE (Japan) | 3y+ SWE | C/Go/Python; OpenStack/K8s private cloud; day-2 ops | [TokyoDev](https://www.tokyodev.com/companies/line/jobs/site-reliability-engineer-private-cloud-platform/) |
| 42dot AI Infra | — | Thousands of GPUs; K8s + Slurm; GPU quotas | [choppingblock](https://www.choppingblock.ai/jobs/ai-infrastructure-engineer-at-42dot-6dc5d) |
| 메가존클라우드 신입 공채 2026 | 신입 | 클라우드 엔지니어 / 매니지드 서비스 엔지니어 / 시큐리티·SOC; no education requirement | [바이라인, 2025-12-10](https://byline.network/2025/12/10-579/) |

- Note: 부릉 posted the same DevOps role twice. [Wanted 383968](https://www.wanted.co.kr/wd/383968) closed 2026-09-25 and was reposted as 389174, which suggests a hard-to-fill senior role.

### Inferences
- The common senior Korean infra job description is now an SWE + SRE hybrid: coding is required, and the stack is K8s/IaC/GitOps plus SLO and incident ownership. Pure "server operations" remains mainly at CSP 기술지원, MSP and SI.

### Gaps
- Not retrieved:
  - 네이버 / 네이버클라우드 infra postings
  - 카카오 (본사) and 카카오뱅크 클라우드팀 full text (search-snippet only: mentions financial regulation and HA design)
  - 쿠팡 infra-platform full text (link 404)
  - 당근 SRE / Platform postings (searches returned none)
  - 우아한형제들 full text
  - 베스핀글로벌 / LG CNS / 삼성SDS / SK AX experienced-hire infra postings
- Most Remember/Wanted pages show no posting date ("채용 시 마감"/"상시"). The exact 2025 vs. 2026 vintage of the 토스 postings is unconfirmed, though they were live or indexed as of 2026-10.
