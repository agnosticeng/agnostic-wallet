<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	type $$Props = HTMLButtonAttributes;

	let className: $$Props['class'] = '';
	export { className as class };
</script>

<button on:click {...$$restProps} class={className}>
	<slot />
</button>

<style>
	button {
		--background-color: transparent;

		border: none;
		outline: none;
		color: currentColor;
		border-radius: 8px;
		background-color: var(--background-color);
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0px 10px;
		height: 32px;
	}

	button:not(:disabled):hover {
		--background-color: var(--background-color-hover);
		cursor: pointer;
	}
</style>
