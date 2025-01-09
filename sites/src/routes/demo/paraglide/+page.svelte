<script>
	import { i18n } from '$lib/i18n'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import * as m from '$lib/paraglide/messages.js'

	/**
	 * @param import("$lib/paraglide/runtime").AvailableLanguageTag newLanguage
	 */
	function switchToLanguage(newLanguage) {
		const canonicalPath = i18n.route($page.url.pathname)
		const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage)
		goto(localisedPath)
	}
</script>

<h1>{m.helloWorld({ name: 'SvelteKit User' })}</h1>
<h2>{m.welcome({ app: 'Alert' })}</h2>
<div>
	<button onclick={() => switchToLanguage('en')}>en</button>
	<button onclick={() => switchToLanguage('es')}>es</button>
	<button onclick={() => switchToLanguage('hi')}>hi</button>
</div>
