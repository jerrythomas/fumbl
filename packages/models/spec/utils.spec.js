import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { splitAsKeys } from '../src/utils.js'

describe('utils', () => {
	describe('splitAsKeys', () => {
		it('should split a string into an array of key objects', () => {
			const input = 'abc'
			const expectedOutput = [{ key: 'a' }, { key: 'b' }, { key: 'c' }]
			expect(splitAsKeys(input)).toEqual(expectedOutput)
		})

		it('should return the object if it has a key attribute', () => {
			const input = { key: 'a', icon: 'a' }
			expect(splitAsKeys(input)).toEqual(input)
		})

		it('should return an empty array for invalid inputs', () => {
			expect(splitAsKeys(null)).toEqual([])
			expect(splitAsKeys(undefined)).toEqual([])
			expect(splitAsKeys(123)).toEqual([])
		})
	})
})
