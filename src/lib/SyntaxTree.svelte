<script lang="ts">
  import { onMount } from 'svelte';

  // A sentence types itself out, a parse tree grows over it, then the
  // linguistic labels turn into code labels and the same sentence is
  // written as a function call. Then it all folds away and the next
  // sentence starts. Every sentence has the shape Pronoun Verb Noun.
  let { sentences = [
    ['I', 'design', 'protocols'],
    ['I', 'build', 'tools'],
    ['I', 'study', 'languages'],
    ['I', 'write', 'contracts']
  ] }: { sentences?: string[][] } = $props();

  type Node = { label: string; code: string; children: Node[]; word?: string; x: number; depth: number };

  const ROWS = 11; // 9 for the tree, a gap, then the code line
  const LEAF_ROW = 8;
  const LEFT = 4;
  const GAP = 4;
  const NOISE = '!#$%*+=?/\\_-~^';

  // ---- layout -------------------------------------------------------------

  function build([w0, w1, w2]: string[]) {
    const leaf = (word: string): Node => ({ label: '', code: '', children: [], word, x: 0, depth: 4 });
    const n = (label: string, code: string, children: Node[]): Node => ({ label, code, children, x: 0, depth: 0 });
    const root = n('S', 'call', [
      n('NP', 'arg', [n('Pro', 'id', [leaf(w0)])]),
      n('VP', 'expr', [n('V', 'fn', [leaf(w1)]), n('NP', 'arg', [n('N', 'id', [leaf(w2)])])])
    ]);

    // Words sit on the bottom row; each parent centres over its children.
    let col = LEFT;
    const place = (node: Node, depth: number) => {
      if (node.word !== undefined) {
        node.x = col + Math.floor((node.word.length - 1) / 2);
        col += node.word.length + GAP;
        return;
      }
      node.depth = depth;
      node.children.forEach((c) => place(c, depth + 1));
      const xs = node.children.map((c) => c.x);
      node.x = Math.round((Math.min(...xs) + Math.max(...xs)) / 2);
    };
    place(root, 0);

    const inner: Node[] = [];
    const walk = (node: Node) => {
      if (node.word === undefined) inner.push(node);
      node.children.forEach(walk);
    };
    walk(root);
    // Grow from the bottom up, left to right.
    inner.sort((a, b) => b.depth - a.depth || a.x - b.x);

    const leaves = [w0, w1, w2];
    return {
      inner,
      cols: col - GAP + LEFT,
      sentence: leaves.join(' '.repeat(GAP)),
      code: `${w1}(self, ${w2})`
    };
  }

  // ---- drawing ------------------------------------------------------------

  // Cell styles: 0 branch (muted), 1 label (accent), 2 text (normal)
  type Grid = { ch: string[][]; st: number[][] };

  function blank(cols: number): Grid {
    return {
      ch: Array.from({ length: ROWS }, () => Array(cols).fill(' ')),
      st: Array.from({ length: ROWS }, () => Array(cols).fill(0))
    };
  }

  function put(g: Grid, row: number, col: number, text: string, style: number) {
    for (let i = 0; i < text.length; i++) {
      if (g.ch[row]?.[col + i] === undefined) continue;
      g.ch[row][col + i] = text[i];
      g.st[row][col + i] = style;
    }
  }

  function drawNode(g: Grid, node: Node, label: string) {
    const row = node.depth * 2;
    put(g, row, node.x - Math.floor((label.length - 1) / 2), label, 1);
    const kids = node.children;
    if (kids.length === 1) {
      const end = kids[0].word !== undefined ? LEAF_ROW : kids[0].depth * 2;
      for (let r = row + 1; r < end; r++) put(g, r, kids[0].x, '│', 0);
    } else {
      const l = kids[0].x, r = kids[kids.length - 1].x;
      for (let c = l; c <= r; c++) put(g, row + 1, c, '─', 0);
      put(g, row + 1, l, '┌', 0);
      put(g, row + 1, r, '┐', 0);
      put(g, row + 1, node.x, '┴', 0);
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

  // `pad` spaces go on the left and the row is filled out to `width`, so every
  // sentence's tree sits centred in a box of the same width.
  function toHtml(g: Grid, pad: number, width: number): string {
    let out = '';
    const right = ' '.repeat(Math.max(0, width - pad - g.ch[0].length));
    for (let r = 0; r < ROWS; r++) {
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

  function ownWidth(tree: ReturnType<typeof build>): number {
    return Math.max(tree.cols, tree.code.length + 2 + LEFT);
  }

  // ---- timeline -----------------------------------------------------------

  const T = { type: 75, grow: 280, hold: 1300, morph: 900, codeChar: 50, hold2: 2400, fold: 110, erase: 18, pause: 500 };

  function render(tree: ReturnType<typeof build>, t: number, width: number, still = false): string {
    const g = blank(ownWidth(tree));
    const n = tree.inner.length;
    const s = tree.sentence;
    const code = `→ ${tree.code}`;

    const typeEnd = s.length * T.type;
    const growEnd = typeEnd + n * T.grow;
    const morphStart = growEnd + T.hold;
    const morphEnd = morphStart + T.morph;
    const codeEnd = morphEnd + code.length * T.codeChar;
    const foldStart = codeEnd + T.hold2;
    const foldEnd = foldStart + n * T.fold;
    const eraseEnd = foldEnd + (s.length + code.length) * T.erase;

    if (still) t = growEnd;

    // Sentence: typed in, later erased from the end.
    let shown = Math.min(s.length, Math.floor(t / T.type));
    if (t > foldEnd) shown = Math.max(0, s.length - Math.floor((t - foldEnd) / T.erase));
    put(g, LEAF_ROW, LEFT, s.slice(0, shown), 2);
    if (t < typeEnd) put(g, LEAF_ROW, LEFT + shown, '▌', 1);

    // Tree: grows bottom up, folds top down.
    let visible = t < typeEnd ? 0 : Math.min(n, Math.floor((t - typeEnd) / T.grow) + 1);
    if (t > foldStart) visible = Math.max(0, n - Math.floor((t - foldStart) / T.fold) - 1);
    const p = Math.max(0, Math.min(1, (t - morphStart) / T.morph));
    tree.inner.slice(0, visible).forEach((node) => {
      const label = t < morphStart ? node.label : p < 1 ? scramble(node.label, node.code, p) : node.code;
      drawNode(g, node, label);
    });

    // Code line: typed after the morph, erased with the sentence.
    let codeShown = t > morphEnd ? Math.min(code.length, Math.floor((t - morphEnd) / T.codeChar)) : 0;
    if (t > foldEnd) codeShown = Math.max(0, code.length - Math.floor((t - foldEnd) / T.erase));
    if (codeShown > 0) {
      put(g, ROWS - 1, LEFT, code.slice(0, codeShown), 2);
      put(g, ROWS - 1, LEFT, '→', 1);
    }

    return toHtml(g, Math.floor((width - ownWidth(tree)) / 2), width);
  }

  function cycleLength(tree: ReturnType<typeof build>): number {
    const n = tree.inner.length, s = tree.sentence.length, c = tree.code.length + 2;
    return s * T.type + n * T.grow + T.hold + T.morph + c * T.codeChar + T.hold2 + n * T.fold + (s + c) * T.erase + T.pause;
  }

  // ---- loop ---------------------------------------------------------------

  const trees = $derived(sentences.map(build));
  // One width for all sentences, so the centred box doesn't shift between them.
  const width = $derived(Math.max(...trees.map(ownWidth)));
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
      if (t > cycleLength(trees[idx])) {
        idx = (idx + 1) % trees.length;
        start = now;
        t = 0;
      }
      html = render(trees[idx], t, width);
    };

    const begin = () => {
      cancelAnimationFrame(raf);
      start = 0;
      if (still.matches) html = render(trees[0], 0, width, true);
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
    font-size: 13px;
    line-height: 1.2;
    color: var(--muted);
    user-select: none;
    overflow: hidden;
    min-height: calc(11 * 1.2em);
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
    pre { font-size: 12px; }
  }
</style>
