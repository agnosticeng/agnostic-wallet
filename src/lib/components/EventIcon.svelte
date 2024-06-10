<script lang="ts">
	import { ArrowUp, ArrowDown, Gem, Flame, File } from 'lucide-svelte';

	export let type: string;
	export let size: number = 36;

	$: color =
		type === 'Receive'
			? 'var(--green-color)'
			: ['Send', 'Mint', 'Burn'].includes(type)
				? undefined
				: 'var(--orange-color)';
</script>

<div style:width="{size}px" style:height="{size}px" style:color>
	{#if type === 'Send'}
		<ArrowUp size={size / 1.6} />
	{:else if type === 'Receive'}
		<ArrowDown size={size / 1.6} />
	{:else if type === 'Mint'}
		<Gem size={size / 1.6} />
	{:else if type === 'Burn'}
		<Flame size={size / 1.6} />
	{:else}
		<File size={size / 1.6} />
	{/if}
</div>

<style>
	div {
		border: 1px solid currentColor;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
