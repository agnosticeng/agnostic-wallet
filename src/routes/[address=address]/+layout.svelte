<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LightButton from '$lib/components/LightButton.svelte';
	import ethereum_src from '$lib/images/ethereum.logo.png';
	import { trunc_wallet_address } from '$lib/utils/wallets';
	import { blo } from 'blo';
	import { ChevronDown, Star } from 'lucide-svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	function formatCurrency(n: number) {
		return Intl.NumberFormat('en-US', {
			currency: 'USD',
			style: 'currency'
		}).format(n);
	}

	function formatRatio(n: number) {
		return Intl.NumberFormat('en-US', {
			style: 'percent',
			maximumFractionDigits: 2
		}).format(n);
	}
</script>

<svelte:head>
	<title>Address {trunc_wallet_address(data.address)} Portfolio, Tokens, DeFi and NFTs</title>
</svelte:head>

<section class="Overview">
	<article class="OverviewCard">
		<div class="Overview__ImageContainer">
			<img src={blo(data.address, 106)} alt="{data.address}'s image" />
		</div>
		<div class="Overview__InfoContainer">
			<div>
				<h1 data-kind="headline/h3">{trunc_wallet_address(data.address)}</h1>
				<LightButton style="width: 32px;">
					<ChevronDown style="flex-shrink: 0;" size="20" />
				</LightButton>
			</div>
			<div>
				<div data-kind="headline/h1">{formatCurrency(data.wealth?.value ?? 0)}</div>
				<span
					style:color={(data.wealth?.ratio ?? 0) > 0 ? 'var(--green-color)' : 'var(--red-color)'}
				>
					{formatRatio(data.wealth?.ratio ?? 0)} ({formatCurrency(
						Math.abs(data.wealth?.delta ?? 0)
					)})
				</span>
			</div>
		</div>
	</article>
	<article class="OverviewAction">
		<form
			method="POST"
			use:enhance={({ action }) =>
				({ result }) => {
					if (result.type === 'success' || result.type === 'redirect')
						data.isFavorite = action.search.includes('/enter');
				}}
		>
			{#if data.isFavorite}
				<LightButton formmethod="POST" formaction="/?/remove" style="padding: 0 6px">
					<Star size="20" fill="currentColor" />
				</LightButton>
			{:else}
				<input name="wallet" type="hidden" value={data.address} />
				<LightButton formmethod="POST" formaction="/?/enter" style="padding: 0 6px">
					<Star size="20" />
				</LightButton>
			{/if}
		</form>
	</article>
</section>

<section class="Tabs">
	<article class="TabsLink">
		<a
			aria-current={$page.url.pathname.endsWith('overview') ? 'page' : undefined}
			href="/{data.address}/overview"
		>
			<span data-kind="body/accent">Tokens</span>
		</a>
		<a
			aria-current={$page.url.pathname.endsWith('nfts') ? 'page' : undefined}
			href="/{data.address}/overview"
			aria-disabled="true"
		>
			<span data-kind="body/accent">NFTs</span>
		</a>
		<a
			aria-current={$page.url.pathname.endsWith('history') ? 'page' : undefined}
			href="/{data.address}/overview"
		>
			<span data-kind="body/accent">History</span>
		</a>
	</article>
	<article>
		<LightButton style="padding: 9px 19px; height: 40px; gap: 8px;">
			<img alt="Ethereum" src={ethereum_src} width="20" height="20" />
			<span data-kind="small/accent">Ethereum</span>
			<ChevronDown size="16" style="stroke-width: 2" />
		</LightButton>
	</article>
</section>

<section>
	<slot />
</section>

<style>
	section {
		margin: 24px 0;
	}

	.Overview {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		justify-content: space-between;

		margin-top: 0;
	}

	.OverviewCard {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 20px;
	}

	.Overview__ImageContainer {
		width: 106px;
		height: 106px;
	}

	.Overview__InfoContainer {
		display: grid;
		gap: 8px;
		grid-template-columns: minmax(0px, auto);
	}

	.Overview__InfoContainer > div:has(h1) {
		height: 24px;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 4px;
		align-items: center;
	}

	.Overview__InfoContainer > div:has(div[data-kind='headline/h1']) {
		display: grid;
		gap: 4px;
		grid-template-columns: minmax(0px, auto);
	}

	.Overview__ImageContainer img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 50%;
		border-radius: 12px;
	}

	.Tabs {
		position: sticky;
		top: 0px;
		padding-top: 8px;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		align-items: end;
		justify-content: space-between;
		border-bottom: 1px solid var(--separator-color);
		background-color: var(--background-color-main);
		z-index: 1;
	}

	.Tabs > article:first-child {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		grid-template-columns: repeat(3, minmax(60px, 1fr));
		gap: 0px;
	}

	.Tabs > article:first-child a {
		text-decoration: none;
		position: relative;
		text-align: center;
		cursor: pointer;
		padding-bottom: 10px;
	}

	.Tabs > article:first-child a[aria-disabled='true'] {
		pointer-events: none;
		color: lightgrey;
		user-select: none;
	}

	.Tabs > article:first-child a::after {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
	}

	.Tabs > article:first-child a:not([aria-disabled='true']):hover::after {
		content: '';
		background-color: currentColor;
	}

	.Tabs > article:first-child a[aria-current='page'] {
		color: var(--active-color);
	}

	.Tabs > article:first-child a[aria-current='page']::after {
		content: '';
		background-color: var(--active-color);
	}

	.Tabs > article:first-child a > span {
		font-size: 16px;
		line-height: 24px;
		font-weight: 500;
		letter-spacing: 0.25px;
	}

	.Tabs > article:last-child {
		padding-bottom: 4px;
	}
</style>
