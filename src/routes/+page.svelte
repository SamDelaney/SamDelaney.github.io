<script lang="ts">
  import { bio, currentWork, site } from '$lib/content';
  import { rich } from '$lib/rich';
</script>

<svelte:head>
  <title>{site.name}</title>
  <meta name="description" content={site.tagline} />
</svelte:head>

<h1>{site.name}</h1>
<p class="tagline">{site.tagline}</p>

{#each bio as paragraph}
  <p>{@html rich(paragraph)}</p>
{/each}

<p class="label">current work</p>
<div class="cards">
  {#each currentWork as role}
    <a class="card" href={role.href} target="_blank" rel="noreferrer">
      <span>{role.title}</span>
      <span class="org">@{role.org}</span>
    </a>
  {/each}
</div>

<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 10px;
  }
  .card {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 10px 14px;
    transition: border-color 0.15s;
  }
  .card:hover { border-color: var(--accent); }
  .org { color: var(--muted); }
  .card:hover .org { color: var(--accent); }
</style>
