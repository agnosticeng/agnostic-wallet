<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import LightButton from '$lib/components/LightButton.svelte';
	import Textfield from '$lib/components/Textfield.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import ethereum_src from '$lib/images/ethereum.logo.png';
	import { debounce } from '$lib/utils/time';
	import { ChevronDown, Fuel } from 'lucide-svelte';
	import Select from '../Select';

	export let gas: { fast: number; avg: number; base: number } | undefined = undefined;

	function formatNumber(n?: number) {
		if (!n) return 0;

		return Math.round(n);
	}
</script>

<header>
	<section>
		<form
			method="POST"
			action="/?/enter"
			use:enhance={({ formElement }) => {
				const address = formElement.wallet.value;
				return async ({ result }) => {
					if (result.type !== 'success') return;

					formElement.reset();
					await goto(`/${address}/overview`, { invalidateAll: true });
				};
			}}
		>
			<Textfield
				style="height: 36px"
				name="wallet"
				placeholder="Enter the wallet address"
				type="search"
			/>
		</form>

		<article>
			<Select placement="bottom-end" on:open={debounce(() => invalidate('gas:price'), 1_000)}>
				<div slot="trigger" class="GasTrigger" style="gap: 6px">
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
					<span data-kind="small/accent">{formatNumber(gas?.fast)}</span>
					<ChevronDown size="12" />
				</div>

				<div class="GasPopup">
					<div data-kind="body/accent">Realtime gas prices</div>
					<div>
						<div class="GasRow">
							<div><span>🚀</span><span data-kind="small/accent">Fast</span></div>
							<span data-kind="caption/accent">{formatNumber(gas?.fast)} GWEI</span>
						</div>
						<div class="GasRow">
							<div><span>🚙</span><span data-kind="small/accent">Average</span></div>
							<span data-kind="caption/accent">{formatNumber(gas?.avg)} GWEI</span>
						</div>
						<div class="GasRow">
							<div><span>🐢</span><span data-kind="small/accent">Slow</span></div>
							<span data-kind="caption/accent">{formatNumber(gas?.base)} GWEI</span>
						</div>
					</div>
				</div>
			</Select>
			<LightButton disabled>
				<span data-kind="small/accent">USD</span>
			</LightButton>
			<ThemeToggle />
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

	.GasTrigger {
		--background-color: transparent;

		border-radius: 8px;
		background-color: var(--background-color);
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0px 10px;
		height: 32px;
		cursor: pointer;
	}

	.GasTrigger:hover {
		--background-color: var(--background-color-hover);
	}

	.GasPopup {
		box-shadow: var(--elevation-200);
		background: var(--background-color-main);
		border-radius: 8px;
		padding: 18px 20px;

		display: grid;
		gap: 20px;
		grid-template-columns: minmax(0px, auto);
	}

	.GasPopup > div[data-kind] {
		width: 240px;
	}

	.GasRow {
		height: 40px;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 0px;
		align-items: center;
		justify-content: space-between;
	}

	.GasRow ~ .GasRow {
		border-top: 1px solid var(--separator-color);
	}

	.GasRow > div {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 8px;
		align-items: center;
	}

	.GasRow > div > span:not([data-kind]) {
		font-size: 20px;
	}
</style>
