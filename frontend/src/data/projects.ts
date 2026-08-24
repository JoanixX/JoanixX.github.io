// Single source of truth for every project shown on this site.
// The game (src/data/zones.ts) and the static pages (/projects, /es/proyectos)
// all read from here, so the map and the crawlable pages cannot drift apart.

import type { Locale, Localized } from "../i18n/config";

export interface ProjectEntry {
  id: string;
  /** Product names are not translated. */
  name: string;
  /** One line under the title: what it is, in plain words. */
  tagline: Localized<string>;
  /** 2-3 lines. What it does and the one design decision worth reading. */
  blurb: Localized<string>;
  /** Short, checkable facts. Numbers where they exist, honest gaps where they don't. */
  metrics: Localized<string[]>;
  tech: string[];
  repo?: string;
  demo?: string;
  /** Shown instead of a repo link when there genuinely is no public repository. */
  noRepoReason?: Localized<string>;
  /** For experience entries: where to read about the role, not its source code. */
  link?: { url: string; label: Localized<string> };
  /** Team context, when the work is not solo. */
  role?: Localized<string>;
  featured?: boolean;
}

export interface ProjectSection {
  /** Matches the zone key used by the game map. */
  id: string;
  title: Localized<string>;
  intro: Localized<string>;
  accent: string;
  projects: ProjectEntry[];
}

