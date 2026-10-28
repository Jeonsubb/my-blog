# How AI Is Changing Backend / Cloud-Infra Developer Role Requirements (2025–2026, Korea + Global)

Research date: 2026-10-18. Labels: **[KR]** = South Korea, **[GL]** = global/US. "Secondary" = aggregator or blog citing a primary source I could not open myself. "Older" = data from before 2025.

## Q1. How often do backend postings now mention LLM/AI integration skills (LLM API, RAG, vector DB, LangChain/LangGraph, agents, MCP, prompt engineering)?

### Takeaway
[GL] The best numbers are for "AI skills" in tech postings overall, not for backend specifically. Dice reports that the share of US tech postings mentioning AI skills went from 15% (Jan 2024) to 73% (May 2026). Indeed attributes 37% of the 2025–26 software-posting rebound to jobs with "AI" in the title. [KR] I found no Korean platform statistic on the share of backend postings mentioning LLM, RAG or vector DBs. Korean evidence is either aggregate counts of "AI developer" postings or individual job ads showing LLM API, RAG and agent experience as hard requirements in "AI agent backend" roles.

### Cited Findings
**Global: posting-level statistics**
- [GL] Dice "Tech Hiring Myths vs. Reality" (based on about 7M US tech postings; reported Jul 10, 2026): the share of tech postings mentioning AI skills rose from **15% in Jan 2024 to 73% in May 2026**. Postings with "AI" in the title rose **173% YoY in Q1 2026**, while **software development postings fell 22%** over the same period. — [HR Dive](https://www.hrdive.com/news/dice-report-tech-hiring-AI/824902/)
- [GL] Secondary coverage of later Dice data gives about **75% by June 2026**. It also lists agentic AI, AI agents and AI infrastructure among the fastest-growing skill categories YoY. — [Interview Query](https://www.interviewquery.com/p/ai-skills-dice-tech-jobs-report); [theaicareerlab](https://theaicareerlab.com/blog/tech-jobs-ai-skills-required-2026) (secondary, not verified against Dice)
- [GL] Dice's August 2026 jobs report (released Sep 2026) says AI/ML tech postings grew **101% YoY vs. 18% for tech postings overall**. This comes from a search summary of the Dice site, and I did not open the report. — [Dice](https://www.dice.com/jobs/browsesalary) (unverified)
- [GL] Indeed Hiring Lab, "AI and Job Postings: From Destruction to Creation?" (Guillermo Gallacher, **Jul 8, 2026**):
  - US software development postings are up **almost 15% since Claude Code launched (late Feb 2025)**, while overall postings fell **7%**.
  - Software postings are still **27.5% below Feb 2020**.
  - **71%** of the net increase from May 2025 to May 2026 came from **senior** roles, and **37%** came from postings with **"AI" in the job title** (the two groups overlap).
  - From May 2022 to May 2026, more AI-exposed occupations saw bigger posting declines. From May 2025 to May 2026 that reversed: the most-exposed occupations rebounded most.
  - The author says the timing is "a coincidence that cannot be ignored" but that "correlation does not imply causation".
  - The article measures AI in job titles, not LLM or RAG skills in job descriptions.
  — [Indeed Hiring Lab](https://hiringlab.indeed.com/?p=20708)
- **Conflict:** Indeed reports US software development postings **up about 15%** (since Feb 2025), while Dice reports software development postings **down 22% YoY in Q1 2026**. The datasets, taxonomies and time windows differ, so the report should not present either as the single trend. — [Indeed Hiring Lab](https://hiringlab.indeed.com/?p=20708); [HR Dive/Dice](https://www.hrdive.com/news/dice-report-tech-hiring-AI/824902/)
- [GL] Lightcast "Beyond the Buzz" (**Jul 23, 2025**; more than 1.3B postings analyzed):
  - Postings that list AI skills advertise about **28% higher salaries (about $18,000/yr)**.
  - **51%** of postings requiring AI skills were outside IT/CS occupations (2024 data).
  - AI-skill postings grew **73% (2023→2024)** and a further **109% (2024→2025)**. This figure comes from secondary summaries of the Lightcast release.
  — [Lightcast press release](https://lightcast.io/resources/blog/beyond-the-buzz-press-release-2025-07-23); [edX summary](https://www.edx.org/resources/demand-for-ai-skills)
- [GL] Indeed Hiring Lab (**Sep 17, 2026**) published "AI Exposure Isn't Squeezing Advertised Pay in the US — It's Boosting It". I saw only the headline and no figures. — [Indeed Hiring Lab](https://hiringlab.indeed.com/2026/09/17/ai-exposure-isnt-squeezing-advertised-pay-in-the-us-its-boosting-it/)
- [GL] Unverified claims seen only in blogs: LinkedIn showed a "40% increase in mentions of AI coding tools 2024→2025", Copilot appears in "35% of listings" and Cursor in "20% of postings". I could not trace these to a primary dataset, so they should **not be used as facts**. — [dev.to](https://dev.to/remoet/the-ai-coding-tool-you-use-is-now-a-hiring-signal-o2a) (secondary)

**Korea: posting-level evidence**
- [KR] A private analysis of **88,492 Korean job postings (Jan 2022 – Oct 2025)** found AI-developer demand up **about 5x over four years**. AI developers were the only job group whose postings grew during the 2024 downturn. JobKorea 5-year figures cited in the same piece:
  - AI postings **+112%**, entry-level (신입) AI postings **+162%**
  - AI postings outside the Seoul metro area **+232%**
  - more than 1,000 companies posting AI roles
  - Q1 2026 role share: AI service developer **18.1%**, AI/ML engineer 17.9%, data scientist 17.4%

  The page does not clearly name who did the analysis and gives **no keyword counts** for LLM, RAG, LangChain or vector DBs. — [Sparta brunch](https://brunch.co.kr/@sparta/113) (secondary, vendor blog)
- [KR] Wanted (원티드) "AI 시대 커리어 트렌드 리포트" promo page (around Jul 2026) says **"6개 감소 직무 중 5개 개발 직군"** (5 of the 6 declining job categories are development roles). The underlying numbers were not visible. — [Wanted](https://www.wanted.co.kr/events/AI_trend_report)
- [KR] Example job ad (젠틀파이, "Python 백엔드 엔지니어 (AI 에이전트)", deadline **2026-08-09**, on Wanted). Required qualifications:
  - 5+ years of backend experience
  - concurrency, async and fault isolation
  - Docker, Linux and CI/CD
  - **hands-on LLM API experience including cost/latency/quality trade-offs**
  - **experience designing RAG or agent components (tool calling, multi-step planning, memory, evaluation)**

  Responsibilities include "backend systems that reliably handle **non-deterministic, high-latency LLM calls**", streaming and async APIs, RAG pipelines, LLM routing and SLO-based operations. It does not mention vector DBs, MCP or AI coding tools. — [Wanted posting](https://www.wanted.co.kr/wd/361200)
- [KR] An "Enterprise AI Workspace" posting (company not clearly identified on the page; the search tool linked it to Upstage):
  - responsibilities: RAG pipelines over internal documents, **multi-model routing and cost/quality/latency optimization**, embeddings, re-ranking and permission-aware retrieval
  - requirements: 5+ years of TypeScript/Python production experience and **LLM API integration applied to live services**

  — [demoday.co.kr](https://demoday.co.kr/recruits/11717) (seen via search summary only)
- [KR] Practitioner blog (Jul 2026): in 2026 AI Engineer postings, LoRA fine-tuning and vLLM serving often appear as 우대사항, **evals experience has started to be stated explicitly**, and **cost optimization and observability** have become core skills. This is opinion with no counts. — [youngju.dev](https://www.youngju.dev/blog/culture/2026-07-02-how-to-become-ai-engineer-2026-llm-rag-agents-evals-career-roadmap-deep-dive)
- [KR] Career-community advice repeatedly tells Spring backend developers to add "RAG, LangChain, VectorDB, LLM API 연동" experience. This is opinion. — [Comento](https://comento.kr/job-questions/%EB%AA%A8%EB%93%A0%ED%9A%8C%EC%82%AC/%EB%B0%B1%EC%97%94%EB%93%9C/%EB%B0%B1%EC%97%94%EB%93%9C_ai%20%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%A5%BC%20%EB%AA%A9%ED%91%9C%EB%A1%9C%20%ED%95%A0%20%EB%95%8C%EC%9D%98%20%ED%95%99%EC%8A%B5%20%EB%A1%9C%EB%93%9C%EB%A7%B5%EC%9D%B4%20%EA%B6%81%EA%B8%88%ED%95%A9%EB%8B%88%EB%8B%A4-630311)

### Inferences
- In the US, "AI skills" have shifted from niche to majority in tech postings (73–75% by mid-2026, per Dice). Most backend postings probably now mention AI at least in passing. This is an inference: no source breaks the figure out for backend.
- In Korean "AI agent backend" ads, LLM-specific engineering sits on top of classic backend depth rather than replacing it. Ads require async and concurrency handling, failure isolation, CI/CD and SLOs, plus LLM cost, latency and quality trade-offs and RAG or agent design. The new skill is "operating non-deterministic, slow, expensive external calls reliably", not prompt writing by itself.
- MCP rarely appeared in Korean postings I found. Global MCP mentions turned up mainly in US and EU contractor ads. MCP is probably still an emerging 우대 keyword rather than a common requirement in Korea.

### Gaps
- No Korean platform statistic (Wanted, JobKorea, Saramin, Programmers) on the **percentage of backend postings mentioning LLM, RAG, vector DB, LangChain or MCP**. The report writer should state this explicitly. The closest data is aggregate "AI developer" posting growth.
- No primary global dataset broken out by backend vs. other roles for LLM, RAG or vector-DB keyword frequency. The Lightcast and LinkedIn primary reports were not opened.
- No reliable frequency data for pgvector, Pinecone, Milvus or LangGraph in postings.

## Q2. What new hybrid roles are emerging (AI engineer, AI application backend, LLMOps/MLOps, AI platform, GPU infra), and what do Korean companies list as requirements?

### Takeaway
[GL] "AI engineer" ranks #1 on LinkedIn's 2026 US Jobs on the Rise list, and AI-titled jobs drive much of the software posting rebound. [KR] Korea shows the same pattern: "AI service developer" is the largest AI posting category (18.1%, JobKorea Q1 2026). LLMOps and AI-platform ads look like infra/SRE roles with GPU, inference-serving and quantization skills added. Detailed public requirements from Naver HyperCLOVA X, LG AI Research, SKT, KT, Toss, Daangn and Wrtn were mostly not retrievable.

### Cited Findings
- [GL] LinkedIn **Jobs on the Rise 2026** (published Jan 2026; US, three-year growth): **AI engineer is #1**. AI consultants/strategists, data annotators and AI/ML researchers are also in the top 10. — [Let's Data Science](https://letsdatascience.com/news/linkedin-names-fastest-growing-jobs-for-2026-bf17881e) (secondary)
- [GL] A LinkedIn "Grad's Guide" figure: **639,000 AI-related US postings added 2023–2025, 75,000 of them AI engineer listings**. — [Let's Data Science](https://letsdatascience.com/news/linkedin-identifies-ai-engineer-as-fastest-growing-role-e82f85f1) (secondary, via search summary)
- [GL] Indeed: **37%** of the May 2025 – May 2026 US software posting increase came from titles containing "AI". AI in titles is spreading to other white-collar occupations. — [Indeed Hiring Lab](https://hiringlab.indeed.com/?p=20708)
- [GL] Dice: AI-titled postings **+173% YoY (Q1 2026)**. — [HR Dive](https://www.hrdive.com/news/dice-report-tech-hiring-AI/824902/)
- [KR] JobKorea Q1 2026 AI posting mix: AI service developer **18.1%**, AI/ML engineer **17.9%**, data scientist **17.4%**. Startups favor LLM engineers and AI service developers, and large enterprises look for large-scale architecture design. — [Sparta brunch](https://brunch.co.kr/@sparta/113) (secondary)
- [KR] **LLMOps Engineer** posting at **삼일PwC** (posting ID r260519, about May 2026):
  - Responsibilities: GPU-server LLM training and inference infrastructure, LLM API serving deployment, **GPU utilization and cost optimization**, **quantization** for memory and latency, CI/CD and MLOps, monitoring and guardrails.
  - Required: **3+ years of LLMOps or AI infra**, GPU-server AI workloads, Python pipelines, **Docker/Kubernetes**.
  - Preferred: **vLLM, SGLang, TensorRT-LLM**, CUDA/NCCL, GPTQ/AWQ quantization, on-prem or air-gapped (폐쇄망) GPU clusters, large-traffic services.

  — [PwC Korea careers](https://www.pwc.com/kr/ko/career/experienced/r260519-2.html) (seen via search summary)
- [KR] An **Upstage Platform Software Engineer** posting reportedly mentions **GPU scheduling specialized for LLM/ML services, global multi-region architecture and a self-service platform**. I could not load the full text. — [inthiswork](https://inthiswork.com/archives/324535) (search summary only)
- [KR] Kakao Group ran its **first group-wide new-grad open recruitment** (announced Sep 2025, for 2026 joiners; Kakao, Kakao Games, Kakao Mobility, KakaoBank, Kakao Entertainment, KakaoPay). The stated purpose was to select **"AI 네이티브" talent** "familiar with creating new value using AI". The process was 서류 → coding test (tech roles) → interview, with hires starting Jan 2026. — [Kakao corp newsroom](https://www.kakaocorp.com/page/detail/11688); [Byline Network](https://byline.network/2025/09/03_2987372/)
- [KR] Krafton's AI research new-grad recruitment (H1 2025) favored candidates with deep-learning or **LLM performance-improvement** experience. — [머니투데이 (Sep 2025)](https://www.mt.co.kr/tech/2025/09/18/2025091516195777425)
- [KR] **Older data:** SK Telecom's **2024** hiring recruited master's/PhD new grads for LLM development, with SKCT coding test and interviews. — via search summary (no 2026 equivalent found)

### Inferences
- Hybrid roles fall into two groups:
  - **AI application/service backend:** LLM API, RAG and agent orchestration, plus classic backend reliability. This is where junior and mid backend engineers can most easily move.
  - **LLMOps / AI platform / GPU infra:** Kubernetes and Docker, GPU scheduling, inference servers (vLLM, SGLang, TensorRT-LLM), quantization, cost/utilization optimization, and air-gapped or on-prem clusters. In Korea, on-prem and 폐쇄망 requirements likely reflect finance and public-sector data-residency needs. This is inferred from the PwC ad.
- Korean LLMOps ads ask for years of experience (3+ in the PwC ad). That fits the global finding that most AI-role growth is senior (Indeed: 71% of the rebound was senior).

### Gaps
- Could not retrieve current (2026) detailed requirements from **Naver (HyperCLOVA X), LG AI Research, SKT, KT, Toss, Daangn or Wrtn**. Searches returned no posting text, and career pages are JS-rendered. Kakao reportedly lists an "LLM Research Engineer (Pre-training)" role requiring a master's or higher, but I saw this only in a search snippet with an unclear URL.
- No Korean statistic on the number of LLMOps or GPU-infra postings.
- No quantitative salary-premium data for AI backend roles in Korea.

## Q3. Do postings list AI coding-tool usage (Claude Code, Cursor, Copilot, Codex) as a requirement or 우대사항? How are interviews and coding tests changing?

### Takeaway
[GL] Explicit tool-name requirements are still mostly anecdotal. The clearer change is in interview format and company mandates: Canva requires AI in interviews (Jun 2025), Meta piloted AI-enabled interviews, and Shopify made AI use a "baseline expectation". [KR] Korea is split. Kurly (2025), Musinsa (Codex provided in interviews, Feb 2026) and Nexon (coding test abolished in favor of an AI-use assessment, Aug 2026) moved to AI-allowed or AI-centric evaluation. The 네카라쿠배당토 group was reported in mid-2025 as banning AI in coding tests. At least one Korean ad lists Claude Code, Codex and Cursor in its requirements and 우대사항.

### Cited Findings
**Global**
- [GL] **Canva** (blog by Simon Newton, **Jun 11, 2025**):
  - Backend, ML and frontend candidates are "**expected to use AI tools**" (Copilot, Cursor, Claude).
  - An "AI-Assisted Coding" interview **replaces the CS Fundamentals screen** for backend and frontend.
  - Questions are now more ambiguous and realistic and cannot be solved with one prompt (e.g., an airport takeoff/landing control system instead of Conway's Game of Life).
  - Canva evaluates breaking down ambiguous requirements, sound technical decisions, **finding and fixing problems in AI-generated code**, production-readiness, and full ownership of code.
  - Successful pilot candidates asked clarifying questions, used AI for well-defined subtasks, reviewed AI output and debugged effectively.

  — [Canva Engineering Blog](https://canva.dev/blog/engineering/yes-you-can-use-ai-in-our-interviews)
- [GL] **Meta** (internal post "AI-Enabled Interviews", reported mid-2025): some coding candidates may use an AI assistant. The stated reasons were that this mirrors the real work environment and reduces covert LLM cheating. Reports describe a limited pilot. One non-news source claims expansion through 2026 (one onsite round replaced by a 60-min AI-enabled CoderPad session), which is **unconfirmed**. — [404 Media](https://www.404media.co/meta-is-going-to-let-job-candidates-use-ai-during-coding-tests/); [nocode.tech](https://www.nocode.tech/article/meta-now-allows-ai-in-coding-interviews-vibe-coding-just-got-the-ultimate-corporate-endorsement) (unconfirmed)
- [GL] **Anthropic** reportedly still **bans** AI use in its interviews, so practices diverge. — [TechRadar](https://www.techradar.com/pro/meta-is-going-to-let-candidates-use-ai-in-job-interviews)
- [GL] **Shopify** CEO memo "**AI usage is now a baseline expectation**" (sent internally Mar 2025, posted publicly Apr 2025):
  - Teams must show AI cannot do the work before requesting headcount.
  - AI-usage questions were added to performance and peer reviews.
  - The memo applies to all staff, including executives.

  — [eMarketer](https://www.emarketer.com/content/shopify-sets-ai-use-core-expectation-workers--requires-proof-ai-can-t-do-job-before-hiring-more)
- [GL] Coinbase bought company-wide **Cursor and GitHub Copilot** licenses. A commentary piece argues such mandates are pushing tool names into job posts. This is an anecdote, not a posting statistic. — [dev.to](https://dev.to/remoet/the-ai-coding-tool-you-use-is-now-a-hiring-signal-o2a) (secondary)
- [GL] Stack Overflow 2026 survey: only **24%** say their employer has approved tools or an official AI policy, and **29.7%** say AI use is optional and left to the individual. Formal AI requirements are therefore still a minority practice. — [IT Brief](https://itbrief.com.au/story/stack-overflow-survey-shows-developers-trust-ai-with-caveats)

**Korea**
- [KR] **Kurly (컬리)** (중앙일보, **Jun 10, 2025**):
  - Kurly allowed ChatGPT and similar tools in its developer coding test for the first time. The hiring round began **May 22, 2025**, and the test applies after resume screening.
  - Rationale: "AI 활용 의지도 개발자가 갖춰야 할 역량".
  - The same article says **Naver, Kakao, Line, Coupang, Baemin, Daangn and Toss** (네카라쿠배당토) ban AI in coding tests. Daangn had issued 2025 guidance to bring AI into all work and was considering AI in hiring tests.
  - **Date conflict:** a 2026 blog says Kurly allowed AI "from January 2025", citing JobKorea. JoongAng describes a process starting May 22, 2025.

  — [JoongAng via Daum](https://v.daum.net/v/20250610060102680); [aceround blog](https://www.aceround.app/ko/blog/ai-allowed-coding-test-korea/) (secondary)
- [KR] **Musinsa (무신사)** "AI 네이티브" new-grad developer hiring:
  - Posted **Jan 16, 2026**, with about 2,000 applicants and no resume form.
  - In the **2nd interview round, every candidate was given OpenAI Codex** to solve problems in work-like conditions (official press release **Feb 5, 2026**).
  - Hires go through a 6-month internship (from Mar 16, 2026) before conversion to "AI Native SW Engineer".
  - A blog describes this as a Codex-based "coding test", but the official wording is "interview round".

  — [Musinsa newsroom](https://newsroom.musinsa.com/newsroom-menu/2026-0205); [Byline Network](https://byline.network/2026/01/16_musinsa-4/)
- [KR] **Nexon (넥슨)** "넥토리얼 for 게임 프로그래머" internship (announced **Aug 25–27, 2026**):
  - **The coding test was abolished.** All applicants take an **AI interview** on common technical skills, followed by a new **"AI활용 역량평가"** stage where candidates solve work-like problems **with AI tools**.
  - Evaluated: AI understanding, problem approach and structured thinking.
  - Context: Korea Creative Content Agency data shows generative-AI use in the game industry at **70% (Q4 2025)** vs. **32.1%** across content industries.

  — [TWIG24](https://www.twig24.com/news/industry/2026/08/27/20260827500045); [iNews24](https://www.inews24.com/view/1998007)
- [KR] Naver, Kakao and Daangn are reportedly on the "ban" side in 2026. Kakao and Coupang reportedly use the **Monito proctoring program** (screen and audio recording) from the 2nd coding-test round. Separately, Naver, Kakao and Daangn reportedly **banned the agent tool "OpenClaw" internally for security reasons**. That is a workplace security policy, not a hiring rule. — [aceround blog](https://www.aceround.app/ko/blog/ai-allowed-coding-test-korea/) (secondary, policies not officially confirmed)
- [KR] A Korean posting on theteams.kr (frontend-leaning, not backend) reportedly lists in its **requirements** "프롬프트 엔지니어링, **에이전트 하네스(Claude Code, Codex 등) 구성** 등 LLM-driven 개발 경험", and in its **우대사항** "Claude Code, Codex, Cursor 같은 AI 코딩 도구를 즐겁게 쓰는 사람". The page returned 403, so this was seen via search snippet only. — [theteams.kr](https://www.theteams.kr/recruit_big/detail/1067626) (unverified)
- [KR] A 2026 report (Daum, Apr 16, 2026) says **Baekjoon Online Judge (BOJ)** is struggling because AI solves most existing problems, which raises doubts about algorithm problem banks as a screening signal. — [Daum](https://v.daum.net/v/20260416170902115) (via aceround summary, not opened)
- [KR] Bootcamp market shift (JoongAng, Jun 2025):
  - 대원 company's share of AI-coding courses went from 19.6% (2023) to 80% (2024) to 90.4% (Apr 2025).
  - Zerobase cut its basic programming course from 1 month to 2 weeks and its regular course from 6 to 4 months, filling the time with AI-coding lessons.

  — [JoongAng via Daum](https://v.daum.net/v/20250610060102680)

### Inferences
- Evaluation is splitting into two models:
  - **Proctored, AI-banned algorithm tests:** large Korean platforms (Naver, Kakao, Coupang).
  - **AI-provided, work-sample evaluation:** Kurly, Musinsa, Nexon, Canva, Meta pilot. These assess decomposition, verification of AI output, debugging and design.

  Junior candidates in Korea may need to prepare for both.
- Naming specific tools (Claude Code, Cursor, Codex) as requirements is still rare and mostly appears in AI-native startups. "AI 활용 역량" as a generic criterion is much more common (see Q4: Wanted survey, Kakao "AI 네이티브").
- AI-allowed interviews raise question difficulty and ambiguity (Canva). This shifts emphasis from syntax and algorithms toward requirement analysis and code review.

### Gaps
- No systematic count (Korea or global) of postings naming Claude Code, Cursor, Copilot or Codex. The LinkedIn and "35%/20%" claims are unverified.
- Could not confirm the official 2026 coding-test AI policies of Naver, Kakao, Toss, Daangn or Woowahan from company sources.
- No data on how many Korean companies have moved to AI-allowed 과제 (take-home) formats.

## Q4. What do surveys say about AI's impact on junior developer demand and expected skills?

### Takeaway
[GL] Developer-tool surveys show near-universal use of AI and agents but conditional trust: SO 2025 trust fell to 33%, and SO 2026 says 73% of AI users use it daily. Labor data shows early-career workers in AI-exposed jobs losing ground: Stanford/ADP puts 22–25-year-olds 19% below trend (Aug 2026), driven by **reduced hiring**. Indeed shows the posting rebound is 71% senior. [KR] The same pattern is stronger in Korea. The KLI found the new-grad share of SW developer postings fell from 53.5% (2022) to 37.4% (2024). BOK (Aug 2026) found 268k of 285k lost youth jobs were in AI-exposed industries, with youth employment in computer programming/SI down 16.6%. Only 12.4% of HR managers in Wanted's survey prefer new grads.

### Cited Findings
**Global developer surveys**
- [GL] **Stack Overflow 2025** (more than 49,000 respondents, 177 countries; Jul 2025):
  - **84%** use or plan to use AI tools (up from 76%).
  - **46% distrust** AI accuracy (up from 31%), and only **33% trust** it (down from 43%).
  - Favorability fell from **72% to 60%**.
  - 61.7% have ethical or security concerns about AI code.

  — [Stack Overflow press release](https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/); [SD Times](https://sdtimes.com/softwaredev/stack-overflow-developers-trust-in-ai-outputs-is-worsening-year-over-year/)
- [GL] **Stack Overflow 2026** (published **Oct 6, 2026**; more than 30,000 respondents over 7 weeks):
  - **73%** of AI coding assistant/agent users use them **daily**. Of daily users, 31% use AI 4+ hours per day.
  - **66%** of AI users use coding agents. Top agents are **Claude Code (66%)** and **GitHub Copilot (59%)**.
  - Main uses are generating code in familiar areas (67%) and debugging (61%). Only **20%** use AI to deploy, operate or troubleshoot production systems.
  - **93%** say source attribution is required to trust AI output.
  - **79% want to upskill in AI**, and 52% are still learning new coding skills.

  — [Stack Overflow blog](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/)
- [GL] SO 2026 secondary coverage:
  - 26.2% use automated agent workflows.
  - 48% trust AI "when they can easily verify output". Only 6.6% trust it for important decisions, and only 9.6% use answers as-is.
  - An Apr 2026 pulse survey put agent use at 59% vs. 31% in 2025 (Claude Code 41% to 55% in that pulse). That is a different sample, so it is not comparable.

  — [IT Brief](https://itbrief.com.au/story/stack-overflow-survey-shows-developers-trust-ai-with-caveats)
- [GL] **JetBrains State of Developer Ecosystem 2025** (Apr–Jun 2025, 24,534 devs, 194 countries; published Oct 2025):
  - **85%** regularly use AI for coding, and **62%** rely on at least one AI assistant, agent or editor.
  - **68% expect AI proficiency to become a job requirement**.
  - Top concerns: code quality (23%), AI's limited understanding of complex logic (18%), privacy and security (13%).

  — [JetBrains Research blog](https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/)
- [GL] **JetBrains 2026** (early results; Apr–May 2026, more than 15,000 devs; reported Sep 2026): **90%** of professional developers use AI coding agents at work at least weekly and **68% daily**. One report says Claude Code work use rose from 3% to 39% and Copilot fell from 29% to 21%. **Conflict:** another secondary source cites JetBrains as "Copilot 29%, Cursor and Claude Code tied at 18%". Tool-share figures are unreliable until the full report is published. — [i-programmer](https://www.i-programmer.info/news/99-professional/19118-jetbrains-reveals-widespread-adoption-of-ai-coding-agents-.html) (secondary)
- [GL] **GitHub Octoverse 2025** (Oct 28, 2025):
  - **More than 36M new developers** joined in a year (about one per second), bringing GitHub past 180M.
  - **TypeScript became #1** by monthly contributors (Aug 2025).
  - Merged PRs averaged 43.2M per month (+23% YoY).
  - The **Copilot coding agent authored more than 1M PRs** (May–Sep 2025).
  - About 80% of new users used Copilot in their first week (per VS Magazine).

  — [GitHub blog](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/); [Visual Studio Magazine](https://visualstudiomagazine.com/articles/2025/10/31/typescript-tops-github-octoverse-as-ai-era-reshapes-language-choices.aspx)

**Global labor-market studies**
- [GL] **Stanford Digital Economy Lab, "Canaries in the Coal Mine?"** (Brynjolfsson, Chandar, Chen):
  - The original paper (Aug 2025) found a **16%** relative employment decline for ages 22–25 in the most AI-exposed occupations.
  - The **Aug 12, 2026 revision** (ADP payroll data through Jun 2026) puts the gap at **19%**, up from about 15% a year earlier.
  - The gap is **driven mainly by reduced hiring, not separations**. Experienced workers show no comparable gap.
  - Declines are concentrated where AI substitutes for tasks, while employment is flat or rising where AI complements workers.
  - The pattern persists when excluding tech firms and computer occupations. The authors describe the results as descriptive, not causal.
  - Software developers are named among the affected occupations in press coverage. I did not find a developer-specific figure on the summary page.

  — [Stanford DEL](https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine/); [Brian Heger summary](https://www.brianheger.com/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-ai-august-2026-update-stanford-digital-economy-lab/)
- [GL] Indeed: **71%** of the US software posting rebound (May 2025 – May 2026) is senior. The author raises "seniority-biased technological change". — [Indeed Hiring Lab](https://hiringlab.indeed.com/?p=20708)
- [GL] Secondary figure: senior software postings **+13.5%** since Jan 2025 vs. entry-level **−6.3%** (attributed to Indeed, not verified). — [uvik.net](https://uvik.net/blog/ai-job-displacement-statistics/) (secondary)
- [GL] Indeed Hiring Lab Q3 2026 economist survey (Sep 24, 2026), titled "...Offer an AI Wage Warning for College Grads". Headline only, no figures seen. — [Indeed Hiring Lab](https://hiringlab.indeed.com/2026/09/24/q3-labor-market-outlook-survey/)

**Korea**
- [KR] **Bank of Korea (한국은행) BOK 이슈노트** "청년고용 위축, AI 탓인가? 변화하는 경력 사다리와 대응 과제" (**Aug 18, 2026**; 고용연구팀장 오삼일):
  - Of **285,000** youth jobs lost in 2022–2026, **268,000 (about 94%)** were in AI-highly-exposed industries. Jobs for people in their 50s rose 230,000 (173,000 in exposed industries).
  - Youth employment vs. Jun 2022: 정보서비스업 **−31.4%**, 출판업 −27.4%, **컴퓨터 프로그래밍·시스템통합·관리업 −16.6%**, 전문서비스업 −11.6%.
  - Firms increasingly prefer industry-experienced hires, and seniors' relative productivity has risen.
  - BOK concludes AI is an **accelerant** of an already-weakening career ladder, not the sole cause. Other factors: normalization of pandemic over-hiring, preference for experienced hires, and remote work reducing junior learning.
  - Policy suggestions: support real work experience over generic AI training, and redesign junior roles.

  — [iNews24](https://www.inews24.com/view/1995762); [이투데이](https://etoday.co.kr/news/view/2600316)
- **Conflict (BOK unemployment figures):**
  - iNews24 reports the average **expanded** unemployment rate since Nov 2022 as 9.4% for college-educated youth vs. 8.5% for junior-college-or-less (0.9pp gap).
  - Another summary reports average **unemployment** of 7.0% vs. 5.4% (1.6pp).

  These are likely different measures (expanded vs. standard unemployment) and need checking against the BOK original. — [iNews24](https://www.inews24.com/view/1995762); [Nocut News](https://www.nocutnews.co.kr/news/6582845)
- [KR] A separate press figure: **software developer** employment (occupation-level, 국가데이터처, as of May 2026) is down **10.1%**. Seen only in a search summary, not the BOK report. — [Nocut News](https://nocutnews.co.kr/news/6564134) (unverified)
- [KR] **Korea Labor Institute (한국노동연구원)** 「최근 소프트웨어 개발자 수 및 직무 변화」 (**Dec 2025**):
  - The **new-grad share of SW developer postings fell from 53.5% (2022) to 37.4% (2024)**, −16.1pp. That compares with −11.8pp for research/engineering and −5.6pp for all other jobs.
  - In 2024, workers with less than 3 years of experience fell by 9,000 while those with 3+ years rose by 42,000. The article does not attribute this to a named source.
  - More than 80% of SW developers use generative AI at work (source unnamed).

  — [TWIG24 (Jan 7, 2026)](https://www.twig24.com/news/2026/01/07/20260107014003)
- [KR] **Wanted Lab 2026 hiring-trend survey** (153 HR managers; ZDNet Korea, **Dec 8, 2025**):
  - Preferred experience: **4–7 years 49.7%**, 1–3 years 19.6%, 8–11 years 17.6%, **신입 only 12.4%**.
  - Development is the top focus hiring area at **28.1%**.
  - "AI·데이터 활용 역량" is the **4th** talent criterion at **24.2%**.
  - 74.5% plan to maintain or increase hiring.

  — [ZDNet Korea via Daum](https://v.daum.net/v/20251208161412362)
- [KR] **SPRi (소프트웨어정책연구소)** (reported **Jan 7, 2025**): generative AI is both a threat and an opportunity for junior developers. It may replace part of the junior role but speeds learning. Evaluation is shifting from coding ability to **AI-tool use, integrated system design and soft skills (collaboration, communication)**. The study was based on in-depth interviews with only **7** practitioners, so it is qualitative. — [Newsis](https://www.newsis.com/view/NISX20250107_0003024056)
- [KR] **goorm (구름)** survey (Aug 2025): the LLMs developers use most for coding are **Claude 42%**, ChatGPT 21% and Gemini 16%. — [Byline Network](https://byline.network/2025/08/821127/)
- [KR] Quote, Prof. 이재성 (Chung-Ang Univ., AI), Jan 2026: "숙련된 소프트웨어 개발자는 AI를 공부해 업무를 효율적으로 처리하는 데 익숙해졌다. 교육이 필요한 신입이 들어올 길이 완벽히 막혔다". — [TWIG24](https://www.twig24.com/news/2026/01/07/20260107014003)
- [KR] Korean experts (JoongAng, Jun 2025) said AI coding already exceeds junior developers with 1–3 years of experience. This is an expert claim, not measured. — [JoongAng via Daum](https://v.daum.net/v/20250610060102680)

### Inferences
- Korea and the US show the same signature: **the junior squeeze is in hiring, not layoffs**. Demand is recovering for senior and AI-titled roles (Stanford: reduced hiring; BOK: reduced inflow plus preference for experienced hires; KLI: falling new-grad share; Indeed: 71% senior).
- The Korean junior squeeze appears larger in magnitude for IT-specific industries (정보서비스업 −31.4% youth employment). Methodologies differ, so cross-country comparison is only indicative.
- Trust data (SO 2025 33% trust; SO 2026 only 9.6% use answers as-is) supports the employer emphasis on verification, review and debugging (see Q5).
- In SO 2026, only 20% use AI to deploy, operate or troubleshoot production. Production operations, which is infra/SRE territory, remains less AI-automated than code generation. This may make operations skills relatively more defensible for backend/infra juniors.

### Gaps
- **Programmers (프로그래머스) developer survey 2025/2026:** not found in searches.
- **Stack Overflow 2026** junior/early-career and job-market sections: not covered in the release blog. The full results site was not opened.
- **SPRi 2026** reports on AI talent demand: not found. Only the Jan 2025 qualitative study was found.
- No Korean survey directly measuring how employers' expectations of juniors changed due to AI tools, beyond generic "AI 활용 역량".
- Developer-specific figures from the Stanford Aug 2026 PDF were not extracted.

## Q5. Which fundamentals do experts argue matter more in the AI era?

### Takeaway
Across employer interview redesigns, surveys and expert commentary, the consensus is that AI raises the value of skills that judge and integrate code rather than produce it. These are problem decomposition and requirements clarification, code review and verification of AI output, debugging, system design/architecture, security, domain knowledge, and ownership. Prompt engineering and tool fluency rank lower in surveys.

### Cited Findings
- [GL] Canva's AI interview evaluates:
  - decomposing ambiguous requirements
  - sound technical decisions
  - **identifying and fixing problems in AI-generated code**
  - production standards
  - continued **CS fundamentals**
  - "full ownership of any code they produce"

  Candidates with little AI experience struggled to "guide AI or spot weak suggestions". — [Canva Engineering Blog](https://canva.dev/blog/engineering/yes-you-can-use-ai-in-our-interviews)
- [GL] **BairesDev Q2 2026 Dev Barometer** (1,569 developers: 1,059 juniors and 510 seniors, 77 countries):
  - **Critical thinking and analytical reasoning** top the list of skills that matter most (**52%**), followed by security, **system design** and **debugging**. Prompt engineering and AI tool fluency rank lower.
  - Juniors' biggest surprise skill gaps were **system design and architectural thinking at scale (19%)** and **critically evaluating and reviewing AI-generated code (18%)**.
  - Seniors say the most common graduate mistakes are **over-reliance on AI without understanding (64%)** and **weak debugging (50%)**.

  Caveat: BairesDev is a staffing vendor, and I could not fetch the page (403), so the figures come via search summary. — [BairesDev](https://www.bairesdev.com/blog/dev-barometer-q2-2026-ai-career-reset/) (unverified)
- [GL] Stack Overflow 2025: **61.3%** "want to be able to fully understand their code". — [Stack Overflow press release](https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/)
- [GL] Stack Overflow 2026: the most trusted context for AI is **project goals/requirements (85%)** and code/docs (73%). For work answers, developers rely on coworkers (72%), code and comments (63%) and internal docs (60%). This supports domain and context knowledge as differentiators. — [Stack Overflow blog](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/)
- [GL] JetBrains 2025: the top AI concerns are code quality (23%) and AI's limited grasp of complex logic (18%), which point to review and design skills. — [JetBrains Research blog](https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/)
- [GL] Practitioner commentary:
  - "the most critical skill is no longer writing code, but reading and reviewing it" — [Touch4IT](https://www.touch4it.com/blog/building-in-tech-what-is-the-role-of-a-junior-developer-in-the-age-of-ai)
  - Debugging is "the single most underinvested skill among junior developers in 2026" — [Thoughtgears Substack](https://thoughtgears.substack.com/p/the-junior-developer-survival-guide)
  - AI is good at isolated functions but "far less effective at understanding how an entire application fits together" — [DEV Community](https://dev.to/codexlancers/the-skills-junior-developers-need-to-stay-competitive-in-the-ai-era-4koi)

  All three are opinion pieces.
- [KR] SPRi (Jan 2025): evaluation is moving toward **AI-tool use, integrated system design and collaboration/communication**. — [Newsis](https://www.newsis.com/view/NISX20250107_0003024056)
- [KR] Nexon's AI assessment explicitly evaluates **AI understanding, problem approach and structured thinking (구조적 사고력)**. — [TWIG24](https://www.twig24.com/news/industry/2026/08/27/20260827500045)
- [KR] Musinsa's Codex interview aims to evaluate **problem-solving with AI in work-like conditions**. — [Musinsa newsroom](https://newsroom.musinsa.com/newsroom-menu/2026-0205)
- [KR] Hyundai AutoEver executive 지두현 (JoongAng, Jun 2025): without knowing **why a product is made and what customers want (domain/product sense)**, strong coding-test scores won't raise productivity. PlayMore CTO 김진중 said juniors who readily embrace AI may find new opportunities. — [JoongAng via Daum](https://v.daum.net/v/20250610060102680)
- [KR] Korean AI-backend job ads stress **backend engineering depth over language choice** ("주력 언어보다 백엔드 엔지니어링의 깊이"). They require concurrency, async, fault isolation, SLO operations and "문제의 근본 원인을 끝까지 추적하는 태도" (root-cause debugging). — [Wanted posting](https://www.wanted.co.kr/wd/361200); [demoday.co.kr](https://demoday.co.kr/recruits/11717)
- [KR] BOK recommends that training combine real tasks with guidance from skilled workers rather than generic AI-usage instruction. This implies practical experience and domain skill outrank AI tool training. — [iNews24](https://www.inews24.com/view/1995762)

### Inferences
- For backend/infra juniors, the skill stack employers reward most often has three tiers:
  1. **Verification:** reviewing AI-generated code, testing, debugging and root-cause analysis.
  2. **Design:** system design, failure modes, async and concurrency, cost and latency trade-offs, observability.
  3. **Context:** domain and requirements understanding.

  AI tool fluency is a baseline expectation rather than a differentiator.
- Evaluation is moving from "can you write the algorithm" to "can you own the system". AI-allowed interviews make questions more realistic and ambiguous, and LLM-backend ads emphasize operating non-deterministic components. Both point that way.
- Production operations is the least AI-automated area (only 20% of SO 2026 respondents use AI for it), so infra/SRE fundamentals (Kubernetes, networking, incident response, cost management) likely remain strong differentiators for juniors. This is an inference, not directly measured.

### Gaps
- No rigorous (non-vendor) study quantifying which fundamentals predict junior success with AI tools. The evidence is mostly employer practice, vendor surveys and opinion.
- No Korean large-scale survey of hiring managers on which fundamentals they now weigh more because of AI.
- Kakao CTO's reported view that AI-era developers need "기술 도메인 전문성·AI 협업 마인드" was seen only as a headline fragment in search results. The source URL is not verified, so it is not cited.
