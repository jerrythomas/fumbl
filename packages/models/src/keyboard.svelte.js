import { splitAsKeys } from './utils'
import { SvelteSet } from 'svelte/reactivity'

export class Keyboard {
	/** @type {string[][]} */
	keys = $state([])

	constructor() {
		this.addRow('qwertyuiop')
		this.addRow('asdfghjkl')
		this.addRow([
			{ key: 'Enter', icon: 'key-enter' },
			'zxcvbnm',
			{ key: 'Backspace', icon: 'key-backspace' }
		])
		this.disabled = new SvelteSet()
		this.highlighted = new SvelteSet()
	}

	/**
	 * Disable a key
	 * @param {string} key
	 */
	disable(key) {
		if (!this.disabled.has(key)) this.disabled.add(key)
		this.unhighlight(key)
	}

	/**
	 * Enable a key
	 * @param {string} key
	 */
	enable(key) {
		if (this.disabled.has(key)) this.disabled.delete(key)
	}

	/**
	 * Highlight a key
	 * @param {string} key
	 */
	highlight(key) {
		if (!this.disabled.has(key)) {
			this.highlighted.add(key)
		}
	}

	/**
	 * Unhighlight a key
	 * @param {string} key
	 */
	unhighlight(key) {
		if (this.highlighted.has(key)) this.highlighted.delete(key)
	}

	/**
	 * Add a row of keys
	 * @param {string[]} row
	 */
	addRow(row) {
		if (typeof row === 'string') {
			row = row.split('')
		}
		const keys = row.flatMap(splitAsKeys)
		this.keys.push(keys)
	}
}