export const sections: ProjectSection[] = [
  {
    id: "backend",
    title: { en: "Backend Engineering", es: "Ingeniería de Backend" },
    intro: {
      en: "Services built for concurrency and correctness under load: atomic money handling, token identity, and persistence taken off the request path.",
      es: "Servicios pensados para concurrencia y corrección bajo carga: manejo atómico de dinero, identidad por tokens y persistencia fuera del camino de la petición.",
    },
    accent: "var(--accent-backend)",
    projects: [
      {
        id: "real_time_betting_validation_api",
        name: "Real-Time Betting Validation API",
        tagline: {
          en: "High-concurrency bet validation in Rust",
          es: "Validación de apuestas de alta concurrencia en Rust",
        },
        blurb: {
          en: "Accepts live betting tickets and validates odds, checks balance and debits it inside a single Redis Lua script, then acknowledges the client before the write reaches PostgreSQL. Persistence runs off the request path through a Redis Streams consumer group that replays its pending list on startup, so a worker killed mid-batch re-processes rather than drops. Money is i64 cents end to end — the domain layer has no floating-point arithmetic.",
          es: "Acepta tickets de apuestas en vivo y valida cuotas, verifica saldo y lo debita dentro de un único script Lua de Redis, luego responde al cliente antes de que la escritura llegue a PostgreSQL. La persistencia corre fuera del camino de la petición mediante un consumer group de Redis Streams que reprocesa su lista pendiente al arrancar, así un worker que muere a mitad de lote reprocesa en vez de perder datos. El dinero son centavos i64 de punta a punta — la capa de dominio no tiene aritmética de punto flotante.",
        },
        metrics: {
          en: [
            "1,000 req/s at p99 300 ms under k6 load tests",
            "Hexagonal layering: domain declares ports as traits, imports no infrastructure",
            "Unlabelled Prometheus counters, so series count cannot grow unbounded",
          ],
          es: [
            "1,000 req/s con p99 de 300 ms bajo pruebas de carga con k6",
            "Arquitectura hexagonal: el dominio declara puertos como traits y no importa infraestructura",
            "Contadores de Prometheus sin labels, así el número de series no puede crecer sin límite",
          ],
        },
        tech: ["Rust", "Actix-Web", "Redis Streams", "PostgreSQL", "Docker", "k6", "Prometheus"],
        repo: "https://github.com/JoanixX/real_time_betting_validation_api",
        featured: true,
      },
      {
        id: "secure_banking_auth_service",
        name: "Secure Banking Auth Service",
        tagline: {
          en: "Token identity with refresh-token theft detection",
          es: "Identidad por tokens con detección de robo de refresh tokens",
        },
        blurb: {
          en: "Refresh tokens are opaque, stored only as SHA-256 digests, and grouped into families where each token is exchangeable exactly once. That single-use rule turns theft into a detectable event: if a token is ever exchanged twice, the service revokes the whole family instead of guessing which side is the attacker. Access tokens carry jti and ver claims, so a live JWT can be withdrawn before it expires.",
          es: "Los refresh tokens son opacos, se guardan solo como digests SHA-256 y se agrupan en familias donde cada token es canjeable exactamente una vez. Esa regla de un solo uso convierte el robo en un evento detectable: si un token llega a canjearse dos veces, el servicio revoca la familia entera en vez de adivinar cuál de las dos partes es el atacante. Los access tokens llevan claims jti y ver, así que un JWT vivo puede retirarse antes de que expire.",
        },
        metrics: {
          en: [
            "Rotation race closed in SQL (UPDATE ... WHERE used_at IS NULL), not in application code",
            "Redis deny list keyed by jti with TTL equal to the token's remaining life",
            "Per-endpoint permission RBAC; one version bump retires unbounded live tokens",
          ],
          es: [
            "La carrera de rotación se cierra en SQL (UPDATE ... WHERE used_at IS NULL), no en código de aplicación",
            "Lista de denegación en Redis por jti, con TTL igual a la vida restante del token",
            "RBAC por permisos y endpoint; un incremento de versión retira una cantidad ilimitada de tokens vivos",
          ],
        },
        tech: ["Rust", "Axum", "PostgreSQL", "Redis", "JWT", "SHA-256"],
        repo: "https://github.com/JoanixX/secure_banking_auth_service",
        featured: true,
      },
      {
        id: "b2b-product-catalog-quote-system",
        name: "B2B Catalog & Quotation Platform",
        tagline: {
          en: "Rust/Axum backend for a lead-generation catalogue",
          es: "Backend en Rust/Axum para un catálogo de generación de leads",
        },
        blurb: {
          en: "A catalogue platform for companies that do not sell online but generate leads through quotations. The public side browses products with search, filters and PDF datasheets and submits quote requests; behind it sits an admin panel with full CRUD over products and categories, file uploads and request management. Peruvian tax IDs are validated with the Módulo 11 checksum rather than a length check, so an invalid RUC is rejected at the form instead of downstream.",
          es: "Una plataforma de catálogo para empresas que no venden en línea sino que generan leads mediante cotizaciones. El lado público navega productos con búsqueda, filtros y fichas técnicas en PDF y envía solicitudes de cotización; detrás hay un panel de administración con CRUD completo sobre productos y categorías, carga de archivos y gestión de solicitudes. Los RUC peruanos se validan con el algoritmo de Módulo 11 y no por longitud, así que un RUC inválido se rechaza en el formulario y no aguas abajo.",
        },
        metrics: {
          en: [
            "Rust and Axum over PostgreSQL, with S3-compatible file storage",
            "JWT authentication with Argon2id password hashing",
            "Astro and TypeScript frontend with Nano Stores for shared state",
          ],
          es: [
            "Rust y Axum sobre PostgreSQL, con almacenamiento de archivos compatible con S3",
            "Autenticación JWT con hashing de contraseñas mediante Argon2id",
            "Frontend en Astro y TypeScript con Nano Stores para el estado compartido",
          ],
        },
        tech: ["Rust", "Axum", "PostgreSQL", "JWT", "Argon2id", "Astro", "TypeScript", "S3"],
        repo: "https://github.com/JoanixX/b2b-product-catalog-quote-system",
      },
    ],
  },
  {
    id: "datascience",
    title: { en: "Data Science", es: "Ciencia de Datos" },
    intro: {
      en: "Pipelines over real, messy public data, evaluated against a stated baseline — and labelled as unevaluated where no labelled ground truth exists.",
      es: "Pipelines sobre datos públicos reales y sucios, evaluados contra un baseline explícito — y marcados como no evaluados donde no existe ground truth etiquetado.",
    },
    accent: "var(--accent-ds)",
    projects: [
      {
        id: "goaldata-league",
        name: "GoalData League",
        tagline: {
          en: "Football retrieval and ranking over 1.75M event actions",
          es: "Recuperación y ranking de fútbol sobre 1.75M de acciones de evento",
        },
        blurb: {
          en: "Ingests match records, rosters and event streams into a relational schema, compresses player-seasons into PCA embeddings, and serves item-item similarity search: given a player-season, it ranks the closest comparables from a position-filtered pool. The same embedding backs a clustering layer, a k-NN similarity graph and an ILP starting-XI optimizer.",
          es: "Ingesta partidos, plantillas y streams de eventos en un esquema relacional, comprime temporadas-jugador en embeddings PCA y sirve búsqueda de similitud item-item: dada una temporada-jugador, rankea los comparables más cercanos dentro de un pool filtrado por posición. El mismo embedding alimenta una capa de clustering, un grafo de similitud k-NN y un optimizador ILP de once inicial.",
        },
        metrics: {
          en: [
            "94,525 matches · 1,751,751 event actions · 52,387 player-seasons",
            "Recall@10 0.1435 vs 0.0614 baseline; MRR 0.1788 vs 0.0773; NDCG@10 0.1146 vs 0.0430",
            "Leave-one-out over 3,670 player-seasons, 1,662 queries, identical evaluation pool for both systems",
          ],
          es: [
            "94,525 partidos · 1,751,751 acciones de evento · 52,387 temporadas-jugador",
            "Recall@10 0.1435 vs 0.0614 del baseline; MRR 0.1788 vs 0.0773; NDCG@10 0.1146 vs 0.0430",
            "Leave-one-out sobre 3,670 temporadas-jugador, 1,662 consultas, pool de evaluación idéntico para ambos sistemas",
          ],
        },
        tech: ["Python", "Polars", "pandas", "scikit-learn", "PCA", "Parquet", "Streamlit"],
        repo: "https://github.com/JoanixX/goaldata-league",
        demo: "https://tf-goal-data-league.streamlit.app/",
        featured: true,
      },
      {
        id: "hospital-bed-prediction",
        name: "Hospital Bed Prediction",
        tagline: {
          en: "Distributed gradient descent in Go over 200,000 records",
          es: "Descenso de gradiente distribuido en Go sobre 200,000 registros",
        },
        blurb: {
          en: "Three generalized linear models — one logistic, two linear — trained by gradient descent in Go to predict mortality risk, survival days and treatment cost. Training parallelizes two ways over the same map-reduce code: a goroutine fan-out inside a node, and a parameter-server cluster over net/rpc across nodes. The REST, JWT and WebSocket layers are standard library; go.mod declares two direct dependencies.",
          es: "Tres modelos lineales generalizados — uno logístico, dos lineales — entrenados por descenso de gradiente en Go para predecir riesgo de mortalidad, días de supervivencia y costo de tratamiento. El entrenamiento paraleliza de dos formas sobre el mismo código map-reduce: fan-out de goroutines dentro de un nodo y un clúster parameter-server sobre net/rpc entre nodos. Las capas REST, JWT y WebSocket son librería estándar; go.mod declara dos dependencias directas.",
        },
        metrics: {
          en: [
            "Mortality AUC 0.770 against a 0.500 random-ranking reference; accuracy 0.832",
            "Survival R² 0.906 (RMSE 199 days) · Cost R² 0.983 (RMSE $1,494)",
            "2.95× speedup saturating at 4 workers on a 4-core machine, measured over 3 repetitions",
          ],
          es: [
            "AUC de mortalidad 0.770 contra una referencia aleatoria de 0.500; accuracy 0.832",
            "R² de supervivencia 0.906 (RMSE 199 días) · R² de costo 0.983 (RMSE $1,494)",
            "Speedup de 2.95× que satura en 4 workers en una máquina de 4 núcleos, medido en 3 repeticiones",
          ],
        },
        tech: ["Go", "MongoDB", "Redis", "net/rpc", "Docker"],
        repo: "https://github.com/JoanixX/hospital-bed-prediction",
        featured: true,
      },
      {
        id: "political_data_peru",
        name: "Political Data Peru",
        tagline: {
          en: "Entity resolution linking candidates to public sanction records",
          es: "Resolución de entidades que vincula candidatos con registros públicos de sanciones",
        },
        blurb: {
          en: "A medallion pipeline in Polars that consolidates Peruvian presidential and congressional candidates from JNE, Congress and government transparency portals, links each one to companies sanctioned by OSCE, and scores a reproducible risk index served by a FastAPI read layer over Parquet. Deterministic ID-to-tax-ID matches and fuzzy name matches are tagged separately on every row, so an unverifiable guess never looks like a documented link.",
          es: "Un pipeline medallion en Polars que consolida candidatos presidenciales y congresales peruanos desde el JNE, el Congreso y portales de transparencia, vincula cada uno con empresas sancionadas por OSCE y calcula un índice de riesgo reproducible servido por una capa de lectura FastAPI sobre Parquet. Los matches determinísticos DNI→RUC y los difusos por nombre se etiquetan por separado en cada fila, así una conjetura no verificable nunca parece un vínculo documentado.",
        },
        metrics: {
          en: [
            "Five-stage layout: raw → staging → normalized → matched → curated",
            "Financial risk on median + MAD × 1.4826 rather than mean and standard deviation, because declared assets are heavily skewed",
            "No labelled ground truth for the matcher — precision and recall are unmeasured, and the repository says so",
          ],
          es: [
            "Cinco capas: raw → staging → normalized → matched → curated",
            "Riesgo financiero sobre mediana + MAD × 1.4826 en vez de media y desviación estándar, porque los bienes declarados están muy sesgados",
            "El matcher no tiene ground truth etiquetado — precisión y recall no están medidos, y el repositorio lo declara",
          ],
        },
        tech: ["Python", "Polars", "FastAPI", "Parquet", "FAISS", "Docker"],
        repo: "https://github.com/JoanixX/political_data_peru",
      },
    ],
  },
  {
    id: "ai",
    title: { en: "Artificial Intelligence", es: "Inteligencia Artificial" },
    intro: {
      en: "Embedding retrieval, computer vision and NLP pipelines — with the evaluation gap stated plainly wherever the accuracy work is not done yet.",
      es: "Recuperación por embeddings, visión por computadora y pipelines de NLP — con la brecha de evaluación declarada sin rodeos donde el trabajo de precisión aún no está hecho.",
    },
    accent: "var(--accent-ai)",
    projects: [
      {
        id: "job-swipe",
        name: "JobSwipe",
        tagline: {
          en: "Embedding-based student/offer matching across four services",
          es: "Matching estudiante/oferta por embeddings en cuatro servicios",
        },
        blurb: {
          en: "Student profiles and company offers are turned into field-weighted text, embedded with a multilingual sentence-transformer, indexed in Qdrant and ranked by cosine k-NN. A two-sided swipe layer records intent and promotes a pair to a match only when both sides swipe right. Field importance is expressed by repeating terms in the input text — required skills ×10, area ×8 — because the encoder has no per-field weighting input.",
          es: "Los perfiles de estudiantes y las ofertas de empresas se convierten en texto ponderado por campo, se embeben con un sentence-transformer multilingüe, se indexan en Qdrant y se rankean por k-NN coseno. Una capa de swipe de dos lados registra la intención y solo promueve un par a match cuando ambos deslizan a la derecha. La importancia de cada campo se expresa repitiendo términos en el texto de entrada — skills requeridos ×10, área ×8 — porque el encoder no acepta ponderación por campo.",
        },
        metrics: {
          en: [
            "Four services; 20 relational tables under async SQLAlchemy, laid out as ports and adapters",
            "Spanish text lemmatized and stop-word filtered with spaCy before encoding",
            "Recommender is unevaluated: no held-out split and no relevance labels yet, stated in the repository",
          ],
          es: [
            "Cuatro servicios; 20 tablas relacionales sobre SQLAlchemy async, organizadas como puertos y adaptadores",
            "El texto en español se lematiza y se le quitan stop-words con spaCy antes de codificar",
            "El recomendador no está evaluado: aún no hay split held-out ni etiquetas de relevancia, y el repositorio lo declara",
          ],
        },
        tech: ["Python", "FastAPI", "PostgreSQL", "Qdrant", "sentence-transformers", "spaCy"],
        repo: "https://github.com/JoanixX/job-swipe",
      },
      {
        id: "autoscan",
        name: "Autoscan",
        tagline: {
          en: "Licence-plate detection from detector to field apps",
          es: "Detección de placas, del detector a las apps de campo",
        },
        blurb: {
          en: "A YOLOv8 detector trained on 2,620 annotated Peruvian licence-plate photos, wrapped in a Flask service that crops the plate and runs OCR over it. An Electron desktop app is the inspection station and an Expo mobile app is the field client; both talk to the same HTTP API over one Supabase schema.",
          es: "Un detector YOLOv8 entrenado con 2,620 fotos anotadas de placas peruanas, envuelto en un servicio Flask que recorta la placa y le corre OCR. Una app de escritorio en Electron es la estación de inspección y una app móvil en Expo es el cliente de campo; ambas hablan con la misma API HTTP sobre un solo esquema de Supabase.",
        },
        metrics: {
          en: [
            "4,144 boxes over 2,433 training images — 1.70 plates per image, so multi-object rather than single-object",
            "Median box 504 px², 0.12% of the frame: below the COCO small-object threshold, which is what drives imgsz",
            "Detector has no committed evaluation — no mAP figure is claimed, and the repository says why",
          ],
          es: [
            "4,144 cajas sobre 2,433 imágenes de entrenamiento — 1.70 placas por imagen, o sea multi-objeto, no un solo objeto",
            "Caja mediana de 504 px², 0.12% del frame: por debajo del umbral de objeto pequeño de COCO, que es lo que determina imgsz",
            "El detector no tiene evaluación commiteada — no se afirma ningún mAP, y el repositorio explica por qué",
          ],
        },
        tech: ["Python", "YOLOv8", "PaddleOCR", "Flask", "Supabase", "Electron", "React Native"],
        repo: "https://github.com/MauColab/Autoscan",
        role: {
          en: "Collaborative repository — hosted under a teammate's account.",
          es: "Repositorio colaborativo — alojado en la cuenta de un compañero de equipo.",
        },
      },
      {
        id: "pictogram-web",
        name: "PictoChat",
        tagline: {
          en: "Pictogram-based communication assistant",
          es: "Asistente de comunicación con pictogramas",
        },
        blurb: {
          en: "An augmentative-communication web app that turns Spanish text into pictograms in real time. A FastAPI backend serves both REST and WebSocket chat, lemmatises incoming text with spaCy before looking the terms up against the ARASAAC pictogram set, and drives a sentence builder and a tutor assistant on a React client.",
          es: "Una aplicación web de comunicación aumentativa que convierte texto en español a pictogramas en tiempo real. Un backend en FastAPI sirve chat por REST y WebSocket, lematiza el texto entrante con spaCy antes de buscar los términos contra el conjunto de pictogramas ARASAAC, y alimenta un constructor de oraciones y un asistente tutor en un cliente React.",
        },
        metrics: {
          en: [
            "FastAPI over REST and WebSockets; React and Vite client",
            "spaCy es_core_news_lg lemmatises Spanish before the pictogram lookup, so inflected forms resolve to one symbol",
            "Photo-to-pictogram classification is listed as conditional in the repository — treat that piece as partial",
          ],
          es: [
            "FastAPI sobre REST y WebSockets; cliente en React y Vite",
            "spaCy es_core_news_lg lematiza el español antes de buscar el pictograma, así las formas flexionadas resuelven a un mismo símbolo",
            "La clasificación de foto a pictograma figura como condicional en el repositorio — esa parte está incompleta",
          ],
        },
        tech: ["Python", "FastAPI", "WebSockets", "spaCy", "TensorFlow/Keras", "React", "Vite", "Tailwind CSS"],
        repo: "https://github.com/JoanixX/pictogram-web",
      },
    ],
  },
  {
    id: "hub",
    title: { en: "Hub Central", es: "Hub Central" },
    intro: {
      en: "Systems that cross more than one layer and more than one language: a pipeline with the client that consumes it, a backend with the model and the interface on top.",
      es: "Sistemas que cruzan más de una capa y más de un lenguaje: un pipeline con el cliente que lo consume, un backend con el modelo y la interfaz encima.",
    },
    accent: "var(--accent-hub)",
    projects: [
      {
        id: "semantic-search-court-records",
        name: "Semantic Search — Court Records",
        tagline: {
          en: "Concurrent anonymization pipeline for judicial case files",
          es: "Pipeline concurrente de anonimización de expedientes judiciales",
        },
        blurb: {
          en: "A Go worker-pool pipeline that normalizes and anonymizes the text of Peruvian Constitutional Court case records, fed by a Python scraper and EDA layer that build the corpus. The measurement question the repository answers is how a channel-fed goroutine pool scales from 15 to 150 workers.",
          es: "Un pipeline de worker pool en Go que normaliza y anonimiza el texto de expedientes del Tribunal Constitucional peruano, alimentado por un scraper y una capa de EDA en Python que construyen el corpus. La pregunta que el repositorio responde con mediciones es cómo escala un pool de goroutines alimentado por canales de 15 a 150 workers.",
        },
        metrics: {
          en: [
            "149,387 source case records; pipeline scales to a combined corpus of roughly 1.4M rows",
            "10.26× throughput going from 15 to 150 workers, measured over 1,100 timed runs committed to the repo",
            "Efficiency above 100% is an artifact of a simulated per-record cost, not real CPU work — flagged as a limitation",
          ],
          es: [
            "149,387 expedientes de origen; el pipeline escala a un corpus combinado de aproximadamente 1.4M de filas",
            "10.26× de throughput al pasar de 15 a 150 workers, medido en 1,100 corridas cronometradas commiteadas al repo",
            "La eficiencia por encima del 100% es un artefacto de un costo por registro simulado, no trabajo real de CPU — declarado como limitación",
          ],
        },
        tech: ["Go", "Python", "pandas", "semantic search"],
        repo: "https://github.com/JoanixX/semantic-search-court-records",
        featured: true,
      },
      {
        id: "candidate_ranking_platform",
        name: "Candidate Ranking Platform",
        tagline: {
          en: "CV ingestion, simulated AI interview, automated ranking",
          es: "Ingesta de CVs, entrevista simulada con IA y ranking automatizado",
        },
        blurb: {
          en: "A recruiter-facing platform that stores uploaded CVs, extracts structured information from the PDFs, runs a simulated interview through a conversational assistant, and produces an automated ranking of candidates per job offer. FastAPI backend with a React and TypeScript client.",
          es: "Una plataforma para reclutadores que almacena CVs, extrae información estructurada de los PDFs, corre una entrevista simulada con un asistente conversacional y produce un ranking automatizado de candidatos por oferta laboral. Backend en FastAPI con cliente en React y TypeScript.",
        },
        metrics: {
          en: [
            "Prototype stage: persistence is an in-memory cache, not a database",
            "Scoring combines interview performance with fit against the offer",
          ],
          es: [
            "En etapa de prototipo: la persistencia es una caché en memoria, no una base de datos",
            "El scoring combina desempeño en la entrevista con ajuste a la oferta",
          ],
        },
        tech: ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "PDF extraction"],
        repo: "https://github.com/JoanixX/candidate_ranking_platform",
      },
      {
        id: "tutorgo-2",
        name: "TutorGo",
        tagline: {
          en: "Academic tutoring platform on Java + Spring Boot",
          es: "Plataforma de tutorías académicas en Java + Spring Boot",
        },
        blurb: {
          en: "A tutoring marketplace covering registration, tutor availability, session booking, simulated payments, session links and reviews. Java/Spring Boot REST backend against a relational schema, with a React and TypeScript client; the repository carries the UML model, the database diagram and the full delivered backlog.",
          es: "Un marketplace de tutorías que cubre registro, disponibilidad de tutores, reserva de sesiones, pagos simulados, enlaces de sesión y reseñas. Backend REST en Java/Spring Boot contra un esquema relacional, con cliente en React y TypeScript; el repositorio incluye el modelo UML, el diagrama de base de datos y el backlog completo entregado.",
        },
        metrics: {
          en: [
            "16 user stories delivered end to end",
            "Roughly 90% of the API endpoints built by me",
            "Relational schema and UML diagrams committed alongside the code",
          ],
          es: [
            "16 historias de usuario entregadas de punta a punta",
            "Alrededor del 90% de los endpoints de la API los construí yo",
            "Esquema relacional y diagramas UML commiteados junto al código",
          ],
        },
        tech: ["Java", "Spring Boot", "React", "TypeScript", "SQL"],
        repo: "https://github.com/JoanixX/tutorgo-2",
        role: {
          en: "Developer on a five-person university team; I built roughly 90% of the API endpoints.",
          es: "Desarrollador en un equipo universitario de cinco personas; construí alrededor del 90% de los endpoints de la API.",
        },
      },
    ],
  },
  {
    id: "experience",
    title: { en: "Experience", es: "Experiencia" },
    intro: {
      en: "Where the work was paid, shipped to users, or both.",
      es: "Donde el trabajo fue pagado, llegó a usuarios reales, o ambas.",
    },
    accent: "var(--accent-exp)",
    projects: [
      {
        id: "zoluxiones",
        name: "Zoluxiones",
        tagline: {
          en: "Software Engineering Intern · IT consultancy · current role",
          es: "Practicante de Ingeniería de Software · consultora de TI · rol actual",
        },
        blurb: {
          en: "Software engineering intern at an IT consultancy, working on internal platform and automation work. Client deliverables and internal products are confidential and are deliberately not described here.",
          es: "Practicante de ingeniería de software en una consultora de TI, trabajando en plataforma interna y automatización. Los entregables de cliente y los productos internos son confidenciales y deliberadamente no se describen aquí.",
        },
        metrics: {
          en: ["Current role", "Backend and automation work under confidentiality"],
          es: ["Rol actual", "Trabajo de backend y automatización bajo confidencialidad"],
        },
        tech: ["Python", "TypeScript", "PostgreSQL", "Docker", "CI/CD"],
        link: {
          url: "https://www.linkedin.com/company/zoluxioneslatam/posts/?feedView=all",
          label: { en: "Company on LinkedIn", es: "La empresa en LinkedIn" },
        },
      },
      {
        id: "chambeaya",
        name: "ChambeaYa",
        tagline: {
          en: "Co-founder · CV-matching marketplace shipped to real users",
          es: "Cofundador · marketplace de matching de CVs con usuarios reales",
        },
        blurb: {
          en: "Co-founded a platform connecting university students with real project challenges posted by companies, and took it to real users. The backend owns the relational domain — students, companies, offers, skills, matches and agreements — over async SQLAlchemy and PostgreSQL, and delegates candidate ranking to a separate AI service over HTTP.",
          es: "Cofundé una plataforma que conecta estudiantes universitarios con retos reales publicados por empresas, y la llevamos a usuarios reales. El backend es dueño del dominio relacional — estudiantes, empresas, ofertas, skills, matches y acuerdos — sobre SQLAlchemy async y PostgreSQL, y delega el ranking de candidatos a un servicio de IA aparte por HTTP.",
        },
        metrics: {
          en: [
            "15 domain entities and 8 use cases behind explicit port interfaces",
            "8 HTTP endpoints; FastAPI confined to the input adapter",
            "No automated tests and no CI test stage — stated in the repository",
          ],
          es: [
            "15 entidades de dominio y 8 casos de uso detrás de interfaces de puerto explícitas",
            "8 endpoints HTTP; FastAPI confinado al adaptador de entrada",
            "Sin tests automatizados y sin etapa de test en CI — declarado en el repositorio",
          ],
        },
        tech: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "JWT", "gunicorn", "Azure"],
        // His own repository, under his own account — showing it claims nothing
        // that is not his, unlike an employer's codebase would.
        repo: "https://github.com/JoanixX/ChambeaYa_Backend",
        link: {
          url: "https://www.linkedin.com/company/chambea-ya/posts/?feedView=all",
          label: { en: "Company on LinkedIn", es: "La empresa en LinkedIn" },
        },
      },
      {
        id: "kreante",
        name: "Kreante",
        tagline: {
          en: "No-Code Developer Intern · MVP delivery on Bubble",
          es: "Practicante de Desarrollo No-Code · entrega de MVPs en Bubble",
        },
        blurb: {
          en: "Built functional MVPs on Bubble so client ideas could be validated with users before any engineering budget was committed.",
          es: "Construí MVPs funcionales en Bubble para que las ideas de los clientes pudieran validarse con usuarios antes de comprometer presupuesto de ingeniería.",
        },
        metrics: {
          en: ["No-code delivery on Bubble"],
          es: ["Entrega no-code en Bubble"],
        },
        tech: ["Bubble", "No-code"],
        link: {
          url: "https://pe.linkedin.com/company/kreante",
          label: { en: "Company on LinkedIn", es: "La empresa en LinkedIn" },
        },
      },
    ],
  },
];

export const allProjects: ProjectEntry[] = sections.flatMap((s) => s.projects);

export const CONTACT = {
  github: "https://github.com/JoanixX",
  linkedin: "https://www.linkedin.com/in/cesar-joaquin-alvarado-osorio-189aa4262/",
  email: "alvaradocjosorio@gmail.com",
};

export type { Locale };
