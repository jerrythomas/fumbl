<script>
	import { createEmitter } from '@rokkit/core'
	/**
	 * @typedef {Object} Props
	 * @property {string} [class]
	 * @property {any} name
	 * @property {any} [state]
	 * @property {string} [size]
	 * @property {string} [role]
	 * @property {string} [label]
	 * @property {boolean} [disabled]
	 * @property {number} [tabindex]
	 * @property {boolean|null} [checked]
	 * @event {MouseEvent} [onclick]
	 * @event {CustomEvent} [onchange]
	 * @event {MouseEvent} [onmouseenter]
	 * @event {MouseEvent} [onmouseleave]
	 */

	/** @type {Props} */
	let {
		class: className = '',
		name,
		state = null,
		size = 'base',
		role = 'img',
		label = name,
		disabled = false,
		tabindex = $bindable(0),
		checked = $bindable(null),
		...events
	} = $props()

	let emitter = $derived(createEmitter(events, ['click', 'change', 'mouseenter', 'mouseleave']))
	/**
	 *
	 * @param {Event} e
	 */
	function handleClick(e) {
		e.preventDefault()
		e.stopPropagation()

		if (!disabled) {
			if (role === 'checkbox' || role === 'option') {
				checked = !checked
				emitter.change(checked)
			}
			emitter.click()
		}
	}

	let classlist = className.split(' ')
	let validatedTabindex = $derived(role === 'img' || disabled ? -1 : tabindex)
	let ariaChecked = $derived(
		['checkbox', 'option'].includes(role) ? (checked !== null ? checked : false) : null
	)

	let small = $derived(size === 'small' || classlist.includes('small'))
	let medium = $derived(size === 'medium' || classlist.includes('medium'))
	let large = $derived(size === 'large' || classlist.includes('large'))
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<rkt-icon
	class={className}
	class:small
	class:medium
	class:large
	class:disabled
	{role}
	aria-label={label}
	aria-checked={ariaChecked}
	onclick={handleClick}
	onkeydown={(e) => e.key === 'Enter' && e.currentTarget.click()}
	data-state={state}
	tabindex={validatedTabindex}
	onmouseenter={emitter.mouseenter}
	onnmouseleave={emitter.nmouseleave}
>
	<i class={name} aria-hidden={true}></i>
</rkt-icon>
