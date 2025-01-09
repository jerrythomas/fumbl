<script>
	import { WordGuessed } from '@seichou/models'
	/**
	 * @typedef {Object} Props
	 * @property {WordGuessed} [word]
	 */

	/** @type {Props} */
	let { word = new WordGuessed() } = $props()

	let letters = $derived(
		word.letters.map(({ char, status }) => ({
			char,
			correct: status === 'correct',
			present: status === 'present',
			absent: status === 'absent'
		}))
	)
</script>

{#each letters as { char, present, absent, correct }, i}
	<span class:correct class:present class:absent>
		{char}
	</span>
{/each}
{#if letters.length < 5}
	{#each Array.from({ length: 5 - letters.length }) as _}
		<span class="h-full w-full">&nbsp;</span>
	{/each}
{/if}
