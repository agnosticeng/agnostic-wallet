<script lang="ts">
  import { Star, Compass, Settings } from "lucide-svelte";

  import "$lib/styles/index.css";

  import SkipLink from "$lib/components/nav/SkipLink.svelte";
  import agnostic from "$lib/images/agnostic.svg";
  import ThemeDetector from "$lib/components/ThemeDetector.svelte";

  import { page } from "$app/stores";
</script>

<SkipLink href="#main" />
<ThemeDetector />

<nav>
  <h1>
    <img alt="Agnostic" src={agnostic} />
  </h1>

  <div class="Separator"></div>

  <div class="Stack">
    <a
      aria-current={$page.url.pathname === "/" ? "page" : undefined}
      href="/"
      class="MenuItem"
    >
      <Compass size="24" />
      <span>Explore</span>
    </a>
    <a
      aria-current={$page.url.pathname === "/favorites" ? "page" : undefined}
      href="/"
      class="MenuItem"
    >
      <Star size="24" />
      <span>Favorites</span>
    </a>
    <a
      aria-current={$page.url.pathname.startsWith("/settings")
        ? "page"
        : undefined}
      href="/"
      class="MenuItem"
    >
      <Settings size="24" />
      <span>Settings</span>
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
      Launch app
    </a>
  </div>
</nav>

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
    margin: 2.4rem 0 0;
  }

  h1 > img {
    width: 120px;
    margin: 0 auto;
  }

  .Separator {
    height: 1px;
    width: 100%;
    background-color: var(--separator-color);

    margin-top: 32px;
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
  }

  .MenuItem:hover {
    background-color: var(--menu-item-background-color-hover);
  }

  .MenuItem[aria-current="page"] {
    font-weight: 600;
  }

  .MenuItem[aria-current="page"] > :global(svg) {
    stroke-width: 2;
  }

  div.SideBarFooter {
    margin: auto 24px 22px;
    position: relative;
  }

  @media screen and (max-width: 768px) {
    h1 > img {
      width: 74px;
    }

    .MenuItem > span {
      display: none;
    }
  }
</style>
