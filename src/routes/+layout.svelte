<script lang="ts">
	import Header from '$lib/components/nav/Header.svelte';
	import SkipLink from '$lib/components/nav/SkipLink.svelte';
	import '$lib/styles/index.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<SkipLink href="#main" />

<Header gas={data.gas} />
<div class="PageWrapper">
	<slot />
</div>

<style>
	.PageWrapper {
		width: 100%;
		max-width: 960px;
		margin: 0 auto;
		padding: 24px 15px;
	}
</style>
