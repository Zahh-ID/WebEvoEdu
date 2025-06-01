
"use client";

import Link from 'next/link';
import type { ExplanationContent, KeyConcept } from '@/data/explanations-data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ParticleBackground from '@/components/layout/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, BookOpenTextIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getIconComponent } from '@/lib/icon-utils';

gsap.registerPlugin(ScrollTrigger);

interface ConceptDetailClientPageProps {
  params: { webEra: string; conceptSlug: string };
  conceptDetails: { era: ExplanationContent; concept: KeyConcept } | null;
}

export default function ConceptDetailClientPage({ params, conceptDetails }: ConceptDetailClientPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conceptDetails || !contentRef.current) return;

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

      const mainCard = contentRef.current.querySelector('.animated-card-concept');
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

        gsap.from(mainCard.querySelectorAll('.card-title-anim, .card-desc-anim, .concept-detail-heading, .concept-detail-paragraph, .concept-detail-list-item, .concept-detail-placeholder'), {
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
  }, [conceptDetails]);

  if (!conceptDetails || !conceptDetails.era || !conceptDetails.concept) {
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
              <p className="text-muted-foreground mb-6">Maaf, detail untuk konsep ini tidak dapat ditemukan.</p>
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

  const { era, concept } = conceptDetails;
  const displayConceptName = concept.title;
  const ConceptIcon = getIconComponent(concept.iconName);


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
               <div className={cn("p-3 rounded-lg bg-primary/20 self-start", era.colorClass)}>
                <ConceptIcon className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <div>
                <h1 className={cn("text-3xl sm:text-4xl md:text-5xl font-headline font-bold page-title-anim", era.colorClass)}>{displayConceptName}</h1>
                <p className="text-lg sm:text-xl text-muted-foreground mt-1 page-subtitle-anim">Memahami Konsep dari Era: {era.title}</p>
              </div>
            </div>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm shadow-xl animated-card-concept">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary-foreground/90 flex items-center card-title-anim">
                <BookOpenTextIcon className="inline-block mr-3 w-7 h-7 text-accent" />
                Mengenal {displayConceptName} Lebih Dekat
              </CardTitle>
              <CardDescription className="text-muted-foreground card-desc-anim">Penjelasan ini dirancang agar mudah dipahami.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 text-base sm:text-lg">

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary-foreground/85 concept-detail-heading">Apa Itu {displayConceptName}?</h3>
                <p className="text-muted-foreground leading-relaxed concept-detail-paragraph">
                  {concept.description}
                </p>
                <p className="mt-3 text-sm text-accent/80 italic concept-detail-placeholder">
                  (Analogi sederhana, elaborasi cara kerja, dan tujuan utama dari {displayConceptName} akan segera ditambahkan.)
                </p>
              </div>

              {concept.examples && concept.examples.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary-foreground/85 concept-detail-heading">Contoh Platform/Aplikasi Terkait</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-5">
                    {concept.examples.map((example, idx) => (
                      <li key={idx} className="concept-detail-list-item">{example}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-accent/80 italic concept-detail-placeholder">
                    (Penjelasan singkat bagaimana contoh-contoh ini merefleksikan {displayConceptName} akan segera ditambahkan.)
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary-foreground/85 concept-detail-heading">Mengapa {displayConceptName} Penting untuk Era {era.title}?</h3>
                <p className="text-muted-foreground leading-relaxed concept-detail-paragraph">
                  Konsep {displayConceptName} memainkan peran krusial dalam membentuk karakteristik dan kemampuan era {era.title}.
                </p>
                <p className="mt-3 text-sm text-accent/80 italic concept-detail-placeholder">
                  (Diskusi lebih lanjut mengenai kontribusi spesifik {displayConceptName} terhadap perkembangan {era.title}, inovasi yang dibawanya, atau masalah yang dipecahkannya akan segera ditambahkan.)
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary-foreground/85 concept-detail-heading">Implikasi dan Dampak Lebih Luas</h3>
                 <p className="text-muted-foreground leading-relaxed concept-detail-paragraph">
                  Pengenalan dan adopsi {displayConceptName} membawa berbagai implikasi, baik positif maupun negatif.
                </p>
                 <p className="mt-3 text-sm text-accent/80 italic concept-detail-placeholder">
                  (Analisis dampak {displayConceptName} pada pengguna, pengembang, model bisnis, atau masyarakat secara umum pada era {era.title} akan segera ditambahkan. Diskusi tentang tantangan atau keterbatasan konsep ini juga akan disertakan.)
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-border/50 text-center">
                <p className="text-lg text-primary font-semibold mb-3 concept-detail-heading">Konten Ini Masih dalam Pengembangan!</p>
                <p className="text-muted-foreground concept-detail-paragraph">
                  Tim kami sedang bekerja keras untuk melengkapi semua detail penjelasan mengenai <strong className={cn(era.colorClass)}>{displayConceptName}</strong>.
                  Terima kasih atas kesabaran Anda!
                </p>
              </div>

            </CardContent>
          </Card>

          <div className="text-center mt-16 mb-8 final-button-anim">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
              <Link href={`/learn/${era.id}`}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Jelajahi Konsep Lain di {era.title}
              </Link>
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

