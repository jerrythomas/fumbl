<script>
	import { WordleGame } from '@fumbl/games'

	let word = 'hello'
	let { data } = $props()
</script>

<WordleGame target={word} allowedWords={data.allowed}></WordleGame>

<style>
	@import '@fumbl/games/styles.css';
</style>
