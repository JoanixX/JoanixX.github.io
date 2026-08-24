// Zone content for the interactive map.
//
// Project data is NOT duplicated here: it is derived from src/data/projects.ts,
// which is the same module the static /projects page renders from. One edit there
// updates the game and the crawlable page together, so the two cannot drift.

import { sections, type ProjectEntry } from "./projects";

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

function toGameProject(p: ProjectEntry, sectionId: string): Project {
  return {
    id: p.id,
    name: p.name,
    summary: p.tagline,
    description: p.blurb,
    image: cardArt(p.name, ACCENT_HEX[sectionId] ?? "#e6e9ef"),
    tech: p.tech.join(", "),
    // Entries with no public source (NDA work, no-code) link to the static page
    // instead of a dead "#" href.
    github: p.repo ?? `${import.meta.env.BASE_URL}projects/#${sectionId}`,
    featured: p.featured,
  };
}

const zoneTitles: Record<string, string> = {
  backend: "BACKEND ENGINEERING",
  datascience: "DATA SCIENCE",
  ai: "ARTIFICIAL INTELLIGENCE",
  hub: "HUB CENTRAL",
  experience: "EXPERIENCE",
};

const projectZones: Record<string, ZoneContent> = Object.fromEntries(
  sections.map((section) => [
    section.id,
    {
      title: zoneTitles[section.id] ?? section.title.toUpperCase(),
      body: `<p class="lore-text">${section.intro}</p>`,
      projects: section.projects.map((p) => toGameProject(p, section.id)),
    } satisfies ZoneContent,
  ])
);

export const contentMap: Record<string, ZoneContent> = {
  ...projectZones,

  easter_egg: {
    type: "reward",
    title: "YOU NOTICED",
    body: `<p class="lore-text">Yes, the image was expanded with AI — that is why the Gemini logo is
sitting there. It was supposed to be obvious, but the pixel art hides it well enough.
That you found it says something about you: you were hunting for secrets where there weren't any.
So congratulations, you triggered a completely irrelevant easter egg. No lore, no consequences,
just a few coins to buy yourself a skin — which is, obviously, absolutely essential.
</p>`,
  },

  lake: {
    type: "minigame",
    game: "fishing",
    bgImage: "lake_minigame.png",
    title: "FISHING LAKE — THE SERENITY OF CODE",
    body: `<p class="lore-text">A lake where resources (fish) flow past constantly. Time your hook to
catch the valuable data without hitting the junk (cans) that corrupts your memory.</p>
               <p><strong>How to play:</strong> <br>
               1. <strong>SPACE</strong> to cast the hook. Everything freezes; <strong>SPACE</strong> again to reel it in.<br>
               2. Careful on the way up: if a can hits you while reeling, you lose the fish.<br>
               3. Touching a can on the way down costs 15 points. Drop below 0 and it is game over.</p>`,
    minigameCost: "Cost: 75 coins | Win up to 150 | Time: 60s",
    minigameInfo: "FISH VALUES: 🐟: 15 | 🐠: 25 | 🐡: 35 | 🥫: -15",
  },

  farm: {
    type: "minigame",
    game: "farm",
    bgImage: "farm_minigame.png",
    title: "CHICKEN FARM — PROCESS CONTROL",
    body: `<p class="lore-text">A chaotic farm where chickens run loose, standing in for overflowing
transactions on a server. Your job is to tag the right processes (chickens) with eggs without
hitting the critical services (the other animals).</p>
               <p><strong>How to play:</strong> Aim with the mouse, click to shoot. Avoid the cows and pigs or you lose throughput points.</p>`,
    minigameCost: "Entry cost: 75 coins",
    minigameInfo: "PROCESSES: 🐥: +10 | 🐷: -20 | 🐮: -50",
  },

  magic_tree: {
    type: "minigame",
    game: "connect4",
    bgImage: "magicTree_minigame.png",
    title: "MAGIC TREE — DATA STRUCTURES",
    body: `<p class="lore-text">Under the branches of this ancient binary tree, a wise old opponent will
challenge you to a duel of pure logic. It is not luck; it is a minimax algorithm in action.</p>
               <p><strong>How to play:</strong> Classic Connect 4. Line up 4 before the AI does. Win and you double your stake. Lose and you walk away with nothing.</p>`,
    minigameCost: "Entry cost: 75 coins | Prize: double or nothing",
    minigameInfo: "DIFFICULTY: Minimax algorithm | TIME: unlimited",
  },

  garden: {
    type: "minigame",
    game: "quiz",
    bgImage: "garden_minigame.png",
    title: "GARDEN OF KNOWLEDGE — TECH QUIZ",
    body: `<p class="lore-text">A garden in bloom where every flower is a question — from pointers in C++
to the history of the World Cup. Only the truly well-rounded survive.</p>
               <p><strong>How to play:</strong> Answer 5 random questions. Every correct answer pays coins, every miss costs you life.</p>`,
    minigameCost: "Entry cost: 75 coins",
    minigameInfo: "QUESTIONS: 5 | CATEGORIES: Tech, History, Science",
  },
};
