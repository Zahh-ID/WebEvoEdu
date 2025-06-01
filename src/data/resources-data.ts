import type { LucideIcon } from 'lucide-react';
import { BookOpenTextIcon, LinkIcon, FileTextIcon } from 'lucide-react';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'Paper' | 'Article' | 'Website' | 'Book';
  Icon: LucideIcon;
  tags: string[];
}

export const resourcesData: ResourceItem[] = [
  {
    id: 'web1-berners-lee',
    title: 'Information Management: A Proposal',
    description: "Tim Berners-Lee's original proposal for the World Wide Web at CERN.",
    url: 'https://www.w3.org/History/1989/proposal.html',
    type: 'Paper',
    Icon: FileTextIcon,
    tags: ['Web1', 'Foundational', 'CERN'],
  },
  {
    id: 'web2-oreilly',
    title: "What Is Web 2.0",
    description: "Tim O'Reilly's seminal article defining the principles of Web 2.0.",
    url: 'https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html',
    type: 'Article',
    Icon: BookOpenTextIcon,
    tags: ['Web2', 'Definition', 'Social Web'],
  },
  {
    id: 'web3-ethereum',
    title: 'Ethereum Whitepaper',
    description: "Vitalik Buterin's vision for a decentralized application platform.",
    url: 'https://ethereum.org/en/whitepaper/',
    type: 'Paper',
    Icon: FileTextIcon,
    tags: ['Web3', 'Blockchain', 'Smart Contracts'],
  },
  {
    id: 'ipfs-website',
    title: 'IPFS (InterPlanetary File System)',
    description: 'Official website for IPFS, a peer-to-peer hypermedia protocol to make the web faster, safer, and more open.',
    url: 'https://ipfs.tech/',
    type: 'Website',
    Icon: LinkIcon,
    tags: ['Web3', 'Decentralized Storage', 'P2P'],
  },
  {
    id: 'w3c-org',
    title: 'World Wide Web Consortium (W3C)',
    description: 'The main international standards organization for the World Wide Web.',
    url: 'https://www.w3.org/',
    type: 'Website',
    Icon: LinkIcon,
    tags: ['Standards', 'Web Development', 'Governance'],
  },
];
