/**
 * Get the status of a character in a word
 *
 * @param {string} expected
 * @param {string} char
 * @param {number} index
 * @returns
 */
function getValidatedStatus(expected, char, index) {
	if (char === expected[index]) {
		return 'correct'
	} else if (expected.includes(char)) {
		return 'present'
	}
	return 'absent'
}

/**
 * A class representing a guessed word
 */
export class WordGuessed {
	/** @type {import('./types.js').Letter[]>} */
	letters = $state([])
	startTime = new Date()
	endTime = null
	timeTaken = 0
	isCorrect = false

	/**
	 * Add a letter to the guess
	 * @param {string} char - The character to add
	 */
	addLetter(char) {
		if (this.letters.length < 5) {
			this.letters.push({ char: char.toLowerCase(), status: 'unknown' })
		}
	}

	/**
	 * Remove the most recent letter from the guess
	 */
	removeLetter() {
		if (this.letters.length > 0) {
			this.letters.pop()
		}
	}

	/**
	 * Checks if the current guessed word is allowed
	 *
	 * @param {string[]} wordlist
	 * @returns {boolean}
	 */
	isAllowed(wordlist) {
		if (this.letters.length < 5) return false
		return wordlist.includes(this.letters.map((letter) => letter.char).join(''))
	}
	/**
	 * Validate the guess
	 * @param {string} word - The word to validate against
	 * @param {string[]} wordlist - The list of valid words
	 * @returns {boolean} - Whether the guess is allowed or not
	 */
	validate(word, wordlist) {
		if (this.isAllowed(wordlist)) {
			this.endTime = new Date()
			this.timeTaken = this.endTime.getTime() - this.startTime.getTime()
			this.letters.forEach((letter, index) => {
				letter.status = getValidatedStatus(word, letter.char, index)
			})
			this.isCorrect = this.letters.every((letter) => letter.status === 'correct')
			return true
		}
		return false
	}
}
