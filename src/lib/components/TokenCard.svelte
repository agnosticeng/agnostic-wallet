<script lang="ts">
	import TokenIcon from '$lib/components/TokenIcon.svelte';
	import ethereum_src from '$lib/images/ethereum.logo.png';

	export let address: string;
	export let symbol: string;
	export let chain: string;
	export let name: string;
</script>

<div class="Container">
	<TokenIcon {address} {symbol} />
	<div class="InfoContainer">
		<span data-kind="small/accent">{name}</span>
		<div data-kind="small/regular">
			<img src={ethereum_src} alt={chain} width="12" height="12" />
			<span>{chain.slice(0, 1).toUpperCase() + chain.slice(1)}</span>
		</div>
	</div>
</div>

<style>
	.Container {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 8px;
		align-items: center;
	}

	.InfoContainer {
		display: grid;
		gap: 0px;
		grid-template-columns: minmax(0px, auto);
	}

	.InfoContainer > div {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 4px;
		align-items: center;
	}
</style>
