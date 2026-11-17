<script lang="ts">
  import { bio, currentWork, site } from '$lib/content';
  import { rich } from '$lib/rich';
  import SyntaxTree from '$lib/SyntaxTree.svelte';
</script>

<svelte:head>
  <title>{site.name}</title>
  <meta name="description" content={site.tagline} />
</svelte:head>

<div class="intro">
  <div>
    <h1>{site.name}</h1>
    <p class="tagline">{site.tagline}</p>

    {#each bio as paragraph}
      <p>{@html rich(paragraph)}</p>
    {/each}
  </div>
  <SyntaxTree />
</div>

<p class="label">current work</p>
<div class="cards">
  {#each currentWork as role}
    <a class="card" href={role.href} target="_blank" rel="noreferrer">
      {#if role.tag}<span class="tag">{role.tag}</span>{/if}
      <span>{role.title}</span>
      <span class="org">@{role.org}</span>
    </a>
  {/each}
</div>

<style>
  /* The tree sits to the right of the intro on wide screens (1000px and up), and above it otherwise. */
  .intro {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 32px;
    align-items: center;
  }
  /* On wide screens the tree hangs into the right margin, so the intro text
     keeps the column's full width minus a little. */
  @media (min-width: 1000px) {
    .intro { margin-right: -180px; }
  }
  @media (max-width: 999px) {
    .intro { grid-template-columns: 1fr; gap: 0; }
    .intro > :global(pre) { order: -1; margin-bottom: 28px; }
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 10px;
  }
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 10px 14px;
    transition: border-color 0.15s;
  }
  .card:hover { border-color: var(--accent); }
  /* A small pill sitting on the card's top-right corner. */
  .tag {
    position: absolute;
    top: -9px;
    right: 10px;
    padding: 0 7px;
    border-radius: 9px;
    background: var(--accent);
    color: var(--bg);
    font-size: 11px;
    font-weight: 600;
    line-height: 18px;
    white-space: nowrap;
  }
  .org { color: var(--muted); }
  .card:hover .org { color: var(--accent); }
</style>
