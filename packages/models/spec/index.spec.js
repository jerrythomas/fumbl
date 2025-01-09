import { describe, it, expect } from 'vitest'
// skipcq: JS-C1003 - Importing all components for verification
import * as actions from '../src/index.js'

describe('models', () => {
	it('should contain all exported models', () => {
		expect(Object.keys(actions)).toEqual(['WordHunt', 'WordGuessed', 'Keyboard'])
	})
})
