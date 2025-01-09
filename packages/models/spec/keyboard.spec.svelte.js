import { describe, it, expect } from 'vitest'
import { Keyboard } from '../src/keyboard.svelte.js'

describe('Keyboard', () => {
	it('should initialize with the correct default rows', () => {
		const keyboard = new Keyboard()
		const expectedKeys = [
			'qwertyuiop'.split('').map((key) => ({ key })),
			'asdfghjkl'.split('').map((key) => ({ key })),
			[
				{ key: 'Enter', icon: 'key-enter' },
				...'zxcvbnm'.split('').map((key) => ({ key })),
				{ key: 'Backspace', icon: 'key-backspace' }
			]
		]
		expect(keyboard.keys).toEqual(expectedKeys)
	})

	it('should disable a key', () => {
		const keyboard = new Keyboard()
		keyboard.disable('a')
		expect(keyboard.disabled.has('a')).toBe(true)
	})

	it('should enable a key', () => {
		const keyboard = new Keyboard()
		keyboard.disable('a')
		keyboard.enable('a')
		expect(keyboard.disabled.has('a')).toBe(false)
	})

	it('should highlight a key', () => {
		const keyboard = new Keyboard()
		keyboard.highlight('a')
		expect(keyboard.highlighted.has('a')).toBe(true)
	})

	it('should unhighlight a key', () => {
		const keyboard = new Keyboard()
		keyboard.highlight('a')
		keyboard.unhighlight('a')
		expect(keyboard.highlighted.has('a')).toBe(false)
	})

	// it('should add a row of keys', () => {
	// 	const keyboard = new Keyboard()
	// 	const expectedKeys = [
	// 		'qwertyuiop'.split('').map((key) => ({ key })),
	// 		'asdfghjkl'.split('').map((key) => ({ key })),
	// 		[
	// 			{ key: 'Enter', icon: 'key-enter' },
	// 			...'zxcvbnm'.split('').map((key) => ({ key })),
	// 			{ key: 'Backspace', icon: 'key-backspace' }
	// 		]
	// 	]
	// 	expect(keyboard.keys).toEqual(expectedKeys)
	// 	expectedKeys.push('123'.split('').map((key) => ({ key })))
	// 	keyboard.addRow('123')

	// 	expect(keyboard.keys).toEqual(expectedKeys)
	// })
})
