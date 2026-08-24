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
	},
});
