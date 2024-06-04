<script lang="ts">
	import { Wallet } from 'lucide-svelte';
	import TokenCard from '$lib/components/TokenCard.svelte';
	import type { PageData } from './$types';
	import EventIcon from '$lib/components/EventIcon.svelte';

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

	function formatDate(n: Date) {
		return Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short' }).format(n);
	}
</script>

<section>
	<article>
		<h2 data-kind="headline/h2">Performance</h2>
		<div></div>
	</article>
	<article>
		<h2 data-kind="headline/h2">History</h2>
		<div>
			{#if data.events}
				{@const events = data.events.slice(0, 5)}
				<div class="HistoryList">
					{#each events as ev (ev.id)}
						<div>
							<div>
								<EventIcon type={ev.type} size={32} />
								<div>
									<div data-kind="small/accent">{ev.type}</div>
									<div data-kind="label/regular">{formatDate(ev.timestamp)}</div>
								</div>
							</div>
							<div data-kind="small/regular">
								{ev.value}
								{ev.token.symbol}
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="Empty">
					<div>
						<div data-kind="headline/h1" style="text-align: center;">🥺</div>
						<span>No transactions yet</span>
					</div>
				</div>
			{/if}
		</div>
	</article>
</section>

<article>
	<h2 data-kind="headline/h2">Assets</h2>
	<div style="padding: 24px;">
		{#if data.tokens?.length}
			<div class="AssetsSummary">
				<div class="Icon">
					<Wallet size="24" />
				</div>
				<div data-kind="headline/h3">
					Wallet · {formatCurrency(
						data.tokens.reduce((a, k) => a + k.amount.usd, 0),
						2
					)}
				</div>
			</div>
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
								{token.symbol}
							</div>
							<div data-kind="small/regular">
								{formatCurrency(token.amount.usd, 2)}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="Empty">
				<div>
					<div data-kind="headline/h1" style="text-align: center;">🥺</div>
					<span>No Assets yet</span>
				</div>
			</div>
		{/if}
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

	@media screen and (max-width: 768px) {
		section {
			display: block;
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

	.AssetsSummary {
		margin-bottom: 28px;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 12px;
		align-items: center;
	}

	.AssetsSummary > .Icon {
		display: grid;
		place-items: center;
		color: white;
		background-color: var(--active-color);
		border-radius: 4px;
		height: 32px;
		width: 32px;
	}

	div:has(> .HistoryList) {
		padding: 0;
		padding-top: 12px;
	}

	.HistoryList > div {
		height: 44px;
		margin: 6px 24px;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 12px;
		align-items: center;
		justify-content: space-between;
		grid-template-columns: minmax(min-content, max-content) minmax(28px, max-content);
	}
	.HistoryList > div > div {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 8px;
		align-items: center;
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

	.Empty {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.Empty > div {
		display: grid;
		gap: 8px;
		grid-template-columns: minmax(0px, auto);
	}
</style>
