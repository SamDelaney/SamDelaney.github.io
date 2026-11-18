// Everything the site says lives in this file. Edit here; the pages only lay it out.

export const site = {
  name: "sam delaney",
  handle: "sd",
  tagline: "product engineer · linguist · seattle",
  url: "https://samdelaney.github.io",
};

// Short intro on the home page. **text** is bold, *text* is italic,
// [text](url) is a link.
// An entry is a paragraph, or a lead line with a bulleted list under it.
export type BioEntry = string | { lead: string; items: string[] };
export const bio: BioEntry[] = [
  "I design and build *products*, *protocols*, and the tools around them. Right now I lead the technical direction at **Sundial**, an institutional layer on Bitcoin.",
  "Before that I co-founded **Grabbit** and wrote smart contracts at Ikigai, and before that I built *language software* at SIL International. Along the way I've led teams to deliver on *>$2M* in grants.",
  {
    lead: "I like building in the [*adjacent possible*](https://sirupsen.com/adjacent-possible):",
    items: [
      "first onchain app using Hydra state channels",
      "first PLONK and Bulletproofs verifiers in Aiken",
      "first UTxO linked list",
    ],
  },
];

// `tag` is an optional small label shown in the card's corner.
export type Role = { title: string; org: string; href: string; tag?: string };

export const currentWork: Role[] = [
  {
    title: "core tech lead",
    org: "sundial",
    href: "https://sundialprotocol.com",
  },
  {
    title: "author",
    org: "cip-102",
    href: "https://cips.cardano.org/cip/CIP-0102",
    tag: "grant-funded",
  },
  {
    title: "lead engineer",
    org: "zk-verifiers",
    href: "https://github.com/ADAOcommunity/zk",
    tag: "grant-funded",
  },
];

export type Project = {
  name: string;
  year: string;
  summary: string;
  stack: string;
  href?: string;
};

// Newest first. Add a project by adding a line. A year ending in – is ongoing.
export const projects: Project[] = [
  {
    name: "sundial",
    year: "2025–",
    summary:
      "An institutional layer on Bitcoin: staking, a pooled vault, and a bridge to other chains.",
    stack: "typescript · bitcoin · financial products · zk cryptography",
    href: "https://sundialprotocol.com",
  },
  {
    name: "zk verifiers",
    year: "2024",
    summary:
      "The first PLONK and Bulletproofs verifiers in Aiken, plus Groth16.",
    stack: "aiken · zk cryptography",
    href: "https://github.com/ADAOcommunity/zk",
  },
  {
    name: "cip-102",
    year: "2023",
    summary:
      "The Cardano standard for on-chain NFT royalties with split payments.",
    stack: "cardano standard · payments",
    href: "https://cips.cardano.org/cip/CIP-0102",
  },
  {
    name: "hydra-auction",
    year: "2023",
    summary: "The first application built on Cardano’s Hydra state channels.",
    stack: "haskell · typescript · react",
  },
  {
    name: "grabbit",
    year: "2021–",
    summary:
      "A Cardano auction marketplace, with the first eUTxO linked list in production.",
    stack: "haskell · typescript · svelte",
    href: "https://grabbit.market",
  },
  {
    name: "paratext",
    year: "2020",
    summary:
      "Bible translation software used around the world. One of six developers.",
    stack: "c# · javascript",
    href: "https://paratext.org",
  },
  {
    name: "reflex",
    year: "2020",
    summary:
      "Turns interlinear text from FieldWorks into clean HTML for papers.",
    stack: "react · typescript · xslt",
    href: "https://github.com/samdelaney/reflex",
  },
  {
    name: "the combine",
    year: "2019",
    summary:
      "Rapid word collection for low-literacy settings. Led the team to beta in three months.",
    stack: "react · c# · mongodb",
    href: "https://github.com/sillsdev/TheCombine",
  },
];

export type Link = { label: string; href: string; text: string };

export const links: Link[] = [
  {
    label: "email",
    href: "mailto:sam@thedelaneys.net",
    text: "sam@thedelaneys.net",
  },
  {
    label: "github",
    href: "https://github.com/samdelaney",
    text: "@samdelaney",
  },
  { label: "x", href: "https://x.com/sde_laney", text: "@sde_laney" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/samuel-delaney",
    text: "samuel-delaney",
  },
];

// The home page animation. Each scene is one sentence, parsed one or more
// times in order. A parse is a bracketed tree, [Label child child], where a
// bare word is a leaf; every parse in a scene must have the same words.
// `code` is the function call the parse reads as. A parse marked `fail` is a
// dead end the parser backs out of, and its `code` is the reason shown.
export type TreeParse = { tree: string; code: string; fail?: boolean };

export const treeScenes: TreeParse[][] = [
  [
    {
      tree: "[S [NP [Pro I]] [VP [V design] [NP [N products]]]]",
      code: "design(self, products)",
    },
  ],
  [
    {
      tree: "[S [NP [N time]] [VP [V flies] [PP [P like] [NP [Det an] [N arrow]]]]]",
      code: "flies(time, like=arrow)",
    },
    {
      tree: "[S [NP [N time] [N flies]] [VP [V like] [NP [Det an] [N arrow]]]]",
      code: "like(time_flies, arrow)",
    },
  ],
  [
    {
      tree: "[S [NP [Pro I]] [VP [V build] [NP [N tools]]]]",
      code: "build(self, tools)",
    },
  ],
  [
    {
      tree: "[S [NP [Pro I'm]] [VP [Adv probably] [Neg not] [NP [N Satoshi]]]]",
      code: "probably(self != satoshi)",
    },
  ],
  [
    {
      tree: "[NP [Det the] [Adj old] [N man]] [NP [Det the] [N boat]]",
      code: "no verb",
      fail: true,
    },
    {
      tree: "[S [NP [Det the] [N old]] [VP [V man] [NP [Det the] [N boat]]]]",
      code: "man(the_old, the_boat)",
    },
  ],
  [
    {
      tree: "[S [NP [Pro I]] [VP [V study] [NP [N languages]]]]",
      code: "study(self, languages)",
    },
  ],
  [
    {
      tree: "[S [NP [Adj colorless] [Adj green] [N ideas]] [VP [V sleep] [Adv furiously]]]",
      code: "sleep(colorless(green(ideas)), furiously)",
    },
  ],
  [
    {
      tree: "[S [NP [Det the] [N verifier]] [VP [V rejects] [NP [Adj forged] [N proofs]]]]",
      code: "rejects(verifier, forged(proofs))",
    },
  ],
  [
    {
      tree: "[S [NP [Pro I]] [VP [V write] [NP [N contracts]]]]",
      code: "write(self, contracts)",
    },
  ],
  [
    {
      tree: "[S [NP [Pro I]] [VP [V design] [NP [N protocols]]]]",
      code: "design(self, protocols)",
    },
  ],
  [{ tree: "[VP [V verify] [NP [Det the] [N proof]]]", code: "verify(proof)" }],
  [
    {
      tree: "[VP [V made] [AP [Adj fruitful]] [PP [P by] [NP [Det the] [N vine]]]]",
      code: "make(self, fruitful, by=vine)",
    },
  ],
  [
    {
      tree: "[S [NP [N words]] [VP [V become] [NP [N functions]]]]",
      code: "become(words, functions)",
    },
  ],
];
