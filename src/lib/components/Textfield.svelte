<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	type $$Props = HTMLInputAttributes;

	export let value: $$Props['value'] = '';
</script>

<input bind:value {...$$restProps} />

<style>
	input {
		display: block;
		width: 100%;
		height: 40px;
		padding: 12px;
		border-radius: 8px;
		border: none;
		outline: none;
		background-color: hsl(240deg 7% 95% / 100%);
	}

	:global(:root.dark) input {
		background-color: hsl(240deg 4% 17% / 100%);
	}
</style>
