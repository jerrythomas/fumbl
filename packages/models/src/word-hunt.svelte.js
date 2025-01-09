import { WordGuessed } from './word-guessed.svelte.js'
import { SvelteSet } from 'svelte/reactivity'

/**
 * @typedef {'easy'|'hard'} WordHuntMode
 */

/**
 * @typedef {Object} WordHuntOptions
 * @property {string[]}   wordlist
 * @property {number}     maxAttempts
 * @property {WordHuntMode} mode
 */

const defaultOptions = {
	wordlist: [],
	maxAttempts: 6,
	mode: 'easy'
}

export class WordHunt {
	/**
	 * Create a new WordHunt game
	 * @param {string} word        - The word to be guessed
	 * @param {WordHuntOptions} options - The options for the game
	 */

	constructor(word, options) {
		this.word = word
		this.currentIndex = 0

		/** @type {WordGuessed[]} */
		this.guesses = Array.from({ length: options.maxAttempts }, () => new WordGuessed(word))
		this.guessedLetters = {
			present: new SvelteSet(),
			absent: new SvelteSet()
		}
		/** @type {Date} */
		this.startTime = new Date()
		/** @type {Date | null} */
		this.endTime = null
		this.solved = false

		this.options = { ...defaultOptions, ...options }
		this.wordlist = [...this.options.wordlist]
	}

	/**
	 * Add a letter to the current guess
	 * @param {string} char - The character to add
	 */
	addLetter(char) {
		if (!this.solved && this.currentIndex < this.options.maxAttempts) {
			this.guesses[this.currentIndex].addLetter(char)
		}
	}

	/**
	 * Remove the most recent letter from the current guess
	 */
	removeLetter() {
		if (!this.solved && this.currentIndex < this.options.maxAttempts) {
			this.guesses[this.currentIndex].removeLetter()
		}
	}

	/**
	 * Update the wordlist based on the current guesses, and the mode
	 */
	updateWordlist(index) {
		const guess = this.guesses[index]
		const toAdd = {
			absent: guess.letters
				.filter((letter) => letter.status === 'absent')
				.map((letter) => letter.char),
			present: guess.letters
				.filter((letter) => letter.status !== 'absent')
				.map((letter) => letter.char)
		}

		toAdd.absent.forEach((letter) => this.guessedLetters.absent.add(letter))
		toAdd.present.forEach((letter) => this.guessedLetters.present.add(letter))

		if (this.options.mode === 'hard') {
			this.wordlist = this.options.wordlist.filter((word) =>
				[...this.guessedLetters.present].every((letter) => word.includes(letter))
			)
		}
	}

	/**
	 * Validate the current guess
	 */
	validateGuess() {
		if (!this.solved && this.currentIndex < this.options.maxAttempts) {
			const isAllowed = this.guesses[this.currentIndex].validate(this.word, this.wordlist)
			if (isAllowed) {
				if (this.guesses[this.currentIndex].isCorrect) {
					this.endTime = new Date()
					this.duration = this.endTime.getTime() - this.startTime.getTime()
					this.solved = true
				}
				this.updateWordlist(this.currentIndex)
				this.currentIndex += 1
			} else {
				this.guesses[this.currentIndex].letters = []
			}
		}
	}

	start() {
		this.startTime = new Date()
	}
}
