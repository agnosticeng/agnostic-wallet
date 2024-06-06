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
	{/each}
</section>

<style>
	article ~ article {
		margin-top: 32px;
	}

	article > div {
		margin-bottom: 12px;
	}
</style>
