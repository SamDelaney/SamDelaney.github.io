# samdelaney.github.io

My portfolio site. SvelteKit, built to static files, deployed to GitHub Pages.

## Editing

All the text is in [`src/lib/content.ts`](src/lib/content.ts): the bio, current-work cards, projects and contact links. In bio strings, `**bold**` and `*italic*` work. Pages in `src/routes/` only lay that content out, and colours and spacing live in `src/app.css`.

## Running locally

```bash
npm install
npm run dev
```

## Deploying

Pushing to `main` builds and deploys through `.github/workflows/deploy.yml`. The repo's Pages source must be set to **GitHub Actions** (Settings → Pages).
