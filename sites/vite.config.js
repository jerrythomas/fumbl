import UnoCSS from 'unocss/vite'
import { paraglide } from '@inlang/paraglide-sveltekit/vite'
import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'

export default defineConfig({
	plugins: [
		UnoCSS(),
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		}),
		svelteTesting()
	],

	test: {
		include: ['spec/**/*.{spec,spec.svelte}.{js,ts}'],
		globals: true,
		environment: 'jsdom',
		coverage: {
			reporter: ['text', 'html', 'lcov'],
			all: true,
			include: ['src'],
			exclude: ['spec']
		}
	}
})
