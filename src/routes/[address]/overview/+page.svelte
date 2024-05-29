<script lang="ts">
	// import type { PageData } from './$types';

	// export let data: PageData;
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
	<div></div>
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
</style>
