<script lang="ts">
	import { Eye, Settings } from 'lucide-svelte';

	import '$lib/styles/index.css';

	import SkipLink from '$lib/components/nav/SkipLink.svelte';
	import agnostic from '$lib/images/agnostic.svg';
	import ThemeDetector from '$lib/components/ThemeDetector.svelte';

	import { page } from '$app/stores';
	import Header from '$lib/components/nav/Header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<SkipLink href="#main" />
<ThemeDetector />

<nav>
	<h1>
		<div data-placeholder style="height: 44px;"></div>
	</h1>

	<div class="Stack">
		<a
			aria-current={$page.route.id?.startsWith('/[address=address]') || $page.url.pathname == '/'
				? 'page'
				: undefined}
			href="/"
			class="MenuItem"
		>
			<Eye size="24" />
			<span data-kind="small/accent">Overview</span>
		</a>
		<a
			aria-current={$page.url.pathname.startsWith('/settings') ? 'page' : undefined}
			href="/settings"
			class="MenuItem"
		>
			<Settings size="24" />
			<span data-kind="small/accent">Settings</span>
		</a>
	</div>

	<div class="SideBarFooter">
		<a
			href="https://app.agnostic.dev"
			aria-label="Agnostic App"
			target="_blank"
			rel="noopener noreferrer"
			data-sveltekit-preload-data="off"
		>
			<img alt="Agnostic" src={agnostic} />
		</a>
	</div>
</nav>

<main id="main">
	<Header gasPrice={data.gas} />
	<div class="PageWrapper">
		<slot />
	</div>
</main>

<style>
	main {
		position: relative;
		margin: 0 auto;
		overflow: hidden;
		overflow-y: auto;
		height: 100%;

		padding-left: var(--side-bar-width);
	}

	nav {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;

		background-color: var(--background-color-secondary);

		width: var(--side-bar-width);
		z-index: 1;

		display: flex;
		flex-flow: column;
	}

	h1 {
		margin: 8px;
		border-radius: 8px;
		padding: 8px 8px 8px 12px;
	}

	h1 > div {
		width: 120px;
		margin: 0 auto;
	}

	.Stack {
		display: grid;
		gap: 0px;
		grid-template-columns: minmax(0px, auto);

		margin: 8px 0;
	}

	.MenuItem {
		margin: 0px 8px;
		border-radius: 8px;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 12px;
		height: 48px;
		align-items: center;
		padding: 0 12px 0 16px;
		text-decoration: none;
	}

	.MenuItem:hover {
		background-color: var(--menu-item-background-color-hover);
	}

	.MenuItem[aria-current='page'] {
		color: var(--active-color);
	}

	div.SideBarFooter {
		margin: auto 24px 22px;
		position: relative;
	}

	div.SideBarFooter > a {
		background-color: hsl(0 0 85% / 100%);
		border-radius: 6px;
		display: block;
		width: fit-content;
		padding: 4px 5px;
	}

	div.SideBarFooter > a > img {
		width: 70px;
	}

	@media screen and (max-width: 1200px) {
		h1 > div {
			width: 74px;
		}

		.MenuItem {
			place-items: center;
			height: auto;
			padding: 10px 0px;
			grid-template-columns: 1fr;
			gap: 4px;
		}

		.MenuItem > span {
			font-size: 11px;
			line-height: 12px;
		}

		div.SideBarFooter {
			margin: auto auto 22px;
		}

		div.SideBarFooter > a > img {
			width: 55px;
		}
	}

	.PageWrapper {
		width: 100%;
		max-width: 960px;
		margin: 0 auto;
		padding: 24px 15px;
	}
</style>
