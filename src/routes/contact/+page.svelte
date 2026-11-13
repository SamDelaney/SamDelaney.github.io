<script lang="ts">
  import { links, site } from '$lib/content';
</script>

<svelte:head>
  <title>contact · {site.name}</title>
</svelte:head>

<h1>contact</h1>
<p class="tagline">email is best</p>

<dl>
  {#each links as link}
    <dt>{link.label}</dt>
    <dd>
      <a href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">
        {link.text}
      </a>
    </dd>
  {/each}
</dl>

<style>
  dl {
    display: grid;
    grid-template-columns: 90px minmax(0, 1fr);
    gap: 8px 12px;
    margin: 0;
  }
  dt { color: var(--muted); }
  dd { margin: 0; overflow-wrap: anywhere; }
  a { border-bottom: 1px solid var(--line); }
  a:hover { color: var(--accent); border-color: var(--accent); }
</style>
