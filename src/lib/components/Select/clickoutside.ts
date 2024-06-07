import { tick } from 'svelte';
import type { ActionReturn } from 'svelte/action';

type Attributes = {
	'on:clickoutside'?: (event: MouseEvent) => void;
};

export function clickoutside(node: HTMLElement): ActionReturn<unknown, Attributes> {
	function handleClick(ev: MouseEvent) {
		const target = ev.target as Node | null;
		if (!node.contains(target))
			tick().then(() =>
				node.dispatchEvent(new MouseEvent('clickoutside', { ...ev, relatedTarget: target }))
			);
	}

	window.addEventListener('click', handleClick);

	return {
		destroy() {
			window.removeEventListener('click', handleClick);
		}
	};
}
