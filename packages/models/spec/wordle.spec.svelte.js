import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { WordHunt } from '../src/word-hunt.svelte.js'
import { WordGuessed } from '../src/word-guessed.svelte.js'

describe('WordHunt', () => {
	const word = 'apple'
	const wordlist = ['apple', 'apply', 'banana', 'grape', 'orange', 'peach']
	const options = {
		wordlist,
		maxAttempts: 6,
		mode: 'hard'
	}

	beforeAll(() => {
		vi.useFakeTimers()
	})

	afterAll(() => {
		vi.useRealTimers()
	})

	it('should create a new instance', () => {
		const game = new WordHunt(word, options)
		expect(game.word).toBe(word)
		expect(game.currentIndex).toBe(0)
		expect(game.guesses.length).toEqual(6)
		expect(game.startTime).toBeInstanceOf(Date)
		expect(game.endTime).toBe(null)
		expect(game.solved).toBe(false)
		expect(game.options).toEqual(options)
		expect(game.wordlist).toEqual(wordlist)
	})

	it('should add a letter to the current guess', () => {
		const game = $state(new WordHunt(word, options))
		game.guesses.push(new WordGuessed())
		game.addLetter('a')
		expect(game.guesses[0].letters.length).toBe(1)
		expect(game.guesses[0].letters[0].char).toBe('a')
		expect(game.guesses[0].letters[0].status).toBe('unknown')
	})

	it('should remove the most recent letter from the current guess', () => {
		const game = $state(new WordHunt(word, options))
		game.guesses.push(new WordGuessed())
		game.addLetter('a')
		game.removeLetter()
		expect(game.guesses[0].letters.length).toBe(0)
	})

	it('should not add more than 5 letters', () => {
		const game = $state(new WordHunt(word, options))
		game.guesses.push(new WordGuessed())
		game.addLetter('a')
		game.addLetter('p')
		game.addLetter('p')
		game.addLetter('l')
		game.addLetter('e')
		game.addLetter('x')
		expect(game.guesses[0].letters.length).toBe(5)
	})

	it('should validate the current guess', () => {
		const game = $state(new WordHunt(word, options))
		game.guesses.push(new WordGuessed())
		game.addLetter('a')
		game.addLetter('p')
		game.addLetter('p')
		game.addLetter('l')
		game.addLetter('e')
		vi.advanceTimersByTime(1000)
		game.validateGuess()
		// expect(game.guesses[0].isValidated).toBe(true)
		expect(game.guesses[0].endTime).not.toBe(null)
		expect(game.guesses[0].timeTaken).toBeGreaterThan(0)
		expect(game.guesses[0].isCorrect).toBe(true)
		expect(game.guesses[0].letters).toEqual([
			{ char: 'a', status: 'correct' },
			{ char: 'p', status: 'correct' },
			{ char: 'p', status: 'correct' },
			{ char: 'l', status: 'correct' },
			{ char: 'e', status: 'correct' }
		])
		expect(game.solved).toBe(true)
		expect(game.endTime).not.toBe(null)
		expect(game.duration).toBeGreaterThan(0)
	})

	it('should not validate an incorrect guess', () => {
		const game = $state(new WordHunt(word, options))
		game.guesses.push(new WordGuessed())
		game.addLetter('a')
		game.addLetter('p')
		game.addLetter('p')
		game.addLetter('l')
		game.addLetter('x')
		vi.advanceTimersByTime(1000)
		game.validateGuess()
		// expect(game.guesses[0].isValidated).toBe(false)
		expect(game.guesses[0].endTime).toBe(null)
		expect(game.guesses[0].timeTaken).toBe(0)
		expect(game.guesses[0].isCorrect).toBe(false)
		expect(game.guesses[0].letters).toEqual([])
		expect(game.solved).toBe(false)
		expect(game.endTime).toBe(null)
	})

	it('should update the wordlist in hard mode', () => {
		const game = $state(new WordHunt(word, options))
		game.guesses.push(new WordGuessed())
		game.addLetter('g')
		game.addLetter('r')
		game.addLetter('a')
		game.addLetter('p')
		game.addLetter('e')
		vi.advanceTimersByTime(1000)
		game.validateGuess()
		expect(game.wordlist).toEqual(['apple', 'grape', 'peach'])
	})

	it('should not update the wordlist in easy mode', () => {
		const easyOptions = { ...options, mode: 'easy' }
		const game = $state(new WordHunt(word, easyOptions))
		game.guesses.push(new WordGuessed())
		game.addLetter('a')
		game.addLetter('p')
		game.addLetter('p')
		game.addLetter('l')
		game.addLetter('y')
		vi.advanceTimersByTime(1000)
		game.validateGuess()
		expect(game.wordlist).toEqual(wordlist)
		expect(game.guesses[0].letters).toEqual([
			{ char: 'a', status: 'correct' },
			{ char: 'p', status: 'correct' },
			{ char: 'p', status: 'correct' },
			{ char: 'l', status: 'correct' },
			{ char: 'y', status: 'absent' }
		])
	})

	it('should start the game', () => {
		const game = $state(new WordHunt(word, options))
		game.start()
		expect(game.startTime).toBeInstanceOf(Date)
	})
})
