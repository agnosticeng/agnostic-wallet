<script lang="ts">
	export let address: string;
	export let symbol: string;
	export let size: string | number = 32;

	let fallback = false;
</script>

<div style:height="{size}px" style:width="{size}px">
	{#if fallback}
		<div>
			{symbol}
		</div>
	{:else}
		<img
			alt={symbol}
			src="https://s3.amazonaws.com/token-icons/{address.toLowerCase()}.png"
			on:error={() => (fallback = true)}
		/>
	{/if}
</div>

<style>
	img {
		height: 100%;
		width: 100%;
	}

	div > div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		border-radius: 50%;
		background: var(--background-color-secondary);
		line-height: 16px;
		font-weight: 500;
		font-size: 10px;
	}
</style>
