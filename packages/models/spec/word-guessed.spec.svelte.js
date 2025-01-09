import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { WordGuessed } from '../src/word-guessed.svelte.js'

describe('WordGuessed', () => {
	const word = 'apple'
	const wordlist = ['apple', 'apply', 'banana', 'grape', 'orange', 'peach']

	beforeAll(() => {
		vi.useFakeTimers()
	})
	afterAll(() => {
		vi.useRealTimers()
	})

	it('should create a new  instance', () => {
		const guess = new WordGuessed()
		expect(guess.letters).toEqual([])
		expect(guess.startTime).toBeInstanceOf(Date)
		expect(guess.endTime).toBe(null)
		expect(guess.timeTaken).toBe(0)
		expect(guess.isCorrect).toBe(false)
	})

	it('should add a letter to the guess', () => {
		const guess = new WordGuessed()
		guess.addLetter('a')
		expect(guess.letters.length).toBe(1)
		expect(guess.letters[0].char).toBe('a')
		expect(guess.letters[0].status).toBe('unknown')
	})

	it('should remove the most recent letter from the guess', () => {
		const guess = $state(new WordGuessed())
		guess.addLetter('a')
		guess.removeLetter()
		expect(guess.letters.length).toBe(0)
	})

	it('should not add more than 5 letters', () => {
		const guess = new WordGuessed()
		guess.addLetter('a')
		guess.addLetter('p')
		guess.addLetter('p')
		guess.addLetter('l')
		guess.addLetter('e')
		guess.addLetter('x')
		expect(guess.letters.length).toBe(5)
	})

	it('should check if the guessed word is allowed', () => {
		const invalidGuess = new WordGuessed()
		invalidGuess.addLetter('a')
		invalidGuess.addLetter('p')
		invalidGuess.addLetter('p')
		invalidGuess.addLetter('l')

		expect(invalidGuess.isAllowed(wordlist)).toBe(false)

		invalidGuess.addLetter('x')
		const isAllowed = invalidGuess.validate(word, wordlist)
		expect(isAllowed).toBe(false)
		expect(invalidGuess.letters).toEqual([
			{ char: 'a', status: 'unknown' },
			{ char: 'p', status: 'unknown' },
			{ char: 'p', status: 'unknown' },
			{ char: 'l', status: 'unknown' },
			{ char: 'x', status: 'unknown' }
		])
	})
	it('should validate the guess if it is allowed', () => {
		const guess = new WordGuessed()
		guess.addLetter('a')
		guess.addLetter('p')
		guess.addLetter('p')
		guess.addLetter('l')
		guess.addLetter('e')

		vi.advanceTimersByTime(1000)
		const isAllowed = guess.validate(word, wordlist)
		expect(isAllowed).toBe(true)
		expect(guess.endTime).not.toBe(null)
		expect(guess.timeTaken).toBeGreaterThan(0)
		expect(guess.isCorrect).toBe(true)
		expect(guess.letters[0].status).toBe('correct')
		expect(guess.letters[1].status).toBe('correct')
		expect(guess.letters[2].status).toBe('correct')
		expect(guess.letters[3].status).toBe('correct')
		expect(guess.letters[4].status).toBe('correct')
	})

	it('should mark letters as present or absent', () => {
		const guess = new WordGuessed()
		guess.addLetter('g')
		guess.addLetter('r')
		guess.addLetter('a')
		guess.addLetter('p')
		guess.addLetter('e')

		vi.advanceTimersByTime(1000)
		const isAllowed = guess.validate(word, wordlist)
		expect(isAllowed).toBe(true)
		expect(guess.endTime).not.toBe(null)
		expect(guess.timeTaken).toBeGreaterThan(0)
		expect(guess.isCorrect).toBe(false)
		expect(guess.letters[0].status).toBe('absent')
		expect(guess.letters[1].status).toBe('absent')
		expect(guess.letters[2].status).toBe('present')
		expect(guess.letters[3].status).toBe('present')
		expect(guess.letters[4].status).toBe('correct')
	})
})
