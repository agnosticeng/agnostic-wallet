<script lang="ts">
	import { blo } from 'blo';

	export let address: string;
	export let size: number = 100;

	$: src = blo(address as `0x${string}`, size);

	function clamp(v: number, min = 4, max = 12) {
		return Math.max(Math.min(max, Math.round(v)), min);
	}
</script>

<div style:border-radius="{clamp(size / 5)}px" style:width="{size}px" style:height="{size}px">
	<img {src} alt="{address}'s image" />
</div>

<style>
	div {
		overflow: hidden;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 50%;
	}
</style>
