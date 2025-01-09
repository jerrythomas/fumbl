<script>
	import { WordleGame } from '@seichou/games'

	let word = 'hello'
	let { data } = $props()
</script>

<WordleGame target={word} allowedWords={data.allowed}></WordleGame>

<style>
	@import '@seichou/games/styles.css';
</style>
