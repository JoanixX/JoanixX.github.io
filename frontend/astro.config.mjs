// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://joanixx.github.io',
	base: '/portafolio',
	// Default output is 'static': every page under src/pages is executed at build
	// time and written to disk as HTML. Nothing here is server-rendered on request.
	output: 'static',
	trailingSlash: 'ignore',
	integrations: [sitemap()],
	redirects: {
		// The route was announced as /proyectos before it was built in English.
		// Keep that URL alive rather than stranding anyone who already has the link.
		// The destination is NOT rewritten with `base`, so it has to be spelled out
		// in full — '/projects' alone would resolve to the domain root and 404.
		'/proyectos': '/portafolio/projects/',
	},
});
