<script lang="ts">
	import Button from '$lib/components/LightButton.svelte';
	import { theme } from '$lib/stores/theme';
	import { BROWSER } from 'esm-env';
	import { Moon, Sun } from 'lucide-svelte';
	import { onDestroy } from 'svelte';

	export let label = 'Dark mode';

	function toggle() {
		const upcoming_theme = $theme.current === 'light' ? 'dark' : 'light';

		if (
			upcoming_theme ===
			(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
		) {
			// Switch the preference to `system`
			$theme.preference = 'system';
		} else {
			// Switch the preference to `light` or `dark`
			$theme.preference = upcoming_theme;
		}

		$theme.current = upcoming_theme;
	}

	const cb = (e: MediaQueryListEvent) =>
		theme.set({ preference: $theme.preference, current: e.matches ? 'dark' : 'light' });

	let query: MediaQueryList | undefined;
	$: {
		if (!BROWSER) break $;

		query?.removeEventListener('change', cb);

		if ($theme.preference === 'system') {
			query = window.matchMedia('(prefers-color-scheme: dark)');
			query.addEventListener('change', cb);
			query.dispatchEvent(
				new MediaQueryListEvent('change', { matches: query.matches, media: query.media })
			);
		}
	}

	onDestroy(() => query?.removeEventListener('change', cb));
</script>

<Button on:click={toggle} title={label} style="width: 32px; padding: 8px">
	{#if BROWSER}
		{#if $theme?.current === 'light'}
			<Moon size={15} />
		{:else}
			<Sun size={15} />
		{/if}
	{:else}
		<div style="width: 15px;" />
	{/if}
</Button>
