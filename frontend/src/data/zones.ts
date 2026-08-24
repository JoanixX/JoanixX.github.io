// Zone content for the interactive map.
//
// Project data is NOT duplicated here: it is derived from src/data/projects.ts,
// the same module the static /projects pages render from. One edit there updates
// the game and the crawlable pages together, so the two cannot drift.

import { sections, type ProjectEntry } from "./projects";
import { DEFAULT_LOCALE, type Locale, type Localized } from "../i18n/config";

export interface Project {
  id: string;
  name: string;
  summary: string;
  description: string;
  image: string;
  tech: string;
  github: string;
  featured?: boolean;
}

export interface ZoneContent {
  title: string;
  body: string;
  type?: "minigame" | "reward" | string;
  projects?: Project[];
  game?: string;
  bgImage?: string;
  minigameInfo?: string;
  minigameCost?: string;
}

/**
 * Card art, generated inline as a data URI.
 * The previous build pointed every project image at via.placeholder.com, which no
 * longer resolves — every preview in the modal rendered as a broken image. An inline
 * SVG has no network dependency and cannot rot.
 */
function cardArt(name: string, accent: string): string {
  const label = name.length > 26 ? `${name.slice(0, 25)}…` : name;
  const safe = label.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#12121f"/><stop offset="100%" stop-color="#0a0a16"/>
</linearGradient></defs>
<rect width="600" height="400" fill="url(#g)"/>
<rect x="8" y="8" width="584" height="384" fill="none" stroke="${accent}" stroke-opacity="0.45" stroke-width="2"/>
<rect x="40" y="188" width="64" height="4" fill="${accent}"/>
<text x="40" y="240" fill="#e6e9ef" font-family="monospace" font-size="30">${safe}</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const ACCENT_HEX: Record<string, string> = {
  backend: "#ff6b6b",
  datascience: "#4dabf7",
  ai: "#cc5de8",
  hub: "#ffd43b",
  experience: "#63e6be",
};

const ZONE_TITLES: Record<string, Localized<string>> = {
  backend: { en: "BACKEND ENGINEERING", es: "INGENIERÍA DE BACKEND" },
  datascience: { en: "DATA SCIENCE", es: "CIENCIA DE DATOS" },
  ai: { en: "ARTIFICIAL INTELLIGENCE", es: "INTELIGENCIA ARTIFICIAL" },
  hub: { en: "HUB CENTRAL", es: "HUB CENTRAL" },
  experience: { en: "EXPERIENCE", es: "EXPERIENCIA" },
};

const PROJECTS_ROUTE: Localized<string> = { en: "projects/", es: "es/proyectos/" };

function toGameProject(p: ProjectEntry, sectionId: string, locale: Locale): Project {
  return {
    id: p.id,
    name: p.name,
    summary: p.tagline[locale],
    description: p.blurb[locale],
    image: cardArt(p.name, ACCENT_HEX[sectionId] ?? "#e6e9ef"),
    tech: p.tech.join(", "),
    // Entries with no public source (NDA work, no-code) point at the static page
    // instead of a dead "#" href.
    github: p.repo ?? `${import.meta.env.BASE_URL}${PROJECTS_ROUTE[locale]}#${sectionId}`,
    featured: p.featured,
  };
}

const MINIGAMES: Record<string, Localized<ZoneContent>> = {
  lake: {
    en: {
      type: "minigame", game: "fishing", bgImage: "lake_minigame.png",
      title: "FISHING LAKE — THE SERENITY OF CODE",
      body: `<p class="lore-text">A lake where resources (fish) flow past constantly. Time your hook to catch the valuable data without hitting the junk (cans) that corrupts your memory.</p>
               <p><strong>How to play:</strong> <br>
               1. <strong>SPACE</strong> to cast the hook. Everything freezes; <strong>SPACE</strong> again to reel it in.<br>
               2. Careful on the way up: if a can hits you while reeling, you lose the fish.<br>
               3. Touching a can on the way down costs 15 points. Drop below 0 and it is game over.</p>`,
      minigameCost: "Cost: 75 coins | Win up to 150 | Time: 60s",
      minigameInfo: "FISH VALUES: 🐟: 15 | 🐠: 25 | 🐡: 35 | 🥫: -15",
    },
    es: {
      type: "minigame", game: "fishing", bgImage: "lake_minigame.png",
      title: "LAGO DE PESCA — LA SERENIDAD DEL CÓDIGO",
      body: `<p class="lore-text">Un lago dinámico donde los recursos (peces) fluyen constantemente. Debes sincronizar tu anzuelo para capturar los datos valiosos sin chocar con basura (latas) que corrompe tu memoria.</p>
               <p><strong>Instrucciones:</strong> <br>
               1. <strong>ESPACIO</strong> para lanzar el anzuelo. Todo se detiene, y <strong>ESPACIO</strong> de nuevo para recogerlo.<br>
               2. ¡Cuidado al subir! Si una lata te golpea mientras recoges, pierdes el pez.<br>
               3. Si tocas una lata al bajar, pierdes 15 puntos. Si bajas de 0 puntos, Game Over.</p>`,
      minigameCost: "Costo: 75 monedas | Gana hasta 150 | Tiempo: 60s",
      minigameInfo: "VALOR DE PECES: 🐟: 15 | 🐠: 25 | 🐡: 35 | 🥫: -15",
    },
  },
  farm: {
    en: {
      type: "minigame", game: "farm", bgImage: "farm_minigame.png",
      title: "CHICKEN FARM — PROCESS CONTROL",
      body: `<p class="lore-text">A chaotic farm where chickens run loose, standing in for overflowing transactions on a server. Your job is to tag the right processes (chickens) with eggs without hitting the critical services (the other animals).</p>
               <p><strong>How to play:</strong> Aim with the mouse, click to shoot. Avoid the cows and pigs or you lose throughput points.</p>`,
      minigameCost: "Entry cost: 75 coins",
      minigameInfo: "PROCESSES: 🐥: +10 | 🐷: -20 | 🐮: -50",
    },
    es: {
      type: "minigame", game: "farm", bgImage: "farm_minigame.png",
      title: "GRANJA DE POLLOS — CONTROL DE PROCESOS",
      body: `<p class="lore-text">Una granja caótica donde los pollos corren sin control, simulando transacciones desbordadas en un servidor. Tu misión es etiquetar (disparar huevos) a los procesos correctos (pollos) sin afectar a los servicios críticos (otros animales).</p>
               <p><strong>Instrucciones:</strong> Usa el mouse para apuntar y clic para disparar. Evita a las vacas y cerdos o perderás puntos de rendimiento.</p>`,
      minigameCost: "Costo de entrada: 75 monedas",
      minigameInfo: "PROCESOS: 🐥: +10 | 🐷: -20 | 🐮: -50",
    },
  },
  magic_tree: {
    en: {
      type: "minigame", game: "connect4", bgImage: "magicTree_minigame.png",
      title: "MAGIC TREE — DATA STRUCTURES",
      body: `<p class="lore-text">Under the branches of this ancient binary tree, the wise Linus Torvalds will challenge you to a duel of pure logic. It is not luck; it is a minimax algorithm in action.</p>
               <p><strong>How to play:</strong> Classic Connect 4. Line up 4 before the AI does. Win and you double your stake. Lose and you walk away with nothing.</p>`,
      minigameCost: "Entry cost: 75 coins | Prize: double or nothing",
      minigameInfo: "DIFFICULTY: Minimax algorithm | TIME: unlimited",
    },
    es: {
      type: "minigame", game: "connect4", bgImage: "magicTree_minigame.png",
      title: "ÁRBOL MÁGICO — ESTRUCTURAS DE DATOS",
      body: `<p class="lore-text">Bajo las ramas de este antiguo árbol binario, el sabio Linus Torvalds te retará a un duelo de lógica pura. No es solo suerte; es un algoritmo minimax en acción.</p>
               <p><strong>Instrucciones:</strong> El clásico 4 en Línea. Conecta 4 fichas antes que la IA. Si ganas, duplicas tu apuesta. Si pierdes, te vas con las manos vacías.</p>`,
      minigameCost: "Costo de entrada: 75 monedas | Premio: Doble o Nada",
      minigameInfo: "DIFICULTAD: Algoritmo Minimax | TIEMPO: Ilimitado",
    },
  },
  garden: {
    en: {
      type: "minigame", game: "quiz", bgImage: "garden_minigame.png",
      title: "GARDEN OF KNOWLEDGE — TECH QUIZ",
      body: `<p class="lore-text">A garden in bloom where every flower is a question — from pointers in C++ to the history of the World Cup. Only the truly well-rounded survive.</p>
               <p><strong>How to play:</strong> Answer 5 random questions. Every correct answer pays coins, every miss costs you life.</p>`,
      minigameCost: "Entry cost: 75 coins",
      minigameInfo: "QUESTIONS: 5 | CATEGORIES: Tech, History, Science",
    },
    es: {
      type: "minigame", game: "quiz", bgImage: "garden_minigame.png",
      title: "JARDÍN DEL SABER — QUIZ TECH",
      body: `<p class="lore-text">Un jardín floreciente donde cada flor es una pregunta de conocimiento. Desde punteros en C++ hasta la historia de los mundiales de fútbol. Solo los verdaderos full-stack sobrevivirán.</p>
               <p><strong>Instrucciones:</strong> Responde 5 preguntas aleatorias. Cada acierto te da monedas, cada fallo te resta vida.</p>`,
      minigameCost: "Costo de entrada: 75 monedas",
      minigameInfo: "PREGUNTAS: 5 | CATEGORÍAS: Tech, Historia, Ciencia",
    },
  },
};

const EASTER_EGG: Localized<ZoneContent> = {
  en: {
    type: "reward",
    title: "YOU NOTICED",
    body: `<p class="lore-text">Yes, the image was expanded with AI — that is why the Gemini logo is sitting there.
It was supposed to be obvious, but the pixel art hides it well enough.
That you found it says something about you: you were hunting for secrets where there weren't any.
So congratulations, you triggered a completely irrelevant easter egg. No lore, no consequences,
just a few coins to buy yourself a skin — which is, obviously, absolutely essential.</p>`,
  },
  es: {
    type: "reward",
    title: "TE DISTE CUENTA",
    body: `<p class="lore-text">Si, la imagen la expandí con IA, por eso aparece el logo de gemini.
Se supone que sería obvio, pero por el pixelart y eso parece medio oculto.
Que lo hayas encontrado dice mucho sobre ti querido usuario: andas buscando secretos donde no
había ninguno.
Así que felicidades, activaste un easter egg irrelevante. No hay historia ni impacto alguno,
solo unas monedas para comprarte un skin, que es, evidentemente, totalmente necesario.</p>`,
  },
};

export function getContentMap(locale: Locale = DEFAULT_LOCALE): Record<string, ZoneContent> {
  const zones: Record<string, ZoneContent> = {};

  for (const section of sections) {
    zones[section.id] = {
      title: ZONE_TITLES[section.id]?.[locale] ?? section.title[locale].toUpperCase(),
      body: `<p class="lore-text">${section.intro[locale]}</p>`,
      projects: section.projects.map((p) => toGameProject(p, section.id, locale)),
    };
  }

  for (const [key, value] of Object.entries(MINIGAMES)) {
    zones[key] = value[locale];
  }
  zones.easter_egg = EASTER_EGG[locale];

  return zones;
}

/** Default-locale map, kept for any caller that does not care about language. */
export const contentMap = getContentMap(DEFAULT_LOCALE);
