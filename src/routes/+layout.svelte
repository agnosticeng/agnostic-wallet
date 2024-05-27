<script lang="ts">
  import "$lib/styles/index.css";

  import SkipLink from "$lib/components/nav/SkipLink.svelte";
</script>

<SkipLink href="#main" />

<main id="main">
  <slot />
</main>

<style>
  main {
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
  }
</style>
