
// src/app/learn/[webEra]/technology/[techName]/page.tsx
'use server';

import type { Metadata } from 'next';
import Link from 'next/link';
import { explanationsData, type ExplanationContent } from '@/data/explanations-data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ParticleBackground from '@/components/layout/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, BinaryIcon, InfoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Slugify function (consistent with the one in [webEra]/page.tsx)
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/\([^)]*\)/g, '') // Remove text inside parentheses
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
    .trim();
}

// Helper function to get Web Era data
function getEraData(eraId: string): ExplanationContent | undefined {
  return explanationsData.find(e => e.id === eraId);
}

// Helper function to find the original technology name and its era data
// This is a simple lookup; in a real app, you might have a dedicated data source for technologies
function getTechnologyDetails(eraId: string, techSlug: string): { era: ExplanationContent; techNameOriginal: string | null } | null {
  const era = getEraData(eraId);
  if (!era || !era.technologies) return null;

  const techNameOriginal = era.technologies.find(t => slugify(t) === techSlug) || null;
  
  return { era, techNameOriginal };
}

export async function generateStaticParams() {
  const paramsList: { webEra: string; techName: string }[] = [];
  for (const era of explanationsData) {
    if (era.technologies) {
      for (const tech of era.technologies) {
        paramsList.push({ webEra: era.id, techName: slugify(tech) });
      }
    }
  }
  return paramsList;
}

export async function generateMetadata({ params }: { params: { webEra: string; techName: string } }): Promise<Metadata> {
  const techDetails = getTechnologyDetails(params.webEra, params.techName);
  
  const technologyName = techDetails?.techNameOriginal || params.techName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const eraName = techDetails?.era.title || params.webEra.toUpperCase();

  return {
    title: `Teknologi: ${technologyName} (${eraName})`,
    description: `Pelajari lebih lanjut tentang teknologi ${technologyName} dalam konteks ${eraName}.`,
  };
}

export default async function TechnologyDetailPage({ params }: { params: { webEra: string; techName: string } }) {
  const techDetails = getTechnologyDetails(params.webEra, params.techName);

  if (!techDetails || !techDetails.era) {
    // Fallback if era data is not found (should not happen with generateStaticParams)
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
  const { Icon: EraIcon } = era;


  return (
    <div className="flex flex-col min-h-screen">
      <ParticleBackground />
      <Header />
      <main className="flex-grow py-12 md:pt-24 pt-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Button variant="outline" asChild className="mb-8">
              <Link href={`/learn/${era.id}`}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Kembali ke Pembelajaran {era.title}
              </Link>
            </Button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
               <div className={cn("p-3 rounded-lg bg-accent/20 self-start", era.colorClass)}>
                <BinaryIcon className="w-10 h-10 sm:w-12 sm:h-12" /> {/* Specific Icon for Technology Page */}
              </div>
              <div>
                <h1 className={cn("text-3xl sm:text-4xl md:text-5xl font-headline font-bold", era.colorClass)}>{displayTechName}</h1>
                <p className="text-lg sm:text-xl text-muted-foreground mt-1">Detail Teknologi dari Era: {era.title}</p>
              </div>
            </div>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary-foreground/90">
                <InfoIcon className="inline-block mr-3 w-7 h-7 text-accent" />
                Tentang {displayTechName}
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[200px] flex flex-col justify-center items-center">
              <p className="text-xl text-muted-foreground text-center mb-4">
                Konten mendalam mengenai teknologi <strong className={cn(era.colorClass)}>{displayTechName}</strong> akan segera hadir.
              </p>
              <p className="text-sm text-muted-foreground/80 text-center">
                Saat ini kami sedang mempersiapkan materi pembelajaran terbaik untuk Anda.
              </p>
              <div className="mt-8 p-4 border border-dashed border-border/50 rounded-lg text-center text-muted-foreground/70 w-full max-w-md">
                <p className="font-semibold">Contoh Bahasan yang Akan Datang:</p>
                <ul className="text-xs mt-2 list-disc list-inside">
                    <li>Definisi dan Konsep Dasar</li>
                    <li>Sejarah dan Evolusi {displayTechName}</li>
                    <li>Peran dalam era {era.title}</li>
                    <li>Kelebihan dan Kekurangan</li>
                    <li>Studi Kasus Implementasi</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-16 mb-8">
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
