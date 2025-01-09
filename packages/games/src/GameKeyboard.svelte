<script>
	let { disabledKeys = $bindable(), highlightedKeys = $bindable() } = $props()

	let keyboard = [
		'qwertyuiop'.split(''),
		'asdfghjkl'.split(''),
		[
			{ key: 'Enter', icon: 'key-enter' },
			...'zxcvbnm'.split(''),
			{ key: 'Backspace', icon: 'key-backspace' }
		]
	]

	// console.log($inspect({ disabledKeys, highlightedKeys }))
</script>

<keyboard class="grid w-full grid-rows-3 gap-1 p-2">
	{#each keyboard as row, rowIndex}
		<key-row class="grid-cols-20 grid gap-1">
			{#each row as value, colIndex}
				{@const skip = rowIndex == 1 && colIndex == 0}
				{@const key = typeof value === 'object' ? value.key : value}
				{@const label = (typeof value === 'object' ? value.label : null) ?? key}
				{@const icon = typeof value === 'object' ? value.icon : null}
				{@const disabled = disabledKeys && disabledKeys.has(key)}
				{@const highlighted = highlightedKeys && highlightedKeys.has(key)}

				{#if skip}
					<span class="col-span-1"></span>
				{/if}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<key
					class="flex items-center justify-center rounded"
					class:disabled
					class:highlighted
					class:wide={key.length > 1}
					role="button"
					aria-label={label}
					tabindex={disabled ? -1 : 0}
					data-key={key}
				>
					{#if key.length > 1 && icon}
						<i class={icon}></i>
					{:else}
						{key}
					{/if}
				</key>
			{/each}
		</key-row>
	{/each}
</keyboard>

<style>
	key {
		@apply col-span-2 h-10 text-lg uppercase md:h-20 md:text-3xl;
	}
	key.wide {
		@apply col-span-3;
	}
	key i {
		@apply text-2xl md:text-4xl;
	}
</style>
