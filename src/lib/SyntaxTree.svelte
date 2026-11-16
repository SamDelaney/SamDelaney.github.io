<script lang="ts">
  import { onMount } from 'svelte';
  import { treeScenes, type TreeParse } from '$lib/content';

  // A sentence types itself out and a parse tree grows over it. A good parse
  // turns its labels into code labels and writes the sentence as a function
  // call; a dead end shows why and folds away so the next parse can try.
  // Scenes and their parses come from `treeScenes` in content.ts.
  let { scenes = treeScenes }: { scenes?: TreeParse[][] } = $props();

  type Node = { label: string; code: string; children: Node[]; word?: string; x: number; h: number };

  const GAP = 2; // spaces between words
  const NOISE = '!#$%*+=?/\\_-~^';
  const CODE: Record<string, string> = {
    S: 'call', NP: 'arg', VP: 'expr', PP: 'kw', AP: 'mod', Neg: 'not', V: 'fn', N: 'id', Pro: 'id', Det: '_', Adj: 'mod', Adv: 'kw', P: 'key'
  };

  // ---- parsing and layout -------------------------------------------------

  function parseTree(src: string): Node[] {
    const tokens = src.match(/\[|\]|[^\s[\]]+/g) ?? [];
    let i = 0;
    const node = (): Node => {
      i++; // '['
      const label = tokens[i++];
      const children: Node[] = [];
      while (i < tokens.length && tokens[i] !== ']') {
        if (tokens[i] === '[') children.push(node());
        else children.push({ label: '', code: '', children: [], word: tokens[i++], x: 0, h: 0 });
      }
      i++; // ']'
      return { label, code: CODE[label] ?? label.toLowerCase(), children, x: 0, h: 0 };
    };
    const roots: Node[] = [];
    while (i < tokens.length) roots.push(node());
    return roots;
  }

  function layout(p: TreeParse) {
    const roots = parseTree(p.tree);
    const words: string[] = [];
    const inner: Node[] = [];
    let col = 0;
    // Words sit on the bottom row. Each parent centres over its children (over
    // the middle one when there's an odd number), and its height above the
    // words is one more than its tallest child's.
    const place = (n: Node) => {
      if (n.word !== undefined) {
        n.x = col + Math.floor((n.word.length - 1) / 2);
        words.push(n.word);
        col += n.word.length + GAP;
        return;
      }
      n.children.forEach(place);
      const xs = n.children.map((c) => c.x);
      n.x = xs.length % 2 ? xs[(xs.length - 1) / 2] : Math.round((xs[0] + xs[xs.length - 1]) / 2);
      n.h = 1 + Math.max(...n.children.map((c) => c.h));
      inner.push(n);
    };
    roots.forEach(place);
    // Grow from the bottom up, left to right.
    inner.sort((a, b) => a.h - b.h || a.x - b.x);
    const line = (p.fail ? '✗ ' : '→ ') + p.code;
    return { inner, words, line, fail: !!p.fail, height: Math.max(...roots.map((r) => r.h)) };
  }

  // ---- timeline -----------------------------------------------------------

  const T = { type: 60, grow: 220, hold: 1000, morph: 800, codeChar: 45, hold2: 2200, holdFail: 1400, unChar: 15, fold: 90, eraseChar: 15, pause: 600 };

  type Parse = ReturnType<typeof layout>;
  type Phase = { kind: string; dur: number; p: number };

  function buildScene(parses: TreeParse[]) {
    const ps = parses.map(layout);
    const sentence = ps[0].words.join(' '.repeat(GAP));
    const phases: Phase[] = [{ kind: 'type', dur: sentence.length * T.type, p: 0 }];
    let stillAt = 0;
    ps.forEach((pr, p) => {
      const last = p === ps.length - 1;
      const add = (kind: string, dur: number) => phases.push({ kind, dur, p });
      add('grow', pr.inner.length * T.grow);
      add('hold', T.hold);
      if (!pr.fail) add('morph', T.morph);
      add('code', pr.line.length * T.codeChar);
      if (last) stillAt = phases.reduce((s, ph) => s + ph.dur, 0);
      add('hold', pr.fail ? T.holdFail : T.hold2);
      if (last) {
        add('fold', pr.inner.length * T.fold);
        add('erase', Math.max(sentence.length, pr.line.length) * T.eraseChar);
        add('pause', T.pause);
      } else {
        add('uncode', pr.line.length * T.unChar);
        add('fold', pr.inner.length * T.fold);
      }
    });
    const total = phases.reduce((s, ph) => s + ph.dur, 0);
    const width = Math.max(sentence.length, ...ps.map((pr) => pr.line.length));
    return { ps, sentence, phases, total, stillAt, width };
  }

  type Scene = ReturnType<typeof buildScene>;

  function stateAt(sc: Scene, t: number) {
    const s = { shown: 0, typing: false, p: -1, visible: 0, morph: 0, code: 0 };
    for (const ph of sc.phases) {
      const f = ph.dur > 0 ? Math.min(1, Math.max(0, t / ph.dur)) : 1;
      const pr = sc.ps[ph.p];
      switch (ph.kind) {
        case 'type':
          s.shown = Math.floor(f * sc.sentence.length);
          s.typing = f < 1;
          break;
        case 'grow':
          s.p = ph.p; s.morph = 0; s.code = 0;
          s.visible = f >= 1 ? pr.inner.length : Math.min(pr.inner.length, Math.floor(f * pr.inner.length) + 1);
          break;
        case 'morph': s.morph = f; break;
        case 'code': s.code = Math.floor(f * pr.line.length); break;
        case 'uncode': s.code = pr.line.length - Math.floor(f * pr.line.length); break;
        case 'fold': s.visible = pr.inner.length - Math.floor(f * pr.inner.length); break;
        case 'erase':
          s.shown = sc.sentence.length - Math.floor(f * sc.sentence.length);
          s.code = Math.max(0, pr.line.length - Math.floor(f * pr.line.length));
          break;
      }
      if (t < ph.dur) break;
      t -= ph.dur;
    }
    return s;
  }

  // ---- drawing ------------------------------------------------------------

  // Cell styles: 0 branch (muted), 1 label (accent), 2 text (normal)
  type Grid = { ch: string[][]; st: number[][] };

  function put(g: Grid, row: number, col: number, text: string, style: number) {
    for (let i = 0; i < text.length; i++) {
      if (g.ch[row]?.[col + i] === undefined) continue;
      g.ch[row][col + i] = text[i];
      g.st[row][col + i] = style;
    }
  }

  function scramble(from: string, to: string, p: number): string {
    // Each character settles on its final letter as p goes from 0 to 1.
    const len = Math.round(from.length + (to.length - from.length) * p);
    let s = '';
    for (let i = 0; i < len; i++) {
      s += p >= (i + 1) / (len + 1) + 0.2 ? to[i] ?? '' : NOISE[(Math.random() * NOISE.length) | 0];
    }
    return s;
  }

  function render(sc: Scene, t: number, rows: number, width: number): string {
    const leafRow = rows - 3;
    const rowOf = (n: Node) => (n.word !== undefined ? leafRow : leafRow - 2 * n.h);
    const g: Grid = {
      ch: Array.from({ length: rows }, () => Array(sc.width).fill(' ')),
      st: Array.from({ length: rows }, () => Array(sc.width).fill(0))
    };
    const s = stateAt(sc, t);

    put(g, leafRow, 0, sc.sentence.slice(0, s.shown), 2);
    if (s.typing) put(g, leafRow, s.shown, '▌', 1);

    if (s.p >= 0) {
      const pr = sc.ps[s.p];
      for (const node of pr.inner.slice(0, s.visible)) {
        const row = rowOf(node);
        const label = s.morph <= 0 ? node.label : s.morph < 1 ? scramble(node.label, node.code, s.morph) : node.code;
        // Centred over the node, but kept inside the box (an "arg" over "I" would
        // otherwise start left of column 0).
        const at = Math.min(Math.max(0, node.x - Math.floor((label.length - 1) / 2)), sc.width - label.length);
        put(g, row, at, label, 1);
        const kids = node.children;
        if (kids.length === 1) {
          for (let r = row + 1; r < rowOf(kids[0]); r++) put(g, r, kids[0].x, '│', 0);
          continue;
        }
        const l = kids[0].x, r = kids[kids.length - 1].x;
        for (let c = l; c <= r; c++) put(g, row + 1, c, '─', 0);
        kids.forEach((k, i) => put(g, row + 1, k.x, i === 0 ? '┌' : i === kids.length - 1 ? '┐' : '┬', 0));
        put(g, row + 1, node.x, kids.some((k) => k.x === node.x) ? '┼' : '┴', 0);
        for (const k of kids) for (let rr = row + 2; rr < rowOf(k); rr++) put(g, rr, k.x, '│', 0);
      }
      if (s.code > 0) {
        put(g, rows - 1, 0, pr.line.slice(0, s.code), 2);
        put(g, rows - 1, 0, pr.line[0], 1);
      }
    }

    return toHtml(g, Math.floor((width - sc.width) / 2), width);
  }

  // `pad` spaces go on the left and each row is filled out to `width`, so
  // every scene sits centred in a box of the same size.
  function toHtml(g: Grid, pad: number, width: number): string {
    let out = '';
    const right = ' '.repeat(Math.max(0, width - pad - g.ch[0].length));
    for (let r = 0; r < g.ch.length; r++) {
      out += ' '.repeat(pad);
      let run = '', style = -1;
      const flush = () => {
        if (!run) return;
        out += style === 1 ? `<b>${run}</b>` : style === 2 ? `<i>${run}</i>` : run;
        run = '';
      };
      for (let c = 0; c < g.ch[r].length; c++) {
        if (g.st[r][c] !== style && g.ch[r][c] !== ' ') { flush(); style = g.st[r][c]; }
        run += g.ch[r][c];
      }
      flush();
      out += right + '\n';
    }
    return out;
  }

  // ---- loop ---------------------------------------------------------------

  const built = $derived(scenes.map(buildScene));
  // One box for every scene: tall enough for the tallest tree plus the code
  // line, wide enough for the widest sentence, so nothing shifts between them.
  const rows = $derived(2 * Math.max(...built.flatMap((sc) => sc.ps.map((p) => p.height))) + 3);
  const width = $derived(Math.max(...built.map((sc) => sc.width)));
  let html = $state('');

  onMount(() => {
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0, idx = 0, start = 0, last = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 33) return;
      last = now;
      if (!start) start = now;
      let t = now - start;
      if (t > built[idx].total) {
        idx = (idx + 1) % built.length;
        start = now;
        t = 0;
      }
      html = render(built[idx], t, rows, width);
    };

    const begin = () => {
      cancelAnimationFrame(raf);
      start = 0;
      html = render(built[0], 0, rows, width); // holds the box's size until the first frame
      if (still.matches) html = render(built[0], built[0].stillAt, rows, width);
      else raf = requestAnimationFrame(tick);
    };

    begin();
    still.addEventListener('change', begin);
    return () => {
      cancelAnimationFrame(raf);
      still.removeEventListener('change', begin);
    };
  });
</script>

<pre aria-hidden="true">{@html html}</pre>

<style>
  pre {
    width: fit-content;
    max-width: 100%;
    margin: 0 auto;
    font-size: 12px;
    line-height: 1.2;
    color: var(--muted);
    user-select: none;
    overflow: hidden;
  }
  pre :global(b) {
    font-weight: 600;
    color: var(--accent);
  }
  pre :global(i) {
    font-style: normal;
    color: var(--fg);
  }
  @media (max-width: 480px) {
    pre { font-size: 11px; }
  }
</style>
