import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import { WordGuessed } from '@seichou/models'
import WordHuntAttempt from '../../src/word-hunt/WordHuntAttempt.svelte'
import { tick, flushSync } from 'svelte'

describe('WordHuntAttempt', () => {
	const expectedWord = 'apple'
	const allowedWords = ['apple', 'apply', 'banana', 'grape', 'orange', 'peach']

	it('should render an empty row', () => {
		const word = new WordGuessed()
		const { container } = render(WordHuntAttempt, { props: { word } })
		expect(container).toMatchSnapshot()
	})

	it('should render a row with partial word', async () => {
		const word = new WordGuessed()
		const { container } = render(WordHuntAttempt, { props: { word } })

		word.addLetter('a')
		await tick()
		expect(container).toMatchSnapshot()

		word.addLetter('p')
		await tick()
		expect(container).toMatchSnapshot()
	})

	it('should render a row with full word', async () => {
		const word = new WordGuessed()
		const { container } = render(WordHuntAttempt, { props: { word } })

		word.addLetter('a')
		word.addLetter('p')
		word.addLetter('p')
		word.addLetter('l')
		word.addLetter('e')
		await tick()
		expect(container).toMatchSnapshot()
	})

	it('should remove a letter', async () => {
		const word = new WordGuessed()
		const { container } = render(WordHuntAttempt, { props: { word } })

		word.addLetter('a')
		word.addLetter('p')
		word.addLetter('p')
		word.addLetter('l')
		word.addLetter('e')
		word.removeLetter()
		await tick()
		expect(container).toMatchSnapshot()
	})

	it('should update the styles on validation', async () => {
		const word = new WordGuessed()
		const { container } = render(WordHuntAttempt, { props: { word } })

		word.addLetter('g')
		word.addLetter('r')
		word.addLetter('a')
		word.addLetter('p')
		word.addLetter('e')
		await tick()
		expect(container).toMatchSnapshot()
		word.validate(expectedWord, allowedWords)
		await tick()
		expect(container).toMatchSnapshot()
	})
})
