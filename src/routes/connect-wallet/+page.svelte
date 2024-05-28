<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Textfield from '$lib/components/Textfield.svelte';
</script>

<svelte:head>
	<title>Connect Wallet</title>
</svelte:head>

<div class="PageContainer">
	<section>
		<h1>Connect your Wallet</h1>

		<article>
			<h3>Track any wallet</h3>
			<form method="POST" action="?/enter">
				<Textfield name="wallet" required placeholder="Enter the wallet address" />
				<Button type="submit"><span class="ButtonAddText">Add</span></Button>
			</form>
		</article>
	</section>
</div>

<style>
	.PageContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		--max-width: 450px;
	}

	section {
		max-width: var(--max-width);
		width: 100%;
		flex: 1 1 0%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	h1 {
		margin: 24px 0;
	}

	article {
		display: grid;
		gap: 12px;
	}

	form {
		width: 100%;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min-content, max-content);
		gap: 8px;
		grid-template-columns: 1fr auto;
	}

	.ButtonAddText {
		padding: 0 4px;
	}
</style>
