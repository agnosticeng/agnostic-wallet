<script lang="ts">
	import { groupBy } from '$lib/utils/array';
	import type { PageData } from './$types';
	import Transaction from './Transaction.svelte';

	export let data: PageData;

	function formatDate(n: Date) {
		return Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(
			n
		);
	}

	$: groups = groupBy(data.history ?? [], (item) => formatDate(item.timestamp));
</script>

<section>
	{#each groups as [date, items]}
		<article>
			<div data-kind="small/accent">{date}</div>
			{#each items as item}
				<Transaction transaction={item} />
			{/each}
		</article>
	{:else}
		<div class="Empty">
			<div>
				<div data-kind="headline/h1" style="text-align: center;">🥺</div>
				<span>No transactions yet</span>
			</div>
		</div>
	{/each}
</section>

<style>
	article ~ article {
		margin-top: 32px;
	}

	article > div {
		margin-bottom: 12px;
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
