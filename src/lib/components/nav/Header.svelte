<script lang="ts">
	import LightButton from '$lib/components/LightButton.svelte';
	import Textfield from '$lib/components/Textfield.svelte';
	import ethereum_src from '$lib/images/ethereum.logo.png';
	import { Fuel } from 'lucide-svelte';

	export let gasPrice: number = 22;
</script>

<header>
	<section>
		<form on:submit|preventDefault>
			<Textfield name="wallet" placeholder="Enter the wallet address" />
		</form>

		<article>
			<LightButton style="gap: 6px">
				<div style="position: relative; height: 18px; width: 18px;">
					<Fuel size="18" />
					<img
						src={ethereum_src}
						alt="Ethereum"
						width="12"
						height="12"
						style="position: absolute; bottom: -3px; right: -3px;"
					/>
				</div>
				<span data-kind="small/accent">{gasPrice}</span>
			</LightButton>
			<LightButton>
				<span data-kind="small/accent">USD</span>
			</LightButton>
		</article>
	</section>
</header>

<style>
	header {
		width: 100%;
		max-width: 960px;
		padding: 0 15px;
		margin: 0 auto;
	}

	header > section {
		display: grid;
		grid-template-columns: 50% auto;
		gap: 4px;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--separator-color);
		height: var(--header-height);
	}

	header article {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 8px;
		-webkit-box-align: center;
		align-items: center;
	}

	header article :global(svg.lucide-icon) {
		stroke-width: 2;
	}
</style>
