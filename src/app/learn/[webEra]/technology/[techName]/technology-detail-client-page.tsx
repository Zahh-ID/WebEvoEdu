
"use client";

import Link from 'next/link';
import type { ExplanationContent } from '@/data/explanations-data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ParticleBackground from '@/components/layout/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, LightbulbIcon, HelpCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechnologyDetailClientPageProps {
  params: { webEra: string; techName: string };
  techDetails: { era: ExplanationContent; techNameOriginal: string | null } | null;
}

export default function TechnologyDetailClientPage({ params, techDetails }: TechnologyDetailClientPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!techDetails || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.querySelectorAll('.page-title-anim, .page-subtitle-anim'), {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.2,
        scrollTrigger: {
          trigger: contentRef.current.querySelector('.page-title-anim'),
          start: "top 90%",
          toggleActions: "play pause resume reverse",
        }
      });

      const mainCard = contentRef.current.querySelector('.animated-card-tech');
      if (mainCard) {
        gsap.from(mainCard, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.5,
          scrollTrigger: {
            trigger: mainCard,
            start: "top 85%",
            toggleActions: "play pause resume reverse",
          }
        });

        gsap.from(mainCard.querySelectorAll('.card-title-anim, .card-desc-anim, .tech-detail-heading, .tech-detail-paragraph, .tech-detail-elaboration'), {
          opacity: 0,
          y: 20,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: {
            trigger: mainCard,
            start: "top 80%",
            toggleActions: "play pause resume reverse",
          },
          delay: 0.3,
        });
      }
      gsap.from(contentRef.current.querySelector('.final-button-anim'), {
        opacity: 0,
        y: 20,
        duration: 0.5,
        scrollTrigger: {
          trigger: contentRef.current.querySelector('.final-button-anim'),
          start: "top 90%",
          toggleActions: "play pause resume reverse",
        }
      });
    }, contentRef);

    return () => ctx.revert();
  }, [techDetails]);


  if (!techDetails || !techDetails.era) {
    return (
      <div className="flex flex-col min-h-screen">
        <ParticleBackground />
        <Header />
        <main className="container mx-auto px-4 py-12 pt-24 flex-grow flex flex-col justify-center items-center">
          <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-destructive">Konten Tidak Ditemukan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Maaf, detail untuk teknologi ini tidak dapat ditemukan.</p>
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeftIcon className="mr-2 h-5 w-5" />
                  Kembali ke Beranda
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const { era, techNameOriginal } = techDetails;
  const displayTechName = techNameOriginal || params.techName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const HeaderTechIcon = LightbulbIcon;


  return (
    <div className="flex flex-col min-h-screen">
      <ParticleBackground />
      <Header />
      <main ref={contentRef} className="flex-grow py-12 md:pt-24 pt-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Button variant="outline" asChild className="mb-8 page-title-anim">
              <Link href={`/learn/${era.id}`}>
                <ArrowLeftIcon className="mr-2 h-5 w-5" />
                Kembali ke Pembelajaran {era.title}
              </Link>
            </Button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 page-title-anim">
               <div className={cn("p-3 rounded-lg bg-accent/20 self-start", era.colorClass)}>
                <HeaderTechIcon className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <div>
                <h1 className={cn("text-3xl sm:text-4xl md:text-5xl font-headline font-bold page-title-anim", era.colorClass)}>{displayTechName}</h1>
                <p className="text-lg sm:text-xl text-muted-foreground mt-1 page-subtitle-anim">Memahami Teknologi dari Era: {era.title}</p>
              </div>
            </div>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm shadow-xl animated-card-tech">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary-foreground/90 flex items-center card-title-anim">
                <HelpCircleIcon className="inline-block mr-3 w-7 h-7 text-accent" />
                Mengenal {displayTechName} Lebih Dekat
              </CardTitle>
              <CardDescription className="text-muted-foreground card-desc-anim">Penjelasan ini disederhanakan agar mudah dipahami oleh siapa saja.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 text-base sm:text-lg">

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary-foreground/85 tech-detail-heading">1. Apa Itu {displayTechName}? (Versi Sederhana)</h3>
                <p className="text-muted-foreground leading-relaxed tech-detail-paragraph">
                  Bayangkan {displayTechName} seperti <strong className={cn(era.colorClass)}>{techNameOriginal && techNameOriginal.toLowerCase().includes('html') ? 'cetak biru untuk halaman web' : techNameOriginal && techNameOriginal.toLowerCase().includes('http') ? 'kurir pengantar informasi di internet' : techNameOriginal && techNameOriginal.toLowerCase().includes('url') ? 'alamat unik setiap rumah di kota internet' : 'alat canggih atau aturan main baru'}</strong>.
                  Pada dasarnya, {displayTechName} adalah sebuah <strong className={cn(era.colorClass)}>{techNameOriginal && (techNameOriginal.toLowerCase().includes('html') || techNameOriginal.toLowerCase().includes('solidity')) ? 'bahasa pemrograman atau markup' : techNameOriginal && techNameOriginal.toLowerCase().includes('http') ? 'protokol komunikasi' : techNameOriginal && techNameOriginal.toLowerCase().includes('blockchain') ? 'sistem pencatatan terdistribusi' : 'metodologi atau standar teknis'}</strong> yang memungkinkan komputer atau internet untuk <strong className={cn(era.colorClass)}>{techNameOriginal && techNameOriginal.toLowerCase().includes('html') ? 'menampilkan konten secara terstruktur' : techNameOriginal && techNameOriginal.toLowerCase().includes('http') ? 'mengirim dan menerima data antar server dan klien' : techNameOriginal && techNameOriginal.toLowerCase().includes('blockchain') ? 'mencatat transaksi secara aman dan transparan' : 'melakukan fungsi spesifik yang inovatif'}</strong>.
                  Di era {era.title}, peran utamanya adalah untuk <strong className={cn(era.colorClass)}>{techNameOriginal && techNameOriginal.toLowerCase().includes('html') ? 'membangun halaman-halaman web statis' : techNameOriginal && techNameOriginal.toLowerCase().includes('http') ? 'memfasilitasi pertukaran informasi dasar' : techNameOriginal && techNameOriginal.toLowerCase().includes('blockchain') ? 'memungkinkan aplikasi terdesentralisasi dan kepemilikan aset digital' : 'mendukung pengembangan aplikasi yang lebih canggih dan interaktif'}</strong>.
                </p>
                <p className="mt-4 text-muted-foreground/90 leading-relaxed tech-detail-elaboration">
                  Secara lebih teknis, {displayTechName} bekerja dengan menetapkan serangkaian aturan, protokol, atau sintaks standar yang mengatur bagaimana data dibuat, dikirim, diterima, atau diproses. Misalnya, sebuah bahasa markup akan mendefinisikan tag untuk menstrukturkan elemen, sementara protokol jaringan akan menentukan format pesan dan urutan komunikasi. Definisi dasarnya mencakup spesifikasi inti yang membedakannya dari pendekatan sebelumnya, menjadi fondasi untuk kapabilitas baru dan inovasi di era {era.title}.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary-foreground/85 tech-detail-heading">2. Mengapa {displayTechName} Penting di Era {era.title}?</h3>
                <p className="text-muted-foreground leading-relaxed tech-detail-paragraph">
                  Kehadiran {displayTechName} sangat krusial bagi perkembangan {era.title}. Tanpa teknologi ini, hal-hal seperti <strong className={cn(era.colorClass)}>{techNameOriginal && techNameOriginal.toLowerCase().includes('html') ? 'tampilan visual web yang kita kenal' : techNameOriginal && techNameOriginal.toLowerCase().includes('http') ? 'kemampuan mengakses situs web secara global' : techNameOriginal && techNameOriginal.toLowerCase().includes('blockchain') ? 'konsep kepemilikan aset digital terverifikasi' : 'aplikasi interaktif dan layanan online modern'}</strong> mungkin tidak akan pernah terwujud atau akan sangat berbeda.
                  {displayTechName} memberikan kontribusi besar dalam <strong className={cn(era.colorClass)}>{techNameOriginal && techNameOriginal.toLowerCase().includes('html') ? 'standardisasi presentasi informasi' : techNameOriginal && techNameOriginal.toLowerCase().includes('http') ? 'memungkinkan komunikasi dasar web' : techNameOriginal && techNameOriginal.toLowerCase().includes('blockchain') ? 'menciptakan sistem tanpa perantara kepercayaan' : 'meningkatkan fungsionalitas dan pengalaman pengguna'}</strong> dan <strong className={cn(era.colorClass)}>{techNameOriginal && techNameOriginal.toLowerCase().includes('html') ? 'mempermudah pembuatan konten web awal' : techNameOriginal && techNameOriginal.toLowerCase().includes('http') ? 'menjadi tulang punggung transfer data' : techNameOriginal && techNameOriginal.toLowerCase().includes('blockchain') ? 'memfasilitasi transaksi yang transparan dan aman' : 'memungkinkan pengembangan aplikasi yang lebih kompleks'}</strong>.
                </p>
                <p className="mt-4 text-muted-foreground/90 leading-relaxed tech-detail-elaboration">
                  {displayTechName} secara signifikan membentuk lanskap {era.title} dengan menyediakan infrastruktur dasar untuk aplikasi baru, memungkinkan skala dan efisiensi yang belum pernah ada sebelumnya, atau memperkenalkan model interaksi digital yang inovatif. Kontribusinya tidak hanya terbatas pada aspek teknis, tetapi juga membuka jalan bagi perkembangan model bisnis baru, pemberdayaan komunitas pengguna, serta peningkatan aksesibilitas informasi dan layanan. Teknologi ini seringkali menjadi katalisator utama perubahan pada eranya.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary-foreground/85 tech-detail-heading">3. Contoh Penggunaan Sehari-hari (di Era {era.title})</h3>
                <p className="text-muted-foreground leading-relaxed tech-detail-paragraph">
                  Mungkin Anda tidak sadar, tetapi jika Anda hidup atau membayangkan menggunakan internet di era {era.title}, Anda akan sering bertemu {displayTechName}.
                  Contohnya, ketika Anda <strong className={cn(era.colorClass)}>{techNameOriginal && techNameOriginal.toLowerCase().includes('html') ? 'membuka sebuah halaman web sederhana' : techNameOriginal && techNameOriginal.toLowerCase().includes('http') ? 'mengklik tautan untuk mengunjungi situs baru' : techNameOriginal && techNameOriginal.toLowerCase().includes('blockchain') ? 'berinteraksi dengan aplikasi keuangan terdesentralisasi' : 'menggunakan media sosial atau platform e-commerce'}</strong>, {displayTechName} bekerja di belakang layar untuk <strong className={cn(era.colorClass)}>{techNameOriginal && techNameOriginal.toLowerCase().includes('html') ? 'menyusun dan menampilkan teks, gambar, dan tautan yang Anda lihat' : techNameOriginal && techNameOriginal.toLowerCase().includes('http') ? 'mengambil data dari server dan menampilkannya di peramban Anda' : techNameOriginal && techNameOriginal.toLowerCase().includes('blockchain') ? 'memverifikasi dan mencatat transaksi Anda di jaringan terdistribusi' : 'memproses permintaan Anda dan menyajikan konten dinamis'}</strong>.
                </p>
                 <p className="mt-4 text-muted-foreground/90 leading-relaxed tech-detail-elaboration">
                  Lebih jauh, {displayTechName} juga berperan dalam mendukung berbagai fitur seperti formulir online, pemutaran media, atau bahkan pembaruan konten secara real-time, tergantung pada teknologi spesifik dan era yang dibicarakan. Meskipun seringkali bekerja secara tak terlihat, dampaknya terasa dalam kemudahan, kecepatan, dan keamanan yang dinikmati pengguna saat melakukan berbagai aktivitas online di era {era.title}. Pemahaman akan peran ini membantu mengapresiasi kompleksitas dan kecanggihan teknologi yang ada.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary-foreground/85 tech-detail-heading">4. Apakah Ada Tantangan atau Keterbatasan?</h3>
                <p className="text-muted-foreground leading-relaxed tech-detail-paragraph">
                  Setiap teknologi, termasuk {displayTechName} pada era {era.title}, tentu memiliki sisi lain. Beberapa tantangan atau keterbatasannya saat itu mungkin adalah <strong className={cn(era.colorClass)}>{techNameOriginal && techNameOriginal.toLowerCase().includes('html') ? 'kurangnya interaktivitas dan kemampuan dinamis' : techNameOriginal && techNameOriginal.toLowerCase().includes('http') ? 'masalah keamanan pada versi awal atau kecepatan transfer data' : techNameOriginal && techNameOriginal.toLowerCase().includes('blockchain') ? 'isu skalabilitas dan kompleksitas penggunaan bagi awam' : 'kompleksitas pengembangan atau masalah kinerja'}</strong> atau <strong className={cn(era.colorClass)}>{techNameOriginal && techNameOriginal.toLowerCase().includes('html') ? 'pemisahan konten dan presentasi yang belum matang' : techNameOriginal && techNameOriginal.toLowerCase().includes('http') ? 'kurangnya enkripsi pada lalu lintas data (untuk HTTP lama)' : techNameOriginal && techNameOriginal.toLowerCase().includes('blockchain') ? 'konsumsi energi yang tinggi untuk beberapa mekanisme konsensus' : 'ketergantungan pada infrastruktur terpusat tertentu'}</strong>.
                  Keterbatasan inilah yang seringkali mendorong inovasi untuk menciptakan teknologi yang lebih baik di era berikutnya.
                </p>
                 <p className="mt-4 text-muted-foreground/90 leading-relaxed tech-detail-elaboration">
                  Selain keterbatasan yang telah disebutkan, {displayTechName} di era {era.title} juga dapat menghadapi isu terkait interoperabilitas dengan teknologi lain, biaya implementasi awal yang tinggi, atau kurva pembelajaran yang curam bagi pengguna maupun pengembang. Tantangan-tantangan ini menjadi pemicu penting bagi komunitas riset dan pengembangan untuk mencari solusi inovatif, yang pada gilirannya mendorong evolusi teknologi ke arah yang lebih matang, efisien, dan ramah pengguna, seringkali mengarah pada standar atau teknologi baru di era selanjutnya.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-border/50 text-center">
                <p className="text-lg text-primary font-semibold mb-3 tech-detail-heading">Teknologi Penggerak {era.title}</p>
                <p className="text-muted-foreground tech-detail-paragraph">
                  Teknologi <strong className={cn(era.colorClass)}>{displayTechName}</strong> adalah salah satu pilar penting dalam evolusi {era.title}.
                  Semoga penjelasan ini memberikan gambaran yang lebih jelas. Dunia teknologi terus berkembang, jadi teruslah belajar!
                </p>
              </div>

            </CardContent>
          </Card>

          <div className="text-center mt-16 mb-8 final-button-anim">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
              <Link href={`/learn/${era.id}`}>
                <ArrowLeftIcon className="mr-2 h-5 w-5" />
                Jelajahi Teknologi Lain di {era.title}
              </Link>
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

