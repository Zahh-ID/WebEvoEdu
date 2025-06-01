
import type { LucideIcon } from 'lucide-react';
import { DatabaseIcon, UsersIcon, Share2Icon, AppWindowIcon, ShieldCheckIcon, CogIcon, MessageSquareIcon, ShoppingCartIcon, VoteIcon, LightbulbIcon } from 'lucide-react';

export interface ExplanationContent {
  id: 'web1' | 'web2' | 'web3';
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  keyConcepts: { title: string; description: string; Icon: LucideIcon; examples?: string[] }[];
  technologies: string[];
  impact: string;
  colorClass: string; // Untuk styling tab atau kartu
}

export const explanationsData: ExplanationContent[] = [
  {
    id: 'web1',
    title: 'Web1: Fondasi Statis',
    subtitle: 'Era di mana internet berfungsi sebagai ensiklopedia digital raksasa, memberikan akses informasi satu arah.',
    Icon: DatabaseIcon,
    keyConcepts: [
      {
        title: 'Konten Statis & Hanya-Baca',
        description: 'Situs web berfungsi seperti brosur digital atau dokumen yang tidak banyak berubah. Pengguna hanya bisa membaca informasi yang disajikan.',
        Icon: AppWindowIcon,
        examples: ['Halaman profil perusahaan sederhana', 'Arsip berita online', 'Direktori tautan (link directories)'],
      },
      {
        title: 'Interaksi Minimal',
        description: 'Interaksi utama pengguna adalah mengklik hyperlink untuk berpindah halaman. Pembuatan konten sangat terbatas pada individu dengan keahlian teknis (HTML).',
        Icon: UsersIcon,
        examples: ['Mengisi formulir kontak sederhana (jarang)', 'Mengklik tautan ke halaman lain'],
      },
      {
        title: 'Desentralisasi Awal & Akses Terbatas',
        description: 'Meskipun secara teknis lebih terdesentralisasi karena banyak individu menghosting server mereka sendiri, akses internet belum meluas dan kecepatan koneksi lambat (dial-up).',
        Icon: Share2Icon,
        examples: ['Universitas menghosting situs departemen', 'Penggemar membuat halaman untuk hobinya'],
      },
    ],
    technologies: ['HTML (dasar)', 'HTTP/HTTPS', 'URL', 'Peramban Awal (Mosaic, Netscape Navigator, Internet Explorer awal)'],
    impact: 'Web1 merevolusi akses terhadap informasi. Untuk pertama kalinya, pengetahuan dari seluruh dunia dapat diakses secara global, meskipun dengan cara yang pasif. Ini meletakkan dasar fundamental untuk semua perkembangan web selanjutnya, memperkenalkan konsep hyperlink dan navigasi global.',
    colorClass: 'text-blue-400 focus:ring-blue-500',
  },
  {
    id: 'web2',
    title: 'Web2: Web Interaktif & Sosial',
    subtitle: 'Transformasi internet menjadi platform partisipatif, di mana pengguna menjadi kontributor aktif.',
    Icon: UsersIcon,
    keyConcepts: [
      {
        title: 'Konten Buatan Pengguna (User-Generated Content)',
        description: 'Pengguna tidak lagi hanya konsumen pasif, tetapi juga aktif membuat, berbagi, dan berkolaborasi dalam konten.',
        Icon: MessageSquareIcon,
        examples: ['Menulis postingan blog (WordPress, Blogger)', 'Mengunggah video (YouTube)', 'Berbagi foto (Flickr, Instagram awal)', 'Mengedit artikel (Wikipedia)', 'Membuat status dan berinteraksi di media sosial (Facebook, Twitter)'],
      },
      {
        title: 'Aplikasi Web Dinamis & Kaya Fitur (Rich Internet Applications)',
        description: 'Situs web menjadi lebih seperti aplikasi desktop dengan interaktivitas tinggi, pembaruan konten secara real-time, dan pengalaman pengguna yang lebih mulus.',
        Icon: AppWindowIcon,
        examples: ['Peta interaktif (Google Maps)', 'Layanan email berbasis web (Gmail)', 'Platform kolaborasi dokumen (Google Docs)', 'Aplikasi e-commerce dengan keranjang belanja (Amazon)'],
      },
      {
        title: 'Platform Terpusat & Ekonomi Data',
        description: 'Munculnya perusahaan teknologi besar yang menyediakan platform dan layanan, seringkali dengan model bisnis berbasis iklan dan pengumpulan data pengguna.',
        Icon: CogIcon,
        examples: ['Facebook, Google, Amazon sebagai penyedia layanan utama', 'Pasar aplikasi (App Store, Google Play)'],
      },
    ],
    technologies: ['AJAX', 'JavaScript (jQuery, kemudian React, Angular, Vue)', 'API Media Sosial', 'XML/JSON', 'CSS2/3', 'PHP, Ruby, Python (sisi server)', 'Cloud Computing (AWS, Azure)'],
    impact: 'Web2 secara fundamental mengubah cara kita berkomunikasi, berbelanja, belajar, dan berhibur. Ini melahirkan ekonomi digital baru, media sosial, e-commerce skala besar, dan ekonomi gig. Namun, ini juga memunculkan kekhawatiran tentang privasi data dan dominasi platform.',
    colorClass: 'text-purple-400 focus:ring-purple-500',
  },
  {
    id: 'web3',
    title: 'Web3: Web Terdesentralisasi & Milik Pengguna',
    subtitle: 'Visi internet masa depan yang lebih terbuka, transparan, cerdas, dan memberdayakan individu.',
    Icon: Share2Icon,
    keyConcepts: [
      {
        title: 'Desentralisasi & Tanpa Perantara Kepercayaan (Trustless)',
        description: 'Menggunakan teknologi blockchain dan jaringan peer-to-peer untuk mengurangi ketergantungan pada otoritas pusat. Transaksi dan interaksi dapat diverifikasi secara kriptografis.',
        Icon: Share2Icon,
        examples: ['Aplikasi Keuangan Terdesentralisasi (DeFi) untuk pinjam-meminjam tanpa bank', 'Pasar NFT terdesentralisasi', 'Sistem identitas terdesentralisasi'],
      },
      {
        title: 'Kepemilikan & Kontrol Pengguna atas Data & Aset',
        description: 'Pengguna memiliki kedaulatan lebih besar atas data pribadi dan aset digital mereka, yang dapat direpresentasikan sebagai token atau NFT.',
        Icon: ShieldCheckIcon,
        examples: ['Memiliki item game sebagai NFT yang bisa diperdagangkan di luar game', 'Mengontrol siapa yang dapat mengakses data pribadi Anda', 'Menerima royalti otomatis dari karya seni digital'],
      },
      {
        title: 'Web Semantik & Integrasi AI',
        description: 'Data di web menjadi lebih terstruktur dan dapat dipahami oleh mesin, memungkinkan aplikasi yang lebih cerdas, personalisasi yang lebih baik, dan agen AI yang otonom.',
        Icon: LightbulbIcon, // Atau BrainIcon
        examples: ['Asisten AI yang dapat memahami konteks dan melakukan tugas kompleks atas nama pengguna', 'Mesin pencari yang lebih cerdas dan kontekstual', 'Pengalaman web yang dipersonalisasi berdasarkan preferensi yang dikontrol pengguna'],
      },
      {
        title: 'Organisasi Otonom Terdesentralisasi (DAO)',
        description: 'Komunitas dapat mengatur diri mereka sendiri dan membuat keputusan secara kolektif melalui mekanisme pemungutan suara berbasis token di blockchain.',
        Icon: VoteIcon,
        examples: ['DAO yang mengelola protokol DeFi', 'DAO yang mendanai proyek seni atau penelitian', 'Komunitas game yang memutuskan arah pengembangan game'],
      }
    ],
    technologies: ['Blockchain (Ethereum, Solana, dll.)', 'Smart Contracts (Solidity, Rust)', 'NFT (ERC-721, ERC-1155)', 'DAO', 'Penyimpanan Terdesentralisasi (IPFS, Arweave)', 'Identitas Terdesentralisasi (DIDs)', 'AI/ML', 'Zero-Knowledge Proofs'],
    impact: 'Web3 berpotensi merevolusi model bisnis, memberdayakan kreator, meningkatkan privasi dan keamanan, serta menciptakan sistem yang lebih adil dan transparan. Ini bertujuan untuk mengembalikan kontrol internet kepada pengguna, meskipun masih dalam tahap pengembangan awal dengan tantangan seperti skalabilitas, pengalaman pengguna, dan regulasi.',
    colorClass: 'text-green-400 focus:ring-green-500',
  },
];
