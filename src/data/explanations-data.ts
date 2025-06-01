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
  colorClass: string; // Untuk styling tab atau kartu
}

export const explanationsData: ExplanationContent[] = [
  {
    id: 'web1',
    title: 'Web1: Fondasi Statis',
    subtitle: 'Era konten hanya-baca dan konektivitas dasar.',
    Icon: DatabaseIcon,
    keyConcepts: [
      { title: 'Konten Statis', description: 'Situs web utamanya terdiri dari halaman HTML statis dengan interaktivitas terbatas.', Icon: AppWindowIcon },
      { title: 'Web Hanya-Baca', description: 'Pengguna utamanya adalah konsumen informasi, bukan pencipta.', Icon: UsersIcon },
      { title: 'Terdesentralisasi (Awalnya)', description: 'Web awal lebih terdesentralisasi, dengan individu yang menghosting server.', Icon: Share2Icon },
    ],
    technologies: ['HTML', 'HTTP', 'URL', 'Peramban Awal (Mosaic, Netscape)'],
    impact: 'Meletakkan dasar untuk berbagi informasi global dan kehadiran online.',
    colorClass: 'text-blue-400 focus:ring-blue-500',
  },
  {
    id: 'web2',
    title: 'Web2: Web Interaktif & Sosial',
    subtitle: 'Munculnya konten buatan pengguna, media sosial, dan aplikasi web.',
    Icon: UsersIcon,
    keyConcepts: [
      { title: 'Konten Buatan Pengguna', description: 'Platform memungkinkan pengguna untuk membuat dan berbagi konten (blog, video, postingan sosial).', Icon: UsersIcon },
      { title: 'Interaktivitas & Aplikasi Kaya Fitur', description: 'Aplikasi web dinamis dengan antarmuka pengguna yang kaya menjadi umum.', Icon: AppWindowIcon },
      { title: 'Platform Terpusat', description: 'Didominasi oleh perusahaan teknologi besar yang mengendalikan data dan layanan.', Icon: CogIcon },
    ],
    technologies: ['AJAX', 'JavaScript (React, Angular, Vue)', 'Social Media API', 'Cloud Computing'],
    impact: 'Mengubah cara orang terhubung, berbagi, dan mengonsumsi informasi, yang mengarah pada ekonomi platform.',
    colorClass: 'text-purple-400 focus:ring-purple-500',
  },
  {
    id: 'web3',
    title: 'Web3: Web Terdesentralisasi & Semantik',
    subtitle: 'Menuju internet milik pengguna, cerdas, dan tanpa perantara kepercayaan (trustless).',
    Icon: Share2Icon,
    keyConcepts: [
      { title: 'Desentralisasi', description: 'Memanfaatkan blockchain dan jaringan peer-to-peer untuk mengurangi ketergantungan pada perantara.', Icon: Share2Icon },
      { title: 'Kepemilikan & Kontrol Pengguna', description: 'Memberdayakan pengguna dengan kontrol atas data dan aset digital mereka (NFT, token).', Icon: ShieldCheckIcon },
      { title: 'Web Semantik & AI', description: 'Memungkinkan mesin untuk memahami dan memproses konten web, mendorong aplikasi cerdas.', Icon: CogIcon },
    ],
    technologies: ['Blockchain (Ethereum, Solana)', 'Smart Contracts', 'NFT', 'DAO', 'IPFS', 'AI/ML'],
    impact: 'Bertujuan untuk menciptakan internet yang lebih terbuka, transparan, dan adil, meskipun masih dalam tahap awal pengembangan.',
    colorClass: 'text-green-400 focus:ring-green-500',
  },
];
