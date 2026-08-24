# Joaquin Alvarado — Portfolio

Source for [joanixx.github.io/portafolio](https://joanixx.github.io/portafolio/).

The site has two front doors on purpose:

| Route | What it is | Who it is for |
| :--- | :--- | :--- |
| `/` · `/es/` | A 2D game-like map: walk a character around, open zones, play minigames, collect coins, buy skins. | Anyone with a browser and a few minutes. |
| `/projects` · `/es/proyectos` | A flat, prerendered HTML page listing all 15 entries with metrics and source links. | Recruiters in a hurry, and every crawler — LinkedIn, Slack, Google — none of which run JavaScript. |

Both languages are fully prerendered and cross-linked with `hreflang`, so Google
indexes them as translations rather than duplicates. English is the default and
is served without a URL prefix.

The game's zone content is not duplicated: both routes read from
`frontend/src/data/projects.ts`, so a single edit updates the map and the static
page together.

## Why `/projects` exists

Astro prerenders every page at build time, but it only captures what runs in a
component's frontmatter. The game's project data is imported from a client
`<script>`, so it ships as a JavaScript bundle and the served HTML carries only
empty placeholders. `/projects` builds its markup in the frontmatter instead, so
the content is in the file on disk.

## Structure

```text
portafolio/
├── frontend/     # Astro + TypeScript. The site itself.
│   ├── src/data/projects.ts      # Single source of truth (bilingual) for all project content
│   ├── src/data/zones.ts         # Game zones, derived from projects.ts
│   ├── src/i18n/                 # Locale config, build-time strings, runtime strings
│   ├── src/pages/projects.astro  # The static, crawlable page (EN)
│   ├── src/pages/es/             # Spanish routes
│   └── public/og-image.png       # Link preview card (1200x630)
└── backend/      # Rust + Actix-web. In-memory coin/skin state for the game.
```

## Running it

```bash
# Backend (optional — the game degrades gracefully without it)
cd backend && cargo run          # http://localhost:8080

# Frontend
cd frontend && npm install && npm run dev   # http://localhost:4321/portafolio
```

## Tech

| Layer | Stack |
| :--- | :--- |
| Frontend | Astro 5, TypeScript, vanilla CSS |
| Backend | Rust, Actix-web, Serde |
| Deploy | GitHub Actions → GitHub Pages |

---

[github.com/JoanixX](https://github.com/JoanixX)
