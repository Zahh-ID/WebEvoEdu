import type { LucideIcon } from 'lucide-react';
import { DatabaseIcon, UsersIcon, Share2Icon, AppWindowIcon, ShieldCheckIcon, CogIcon } from 'lucide-react';

export interface ExplanationContent {
  id: 'web1' | 'web2' | 'web3';
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  keyConcepts: { title: string; description: string; Icon: LucideIcon }[];
  technologies: string[];
  impact: string;
  colorClass: string; // For styling tabs or cards
}

export const explanationsData: ExplanationContent[] = [
  {
    id: 'web1',
    title: 'Web1: The Static Foundation',
    subtitle: 'The era of read-only content and basic connectivity.',
    Icon: DatabaseIcon,
    keyConcepts: [
      { title: 'Static Content', description: 'Websites primarily consisted of static HTML pages with limited interactivity.', Icon: AppWindowIcon },
      { title: 'Read-Only Web', description: 'Users were mainly consumers of information, not creators.', Icon: UsersIcon },
      { title: 'Decentralized (Initially)', description: 'Early web was more decentralized, with individuals hosting servers.', Icon: Share2Icon },
    ],
    technologies: ['HTML', 'HTTP', 'URLs', 'Early Browsers (Mosaic, Netscape)'],
    impact: 'Laid the groundwork for global information sharing and online presence.',
    colorClass: 'text-blue-400 focus:ring-blue-500',
  },
  {
    id: 'web2',
    title: 'Web2: The Interactive & Social Web',
    subtitle: 'The rise of user-generated content, social media, and web applications.',
    Icon: UsersIcon,
    keyConcepts: [
      { title: 'User-Generated Content', description: 'Platforms enabled users to create and share content (blogs, videos, social posts).', Icon: UsersIcon },
      { title: 'Interactivity & Rich Applications', description: 'Dynamic web apps with rich user interfaces became common.', Icon: AppWindowIcon },
      { title: 'Centralized Platforms', description: 'Dominated by large tech companies controlling data and services.', Icon: CogIcon },
    ],
    technologies: ['AJAX', 'JavaScript (React, Angular, Vue)', 'Social Media APIs', 'Cloud Computing'],
    impact: 'Transformed how people connect, share, and consume information, leading to the platform economy.',
    colorClass: 'text-purple-400 focus:ring-purple-500',
  },
  {
    id: 'web3',
    title: 'Web3: The Decentralized & Semantic Web',
    subtitle: 'Towards a user-owned, intelligent, and trustless internet.',
    Icon: Share2Icon,
    keyConcepts: [
      { title: 'Decentralization', description: 'Utilizing blockchain and peer-to-peer networks to reduce reliance on intermediaries.', Icon: Share2Icon },
      { title: 'User Ownership & Control', description: 'Empowering users with control over their data and digital assets (NFTs, tokens).', Icon: ShieldCheckIcon },
      { title: 'Semantic Web & AI', description: 'Enabling machines to understand and process web content, fostering intelligent applications.', Icon: CogIcon },
    ],
    technologies: ['Blockchain (Ethereum, Solana)', 'Smart Contracts', 'NFTs', 'DAOs', 'IPFS', 'AI/ML'],
    impact: 'Aims to create a more open, transparent, and equitable internet, though still in its early stages of development.',
    colorClass: 'text-green-400 focus:ring-green-500',
  },
];
