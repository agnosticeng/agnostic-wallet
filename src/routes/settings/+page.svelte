<script lang="ts">
  import { theme, getCurrentSystemPreference } from "$lib/stores/theme";

  function isValidThemePreference(
    raw: unknown
  ): raw is "light" | "dark" | "system" {
    return (
      typeof raw === "string" &&
      (raw === "light" || raw === "dark" || raw === "system")
    );
  }

  function handleThemeChange(
    e: Event & {
      currentTarget: EventTarget & HTMLFormElement;
    }
  ) {
    const form = new FormData(e.currentTarget);
    const upcoming_preference = form.get("theme");
    if (!isValidThemePreference(upcoming_preference)) return;

    $theme.preference = upcoming_preference;
    if (upcoming_preference === "system")
      $theme.current = getCurrentSystemPreference();
    else $theme.current = upcoming_preference;
  }
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<h1>Settings</h1>

<section>
  <h2>Preferences</h2>

  <article>
    <h3>Theme</h3>
    <form on:change={handleThemeChange} on:submit|preventDefault>
      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={$theme.preference === "light"}
        />
        <span>Light</span>
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="system"
          checked={$theme.preference === "system"}
        />
        <span>System</span>
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={$theme.preference === "dark"}
        />
        <span>Dark</span>
      </label>
    </form>
  </article>
</section>

<!-- Just a test for the UI -->
<section>
  <h2>Advanced</h2>
  <article>
    <span style="margin: 12px auto; display: block; width: fit-content"
      >Empty for now</span
    >
  </article>
</section>

<style>
  section {
    margin: 44px 0;
  }

  article {
    border-top: 1px solid var(--separator-color);
    margin-top: 8px;
    padding-top: 8px;
  }

  h3 {
    margin-bottom: 12px;
  }

  form {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(min-content, max-content);
    gap: 32px;
  }

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  label > span {
    display: block;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.2px;
  }

  input[type="radio"] {
    margin: 0;
  }
</style>
