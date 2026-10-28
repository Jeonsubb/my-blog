# Global Benchmarks: Backend and Cloud/Infra Technology Adoption and Hiring Demand (2025–2026)

Research date: 2026-10-18. All stats are labeled with source and date. "Secondary" means I could not reach the primary publisher and the number comes from press coverage, so it needs checking before formal citation.

## 1. Developer surveys and rankings: backend languages, frameworks, databases

### Takeaway
Across surveys, Python, TypeScript and PostgreSQL are the clear global winners for 2025–2026. Rust and FastAPI are the fastest risers among backend tools. Go is stable with high learning intent. Java/Spring keep a large installed base but have weak "desire" scores. MySQL and MongoDB lost ground in the 2026 Stack Overflow survey. Kotlin is flat at about 11%.

### Cited Findings

**Stack Overflow Developer Survey 2026 (released 2026-10-06, all respondents; "Used" means extensive work in the past year)**
- Survey base: the survey ran 7 weeks with "more than 30,000 people" — [Stack Overflow blog, 2026-10-06](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/). The figure of 30,903 valid responses from 169 countries is secondary — [Visual Studio Magazine, 2026-10-06](https://visualstudiomagazine.com/articles/2026/10/06/stack-overflow-2026-survey-vs-code-leads-visual-studio-takes-third.aspx)
- Top languages used (2026): JavaScript 62.0%, SQL 58.4%, HTML/CSS 58.2%, Python 58.0%, Bash/Shell 51.3%, TypeScript 43.8%, Java 27.6%, C# 27.1%, PowerShell 24.6%, C++ 24.3% — [SO 2026 Technology](https://survey.stackoverflow.co/2026/technology)
- SQL passed HTML/CSS for the #2 spot. Rust rose to the 12th most-used language. JavaScript has been #1 for 12 straight years — [SO blog 2026-10-06](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/); [SO 2026 Technology](https://survey.stackoverflow.co/2026/technology)
- Backend language detail, 2026, as Used / Desired / Admired — [SO 2026 full data](https://survey.stackoverflow.co/2026/technology/data):
  - Python 58.0% / 33.4% / 50.6%
  - TypeScript 43.8% / 27.5% / 53.0%
  - Java 27.6% / 13.1% / 38.5%
  - Go 16.5% / 17.7% / 49.5%. Desired is higher than Used, which signals pull.
  - Rust 18.0% / 26.3% / 67.4%. This is the highest admiration among these languages.
  - Kotlin 10.8% / 9.4% / 43.1%
- Databases, 2026, Used / Desired / Admired — [SO 2026 full data](https://survey.stackoverflow.co/2026/technology/data):
  - PostgreSQL 57.9% / 43.9% / 62.3%
  - MySQL 35.1% / 15.3% / 38.2%
  - Redis 28.3% / 20.5% / 51.0%
  - MongoDB 19.0% / 11.4% / 38.5%
  - Usage only: SQLite 42.1%, MS SQL Server 27.1%, MariaDB 20.3%, Elasticsearch 14.8%, Oracle 9.4%, DynamoDB 9.3% — [SO 2026 Technology](https://survey.stackoverflow.co/2026/technology)
- Web frameworks, 2026, Used / Desired / Admired — [SO 2026 full data](https://survey.stackoverflow.co/2026/technology/data):
  - Node.js 46.4% / 24.1% / 46.1%
  - ASP.NET Core 19.9% / 13.8% / 58.0%
  - FastAPI 18.5% / 13.5% / 51.3%
  - Express 15.6% / 8.0% / 39.8%
  - Spring Boot 12.8% / 8.6% / 50.2%
  - Django 11.3% / 8.2% / 43.8%

**Stack Overflow Developer Survey 2025 (prior year, for YoY comparison) — [SO 2025 Technology](https://survey.stackoverflow.co/2025/technology/)**
- Languages, shown as all respondents / professional developers:
  - JavaScript 66% / 68.8%
  - SQL 58.6% / 61.3%
  - Python 57.9% / 54.8%
  - TypeScript 43.6% / 48.8%
  - Java 29.4% / 29.6%
  - C# 27.8% / 29.9%
  - PHP 18.9% / 19.1%
  - Go 16.4% / 17.4%
  - Rust 14.8% / 14.5%
  - Kotlin 10.8% / 11.5%
- Databases, all / professional: PostgreSQL 55.6% / 58.2%, MySQL 40.5% / 39.6%, SQLite 37.5% / 36.9%, Redis 28% / 30.7%, MongoDB 24% / 24.3%
- Frameworks, all / professional: Node.js 48.7% / 49.1%, Express 19.9% / 20.3%, ASP.NET Core 19.7% / 21.3%, FastAPI 14.8% / 15.1%, Spring Boot 14.7% / 15.6%, Django 12.6% / 11.7%
- 2025 YoY notes from SO:
  - Python rose 7 percentage points from 2024 to 2025.
  - Redis usage grew "+8%" (SO does not say whether that is points or relative).
  - FastAPI rose 5 points.
  - Docker rose 17 points, partly because SO consolidated categories.
- PostgreSQL has been the most desired and most admired database since 2023 — [SO 2025 Technology](https://survey.stackoverflow.co/2025/technology/); [data-bene.io](https://www.data-bene.io/en/blog/most-desired-database-three-years-running-postgresqls-developer-appeal/)

**GitHub Octoverse 2025 (published 2025-10-28; covers Sep 2024–Aug 2025) — [GitHub blog](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)**
- TypeScript became the #1 language on GitHub by monthly contributors in August 2025, with 2,636,006 contributors (+66.6% YoY). Python was #2 with about 2.6M (+48.8%), then JavaScript at about 2.15M (+24.8%), Java (+20.7%) and C# (+22.2%).
- New repos, Sep 2024–Aug 2025:
  - Python 9.26M (+53.4%)
  - JavaScript 9.35M (+14.6%)
  - TypeScript 5.39M (+78.1%)
  - Java 3.52M (+9.35%)
  - C# 1.48M (+10.6%)
- Dockerfile repos reached 1.9M, up 120% from 875k. Shell in AI-tagged repos grew 324%. HCL (Terraform) appears in the top-10 chart, but no figure is given.
- Developers: 180M+ total, with 36M+ new in the year (+23%).
- Asia: India has 21.9M developers (#2 globally) and is projected to reach 57.5M by 2030. Indonesia has 4.37M. APAC added about 13M net new developers in 2024–25. Japan is projected to reach 11.7M by 2030. Korea appears in contributor rankings, but no count is given.

**JetBrains State of Developer Ecosystem 2025 (24,534 respondents, surveyed April–June 2025; published October 2025)**
- Survey size and dates, plus JetBrains' note that respondents are biased toward its own users — [JetBrains DevEco 2025](https://devecosystem-2025.jetbrains.com/)
- Language Promise Index: TypeScript, Rust and Go are the "most promising." JavaScript, PHP and SQL are "mature" — [heise, Oct 2025](https://heise.de/-10771317)
- Languages developers plan to adopt next: Go 11%, Rust 10%, Python 7%, Kotlin 6%, TypeScript 6% — [heise](https://heise.de/-10771317)
- PHP, Ruby and Objective-C are in "long-term decline." TypeScript shows a dramatic five-year rise — [The Register, 2025-10-21](https://www.theregister.com/2025/10/21/massive_jetbrains_dev_survey)
- JetBrains reports higher Java and Kotlin usage than Stack Overflow because of respondent bias — [The Register](https://www.theregister.com/2025/10/21/massive_jetbrains_dev_survey)
- AI: 85% of developers use AI coding tools, and 68% expect AI proficiency to become a job requirement — [The Register](https://www.theregister.com/2025/10/21/massive_jetbrains_dev_survey)

**TIOBE and RedMonk**
- TIOBE, October 2026 (secondary): Python is #1 at 19.23% (up from 17.76% in September), C is #2 at 11.33%, C++ 8.87%, Java 8.41%, and Rust is #10. TIOBE added Mandarin search terms to its method, so month-to-month changes are noisy — [TechRepublic, 2026-10-12](https://www.techrepublic.com/article/news-tiobe-october-2026-java-closes-cpp-gap/)
- TIOBE, June 2026: Rust reached its highest-ever position — [Techzine](https://www.techzine.eu/news/devices/142187/rust-nears-top-10-in-tiobe-index-python-drops/)
- RedMonk, January 2026 (published 2026-04-14), based on GitHub plus Stack Overflow data:
  - The order is JavaScript, Python, Java, PHP and C# (tied), TypeScript, CSS and C++ (tied), then Ruby, C, Swift, Go, R, Shell, Kotlin, Scala, PowerShell, Dart, Objective-C, Rust.
  - The author notes "inertial weight," partly caused by Stack Overflow's declining relevance.
  - Source: [RedMonk](https://redmonk.com/sogrady/2026/04/14/language-rankings-1-26/). I saw this through a search summary and did not open the page.

**Production container language mix (older data, labeled)**
- Datadog Container Report 2023 (November 2023) ranks languages in containers as Node.js #1, Java #2, Python #3, Go #4. No percentages are given — [Datadog container report](https://www.datadoghq.com/container-report/)

### Inferences
- **2025 to 2026 change in SO usage (all respondents).** I computed these from the two SO pages above. Treat them with caution: the 2026 sample is smaller (about 30.9k), and the respondent mix may differ.
  - Rising:
    - Rust +3.2 points
    - FastAPI +3.7 points
    - PostgreSQL +2.3 points
    - SQLite +4.6 points
  - Flat: Python, TypeScript, Go, Kotlin, Redis
  - Falling:
    - Java −1.8 points
    - Spring Boot −1.9 points
    - Express −4.3 points
    - MySQL −5.4 points
    - MongoDB −5.0 points
- **Java/Spring.** Java has the lowest "desired" score of the major backend languages (13.1%) and low admiration (38.5%). But it still holds about 28–30% usage, ranks #3 on RedMonk, and was among the top 5 GitHub languages by contributor growth (+20.7%). Globally it reads as a large, stable, enterprise-heavy installed base with little new-developer enthusiasm, not as a collapsing language. This matters for comparison with Korea, where Java/Spring dominates backend postings.
- **Go.** Go's "desired" score (17.7%) is above its usage (16.5%), and it leads JetBrains' "plan to adopt" list at 11%. This is consistent with Go being a growth skill for infra and platform work rather than a mass-market backend language.
- **TypeScript on the backend.** TypeScript's GitHub lead is driven by frontend and full-stack framework defaults plus AI-assisted coding. Node.js usage in SO actually slipped (48.7% to 46.4%), so TypeScript's rise does not automatically mean Node.js backends are gaining share.
- **Databases.** PostgreSQL is the de facto default for new projects. It leads in usage, desire (43.9%, nearly 3x MySQL) and admiration. Redis is a stable "second database" skill at about 28–31%.

### Gaps
- The SO 2026 professional-developer breakdowns were not on the pages I could fetch, so 2025 vs 2026 comparisons use all-respondent figures.
- I did not verify the SO 2025 total respondent count.
- Octoverse 2025 gives no Go, Rust, Kotlin or HCL contributor counts in the text I could access.
- I could not access JetBrains per-language usage percentages (the blog returned 403).
- I did not open the TIOBE primary page. The October 2026 figures come from one secondary article.
- I found no Korea-specific breakdown in SO, JetBrains or Octoverse.

## 2. Cloud-native and infra tooling: Kubernetes, IaC, GitOps, OpenTelemetry, platform engineering, serverless

### Takeaway
Kubernetes is near-universal among container users (82% in production) and is becoming the standard layer for AI inference. OpenTelemetry has reached rough parity with Prometheus in adoption (76% vs 77%), though production depth still lags. Terraform still dominates IaC usage: in SO 2026, 18.3% use Terraform versus 3.6% for OpenTofu and 2.0% for Pulumi, but OpenTofu has the higher admiration. Serverless now mostly runs alongside containers rather than replacing them.

### Cited Findings

**CNCF Annual Cloud Native Survey 2025 (released 2026-01-20) — [CNCF announcement](https://www.cncf.io/announcements/2026/01/20/kubernetes-established-as-the-de-facto-operating-system-for-ai-as-production-use-hits-82-in-2025-cncf-annual-cloud-native-survey/); [report page](https://www.cncf.io/reports/the-cncf-annual-cloud-native-survey/)**
- Kubernetes adoption:
  - 82% of container users run Kubernetes in production, up from 66% in 2023.
  - 98% of organizations have adopted cloud-native techniques.
  - 59% say "much" or "nearly all" of their development and deployment is cloud native.
  - 10% are in early stages or not using cloud native.
- AI on Kubernetes:
  - 66% of organizations hosting GenAI models use Kubernetes for some or all inference.
  - 44% do not yet run AI/ML workloads on Kubernetes.
  - Only 7% deploy models daily.
- GitOps: 58% of "cloud native innovators" use GitOps extensively, compared with 23% of "adopters."
- Top challenges:
  - Cultural change 47% (now #1)
  - Lack of training 36%
  - Security 36%
  - Complexity 34%
- OpenTelemetry is the #2 CNCF project by velocity, with 24,000+ contributors. Backstage (internal developer portals, the platform-engineering proxy) ranks #5. Nearly 20% of respondents use profiling in their observability stack.

**Grafana Labs Observability Survey 2026 (1,300+ respondents in 76 countries; fielded October–January; published 2026-03-18) — [Grafana blog](https://grafana.com/blog/observability-survey-OSS-open-standards-2026)**
- OpenTelemetry:
  - 76% overall adoption, with 41% using it in production. Of those: a few workloads 20%, most 10.9%, all 10.3%.
  - 35% are investigating or running POCs, and 15.3% are not using it.
  - 47% increased usage in the past year.
  - Signals used: metrics 57%, traces 50%, logs 48%.
- Prometheus: 77% overall adoption and 59% in production. 42% increased usage in the past year.
- 65% invest in both Prometheus and OpenTelemetry. 77% say open source and open standards are important to their observability strategy.
- Earlier comparison: in the 2025 survey, 70% used both Prometheus and OpenTelemetry in some capacity — [BetaNews, 2025-03-25](https://betanews.com/2025/03/25/three-quarters-of-companies-now-use-open-source-observability-tools/)

**Datadog State of Containers and Serverless 2025 (data through October 2025) — [Datadog](https://www.datadoghq.com/state-of-containers-and-serverless/)**
- Serverless:
  - 65% of AWS customers use Lambda, 70% of Google Cloud customers use Cloud Run, and 56% of Azure customers use App Service.
  - 66% of organizations using serverless functions also run container orchestration in the same cloud.
- Autoscaling:
  - Karpenter's share of node provisioning rose from about 11% to about 34% (October 2023 to October 2025). Cluster Autoscaler fell from about 40% to 25%. Datadog's text gives inconsistent delta figures.
  - HPA is used by over 64% of Kubernetes organizations, up from about 55% in Q1 2024.
- Container workload types: databases 45%, web/app servers 42%, CI/CD 27%, AI 7%.
- GPU: organizations using GPUs rose from about 4.5% to just over 6% (October 2023 to October 2025).
- Arm: Lambda functions on Arm grew from 9% to 19%, and Arm cloud instances from 9% to 15%, over two years.
- Efficiency: most workloads use less than half their requested memory and less than 25% of requested CPU.
- Older (Datadog Container Report, November 2023): 46% of container organizations ran serverless containers, up from 31% two years earlier — [Datadog](https://www.datadoghq.com/container-report/)

**IaC: Terraform vs OpenTofu vs Pulumi**
- SO 2026, Used / Desired / Admired — [SO 2026 full data](https://survey.stackoverflow.co/2026/technology/data):
  - Terraform 18.3% / 13.0% / 45.7%
  - OpenTofu 3.6% / 4.7% / 61.1%
  - Pulumi 2.0% / 2.7% / 49.1%
- SO 2025: Terraform 17.8% of all respondents and 18.7% of professional developers — [SO 2025](https://survey.stackoverflow.co/2025/technology/)
- SO 2026 Kubernetes is 26.0% used / 21.6% desired / 53.5% admired, and Docker is 59.1% / 38.4% / 58.9% — [SO 2026 full data](https://survey.stackoverflow.co/2026/technology/data). In 2025 the figures were Kubernetes 28.5% and Docker 71.1% — [SO 2025](https://survey.stackoverflow.co/2025/technology/)
- Secondary, low reliability: OpenTofu is said to be used by about 12% of IaC practitioners in early 2026, with about 27% evaluating. These blogs cite "community surveys" or a "CNCF survey 2025" that I could not verify — [jorijn.com](https://jorijn.com/en/blog/opentofu-vs-terraform-2026-the-fork-finally-diverged/); [devtoolhub](https://devtoolhub.com/opentofu-vs-terraform/). Another secondary piece says 38% of Terraform users are evaluating OpenTofu — [cloudmagazin ES, 2026-03-22](https://www.cloudmagazin.com/es/2026/03/22/opentofu-vs-terraform-adquisicion-ibm/)
- Context (secondary):
  - IBM acquired HashiCorp for about US$6.4B.
  - OpenTofu joined the CNCF Sandbox in April 2025.
  - Named OpenTofu adopters include Fidelity (50,000+ state files migrated), Boeing, Capital One and AMD.
  - Sources: [cloudmagazin](https://www.cloudmagazin.com/en/2026/06/05/opentofu-vs-terraform-which-iac-tool-really-delivers/); [scalr](https://scalr.com/learning-center/opentofu-vs-terraform)

### Inferences
- Kubernetes is now baseline rather than a differentiator for global infra roles. The CNCF's top challenges (culture, training) suggest the scarce skills are operating and teaching it: GitOps, platform/IDP, autoscaling, cost efficiency.
- Datadog's utilization data (most workloads use under 25% of requested CPU) and the Karpenter shift point to FinOps and right-sizing as practical, demonstrable skills.
- OpenTelemetry is the observability standard to learn. Adoption is broad (76%), but only 41% are in production, so hands-on production OTel experience is still relatively scarce.
- Terraform remains the safe IaC skill to learn. OpenTofu is CLI- and HCL-compatible, so Terraform skills transfer. OpenTofu's high admiration (61.1%) on a low base marks it as one to watch, not yet a hiring-volume skill.

### Gaps
- The CNCF 2025 survey's sample size and Asia regional breakdown were not on the pages I accessed.
- The CNCF 2025 release gives no IaC, serverless or platform-engineering adoption percentages.
- I found no primary survey with OpenTofu vs Terraform market share. The 12%/27% figures are unverified.
- I found no reliable 2025–2026 quantitative data on platform-engineering team adoption. Gartner's widely quoted prediction was not retrieved.

## 3. Cloud market share (2025–2026)

### Takeaway
Per Synergy Research, in Q2 2026 AWS led worldwide cloud infrastructure services with 28%, ahead of Microsoft at 20% and Google at 15%. The market reached $143B in the quarter, growing 43% YoY, the fastest in 8 years, driven by GenAI. AWS is losing share slowly (about 30% a year earlier) while Google gains.

### Cited Findings
- **Synergy Research Q2 2026 (released 2026-07-30)** — [Synergy Research](https://www.srgresearch.com/articles/q2-cloud-market-passes-143-billion-highest-growth-rate-in-eight-years)
  - Market size and growth:
    - Q2 2026 spending was $143B ($143.4B revenue), up more than $43B YoY.
    - Trailing 12-month revenue was $500B.
    - YoY growth was 43%, the highest in eight years and the 11th straight quarter of acceleration.
  - Share: AWS 28%, Microsoft 20%, Google 15%. The top three hold 67% of public cloud.
  - Growth by segment and country:
    - Public IaaS+PaaS grew 47%.
    - GenAI-specific cloud services grew 165% YoY.
    - The U.S. market grew 49%.
  - Neoclouds and tier-two players:
    - High-growth tier-two providers include CoreWeave, OpenAI, Oracle, Crusoe, Nebius, Anthropic and Nscale.
    - Nine neocloud companies are now in the top 40 providers by infrastructure revenue.
  - APAC:
    - The fastest-growing countries in local currency include India, Indonesia, Thailand and Malaysia.
    - The U.S. market "far surpasses" all of APAC.
    - Korea is not named.
- **Year-ago comparison (secondary, citing Synergy via CRN):** in Q2 2025, AWS had about 30%, Azure 20% and Google 13%. Google's 15% in Q2 2026 is its record high. AWS was flat against Q1 2026 at 28% — [tech-insider.org](https://tech-insider.org/google-cloud-15-percent-share-aws-falls-2026/); [shattered.io](https://shattered.io/aws-falls-28-percent-google-cloud-record-15-2026/)
- **Omdia (formerly Canalys) Q4 2025:** global cloud infrastructure services spending was $110.9B, up 29% YoY, and hyperscalers held 66%. No provider split was given — [Le Monde Informatique](https://www.lemondeinformatique.fr/actualites/lireamp-les-hyperscalers-dopes-a-l-ia-raflent-les-deux-tiers-du-cloud-mondial-99775.html). Omdia's figure is not directly comparable with Synergy's because the two use different market definitions.
- **Developer usage (SO 2026):** AWS 41.8%, Azure 25.1%, Google Cloud 24.5%. Desired: AWS 24.1%, Azure 13.7%, GCP 13.9% — [SO 2026 full data](https://survey.stackoverflow.co/2026/technology/data). In SO 2025, all respondents / professional developers were AWS 43.3% / 45.9%, Azure 26.3% / 27.2% and GCP 24.6% / 24.3% — [SO 2025](https://survey.stackoverflow.co/2025/technology/)
- **Job postings (U.S.):** AWS appears in 30% of tech postings, Azure 24% and GCP 14%. Nearly 42% require at least one of the three, and AWS plus Azure appear together in 15%. This is from Oxylabs/Coresignal, covering about 850k U.S. postings from January 2025 to March 2026, published 2026-07-31 — [The FINANCIAL / Oxylabs](https://finchannel.com/ai-layoffs-havent-slowed-tech-hiring-aws-cloud-skills-and-git-lead-u-s-job-market-oxylabs-research-finds/133214/jobs/2026/07/)

### Inferences
- AWS remains the default skill globally: #1 in market share, developer usage and job-posting mentions. Azure is a clear #2 in hiring demand (24% of U.S. postings vs 14% for GCP). Its weight in postings is larger than its 20% market share suggests, probably because of enterprise and Microsoft-stack employers.
- GenAI infrastructure (GPU clouds, neoclouds) is the fastest-growing slice (+165%). Infra skills tied to AI workloads, such as GPU scheduling on Kubernetes and inference serving, align with where market growth is concentrated.

### Gaps
- I found no Omdia/Canalys Q2 2026 provider-level shares.
- I found no Korea- or APAC-specific provider share data. Synergy does not name Korea, so Korean cloud market shares (including local providers such as Naver Cloud, KT Cloud and NHN Cloud) need a Korea-specific source.
- Alibaba and Oracle global share percentages for Q2 2026 were not given in the Synergy release.

## 4. Fastest-growing backend/infra skills in job demand (LinkedIn, Indeed, Dice, Lightcast)

### Takeaway
U.S. tech postings are recovering in 2026: Dice reports +17% YoY IT postings in September 2026. Growth is heavily skewed toward AI-adjacent skills and senior roles. Cloud skills (AWS, Azure) plus Kubernetes, Docker and Terraform remain core baseline requirements rather than the fastest growers. General software-engineering postings remain well below pre-2022 levels, and entry-level demand is weak.

### Cited Findings
- **Dice (via CIO.com, 2026-10-16)** — [CIO.com](https://www.cio.com/article/4201347/information-technology-jobs-report.html)
  - Overall postings:
    - IT job postings rose 17% YoY (September 2026 vs September 2025).
    - AI/ML postings grew 88% YoY, about 5x average tech posting growth.
  - AI fluency: 75% of U.S. tech openings required AI fluency in June 2026, up 178% YoY.
  - Fastest-growing skills YoY:
    - September 2026: Claude AI +1033%, Agentic AI +446%, Responsible AI +401%, Enterprise integration +376%, AI agents +308%.
    - July 2026: Enterprise integration +638%, Agentic AI +587%, AI agents +503%, Responsible AI +495%, AI infrastructure +366%.
  - Fastest month-over-month gains in July 2026 included API system integration (+58%) and LDAP (+55%).
  - Software engineers were the most sought-after role in July 2026, and the software industry was the #2 employer seeking IT talent after consulting.
- **Dice-derived (secondary):** vector databases +353% and RAG +275% YoY (June 2025 to June 2026) — [The AI Career Lab](https://theaicareerlab.com/blog/tech-jobs-ai-skills-required-2026)
- **U.S. postings skill shares (Oxylabs/Coresignal, about 850k postings, January 2025–March 2026, published 2026-07-31)** — [The FINANCIAL / Oxylabs](https://finchannel.com/ai-layoffs-havent-slowed-tech-hiring-aws-cloud-skills-and-git-lead-u-s-job-market-oxylabs-research-finds/133214/jobs/2026/07/)
  - Shares of postings: AWS 30%, Azure 24%, Git 21%, GCP 14%, Kubernetes 14%, Docker 13%, Terraform 8%.
  - Within software engineering postings, AWS appears in 32% and Git in 31%.
  - Q1 2026 postings were 3.7x the level of Q1 2025.
- **Indeed Hiring Lab (secondary; I could not reach the primary)** — [FourWeekMBA](https://fourweekmba.com/ai-indeed-claude-code-developer-jobs-recovery/)
  - U.S. software development postings rose about 15% after late February 2025, while overall postings fell about 7%.
  - Even so, software postings remain about 27.5% below the pre-pandemic level.
  - Senior roles made up 71% of the posting increase (May 2025 to May 2026).
  - Titles mentioning AI accounted for 37% of the increase.
- **Indeed-derived (secondary):** ML engineer openings are 59% above the February 2020 baseline, while general software engineering openings are 49% below it — [TechTimes, 2026-06-01](https://www.techtimes.com/articles/317535/20260601/entry-level-tech-jobs-2026-148092-cuts-expose-which-skills-still-get-you-hired.htm). This conflicts with the "27.5% below pre-pandemic" figure above. The difference is likely a metric or date difference, but I could not resolve it without the primary source.
- **LinkedIn Skills on the Rise 2026:**
  - The ranking is based on YoY growth in skill acquisition and in hiring success.
  - Themes: AI literacy, cross-functional collaboration, and go-to-market and business development. AI is "moving beyond coding."
  - Lists are bucketed by function and industry rather than one global top-15.
  - Source: [LinkedIn News](https://news.linkedin.com/2026/Skills-on-the-rise-2026)
  - The India list centers on AI and automation, data and analytics, and IT and cybersecurity — [Storyboard18](https://www.storyboard18.com/amp/brand-makers/linkedins-skills-on-the-rise-2026-identifies-top-skill-stacks-reshaping-indias-workforce-90556.htm)
- **Developer sentiment:**
  - 79% of SO 2026 respondents want to learn AI skills — [SO blog 2026-10-06](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/)
  - 68% of JetBrains respondents expect AI proficiency to become a job requirement — [The Register](https://www.theregister.com/2025/10/21/massive_jetbrains_dev_survey)
  - Only 20% of SO 2026 AI users use AI for deploying, operating or troubleshooting production systems — [SO blog](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/)
- **Long-run outlook (secondary citing BLS):** software developer employment is projected to grow 16% from 2024 to 2034, versus 3% for all occupations — [4 Corner Resources](https://www.4cornerresources.com/blog/how-to-find-and-hire-the-best-software-developers)

### Inferences
- The global hiring signal for backend/infra in 2026 is "cloud + containers + IaC as table stakes, AI integration as differentiator." Kubernetes (14%) and Terraform (8%) appear in a meaningful but minority share of U.S. postings. The fastest growth is in skills connecting backend systems to AI: AI infrastructure, enterprise and API integration, agents, RAG and vector databases.
- Only 20% of AI users apply AI to production operations, and CNCF reports only 7% deploy models daily. Together these suggest that operating AI workloads reliably (MLOps/LLMOps on Kubernetes, observability for AI services) is an under-supplied niche.
- The recovery skews strongly senior: 71% of the increase came from senior roles. This mirrors the junior-hiring squeeze Korean job seekers report, so a global comparison would likely show similar pressure on entry-level backend roles.

### Gaps
- I could not reach Indeed Hiring Lab primary pages. All Indeed figures are secondary and partly conflicting.
- I found no Dice per-skill growth figures for Kubernetes, Go, Terraform or Java in 2026.
- I found no Lightcast 2025–2026 data.
- LinkedIn's 2026 list was only partially captured. I did not see whether any backend or infra-specific skill (for example Kubernetes or Go) appears in the tech-function bucket.
- I found no Asia- or Korea-specific job-posting skill data from these global providers.

## 5. Certifications: which carry weight globally and how employers view them

### Takeaway
Cloud-provider certifications, especially AWS and Google Cloud professional and specialty tracks, carry the strongest salary signal globally. In Skillsoft's U.S. top-paying list, AWS Security Specialty and GCP Professional Cloud Architect lead and CKA/Terraform do not appear in the top 20. Employers broadly value certifications (97% of IT decision-makers say certified staff add value), but practitioner and hiring commentary treats them as a complement to demonstrable hands-on skill. Kubernetes certifications (CKA/CKAD) are performance-based and growing fast in Asia, notably Japan.

### Cited Findings
- **Skillsoft/Global Knowledge IT Skills and Salary (Volume 19, 2024–2025, 5,100+ respondents worldwide):**
  - 97% of IT decision-makers say certified staff add value, and 22% put that value at $30,000 or more.
  - 93% of respondents hold at least one certification.
  - Two-thirds of decision-makers report skill gaps on their teams.
  - Certified respondents cite better work quality (60%), engagement (48%) and productivity (43%).
  - Sources: [Global Knowledge](https://www.globalknowledge.com/en/resources/it-skills-and-salary-report); [Skillsoft blog](https://skillsoft.com/blog/tech-salaries-climbed-5--thanks-to-skills-and-certifications). These come from marketing summaries; I did not see the full PDF.
- **Top-paying certifications (Skillsoft, U.S., for 2025; secondary because the Skillsoft page returned 403):**
  - #1 AWS Certified Security – Specialty at about $203,597.
  - #2 Google Cloud Professional Cloud Architect at about $190,204.
  - AWS Developer – Associate and AWS Solutions Architect – Associate also appear in the top 20.
  - CKA and Terraform Associate do not appear in the top 20.
  - Sources: [Global Knowledge top-paying certs](https://www.globalknowledge.com/en/resources/resource-library/articles/top-paying-certifications); [Skillsoft JP blog](https://skillsoft.com/jp/blog/top-paying-it-certifications)
- **Kubernetes certifications in Asia:**
  - Kubernetes exams taken in Japan rose 250% in the 12 months after the first KubeCon Japan, and Japan's Kubestronauts rose 170% — [CNCF blog, 2026-07-28](https://cncf.io/blog/2026/07/28/how-japans-250-training-surge-is-shaping-global-ai-talent/)
  - As of June 2025, Asia had 280 Kubestronauts (holders of all CNCF certifications plus LFCS), including 63 in Japan and 29 in China — [CNCF, 2025-06-09](https://cncf.io/announcements/2025/06/09/cncf-kubestronaut-program-momentum-highlights-asias-role-in-growing-cloud-native-talent)
  - CNCF cites a Portworx finding that 75% report Kubernetes adoption challenges due to a lack of skilled talent — [CNCF, 2025-06-09](https://cncf.io/announcements/2025/06/09/cncf-kubestronaut-program-momentum-highlights-asias-role-in-growing-cloud-native-talent)
- **CKA format:** CKA is an online, performance-based exam that solves tasks in a live command-line environment. It is a practical test, not multiple choice — [Linux.com](https://www.linux.com/?p=473108)
- **Linux Foundation hiring-manager views:**
  - A Linux Foundation 2026 report reportedly finds 76% of organizations consider relevant certifications when evaluating skills in hiring. This is secondary and I did not verify it — [DevOpsCube](https://devopscube.com/linux-foundation-certification.md)
  - Older data (2022 Open Source Jobs Report): 69% of hiring managers were more likely to hire a certified open-source professional, and 28% said certification would not influence them — [i-programmer](https://i-programmer.info/news/150-training-a-education/15521-certification-.html)
  - The 2025 State of Tech Talent report surveyed 500+ global hiring and training leaders, but its certification figures were not retrieved — [Linux Foundation Training](https://training.linuxfoundation.org/?p=39742)
- **Related signal:** cloud-provider skills appear in about 42% of U.S. tech postings — [Oxylabs](https://finchannel.com/ai-layoffs-havent-slowed-tech-hiring-aws-cloud-skills-and-git-lead-u-s-job-market-oxylabs-research-finds/133214/jobs/2026/07/). This explains why cloud certifications align most directly with posting keywords.

### Inferences
- **Globally, the hierarchy by salary and posting alignment** appears to run as follows:
  1. AWS (Solutions Architect Associate/Professional, plus Security Specialty for a premium) and GCP Professional Cloud Architect.
  2. CKA/CKAD, which are valued as hands-on proof of Kubernetes skill and are popular in Asia.
  3. Terraform Associate, which is lower stakes and mainly a supporting credential.
- **For a junior candidate,** certifications likely work best as a screening and keyword aid paired with a project portfolio, not as a substitute for one. This is consistent with Skillsoft's "certified staff add value" framing and CKA's practical exam design.
- **Japan's fast growth in Kubernetes exams** is the closest Asian proxy for regional demand. Korea-specific data was not found.

### Gaps
- I found no primary 2025 or 2026 Skillsoft salary figures (403). Salary numbers are secondary.
- I found no employer survey that specifically rates CKA/CKAD or Terraform Associate value, and no salary premium data for those credentials.
- I found no HashiCorp/IBM data on Terraform Associate holders or demand.
- I found no Korea-specific certification-demand data in global sources.
