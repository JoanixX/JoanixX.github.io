// Single source of truth for every project shown on this site.
// Both the game (src/data/zones.ts) and the static page (src/pages/projects.astro)
// read from here, so the two can never drift apart.

export interface ProjectEntry {
  id: string;
  name: string;
  /** One line under the title: what it is, in plain words. */
  tagline: string;
  /** 2-3 lines. What it does and the one design decision worth reading. */
  blurb: string;
  /** Short, checkable facts. Numbers where they exist, honest gaps where they don't. */
  metrics: string[];
  tech: string[];
  repo?: string;
  demo?: string;
  /** Shown instead of a repo link when there genuinely is no public repository. */
  noRepoReason?: string;
  /** Team context, when the work is not solo. */
  role?: string;
  featured?: boolean;
}

export interface ProjectSection {
  /** Matches the zone key used by the game map. */
  id: string;
  title: string;
  intro: string;
  accent: string;
  projects: ProjectEntry[];
}

export const sections: ProjectSection[] = [
  {
    id: "backend",
    title: "Backend Engineering",
    intro:
      "Services built for concurrency and correctness under load: atomic money handling, token identity, and persistence taken off the request path.",
    accent: "var(--accent-backend)",
    projects: [
      {
        id: "real_time_betting_validation_api",
        name: "Real-Time Betting Validation API",
        tagline: "High-concurrency bet validation in Rust",
        blurb:
          "Accepts live betting tickets and validates odds, checks balance and debits it inside a single Redis Lua script, then acknowledges the client before the write reaches PostgreSQL. Persistence runs off the request path through a Redis Streams consumer group that replays its pending list on startup, so a worker killed mid-batch re-processes rather than drops. Money is i64 cents end to end — the domain layer has no floating-point arithmetic.",
        metrics: [
          "1,000 req/s at p99 300 ms under k6 load tests",
          "Hexagonal layering: domain declares ports as traits, imports no infrastructure",
          "Unlabelled Prometheus counters, so series count cannot grow unbounded",
        ],
        tech: ["Rust", "Actix-Web", "Redis Streams", "PostgreSQL", "Docker", "k6", "Prometheus"],
        repo: "https://github.com/JoanixX/real_time_betting_validation_api",
        featured: true,
      },
      {
        id: "secure_banking_auth_service",
        name: "Secure Banking Auth Service",
        tagline: "Token identity with refresh-token theft detection",
        blurb:
          "Refresh tokens are opaque, stored only as SHA-256 digests, and grouped into families where each token is exchangeable exactly once. That single-use rule turns theft into a detectable event: if a token is ever exchanged twice, the service revokes the whole family instead of guessing which side is the attacker. Access tokens carry jti and ver claims, so a live JWT can be withdrawn before it expires.",
        metrics: [
          "Rotation race closed in SQL (UPDATE ... WHERE used_at IS NULL), not in application code",
          "Redis deny list keyed by jti with TTL equal to the token's remaining life",
          "Per-endpoint permission RBAC; one version bump retires unbounded live tokens",
        ],
        tech: ["Rust", "Axum", "PostgreSQL", "Redis", "JWT", "SHA-256"],
        repo: "https://github.com/JoanixX/secure_banking_auth_service",
        featured: true,
      },
      {
        id: "tutorgo-2",
        name: "TutorGo",
        tagline: "Academic tutoring platform on Java + Spring Boot",
        blurb:
          "A tutoring marketplace covering registration, tutor availability, session booking, simulated payments, session links and reviews. Java/Spring Boot REST backend against a relational schema, with a React and TypeScript client; the repository carries the UML model, the database diagram and the full delivered backlog.",
        metrics: [
          "16 user stories delivered end to end",
          "Relational schema and UML diagrams committed alongside the code",
        ],
        tech: ["Java", "Spring Boot", "React", "TypeScript", "SQL"],
        repo: "https://github.com/JoanixX/tutorgo-2",
        role: "University team project — five authors listed in the repository README.",
      },
    ],
  },
  {
    id: "datascience",
    title: "Data Science",
    intro:
      "Pipelines over real, messy public data, evaluated against a stated baseline — and labelled as unevaluated where no labelled ground truth exists.",
    accent: "var(--accent-ds)",
    projects: [
      {
        id: "goaldata-league",
        name: "GoalData League",
        tagline: "Football retrieval and ranking over 1.75M event actions",
        blurb:
          "Ingests match records, rosters and event streams into a relational schema, compresses player-seasons into PCA embeddings, and serves item-item similarity search: given a player-season, it ranks the closest comparables from a position-filtered pool. The same embedding backs a clustering layer, a k-NN similarity graph and an ILP starting-XI optimizer.",
        metrics: [
          "94,525 matches · 1,751,751 event actions · 52,387 player-seasons",
          "Recall@10 0.1435 vs 0.0614 baseline; MRR 0.1788 vs 0.0773; NDCG@10 0.1146 vs 0.0430",
          "Leave-one-out over 3,670 player-seasons, 1,662 queries, identical evaluation pool for both systems",
        ],
        tech: ["Python", "Polars", "pandas", "scikit-learn", "PCA", "Parquet", "Streamlit"],
        repo: "https://github.com/JoanixX/goaldata-league",
        demo: "https://tf-goal-data-league.streamlit.app/",
        featured: true,
      },
      {
        id: "hospital-bed-prediction",
        name: "Hospital Bed Prediction",
        tagline: "Distributed gradient descent in Go over 200,000 records",
        blurb:
          "Three generalized linear models — one logistic, two linear — trained by gradient descent in Go to predict mortality risk, survival days and treatment cost. Training parallelizes two ways over the same map-reduce code: a goroutine fan-out inside a node, and a parameter-server cluster over net/rpc across nodes. The REST, JWT and WebSocket layers are standard library; go.mod declares two direct dependencies.",
        metrics: [
          "Mortality AUC 0.770 against a 0.500 random-ranking reference; accuracy 0.832",
          "Survival R² 0.906 (RMSE 199 days) · Cost R² 0.983 (RMSE $1,494)",
          "2.95× speedup saturating at 4 workers on a 4-core machine, measured over 3 repetitions",
        ],
        tech: ["Go", "MongoDB", "Redis", "net/rpc", "Docker"],
        repo: "https://github.com/JoanixX/hospital-bed-prediction",
        featured: true,
      },
      {
        id: "political_data_peru",
        name: "Political Data Peru",
        tagline: "Entity resolution linking candidates to public sanction records",
        blurb:
          "A medallion pipeline in Polars that consolidates Peruvian presidential and congressional candidates from JNE, Congress and government transparency portals, links each one to companies sanctioned by OSCE, and scores a reproducible risk index served by a FastAPI read layer over Parquet. Deterministic ID-to-tax-ID matches and fuzzy name matches are tagged separately on every row, so an unverifiable guess never looks like a documented link.",
        metrics: [
          "Five-stage layout: raw → staging → normalized → matched → curated",
          "Financial risk on median + MAD × 1.4826 rather than mean and standard deviation, because declared assets are heavily skewed",
          "No labelled ground truth for the matcher — precision and recall are unmeasured, and the repository says so",
        ],
        tech: ["Python", "Polars", "FastAPI", "Parquet", "FAISS", "Docker"],
        repo: "https://github.com/JoanixX/political_data_peru",
      },
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    intro:
      "Embedding retrieval, computer vision and NLP pipelines — with the evaluation gap stated plainly wherever the accuracy work is not done yet.",
    accent: "var(--accent-ai)",
    projects: [
      {
        id: "job-swipe",
        name: "JobSwipe",
        tagline: "Embedding-based student/offer matching across four services",
        blurb:
          "Student profiles and company offers are turned into field-weighted text, embedded with a multilingual sentence-transformer, indexed in Qdrant and ranked by cosine k-NN. A two-sided swipe layer records intent and promotes a pair to a match only when both sides swipe right. Field importance is expressed by repeating terms in the input text — required skills ×10, area ×8 — because the encoder has no per-field weighting input.",
        metrics: [
          "Four services; 20 relational tables under async SQLAlchemy, laid out as ports and adapters",
          "Spanish text lemmatized and stop-word filtered with spaCy before encoding",
          "Recommender is unevaluated: no held-out split and no relevance labels yet, stated in the repository",
        ],
        tech: ["Python", "FastAPI", "PostgreSQL", "Qdrant", "sentence-transformers", "spaCy"],
        repo: "https://github.com/JoanixX/job-swipe",
      },
      {
        id: "autoscan",
        name: "Autoscan",
        tagline: "Licence-plate detection from detector to field apps",
        blurb:
          "A YOLOv8 detector trained on 2,620 annotated Peruvian licence-plate photos, wrapped in a Flask service that crops the plate and runs OCR over it. An Electron desktop app is the inspection station and an Expo mobile app is the field client; both talk to the same HTTP API over one Supabase schema.",
        metrics: [
          "4,144 boxes over 2,433 training images — 1.70 plates per image, so multi-object rather than single-object",
          "Median box 504 px², 0.12% of the frame: below the COCO small-object threshold, which is what drives imgsz",
          "Detector has no committed evaluation — no mAP figure is claimed, and the repository says why",
        ],
        tech: ["Python", "YOLOv8", "PaddleOCR", "Flask", "Supabase", "Electron", "React Native"],
        repo: "https://github.com/MauColab/Autoscan",
        role: "Collaborative repository — hosted under a teammate's account.",
      },
      {
        id: "semantic-search-court-records",
        name: "Semantic Search — Court Records",
        tagline: "Concurrent anonymization pipeline for judicial case files",
        blurb:
          "A Go worker-pool pipeline that normalizes and anonymizes the text of Peruvian Constitutional Court case records, fed by a Python scraper and EDA layer that build the corpus. The measurement question the repository answers is how a channel-fed goroutine pool scales from 15 to 150 workers.",
        metrics: [
          "149,387 source case records; pipeline scales to a combined corpus of roughly 1.4M rows",
          "10.26× throughput going from 15 to 150 workers, measured over 1,100 timed runs committed to the repo",
          "Efficiency above 100% is an artifact of a simulated per-record cost, not real CPU work — flagged as a limitation",
        ],
        tech: ["Go", "Python", "pandas", "semantic search"],
        repo: "https://github.com/JoanixX/semantic-search-court-records",
        featured: true,
      },
    ],
  },
  {
    id: "hub",
    title: "Hub Central",
    intro:
      "Full systems rather than single services: a trained model or an engine at the core, plus the API and the client that actually ship it.",
    accent: "var(--accent-hub)",
    projects: [
      {
        id: "aldimi",
        name: "ALDIMI Predict",
        tagline: "Six production models, ONNX, and a Rust inference API",
        blurb:
          "A machine learning system for the ALDIMI NGO covering patient triage priority, 7- and 14-day critical stock, consumption demand, length of stay and donation projection. The Python pipeline selects between Decision Tree, Random Forest and XGBoost per front and exports to ONNX; a Rust/Axum service loads the ONNX sessions for inference, and a React dashboard drives it. Runs entirely on free tiers.",
        metrics: [
          "F1-macro 0.855 / 0.882 / 0.878 on the three classification fronts",
          "MAE 1.19 units (R² 0.944) on demand; MAE 6.10 days (R² 0.948) on length of stay",
          "Leakage columns explicitly excluded from the stock fronts; cross-validation ≈ test on all six",
        ],
        tech: ["Python", "XGBoost", "ONNX Runtime", "Rust", "Axum", "React", "Vite", "Docker", "Render"],
        repo: "https://github.com/JoanixX/ALDIMI_MachineLearning",
        featured: true,
      },
      {
        id: "candidate_ranking_platform",
        name: "Candidate Ranking Platform",
        tagline: "CV ingestion, simulated AI interview, automated ranking",
        blurb:
          "A recruiter-facing platform that stores uploaded CVs, extracts structured information from the PDFs, runs a simulated interview through a conversational assistant, and produces an automated ranking of candidates per job offer. FastAPI backend with a React and TypeScript client.",
        metrics: [
          "Prototype stage: persistence is an in-memory cache, not a database",
          "Scoring combines interview performance with fit against the offer",
        ],
        tech: ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "PDF extraction"],
        repo: "https://github.com/JoanixX/candidate_ranking_platform",
      },
      {
        id: "joaquincito-emu-gba",
        name: "JoaquincitoEmuGBA",
        tagline: "GBA emulator product on top of mGBA, with cross-device sync",
        blurb:
          "A Game Boy Advance emulator product built as a branding and feature layer over mGBA rather than a rewrite, with a Dockerized Windows build pipeline and a planned save library synchronized between PC and Android through an embedded Syncthing node. The repository records the exact diff applied over mGBA 0.10.5 and every third-party licence it inherits.",
        metrics: [
          "Desktop build pipeline shipped; the Android phase is design-only so far",
          "Ships no ROMs and no BIOS files, and states that explicitly",
          "MPL-2.0 obligations of the upstream core kept separate from the MIT-licensed new code",
        ],
        tech: ["C", "mGBA", "Docker", "PowerShell", "Syncthing"],
        repo: "https://github.com/JoanixX/JoaquincitoEmuGBA",
      },
    ],
  },
  {
    id: "experience",
    title: "Experience",
    intro: "Where the work was paid, shipped to users, or both.",
    accent: "var(--accent-exp)",
    projects: [
      {
        id: "zoluxiones",
        name: "Zoluxiones — Software Engineering Intern",
        tagline: "IT consultancy · current role",
        blurb:
          "Software engineering intern at an IT consultancy, working on internal platform and automation work. Client deliverables and internal products are confidential and are deliberately not described here.",
        metrics: ["Current role", "Backend and automation work under confidentiality"],
        tech: ["Python", "TypeScript", "PostgreSQL", "Docker", "CI/CD"],
        noRepoReason: "Work is confidential — no public repository.",
      },
      {
        id: "chambeaya",
        name: "ChambeaYa — Co-founder",
        tagline: "CV-matching marketplace shipped to real users",
        blurb:
          "Co-founded a platform connecting university students with real project challenges posted by companies, and took it to real users. The backend owns the relational domain — students, companies, offers, skills, matches and agreements — over async SQLAlchemy and PostgreSQL, and delegates candidate ranking to a separate AI service over HTTP.",
        metrics: [
          "15 domain entities and 8 use cases behind explicit port interfaces",
          "8 HTTP endpoints; FastAPI confined to the input adapter",
          "No automated tests and no CI test stage — stated in the repository",
        ],
        tech: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "JWT", "gunicorn", "Azure"],
        repo: "https://github.com/JoanixX/ChambeaYa_Backend",
      },
      {
        id: "kreante",
        name: "Kreante — No-Code Developer Intern",
        tagline: "MVP delivery on Bubble",
        blurb:
          "Built functional MVPs on Bubble so client ideas could be validated with users before any engineering budget was committed.",
        metrics: ["No-code delivery on Bubble"],
        tech: ["Bubble", "No-code"],
        noRepoReason: "No-code platform work — nothing to host on GitHub.",
      },
    ],
  },
];

/** Flattened view, useful for counting and for structured data. */
export const allProjects: ProjectEntry[] = sections.flatMap((s) => s.projects);
