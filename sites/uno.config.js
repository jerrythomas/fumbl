import extractorSvelte from '@unocss/extractor-svelte'
import {
	defineConfig,
	presetIcons,
	presetTypography,
	presetUno,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss'

import { iconShortcuts, defaultIcons, themeColors } from '@rokkit/themes'
import { palette } from './src/lib/config.js'

export default defineConfig({
	extractors: [extractorSvelte()],
	rules: [...palette],
	safelist: [...defaultIcons, 'key-enter', 'key-backspace'],
	shortcuts: {
		...iconShortcuts(defaultIcons, 'i-rokkit'),
		'key-enter': 'i-uil-enter',
		'key-backspace': 'i-solar-backspace-linear'
	},
	theme: {
		// fontFamily: {
		// 	mono: ['Victor Mono', 'monospace'],
		// 	heading: ['Open Sans', 'sans-serif'],
		// 	sans: ['Overpass', 'ui-serif', 'sans-serif'],
		// 	body: ['Open Sans', '-apple-system', 'system-ui', 'Segoe-UI', 'ui-serif', 'sans-serif']
		// },
		colors: themeColors()
	},
	presets: [
		presetUno(),
		presetTypography(),
		presetIcons({
			collections: {
				rokkit: () => import('@rokkit/icons/ui.json').then((i) => i.default)
			},
			uil: {
				uil: () => import('@iconify-json/uil').then((i) => i.default)
			},
			solar: {
				solar: () => import('@iconify-json/solar').then((i) => i.default)
			}
		})
	],
	transformers: [transformerDirectives(), transformerVariantGroup()]
})
