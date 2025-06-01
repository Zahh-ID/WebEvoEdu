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
    title: 'Web Statis: Era Informasi Satu Arah',
    description: 'Web1, dikenal sebagai generasi awal internet, didominasi oleh situs web yang dibangun dengan HTML statis. Ini berarti halaman web bersifat "hanya-baca", mirip dengan brosur digital. Konten disajikan tanpa banyak perubahan, dan interaksi pengguna sangat terbatas, umumnya hanya berupa navigasi melalui hyperlink untuk berpindah antar halaman.',
    Icon: GlobeIcon,
  },
  {
    id: 'web1-tech',
    era: 'Web1',
    year: 'Teknologi Kunci',
    title: 'Fondasi Protokol Inti',
    description: 'Web1 dibangun di atas teknologi dasar seperti HTML (HyperText Markup Language) untuk struktur konten, HTTP (HyperText Transfer Protocol) untuk komunikasi antara server dan peramban, serta URL (Uniform Resource Locator) sebagai alamat unik halaman web. Peramban awal seperti Mosaic dan Netscape Navigator menjadi gerbang utama untuk mengakses informasi ini.',
    Icon: NetworkIcon,
  },
  {
    id: 'web2-rise',
    era: 'Web2',
    year: '2000-2010an',
    title: 'Web Sosial & Interaktif: Era Partisipasi Pengguna',
    description: 'Web2 merevolusi internet dengan memungkinkan konten dinamis dan partisipasi aktif pengguna. Pengguna tidak lagi hanya konsumen pasif, tetapi juga pencipta konten melalui blog, wiki, platform media sosial (Facebook, Twitter, YouTube), dan forum. Interaksi dua arah menjadi norma.',
    Icon: UsersIcon,
  },
  {
    id: 'web2-tech',
    era: 'Web2',
    year: 'Teknologi Kunci',
    title: 'Membangun Konten Dinamis dan Aplikasi Kaya Fitur',
    description: 'Teknologi seperti AJAX (Asynchronous JavaScript and XML) memungkinkan pembaruan halaman tanpa reload penuh, menciptakan pengalaman yang lebih responsif. Kerangka kerja JavaScript (seperti jQuery, kemudian Angular, React, Vue) mempermudah pembuatan aplikasi web yang kompleks dan interaktif. Bahasa pemrograman sisi server (PHP, Ruby, Python, Java) menangani logika bisnis dan manajemen data.',
    Icon: CpuIcon,
  },
  {
    id: 'web3-dawn',
    era: 'Web3',
    year: '2020an-Sekarang',
    title: 'Web Terdesentralisasi: Era Kepemilikan & Transparansi',
    description: 'Web3 adalah visi untuk internet masa depan yang lebih terdesentralisasi, di mana pengguna memiliki kontrol lebih besar atas data dan identitas digital mereka. Dibangun di atas teknologi blockchain, Web3 menjanjikan transparansi, keamanan yang ditingkatkan melalui kriptografi, dan verifiabilitas data tanpa bergantung pada otoritas pusat. Ini juga mencakup konsep web semantik, di mana data lebih terstruktur dan dapat dipahami oleh mesin.',
    Icon: ZapIcon,
  },
  {
    id: 'web3-tech',
    era: 'Web3',
    year: 'Teknologi Kunci',
    title: 'Paradigma Baru: Blockchain, AI, dan Ekonomi Digital',
    description: 'Web3 didukung oleh teknologi seperti Blockchain (misalnya, Ethereum) sebagai buku besar terdistribusi, mata uang kripto untuk transaksi digital, NFT (Non-Fungible Tokens) untuk kepemilikan aset digital unik, DAO (Decentralized Autonomous Organizations) untuk tata kelola komunitas, dan kontrak pintar (smart contracts) untuk otomatisasi perjanjian. Integrasi AI/ML dan solusi penyimpanan terdesentralisasi seperti IPFS (InterPlanetary File System) juga memainkan peran penting dalam membentuk ekosistem Web3.',
    Icon: BrainIcon,
  },
];
