<script>
	import WordHuntBoard from './WordHuntBoard.svelte'
	import GameKeyboard from '../GameKeyboard.svelte'
	import { keyboard } from '@seichou/actions'
	import { WordHunt } from '@seichou/models'

	/**
	 * @typedef {Object} Props
	 * @property {string} target
	 * @property {string[]} allowedWords
	 * @property {number} maxAttempts
	 * @property {'easy' | 'hard'} mode
	 */

	/** @type {Props} */
	let { target = $bindable(''), allowedWords = [], maxAttempts = 6, mode = 'easy' } = $props()
	let model = $derived(new WordHunt(target, { wordlist: allowedWords, maxAttempts, mode }))

	function handleAdd(event) {
		model.addLetter(event.detail)
	}
	function handleRemove() {
		model.removeLetter()
	}
	function handleSubmit() {
		model.validateGuess()
	}

	// $effect(() => {
	// console.log('model', $inspect(model))
	// })
</script>

<wordle
	class="md:w-200 mx-auto flex h-full w-full flex-col items-center justify-end py-3"
	use:keyboard
	onadd={handleAdd}
	onremove={handleRemove}
	onsubmit={handleSubmit}
>
	<span class="flex h-full w-full items-center justify-center p-4">
		<WordHuntBoard {model} rows={maxAttempts}></WordHuntBoard>
	</span>
	<GameKeyboard
		disabledKeys={model.guessedLetters.absent}
		highlightedKeys={model.guessedLetters.present}
	></GameKeyboard>
</wordle>
