<script lang="ts">
  import { projects, site } from '$lib/content';
</script>

<svelte:head>
  <title>projects · {site.name}</title>
</svelte:head>

<h1>projects</h1>
<p class="tagline">things i've built, newest first</p>

<ul>
  {#each projects as project}
    <li>
      <span class="year">{project.year}</span>
      <div>
        {#if project.href}
          <a class="name" href={project.href} target="_blank" rel="noreferrer">{project.name} ↗</a>
        {:else}
          <span class="name">{project.name}</span>
        {/if}
        <p>{project.summary}</p>
        <p class="stack">{project.stack}</p>
      </div>
    </li>
  {/each}
</ul>

<style>
  ul { list-style: none; margin: 0; padding: 0; }
  li {
    display: grid;
    grid-template-columns: 52px minmax(0, 1fr);
    gap: 12px;
    padding: 14px 0;
    border-top: 1px solid var(--line);
  }
  li:first-child { border-top: none; padding-top: 0; }
  .year { color: var(--muted); }
  .name { font-weight: 600; }
  a.name:hover { color: var(--accent); }
  p { margin: 2px 0 0; }
  .stack { color: var(--muted); font-size: 13px; }
</style>
