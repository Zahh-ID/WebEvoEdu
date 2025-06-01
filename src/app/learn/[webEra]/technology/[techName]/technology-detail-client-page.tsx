
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

        gsap.from(mainCard.querySelectorAll('.card-title-anim, .card-desc-anim, .tech-detail-heading, .tech-detail-paragraph, .tech-detail-placeholder'), {
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
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
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
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
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
                  Bayangkan {displayTechName} seperti <strong className={cn(era.colorClass)}>[Analogi Sederhana untuk {displayTechName}]</strong>.
                  Pada dasarnya, {displayTechName} adalah sebuah <strong className={cn(era.colorClass)}>[Jenis Teknologi: misal, aturan, bahasa, alat, sistem]</strong> yang memungkinkan komputer atau internet untuk <strong className={cn(era.colorClass)}>[Fungsi Utama Sederhana dari {displayTechName}]</strong>.
                  Di era {era.title}, peran utamanya adalah untuk <strong className={cn(era.colorClass)}>[Peran Singkat {displayTechName} di Era Tersebut]</strong>.
                </p>
                <p className="mt-3 text-sm text-accent/80 italic tech-detail-placeholder">
                  (Tim kami sedang menyiapkan penjelasan yang lebih mendalam namun tetap mudah dicerna mengenai definisi dasar {displayTechName} dan cara kerjanya secara umum.)
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary-foreground/85 tech-detail-heading">2. Mengapa {displayTechName} Penting di Era {era.title}?</h3>
                <p className="text-muted-foreground leading-relaxed tech-detail-paragraph">
                  Kehadiran {displayTechName} sangat krusial bagi perkembangan {era.title}. Tanpa teknologi ini, hal-hal seperti <strong className={cn(era.colorClass)}>[Contoh Dampak Jika {displayTechName} Tidak Ada di Era Itu]</strong> mungkin tidak akan pernah terwujud atau akan sangat berbeda.
                  {displayTechName} memberikan kontribusi besar dalam <strong className={cn(era.colorClass)}>[Manfaat Utama 1 dari {displayTechName} untuk Era {era.title}]</strong> dan <strong className={cn(era.colorClass)}>[Manfaat Utama 2 dari {displayTechName} untuk Era {era.title}]</strong>.
                </p>
                <p className="mt-3 text-sm text-accent/80 italic tech-detail-placeholder">
                  (Analisis lebih lanjut mengenai kontribusi spesifik {displayTechName} terhadap fitur, kemampuan, dan karakteristik utama dari era {era.title} akan segera ditambahkan.)
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary-foreground/85 tech-detail-heading">3. Contoh Penggunaan Sehari-hari (di Era {era.title})</h3>
                <p className="text-muted-foreground leading-relaxed tech-detail-paragraph">
                  Mungkin Anda tidak sadar, tetapi jika Anda hidup atau membayangkan menggunakan internet di era {era.title}, Anda akan sering bertemu {displayTechName}.
                  Contohnya, ketika Anda <strong className={cn(era.colorClass)}>[Aktivitas Umum Pengguna Internet di Era {era.title}]</strong>, {displayTechName} bekerja di belakang layar untuk <strong className={cn(era.colorClass)}>[Bagaimana {displayTechName} Terlibat dalam Aktivitas Tersebut]</strong>.
                </p>
                 <p className="mt-3 text-sm text-accent/80 italic tech-detail-placeholder">
                  (Kami akan menambahkan ilustrasi atau studi kasus sederhana yang menunjukkan bagaimana {displayTechName} digunakan dalam skenario yang relatable pada masanya.)
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary-foreground/85 tech-detail-heading">4. Apakah Ada Tantangan atau Keterbatasan?</h3>
                <p className="text-muted-foreground leading-relaxed tech-detail-paragraph">
                  Setiap teknologi, termasuk {displayTechName} pada era {era.title}, tentu memiliki sisi lain. Beberapa tantangan atau keterbatasannya saat itu mungkin adalah <strong className={cn(era.colorClass)}>[Keterbatasan Umum 1 dari {displayTechName}]</strong> atau <strong className={cn(era.colorClass)}>[Keterbatasan Umum 2 dari {displayTechName}]</strong>.
                  Keterbatasan inilah yang seringkali mendorong inovasi untuk menciptakan teknologi yang lebih baik di era berikutnya.
                </p>
                 <p className="mt-3 text-sm text-accent/80 italic tech-detail-placeholder">
                  (Diskusi mengenai tantangan, batasan, atau bahkan dampak negatif (jika ada) dari {displayTechName} pada era tersebut, dan bagaimana hal itu memicu evolusi.)
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-border/50 text-center">
                <p className="text-lg text-primary font-semibold mb-3 tech-detail-heading">Konten Ini Masih dalam Pengembangan!</p>
                <p className="text-muted-foreground tech-detail-paragraph">
                  Kami berkomitmen untuk menyediakan penjelasan yang paling akurat, jelas, dan mudah dipahami untuk Anda mengenai <strong className={cn(era.colorClass)}>{displayTechName}</strong>.
                  Tim kami sedang bekerja keras untuk melengkapi semua detail. Terima kasih atas kesabaran Anda!
                </p>
              </div>

            </CardContent>
          </Card>

          <div className="text-center mt-16 mb-8 final-button-anim">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
              <Link href={`/learn/${era.id}`}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
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
