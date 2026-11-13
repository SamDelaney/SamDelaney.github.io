// Everything the site says lives in this file. Edit here; the pages only lay it out.

export const site = {
  name: 'sam delaney',
  handle: 'sd',
  tagline: 'protocol engineer · linguist · seattle',
  url: 'https://samdelaney.github.io'
};

// Short intro on the home page. **text** is bold, *text* is italic.
export const bio = [
  'I design *protocols* and build the tools around them. Right now I lead core tech at **Sundial**, an institutional layer on Bitcoin.',
  'Before that I co-founded **Grabbit** and wrote smart contracts at Ikigai, and before that I built *language software* at SIL International.'
];

export type Role = { title: string; org: string; href: string };

export const currentWork: Role[] = [
  { title: 'core tech lead', org: 'sundial', href: 'https://sundialprotocol.com' },
  { title: 'author', org: 'cip-102', href: 'https://cips.cardano.org/cip/CIP-0102' },
  { title: 'co-founder', org: 'grabbit', href: 'https://grabbit.market' }
];

export type Project = {
  name: string;
  year: string;
  summary: string;
  stack: string;
  href?: string;
};

// Newest first. Add a project by adding a line.
export const projects: Project[] = [
  {
    name: 'sundial',
    year: '2025',
    summary: 'An institutional layer on Bitcoin: staking, a pooled vault, and a bridge to other chains.',
    stack: 'typescript · bitcoin · cardano',
    href: 'https://sundialprotocol.com'
  },
  {
    name: 'zk verifiers',
    year: '2024',
    summary: 'The first PLONK and Bulletproofs verifiers in Aiken, plus Groth16.',
    stack: 'aiken',
    href: 'https://github.com/ADAOcommunity/zk'
  },
  {
    name: 'cip-102',
    year: '2023',
    summary: 'The Cardano standard for on-chain NFT royalties with split payments.',
    stack: 'cardano standard',
    href: 'https://cips.cardano.org/cip/CIP-0102'
  },
  {
    name: 'hydra-auction',
    year: '2023',
    summary: 'The first application built on Cardano’s Hydra state channels.',
    stack: 'haskell · hydra'
  },
  {
    name: 'grabbit',
    year: '2021',
    summary: 'A Cardano auction marketplace, with the first eUTxO linked list in production.',
    stack: 'haskell · typescript · svelte',
    href: 'https://grabbit.market'
  },
  {
    name: 'paratext',
    year: '2020',
    summary: 'Bible translation software used around the world. One of six developers.',
    stack: 'c# · javascript',
    href: 'https://paratext.org'
  },
  {
    name: 'reflex',
    year: '2020',
    summary: 'Turns interlinear text from FieldWorks into clean HTML for papers.',
    stack: 'react · typescript · xslt',
    href: 'https://github.com/samdelaney/reflex'
  },
  {
    name: 'the combine',
    year: '2019',
    summary: 'Rapid word collection for low-literacy settings. Led the team to beta in three months.',
    stack: 'react · c# · mongodb',
    href: 'https://github.com/sillsdev/TheCombine'
  }
];

export type Link = { label: string; href: string; text: string };

export const links: Link[] = [
  { label: 'email', href: 'mailto:sam@thedelaneys.net', text: 'sam@thedelaneys.net' },
  { label: 'github', href: 'https://github.com/samdelaney', text: '@samdelaney' },
  { label: 'x', href: 'https://x.com/sde_laney', text: '@sde_laney' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/samuel-delaney', text: 'samuel-delaney' }
];
