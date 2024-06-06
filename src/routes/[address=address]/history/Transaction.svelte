<script lang="ts">
	import BloImage from '$lib/components/BloImage.svelte';
	import EventIcon from '$lib/components/EventIcon.svelte';
	import TokenIcon from '$lib/components/TokenIcon.svelte';
	import type { Transaction } from '$lib/server/ethereum/events';
	import { trunc_wallet_address } from '$lib/utils/wallets';

	export let transaction: Transaction;

	function formatTime(n: Date) {
		return Intl.DateTimeFormat('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hourCycle: 'h12'
		}).format(n);
	}

	function formatNumber(n: number) {
		return Intl.NumberFormat('en-US', { maximumFractionDigits: 3 }).format(n);
	}

	function formatCurrency(n: number) {
		return Intl.NumberFormat('en-US', {
			currency: 'USD',
			style: 'currency',
			maximumFractionDigits: 3
		}).format(n);
	}

	let address: string;
	$: {
		if (transaction.type === 'Send') address = transaction.to;
		else if (transaction.type === 'Receive') address = transaction.from;
		else address = transaction.token.address;
	}
</script>

<article>
	<div>
		<EventIcon type={transaction.type} size={36} />
		<div>
			<div data-kind="small/regular">{transaction.type}</div>
			<div data-kind="small/regular" style:color="var(--grey-color)">
				{formatTime(transaction.timestamp)}
			</div>
		</div>
	</div>
	<div>
		<div>
			<TokenIcon size={36} address={transaction.token.address} symbol={transaction.token.symbol} />
			<div>
				<div
					data-kind="small/regular"
					class:Positive={transaction.type === 'Receive' || transaction.type === 'Mint'}
				>
					{transaction.type === 'Send' || transaction.type === 'Burn' ? '-' : '+'}{formatNumber(
						transaction.value
					)}
					{transaction.token.symbol}
				</div>
				<div data-kind="small/regular" style:color="var(--grey-color)">
					{formatCurrency(transaction.valueInUSD)}
				</div>
			</div>
		</div>
		<div>
			<div data-kind="caption/regular" style:color="var(--grey-color)">
				{#if transaction.type === 'Send'}
					To
				{:else if transaction.type === 'Receive'}
					From
				{:else}
					Application
				{/if}
			</div>
			<div>
				<BloImage size={20} {address} />
				<div data-kind="small/regular">
					<a
						href="/{address}/overview"
						aria-label="Address"
						target="_blank"
						rel="noopener noreferrer"
					>
						{trunc_wallet_address(address)}
					</a>
				</div>
			</div>
		</div>
	</div>
</article>

<style>
	article {
		border-top: 1px solid var(--separator-color);
		height: 64px;
		padding: 0 4px;

		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 8px;
		grid-template-columns: 220px 1fr;
	}

	@media screen and (max-width: 768px) {
		article {
			border-top: 1px solid var(--separator-color);
			height: 108px;
			padding: 2px 8px 5px;

			grid-auto-flow: initial;
			grid-auto-columns: initial;
			gap: 4px;
			grid-template-columns: minmax(0px, auto);
			grid-template-rows: auto 1fr;
		}
	}

	article > div:first-child {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 12px;
		align-items: center;
	}

	article > div:last-child {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 24px;
		align-items: center;
		grid-template-columns: 1fr 150px;
	}

	article > div:last-child > div:first-child {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 12px;
		align-items: center;
	}

	.Positive {
		color: var(--green-color);
	}

	article > div:last-child > div:last-child {
		display: grid;
		gap: 4px;
		grid-template-columns: minmax(0px, auto);
	}

	article > div:last-child > div:last-child > div:last-child {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 8px;
		align-items: center;
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
