import { BROWSER } from 'esm-env';
import { persisted } from 'svelte-local-storage-store';

type Theme = 'light' | 'dark';

export const theme = persisted<{ preference: Theme | 'system'; current: Theme }>('svelte:theme', {
	preference: 'system',
	current: BROWSER
		? window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
		: 'light'
});

theme.subscribe(($theme) => {
	if (!BROWSER) return;

	document.documentElement.classList.remove('light', 'dark');
	document.documentElement.classList.add($theme.current);
});

export function getCurrentSystemPreference(): Theme {
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
