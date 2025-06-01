import type { LucideIcon } from 'lucide-react';
import { GlobeIcon, UsersIcon, NetworkIcon, CpuIcon, BrainIcon, ZapIcon } from 'lucide-react';

export interface TimelineEvent {
  id: string;
  era: 'Web1' | 'Web2' | 'Web3';
  year: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const timelineData: TimelineEvent[] = [
  {
    id: 'web1-birth',
    era: 'Web1',
    year: '1989-1999',
    title: 'The Static Web',
    description: 'Web1, the first generation of the internet, was characterized by static HTML websites. Content was primarily read-only, with little user interaction.',
    Icon: GlobeIcon,
  },
  {
    id: 'web1-tech',
    era: 'Web1',
    year: 'Key Technologies',
    title: 'Core Protocols',
    description: 'Dominated by HTML, HTTP, and URLs. Early browsers like Mosaic and Netscape Navigator emerged.',
    Icon: NetworkIcon,
  },
  {
    id: 'web2-rise',
    era: 'Web2',
    year: '2000-2010s',
    title: 'The Social & Interactive Web',
    description: 'Web2 marked the shift to dynamic, user-generated content and social media. Platforms like Facebook, YouTube, and Twitter flourished.',
    Icon: UsersIcon,
  },
  {
    id: 'web2-tech',
    era: 'Web2',
    year: 'Key Technologies',
    title: 'Dynamic Content',
    description: 'AJAX, JavaScript frameworks (jQuery, Angular, React), and backend languages (PHP, Ruby, Python) powered interactive experiences.',
    Icon: CpuIcon,
  },
  {
    id: 'web3-dawn',
    era: 'Web3',
    year: '2020s-Present',
    title: 'The Decentralized Web',
    description: 'Web3 aims for a decentralized, user-owned internet built on blockchain, AI, and semantic web technologies. Focus on transparency, security, and verifiability.',
    Icon: ZapIcon,
  },
  {
    id: 'web3-tech',
    era: 'Web3',
    year: 'Key Technologies',
    title: 'Emerging Paradigms',
    description: 'Blockchain, cryptocurrencies, NFTs, DAOs, smart contracts, AI/ML integration, and decentralized storage (IPFS).',
    Icon: BrainIcon,
  },
];
