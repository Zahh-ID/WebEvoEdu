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
    title: 'Web Statis',
    description: 'Web1, generasi pertama internet, dicirikan oleh situs web HTML statis. Konten utamanya hanya bisa dibaca, dengan sedikit interaksi pengguna.',
    Icon: GlobeIcon,
  },
  {
    id: 'web1-tech',
    era: 'Web1',
    year: 'Teknologi Kunci',
    title: 'Protokol Inti',
    description: 'Didominasi oleh HTML, HTTP, dan URL. Peramban awal seperti Mosaic dan Netscape Navigator muncul.',
    Icon: NetworkIcon,
  },
  {
    id: 'web2-rise',
    era: 'Web2',
    year: '2000-2010an',
    title: 'Web Sosial & Interaktif',
    description: 'Web2 menandai pergeseran ke konten dinamis buatan pengguna dan media sosial. Platform seperti Facebook, YouTube, dan Twitter berkembang pesat.',
    Icon: UsersIcon,
  },
  {
    id: 'web2-tech',
    era: 'Web2',
    year: 'Teknologi Kunci',
    title: 'Konten Dinamis',
    description: 'AJAX, kerangka kerja JavaScript (jQuery, Angular, React), dan bahasa backend (PHP, Ruby, Python) mendukung pengalaman interaktif.',
    Icon: CpuIcon,
  },
  {
    id: 'web3-dawn',
    era: 'Web3',
    year: '2020an-Sekarang',
    title: 'Web Terdesentralisasi',
    description: 'Web3 bertujuan untuk internet terdesentralisasi milik pengguna yang dibangun di atas teknologi blockchain, AI, dan web semantik. Fokus pada transparansi, keamanan, dan verifiabilitas.',
    Icon: ZapIcon,
  },
  {
    id: 'web3-tech',
    era: 'Web3',
    year: 'Teknologi Kunci', // "Key Technologies" translates to "Teknologi Kunci"
    title: 'Paradigma Baru',
    description: 'Blockchain, mata uang kripto, NFT, DAO, kontrak pintar, integrasi AI/ML, dan penyimpanan terdesentralisasi (IPFS).',
    Icon: BrainIcon,
  },
];
