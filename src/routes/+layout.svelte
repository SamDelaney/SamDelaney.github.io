<script lang="ts">
  import { page } from '$app/state';
  import { site } from '$lib/content';
  import '../app.css';

  let { children } = $props();

  const nav = [
    { href: '/', label: 'home' },
    { href: '/projects/', label: 'projects' },
    { href: '/contact/', label: 'contact' }
  ];
</script>

<div class="wrap">
  <header>
    <a class="mark" href="/" aria-label="home">
      <span>{site.handle}</span><span class="cursor" aria-hidden="true"></span>
    </a>
    <nav>
      {#each nav as item}
        <a href={item.href} aria-current={page.url.pathname === item.href ? 'page' : undefined}>
          {item.label}
        </a>
      {/each}
    </nav>
  </header>

  <main>
    {@render children()}
  </main>

  <footer>© {new Date().getFullYear()} {site.name}</footer>
</div>
