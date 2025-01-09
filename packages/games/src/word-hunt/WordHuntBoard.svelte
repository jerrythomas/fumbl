<script>
	import WordHuntAttempt from './WordHuntAttempt.svelte'
	let { model = $bindable(), rows = 6 } = $props()
	let emptyGuess = $derived(Array.from({ length: rows - model.guesses.length }).fill(''))
</script>

<board class="grid grid-cols-5 grid-rows-6 gap-1">
	{#each model.guesses as guess}
		<WordHuntAttempt word={guess} />
	{/each}
	{#each emptyGuess as _}
		<WordHuntAttempt />
	{/each}
</board>
