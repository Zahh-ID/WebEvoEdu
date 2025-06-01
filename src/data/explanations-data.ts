
import type { LucideIcon } from 'lucide-react';
// Import specific icons only for type checking if needed, or rely on string names directly.
// We are moving to icon names (strings) for serialization.

export interface KeyConcept {
  title: string;
  description: string;
  iconName: string; // Changed from Icon: LucideIcon
  examples?: string[];
}
export interface ExplanationContent {
  id: 'web1' | 'web2' | 'web3';
  title: string;
  subtitle: string;
  iconName: string; // Changed from Icon: LucideIcon
  keyConcepts: KeyConcept[];
  technologies?: string[];
  impact: string;
  colorClass: string;
}

export const explanationsData: ExplanationContent[] = [
  {
    id: 'web1',
    title: 'Web1: Fondasi Statis',
    subtitle: 'Era konten hanya-baca dan konektivitas dasar, di mana internet berfungsi sebagai ensiklopedia digital raksasa, memberikan akses informasi satu arah.',
    iconName: 'DatabaseIcon',
    keyConcepts: [
      {
        title: 'Konten Statis & Hanya-Baca',
        description: 'Situs web utamanya terdiri dari halaman HTML statis dengan interaktivitas minimal. Pengguna hanya bisa membaca informasi yang disajikan, mirip brosur digital.',
        iconName: 'NewspaperIcon',
        examples: ['Halaman profil perusahaan sederhana', 'Arsip berita online statis', 'Direktori tautan (link directories)', 'Dokumentasi online awal'],
      },
      {
        title: 'Interaksi Pengguna Terbatas',
        description: 'Interaksi utama adalah mengklik hyperlink untuk navigasi. Pembuatan konten sangat terbatas pada individu dengan keahlian teknis (HTML), dan umpan balik pengguna jarang terjadi.',
        iconName: 'UsersIcon',
        examples: ['Mengklik tautan antar halaman', 'Mengisi formulir kontak sederhana (jarang dan lambat diproses)'],
      },
      {
        title: 'Desentralisasi Awal & Akses Terbatas',
        description: 'Secara teknis, web awal lebih terdesentralisasi karena banyak individu atau institusi menghosting server mereka sendiri. Namun, akses internet belum meluas dan kecepatan koneksi (dial-up) sangat lambat.',
        iconName: 'Share2Icon',
        examples: ['Situs web personal yang dihosting sendiri', 'Situs departemen universitas', 'Halaman web hobi individu'],
      },
    ],
    technologies: ['HTML (dasar)', 'HTTP/HTTPS', 'URL', 'Peramban Awal (Mosaic, Netscape Navigator, Internet Explorer awal)'],
    impact: 'Web1 merevolusi akses terhadap informasi. Untuk pertama kalinya, pengetahuan dari seluruh dunia dapat diakses secara global, meskipun pasif. Ini meletakkan dasar fundamental untuk semua perkembangan web, memperkenalkan konsep hyperlink, URL, dan navigasi global, membuka jalan bagi revolusi digital.',
    colorClass: 'text-blue-400 focus:ring-blue-500',
  },
  {
    id: 'web2',
    title: 'Web2: Web Interaktif & Sosial',
    subtitle: 'Transformasi internet menjadi platform partisipatif, di mana pengguna tidak hanya mengonsumsi tetapi juga aktif menciptakan dan berbagi konten, didukung oleh aplikasi yang lebih dinamis.',
    iconName: 'UsersIcon',
    keyConcepts: [
      {
        title: 'Konten Buatan Pengguna (User-Generated Content)',
        description: 'Pengguna menjadi pusat dari pembuatan konten. Platform memfasilitasi berbagi teks, gambar, video, dan ulasan secara mudah.',
        iconName: 'MessageSquareIcon',
        examples: ['Media Sosial (Facebook, Twitter, Instagram)', 'Platform Blogging (WordPress, Blogger)', 'Berbagi Video (YouTube)', 'Situs Wiki Kolaboratif (Wikipedia)', 'Forum & Komunitas Online'],
      },
      {
        title: 'Aplikasi Web Dinamis & Interaktif',
        description: 'Situs web berevolusi menjadi aplikasi yang kaya fitur dan responsif, seringkali menyerupai aplikasi desktop dalam fungsionalitasnya.',
        iconName: 'AppWindowIcon',
        examples: ['Email berbasis Web (Gmail)', 'Peta Interaktif (Google Maps)', 'Alat Produktivitas Online (Google Docs, Sheets)', 'Platform E-commerce (Amazon, Tokopedia)', 'Layanan Streaming (Netflix, Spotify)'],
      },
      {
        title: 'Platform Terpusat & Ekonomi Data',
        description: 'Munculnya perusahaan teknologi besar yang menyediakan platform dominan, seringkali dengan model bisnis berbasis iklan yang memanfaatkan data pengguna.',
        iconName: 'CloudIcon',
        examples: ['Mesin Pencari & Ekosistemnya (Google Search, Ads)', 'Jejaring Sosial Utama', 'Pasar Aplikasi Seluler (Apple App Store, Google Play Store)', 'Layanan Cloud Computing (AWS, Azure, GCP sebagai pendukung platform-platform ini)'],
      },
    ],
    impact: 'Web2 secara fundamental mengubah cara kita berkomunikasi, berkolaborasi, berbelanja, belajar, dan berhibur. Ini melahirkan ekonomi digital baru, fenomena media sosial, e-commerce skala besar, dan "gig economy". Namun, Web2 juga memunculkan isu signifikan terkait privasi data, monopoli platform, dan penyebaran misinformasi.',
    colorClass: 'text-purple-400 focus:ring-purple-500',
  },
  {
    id: 'web3',
    title: 'Web3: Web Terdesentralisasi & Milik Pengguna',
    subtitle: 'Visi internet masa depan yang lebih terbuka, transparan, cerdas, dan bertujuan mengembalikan kepemilikan serta kontrol data kepada pengguna melalui teknologi terdesentralisasi.',
    iconName: 'Share2Icon',
    keyConcepts: [
      {
        title: 'Desentralisasi & Tanpa Perantara Kepercayaan (Trustless)',
        description: 'Menggunakan teknologi blockchain dan jaringan peer-to-peer untuk mengurangi ketergantungan pada otoritas pusat. Transaksi dan interaksi diverifikasi secara kriptografis.',
        iconName: 'Share2Icon',
        examples: ['Keuangan Terdesentralisasi (DeFi) - Pinjaman, Pertukaran Aset', 'Pasar NFT Terdesentralisasi', 'Jaringan Penyimpanan Terdistribusi (IPFS, Arweave)'],
      },
      {
        title: 'Kepemilikan & Kontrol Pengguna atas Data & Aset Digital',
        description: 'Pengguna memiliki kedaulatan lebih besar atas data pribadi dan aset digital mereka, yang dapat direpresentasikan sebagai token kripto atau NFT.',
        iconName: 'ShieldCheckIcon',
        examples: ['Dompet Kripto (MetaMask, Trust Wallet)', 'Identitas Terdesentralisasi (DID)', 'Kepemilikan Item Game sebagai NFT', 'Royalti Otomatis untuk Kreator'],
      },
      {
        title: 'Web Semantik & Integrasi AI',
        description: 'Data di web menjadi lebih terstruktur dan dapat dipahami oleh mesin, memungkinkan aplikasi yang lebih cerdas, personalisasi, dan agen AI otonom.',
        iconName: 'LightbulbIcon',
        examples: ['Asisten AI yang Berinteraksi dengan Smart Contract', 'Mesin Pencari Terdesentralisasi yang Memahami Konteks', 'Personalisasi Berbasis Preferensi yang Dikontrol Pengguna'],
      },
      {
        title: 'Organisasi Otonom Terdesentralisasi (DAO)',
        description: 'Komunitas dapat mengatur diri dan membuat keputusan kolektif melalui mekanisme pemungutan suara berbasis token di blockchain.',
        iconName: 'VoteIcon',
        examples: ['DAO Pengelola Protokol DeFi', 'DAO Investasi Kolektif (Venture DAO)', 'DAO Komunitas untuk Proyek Kreatif atau Sosial'],
      }
    ],
    technologies: ['Blockchain (Ethereum, Solana, dll.)', 'Smart Contracts (Solidity, Rust)', 'NFT (ERC-721, ERC-1155)', 'DAO', 'Penyimpanan Terdesentralisasi (IPFS, Arweave)', 'Identitas Terdesentralisasi (DIDs)', 'AI/ML', 'Zero-Knowledge Proofs'],
    impact: 'Web3 berpotensi merevolusi model bisnis, memberdayakan kreator, meningkatkan privasi dan keamanan, serta menciptakan sistem yang lebih adil dan transparan. Ini bertujuan untuk mengembalikan kontrol internet kepada pengguna, meskipun masih dalam tahap pengembangan awal dengan tantangan signifikan seperti skalabilitas, pengalaman pengguna, regulasi, dan adopsi massal.',
    colorClass: 'text-green-400 focus:ring-green-500',
  },
];
