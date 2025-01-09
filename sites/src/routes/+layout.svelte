<script>
	import 'virtual:uno.css'
	// import 'uno.css';
	// import 'virtual:unocss-devtools';
	import { i18n } from '$lib/i18n'
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import '../app.css'
	let { children } = $props()
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
