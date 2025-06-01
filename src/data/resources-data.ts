
import type { LucideIcon } from 'lucide-react';
import { BookOpenTextIcon, LinkIcon, FileTextIcon } from 'lucide-react';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'Makalah' | 'Artikel' | 'Situs Web' | 'Buku';
  Icon: LucideIcon;
  tags: string[];
}

export const resourcesData: ResourceItem[] = [
  {
    id: 'web1-berners-lee',
    title: 'Manajemen Informasi: Sebuah Proposal',
    description: "Proposal asli Tim Berners-Lee untuk World Wide Web di CERN (Organisasi Eropa untuk Riset Nuklir).",
    url: 'https://www.w3.org/History/1989/proposal.html',
    type: 'Makalah',
    Icon: FileTextIcon,
    tags: ['Web1', 'Dasar', 'CERN'],
  },
  {
    id: 'web2-oreilly',
    title: "Apa Itu Web 2.0",
    description: "Artikel penting Tim O'Reilly yang mendefinisikan prinsip-prinsip Web 2.0, era web sosial dan konten buatan pengguna.",
    url: 'https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html',
    type: 'Artikel',
    Icon: BookOpenTextIcon,
    tags: ['Web2', 'Definisi', 'Web Sosial'],
  },
  {
    id: 'web3-ethereum',
    title: 'Whitepaper Ethereum',
    description: "Visi Vitalik Buterin untuk platform aplikasi terdesentralisasi yang menggunakan Kontrak Pintar (Smart Contracts).",
    url: 'https://ethereum.org/en/whitepaper/',
    type: 'Makalah',
    Icon: FileTextIcon,
    tags: ['Web3', 'Blockchain', 'Kontrak Pintar'],
  },
  {
    id: 'ipfs-website',
    title: 'InterPlanetary File System (IPFS)',
    description: 'Situs web resmi untuk InterPlanetary File System, protokol hypermedia peer-to-peer untuk membuat web lebih cepat, lebih aman, dan lebih terbuka.',
    url: 'https://ipfs.tech/',
    type: 'Situs Web',
    Icon: LinkIcon,
    tags: ['Web3', 'Penyimpanan Terdesentralisasi', 'P2P'],
  },
  {
    id: 'w3c-org',
    title: 'World Wide Web Consortium (W3C)',
    description: 'Organisasi standar internasional utama untuk World Wide Web, yang mengembangkan protokol dan pedoman untuk memastikan pertumbuhan jangka panjang Web.',
    url: 'https://www.w3.org/',
    type: 'Situs Web',
    Icon: LinkIcon,
    tags: ['Standar', 'Pengembangan Web', 'Tata Kelola'],
  },
];
