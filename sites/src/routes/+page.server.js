// import { fail } from '@sveltejs/kit'
import { words } from './words.server.js'

/** @satisfies {import('./$types').PageServerLoad} */
export const load = () => {
	// const game = new Game(cookies.get('wordle'))
	return {
		allowed: words
	}
}
