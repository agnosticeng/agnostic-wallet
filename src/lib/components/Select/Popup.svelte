<script lang="ts">
	import { computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom';
	import { ChevronDown } from 'lucide-svelte';
	import { createEventDispatcher, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { clickoutside } from './clickoutside';
	import { portal } from './portal';

	export let placement: Placement = 'bottom-start';
	export let disabled = false;

	const dispatch = createEventDispatcher<{ open: unknown }>();

	const open = writable(false);

	open.subscribe((value) => {
		if (value) dispatch('open');
	});

	let button: HTMLButtonElement;
	let popup: HTMLElement;

	async function show() {
		if ($open) {
			open.set(false);
			return;
		}

		open.set(true);
		await tick();

		await updatePopupPosition();
	}

	async function updatePopupPosition() {
		const { x, y } = await computePosition(button, popup, {
			placement,
			middleware: [offset(5), flip(), shift({ padding: 5 })]
		});

		Object.assign(popup.style, { left: `${x}px`, top: `${y}px` });
	}

	function handleClickOutside(e: MouseEvent) {
		if (!(e.relatedTarget instanceof HTMLElement)) return;
		if (button.contains(e.relatedTarget)) return;
		open.set(false);
	}

	async function handleResize() {
		if ($open) await updatePopupPosition();
	}
</script>

<svelte:window on:resize={handleResize} />

<button
	type="button"
	{disabled}
	aria-expanded={$open}
	aria-haspopup="menu"
	bind:this={button}
	on:click={show}
>
	<slot name="trigger">
		<div>
			<ChevronDown size="20" />
		</div>
	</slot>
</button>

{#if $open}
	<div
		role="menu"
		use:portal={'#root'}
		transition:fade={{ duration: 100 }}
		bind:this={popup}
		use:clickoutside
		on:clickoutside={handleClickOutside}
	>
		<slot {open} />
	</div>
{/if}

<style>
	button {
		background: none;
		border: none;
		outline: none;
		padding: 0;
		margin: 0;
		color: currentColor;
	}

	button > div {
		--background-color: transparent;

		padding: 5px;
		height: 32px;
		width: 32px;
		border-radius: 8px;
		background-color: var(--background-color);
		transition: background-color 100ms linear;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	button:not(:disabled)[aria-expanded='true'] > div,
	button:not(:disabled) > div:hover {
		--background-color: var(--background-color-hover);
		cursor: pointer;
	}

	div[role='menu'] {
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 9;
	}
</style>
