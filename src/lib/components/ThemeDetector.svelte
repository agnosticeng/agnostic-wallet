<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { theme } from '$lib/stores/theme';
	import { onDestroy } from 'svelte';

	const cb = (e: MediaQueryListEvent) =>
		theme.set({
			preference: $theme.preference,
			current: e.matches ? 'dark' : 'light'
		});

	let query: MediaQueryList | undefined;
	$: {
		if (!BROWSER) break $;

		query?.removeEventListener('change', cb);

		if ($theme.preference === 'system') {
			query = window.matchMedia('(prefers-color-scheme: dark)');
			query.addEventListener('change', cb);
			query.dispatchEvent(
				new MediaQueryListEvent('change', {
					matches: query.matches,
					media: query.media
				})
			);
		}
	}

	onDestroy(() => query?.removeEventListener('change', cb));
</script>
