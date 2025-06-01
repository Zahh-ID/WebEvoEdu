
"use client";

import Link from 'next/link';
import type { ExplanationContent, KeyConcept } from '@/data/explanations-data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ParticleBackground from '@/components/layout/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, BinaryIcon, ArrowRightCircleIcon, ExternalLinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getIconComponent } from '@/lib/icon-utils';

gsap.registerPlugin(ScrollTrigger);

// Slugify function for technology and concept links
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\([^)]*\)/g, '')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    .trim();
}


interface LearnEraClientPageProps {
  params: { webEra: string };
  eraData: ExplanationContent | undefined;
}

export default function LearnEraClientPage({ params, eraData }: LearnEraClientPageProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!eraData || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.querySelectorAll('.page-title-anim, .page-subtitle-anim'), {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.2,
        scrollTrigger: {
          trigger: contentRef.current.querySelector('.page-title-anim'),
          start: "top 90%",
          toggleActions: "play pause resume reverse",
        }
      });

      const cards = contentRef.current.querySelectorAll('.animated-card-learn');
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play pause resume reverse",
          },
        });

        gsap.from(card.querySelectorAll('.card-title-anim, .card-desc-anim, .concept-item-anim, .tech-item-anim, .impact-text-anim, .casestudy-text-anim, .placeholder-text-anim'), {
          opacity: 0,
          y: 25,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play pause resume reverse",
          },
          delay: 0.3,
        });
      });

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
  }, [eraData]);


  if (!eraData) {
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
              <p className="text-muted-foreground mb-6">Maaf, detail pembelajaran untuk era ini tidak dapat ditemukan.</p>
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

  const EraIcon = getIconComponent(eraData.iconName);

  return (
    <div className="flex flex-col min-h-screen">
      <ParticleBackground />
      <Header />
      <main ref={contentRef} className="flex-grow py-12 md:pt-24 pt-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Button variant="outline" asChild className="mb-8 page-title-anim">
              <Link href="/#concepts">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Kembali ke Konsep Web
              </Link>
            </Button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 page-title-anim">
              <div className={cn("p-3 rounded-lg bg-primary/20 self-start", eraData.colorClass)}>
                <EraIcon className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <div>
                <h1 className={cn("text-3xl sm:text-4xl md:text-5xl font-headline font-bold page-title-anim", eraData.colorClass)}>{eraData.title}</h1>
                <p className="text-lg sm:text-xl text-muted-foreground mt-1 page-subtitle-anim">{eraData.subtitle}</p>
              </div>
            </div>
          </div>

          <Card className="mb-12 bg-card/80 backdrop-blur-sm shadow-xl border-t-4 animated-card-learn" style={{ borderColor: `hsl(var(--${eraData.id === 'web1' ? 'blue' : eraData.id === 'web2' ? 'purple' : 'green'}-500))` }}>
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary-foreground/90 card-title-anim">Konsep Kunci Lebih Dalam</CardTitle>
              <CardDescription className="text-muted-foreground card-desc-anim">Klik pada setiap konsep untuk mempelajari lebih lanjut.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eraData.keyConcepts.map((concept, index) => {
                const ConceptIcon = getIconComponent(concept.iconName);
                const conceptSlug = slugify(concept.title);
                return (
                  <Link
                    key={index}
                    href={`/learn/${eraData.id}/concept/${conceptSlug}`}
                    className="block p-0 concept-item-anim group rounded-lg transition-all duration-300 hover:shadow-accent/30 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="p-4 sm:p-6 bg-background/50 rounded-lg border border-border/50 shadow-md group-hover:border-accent/70 group-hover:bg-accent/5 h-full flex flex-col">
                      <div className="flex items-start gap-3 mb-3">
                        <ConceptIcon className={cn("w-7 h-7 flex-shrink-0 mt-0.5", eraData.colorClass)} />
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-primary-foreground/80 group-hover:text-accent-foreground">{concept.title}</h3>
                          <p className="text-muted-foreground mb-3 text-sm sm:text-base group-hover:text-accent-foreground/80">{concept.description}</p>
                        </div>
                      </div>
                      {concept.examples && concept.examples.length > 0 && (
                        <div className="mt-auto mb-3">
                          <h4 className="text-sm sm:text-md font-semibold text-muted-foreground/80 mb-2 group-hover:text-accent-foreground/90">Contoh Aplikasi/Platform Utama:</h4>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4 group-hover:text-accent-foreground/80">
                            {concept.examples.map(example => (
                              <li key={example} className="text-xs sm:text-sm">{example}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="mt-auto flex items-center justify-end text-xs text-accent/80 group-hover:text-accent-foreground italic">
                        Pelajari Lebih Lanjut <ExternalLinkIcon className="ml-2 h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {eraData.technologies && eraData.technologies.length > 0 && (
            <Card className="mb-12 bg-card/80 backdrop-blur-sm shadow-xl border-t-4 animated-card-learn" style={{ borderColor: `hsl(var(--${eraData.id === 'web1' ? 'blue' : eraData.id === 'web2' ? 'purple' : 'green'}-500))` }}>
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary-foreground/90 card-title-anim">Teknologi Inti yang Mendasari</CardTitle>
                <CardDescription className="text-muted-foreground card-desc-anim">Klik pada setiap teknologi untuk mempelajari lebih lanjut.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {eraData.technologies.map(tech => {
                    const techSlug = slugify(tech);
                    return (
                      <li key={techSlug} className="p-0 tech-item-anim">
                        <Link
                          href={`/learn/${eraData.id}/technology/${techSlug}`}
                          className="flex items-center p-3 bg-background/40 rounded-lg border border-border/40 hover:bg-accent/10 hover:border-accent transition-all duration-200 w-full group shadow-sm hover:shadow-md"
                        >
                          <BinaryIcon className={cn("w-5 h-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform", eraData.colorClass)} />
                          <span className="text-muted-foreground group-hover:text-accent-foreground text-sm sm:text-base flex-grow">{tech}</span>
                          <ArrowRightCircleIcon className="w-5 h-5 ml-2 text-accent/60 group-hover:text-accent transition-colors duration-200 opacity-70 group-hover:opacity-100" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                 <p className="mt-6 text-xs sm:text-sm text-accent/70 italic placeholder-text-anim">
                   (Analisis mendalam tentang peran setiap teknologi dalam membentuk era {eraData.title}, termasuk keterbatasan dan inovasinya, akan segera ditambahkan.)
                 </p>
              </CardContent>
            </Card>
          )}

          <Card className="mb-12 bg-card/80 backdrop-blur-sm shadow-xl border-t-4 animated-card-learn" style={{ borderColor: `hsl(var(--${eraData.id === 'web1' ? 'blue' : eraData.id === 'web2' ? 'purple' : 'green'}-500))` }}>
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary-foreground/90 card-title-anim">Dampak Luas & Visi ke Depan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm sm:prose-base prose-invert max-w-none text-muted-foreground whitespace-pre-line leading-relaxed impact-text-anim">
                <p>{eraData.impact}</p>
              </div>
              <p className="mt-6 text-xs sm:text-sm text-accent/70 italic placeholder-text-anim">
                (Refleksi lebih lanjut mengenai konsekuensi sosial, ekonomi, dan budaya dari era {eraData.title}, serta perannya dalam evolusi web, akan segera ditambahkan.)
              </p>
            </CardContent>
          </Card>

           <Card className="mb-12 bg-card/80 backdrop-blur-sm shadow-xl border-dashed border-primary/30 animated-card-learn">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary card-title-anim">Studi Kasus & Skenario Masa Depan (Segera Hadir)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm sm:text-base casestudy-text-anim">
                Bagian ini akan segera diisi dengan studi kasus nyata, analisis tren, dan skenario potensial terkait perkembangan lebih lanjut dari {eraData.title}.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-dashed border-border/50 rounded-lg text-center text-muted-foreground/70 casestudy-text-anim">
                    <p className="font-semibold">Studi Kasus: [Nama Studi Kasus]</p>
                    <p className="text-xs mt-1">Analisis mendalam akan segera hadir.</p>
                </div>
                <div className="p-4 border border-dashed border-border/50 rounded-lg text-center text-muted-foreground/70 casestudy-text-anim">
                    <p className="font-semibold">Skenario Masa Depan: [Prediksi/Visi]</p>
                    <p className="text-xs mt-1">Pembahasan mendalam akan segera hadir.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-16 mb-8 final-button-anim">
            <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
              <Link href="/#resources">
                Jelajahi Sumber Daya Tambahan
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

