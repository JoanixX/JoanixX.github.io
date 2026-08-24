// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// User site (repo named JoanixX.github.io), so it is served from the domain
	// root and there is no `base` prefix to account for.
	site: 'https://joanixx.github.io',
	// Default output is 'static': every page under src/pages is executed at build
	// time and written to disk as HTML. Nothing here is server-rendered on request.
	output: 'static',
	trailingSlash: 'ignore',
	integrations: [sitemap()],
	redirects: {
		// The route was announced as /proyectos before it was built in English.
		// Keep that URL alive rather than stranding anyone who already has the link.
		'/proyectos': '/projects/',

		// The site used to live under /portafolio/ (project pages, before the repo
		// was renamed). Those URLs are already out in the world, so keep every one
		// of them landing somewhere sensible. GitHub Pages serves static files and
		// cannot issue a real 301, so Astro emits a meta-refresh page per entry;
		// src/pages/404.astro catches any /portafolio/* path not listed here.
		'/portafolio': '/',
		'/portafolio/projects': '/projects/',
		'/portafolio/proyectos': '/projects/',
		'/portafolio/es': '/es/',
		'/portafolio/es/proyectos': '/es/proyectos/',
	},
});
