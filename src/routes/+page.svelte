<script lang="ts">
	import TokenIcon from '$lib/components/TokenIcon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function formatPrice(n: number) {
		return Intl.NumberFormat('en-US', {
			currency: 'USD',
			style: 'currency',
			maximumFractionDigits: 6
		}).format(n);
	}
</script>

<svelte:head>
	<title>Wallet</title>
</svelte:head>

<h1 data-kind="headline/h1">Trending Crypto</h1>

<section class="Grid">
	{#each data.tokens ?? [] as token (token.id)}
		<article>
			<div>
				<TokenIcon address={token.address} symbol={token.symbol} size="40" />
				<div data-kind="body/accent">{token.name}</div>
			</div>
			<div>
				<div data-kind="headline/h2">{formatPrice(token.price)}</div>
			</div>
		</article>
	{/each}
</section>

<style>
	h1 {
		margin-bottom: 40px;
	}

	.Grid {
		display: grid;
		gap: 20px;
		grid-template-columns: 1fr 1fr 1fr;
	}

	.Grid > article {
		border: 1px solid var(--separator-color);
		border-radius: 12px;
		padding: 23px;
	}

	.Grid > article > div {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 12px;
		align-items: center;
	}

	.Grid > article > div:first-child {
		margin-bottom: 32px;
	}

	@media screen and (max-width: 768px) {
		.Grid {
			display: block;
		}

		.Grid > article {
			padding: 16px;
			border: none;
			border-radius: 0;
			border-top: 1px solid var(--separator-color);

			display: grid;
			grid-template-columns: auto auto;
			justify-content: space-between;
		}

		.Grid > article > div:first-child {
			margin-bottom: 0;
		}
	}
</style>
