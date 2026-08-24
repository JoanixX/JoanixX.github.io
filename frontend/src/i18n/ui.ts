import type { Localized } from "./config";

/** Chrome and labels. Project copy lives in src/data/projects.ts. */
export const ui = {
  // --- projects page ---
  pageTitle: {
    en: "Projects — Joaquin Alvarado, Backend & Machine Learning Engineer",
    es: "Proyectos — Joaquin Alvarado, Ingeniero de Backend y Machine Learning",
  },
  pageDescription: {
    en:
      "Backend and machine learning projects by Joaquin Alvarado: high-concurrency Rust APIs, " +
      "distributed Go training pipelines, embedding retrieval systems and production ML services. " +
      "Computer Science student at UPC, Peru. Every project links to its source.",
    es:
      "Proyectos de backend y machine learning de Joaquin Alvarado: APIs en Rust de alta concurrencia, " +
      "pipelines de entrenamiento distribuidas en Go, sistemas de recuperación por embeddings y servicios de ML " +
      "en producción. Estudiante de Ciencias de la Computación en la UPC, Perú. Cada proyecto enlaza a su código.",
  },
  homeTitle: {
    en: "Joaquin Alvarado — Backend & Machine Learning Engineer",
    es: "Joaquin Alvarado — Ingeniero de Backend y Machine Learning",
  },
  homeDescription: {
    en:
      "Backend and machine learning engineer. High-concurrency Rust APIs, distributed Go " +
      "training pipelines and production ML services. Computer Science student at UPC, Peru, " +
      "open to remote roles. Explore the interactive map, or read the plain project list.",
    es:
      "Ingeniero de backend y machine learning. APIs en Rust de alta concurrencia, pipelines de " +
      "entrenamiento distribuidas en Go y servicios de ML en producción. Estudiante de Ciencias de la " +
      "Computación en la UPC, Perú, disponible para trabajo remoto. Explora el mapa interactivo o lee la lista de proyectos.",
  },
  role: {
    en: "Backend & Machine Learning Engineer",
    es: "Ingeniero de Backend y Machine Learning",
  },
  location: { en: "Joaquin Alvarado · Lima, Peru", es: "Joaquin Alvarado · Lima, Perú" },
  lede: {
    en:
      "Computer Science student at UPC (8th term), currently a software engineering intern at " +
      "Zoluxiones. I build services that hold up under concurrency and machine learning systems " +
      "that report the metric they were actually evaluated on. Open to remote roles.",
    es:
      "Estudiante de Ciencias de la Computación en la UPC (8vo ciclo) y practicante de ingeniería de " +
      "software en Zoluxiones. Construyo servicios que aguantan concurrencia y sistemas de machine " +
      "learning que reportan la métrica con la que realmente fueron evaluados. Disponible para trabajo remoto.",
  },
  skipToProjects: { en: "Skip to projects", es: "Ir a los proyectos" },
  interactiveLink: { en: "Interactive portfolio (game)", es: "Portafolio interactivo (juego)" },
  backToGame: { en: "Prefer to explore it as a game?", es: "¿Prefieres explorarlo como juego?" },
  primaryStack: { en: "Primary stack", es: "Stack principal" },
  selectedFigures: { en: "Selected figures", es: "Cifras destacadas" },
  sectionsNav: { en: "Sections", es: "Secciones" },
  technologies: { en: "Technologies", es: "Tecnologías" },
  sourceCode: { en: "Source code", es: "Código fuente" },
  liveDemo: { en: "Live demo", es: "Demo en vivo" },
  featured: { en: "Featured", es: "Destacado" },
  contact: { en: "Contact", es: "Contacto" },
  footerNote: {
    en:
      "Figures on this page are the ones committed in each repository's own README; where a project " +
      "has no evaluation yet, it says so instead of quoting a number.",
    es:
      "Las cifras de esta página son las que están commiteadas en el README de cada repositorio; donde un " +
      "proyecto todavía no tiene evaluación, se dice explícitamente en vez de citar un número.",
  },
  entriesWithSource: {
    en: (total: number, sourced: number) => `${total} entries · ${sourced} with public source.`,
    es: (total: number, sourced: number) => `${total} entradas · ${sourced} con código público.`,
  },
  switchLanguage: { en: "Ver en español", es: "View in English" },

  // --- start screen ---
  whoAmI: { en: "Who am I?", es: "¿Quién soy?" },
  aboutMe: {
    en:
      "I am Joaquin Alvarado, a Computer Science student at UPC in Peru and a software engineering " +
      "intern at Zoluxiones. I build backends in Rust, Python and Go, and machine learning systems " +
      "that report the metric they were actually evaluated on. Open to remote roles.",
    es:
      "Soy Joaquin Alvarado, estudiante de Ciencias de la Computación en la UPC y practicante de " +
      "ingeniería de software en Zoluxiones. Construyo backends en Rust, Python y Go, y sistemas de " +
      "machine learning que reportan la métrica con la que realmente fueron evaluados. Disponible para trabajo remoto.",
  },
  hurryLink: { en: "In a hurry? See all 15 projects", es: "¿Con prisa? Mira los 15 proyectos" },
  focusLabel: { en: "Focus", es: "Enfoque" },
  focusValue: { en: "Backend & ML", es: "Backend y ML" },
  stackLabel: { en: "Stack", es: "Stack" },

  // --- zone modal (markup rendered at build time) ---
  claimReward: { en: "Claim Reward (+50 coins)", es: "Reclamar Recompensa (+50 monedas)" },
  techStack: { en: "TECH STACK:", es: "TECNOLOGÍAS:" },
  githubRepo: { en: "GitHub Repo", es: "Repositorio GitHub" },
  reward25: { en: "Reward (+25 coins)", es: "Recompensa (+25 monedas)" },
  pressPlay: { en: "Press PLAY to start", es: "Presiona JUGAR para comenzar" },
  play75: { en: "PLAY (75 Coins)", es: "JUGAR (75 Monedas)" },

  // --- dashboard / shop ---
  skinShop: { en: "SKIN SHOP", es: "TIENDA DE SKINS" },
  selectSkin: { en: "SELECT SKIN", es: "ELIGE UN SKIN" },
  yourCoins: { en: "Your Coins:", es: "Tus monedas:" },
  close: { en: "CLOSE", es: "CERRAR" },

  // --- highlights ---
  hl1: {
    en: "peak throughput at p99 300 ms, Rust betting validation API",
    es: "throughput pico con p99 de 300 ms, API de validación de apuestas en Rust",
  },
  hl2: {
    en: "event records indexed in the football retrieval system",
    es: "registros de eventos indexados en el sistema de scouting de fútbol",
  },
  hl3: {
    en: "throughput scaling from 15 to 150 Go workers",
    es: "de throughput al escalar de 15 a 150 workers en Go",
  },
  hl4: {
    en: "AUC on the mortality model, against a 0.500 random-ranking reference",
    es: "AUC del modelo de mortalidad, contra una referencia aleatoria de 0.500",
  },
} satisfies Record<string, Localized<unknown>>;
