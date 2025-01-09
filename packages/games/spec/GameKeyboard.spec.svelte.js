import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/svelte'
import GameKeyboard from '../src/GameKeyboard.svelte'
import { tick, flushSync } from 'svelte'
import { SvelteSet } from 'svelte/reactivity'

describe('GameKeyboard', () => {
	it('should render the default keyboard', () => {
		const { container } = render(GameKeyboard)
		expect(container).toMatchSnapshot()
	})

	it('should render with disabled keys', async () => {
		const props = { disabledKeys: new SvelteSet() }
		const { container } = render(GameKeyboard, { props })

		props.disabledKeys.add('a')
		flushSync()
		await tick()
		expect(container).toMatchSnapshot()

		props.disabledKeys.add('p')
		flushSync()
		await tick()
		expect(container).toMatchSnapshot()
	})

	it('should render with highlighted keys', async () => {
		const props = { highlightedKeys: new SvelteSet() }
		const { container } = render(GameKeyboard, { props })

		props.highlightedKeys.add('a')
		flushSync()
		await tick()
		expect(container).toMatchSnapshot()

		props.highlightedKeys.add('p')
		flushSync()
		await tick()
		expect(container).toMatchSnapshot()
	})

	it('should update disabled and highlighted keys', async () => {
		const props = { disabledKeys: new SvelteSet(), highlightedKeys: new SvelteSet() }
		const { container } = render(GameKeyboard, { props })

		props.disabledKeys.add('a')
		props.highlightedKeys.add('p')
		flushSync()
		await tick()
		expect(container).toMatchSnapshot()

		props.disabledKeys.add('y')
		props.disabledKeys.delete('a')
		props.highlightedKeys.add('x')
		props.highlightedKeys.delete('p')
		flushSync()
		await tick()
		expect(container).toMatchSnapshot()
	})
})
