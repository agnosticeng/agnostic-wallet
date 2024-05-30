<script lang="ts">
	import TokenCard from '$lib/components/TokenCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	function formatCurrency(n: number, digits = 6) {
		return Intl.NumberFormat('en-US', {
			currency: 'USD',
			style: 'currency',
			maximumFractionDigits: digits
		}).format(n);
	}

	function formatNumber(n: number) {
		return Intl.NumberFormat('en-US', { maximumFractionDigits: 3 }).format(n);
	}
</script>

<section>
	<article>
		<h2 data-kind="headline/h2">Performance</h2>
		<div></div>
	</article>
	<article>
		<h2 data-kind="headline/h2">History</h2>
		<div></div>
	</article>
</section>

<article>
	<h2 data-kind="headline/h2">Assets</h2>
	<div style="padding: 24px 24px 0;">
		<div class="AssetsTable">
			<div class="Row Row_Head">
				<span data-kind="label/accent">ASSET</span>
				<span data-kind="label/accent">PRICE</span>
				<span data-kind="label/accent">BALANCE</span>
				<span data-kind="label/accent">VALUE</span>
			</div>
			<div class="Body">
				{#each data.tokens ?? [] as token (token.id)}
					<div class="Row Row_Body">
						<TokenCard
							address={token.address}
							chain={token.chain}
							name={token.name}
							symbol={token.symbol}
						/>
						<div data-kind="small/regular">
							{formatCurrency(token.currentPrice)}
						</div>
						<div data-kind="small/regular">
							{formatNumber(token.amount.unit)}
						</div>
						<div data-kind="small/regular">
							{formatCurrency(token.amount.usd, 2)}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</article>

<style>
	section {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 30px;
		grid-template-columns: 1fr 300px;

		margin-bottom: 30px;
	}

	@media screen and (max-width: 576px) {
		section {
			display: contents;
		}

		section > article:last-child {
			display: none;
		}
	}

	article {
		display: grid;
		gap: 12px;
		grid-template-columns: minmax(0px, auto);
	}

	article > div {
		border-radius: 12px;
		border: 1px solid var(--separator-color);
		box-shadow: 0px 2px 4px hsla(240deg 8% 9% / 6%);
	}

	:global(:root.dark) article > div {
		box-shadow: 0px 2px 4px hsla(0deg 0% 0% / 24%);
	}

	section > article > div {
		height: 340px;
		padding: 16px;
	}

	.AssetsTable {
		display: grid;
		gap: 4px;
		grid-template-columns: minmax(0px, auto);
	}

	.AssetsTable .Row {
		display: grid;
		column-gap: 8px;
		width: 100%;
		grid-template-columns: 1fr repeat(3, 170px);
	}

	.AssetsTable .Row_Body {
		position: relative;
		height: 60px;
	}

	.AssetsTable .Row_Body > div {
		display: flex;
		align-items: center;
	}
</style>
