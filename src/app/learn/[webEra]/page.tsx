
// src/app/learn/[webEra]/page.tsx
'use server';

import type { Metadata } from 'next';
import Link from 'next/link';
import { explanationsData, type ExplanationContent } from '@/data/explanations-data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ParticleBackground from '@/components/layout/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, CheckCircle2 as CheckCircle2Icon } from 'lucide-react'; // Renamed to avoid conflict
import { cn } from '@/lib/utils';

// Function to get data for a specific web era
function getEraData(era: string): ExplanationContent | undefined {
  return explanationsData.find(e => e.id === era);
}

export async function generateStaticParams() {
  return explanationsData.map((era) => ({
    webEra: era.id,
  }));
}

export async function generateMetadata({ params }: { params: { webEra: string } }): Promise<Metadata> {
  const eraData = getEraData(params.webEra);
  const eraName = eraData ? eraData.title : "Evolusi Web";
  return {
    title: `Pembelajaran Mendalam: ${eraName}`,
    description: `Pelajari lebih lanjut tentang ${eraName} dan evolusi internet.`,
  };
}

export default async function LearnWebEraPage({ params }: { params: { webEra: string } }) {
  const eraData = getEraData(params.webEra);

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

  const { Icon: EraIcon } = eraData;

  return (
    <div className="flex flex-col min-h-screen">
      <ParticleBackground />
      <Header />
      <main className="flex-grow py-12 md:pt-24 pt-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Button variant="outline" asChild className="mb-8">
              <Link href="/#concepts">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Kembali ke Konsep Web
              </Link>
            </Button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div className={cn("p-3 rounded-lg bg-primary/20 self-start", eraData.colorClass)}>
                <EraIcon className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <div>
                <h1 className={cn("text-3xl sm:text-4xl md:text-5xl font-headline font-bold", eraData.colorClass)}>{eraData.title}</h1>
                <p className="text-lg sm:text-xl text-muted-foreground mt-1">Pembelajaran Lebih Mendalam</p>
              </div>
            </div>
            <p className="text-md sm:text-lg text-muted-foreground mt-4">{eraData.subtitle}</p>
          </div>

          <Card className="mb-12 bg-card/80 backdrop-blur-sm shadow-xl border-t-4" style={{ borderColor: `hsl(var(--${eraData.id === 'web1' ? 'blue' : eraData.id === 'web2' ? 'purple' : 'green'}-500))` }}>
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary-foreground/90">Konsep Kunci Lebih Dalam</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {eraData.keyConcepts.map((concept, index) => {
                const { Icon: ConceptIcon } = concept;
                return (
                  <div key={index} className="p-4 sm:p-6 bg-background/50 rounded-lg border border-border/50 shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <ConceptIcon className={cn("w-6 h-6 sm:w-7 sm:h-7", eraData.colorClass)} />
                      <h3 className="text-lg sm:text-xl font-semibold text-primary-foreground/80">{concept.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-3 text-sm sm:text-base">{concept.description}</p>
                    {concept.examples && concept.examples.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm sm:text-md font-semibold text-muted-foreground/80 mb-2">Contoh Aplikasi/Platform Utama:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-4">
                          {concept.examples.map(example => (
                            <li key={example} className="text-xs sm:text-sm">{example}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p className="mt-4 text-xs sm:text-sm text-accent/70 italic">
                      {/* Placeholder: Penjelasan lebih mendalam tentang {concept.title} akan ditambahkan di sini, membahas nuansa, implikasi, atau studi kasus terkait. */}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {eraData.technologies && eraData.technologies.length > 0 && (
            <Card className="mb-12 bg-card/80 backdrop-blur-sm shadow-xl border-t-4" style={{ borderColor: `hsl(var(--${eraData.id === 'web1' ? 'blue' : eraData.id === 'web2' ? 'purple' : 'green'}-500))` }}>
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary-foreground/90">Teknologi Inti yang Mendasari</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {eraData.technologies.map(tech => (
                    <li key={tech} className="flex items-start p-3 bg-background/30 rounded-md border border-border/30">
                      <CheckCircle2Icon className={cn("w-5 h-5 mr-3 mt-0.5 flex-shrink-0", eraData.colorClass)} />
                      <span className="text-muted-foreground text-sm sm:text-base">{tech}</span>
                    </li>
                  ))}
                </ul>
                 <p className="mt-6 text-xs sm:text-sm text-accent/70 italic">
                   {/* Placeholder: Analisis mendalam tentang peran masing-masing teknologi dalam membentuk era {eraData.title}, termasuk keterbatasan dan inovasi yang dibawanya. */}
                 </p>
              </CardContent>
            </Card>
          )}

          <Card className="mb-12 bg-card/80 backdrop-blur-sm shadow-xl border-t-4" style={{ borderColor: `hsl(var(--${eraData.id === 'web1' ? 'blue' : eraData.id === 'web2' ? 'purple' : 'green'}-500))` }}>
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary-foreground/90">Dampak Luas & Visi ke Depan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm sm:prose-base prose-invert max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
                <p>{eraData.impact}</p>
              </div>
              <p className="mt-6 text-xs sm:text-sm text-accent/70 italic">
                {/* Placeholder: Refleksi lebih jauh mengenai konsekuensi sosial, ekonomi, dan budaya dari era {eraData.title}, serta bagaimana era ini membentuk fondasi untuk evolusi web berikutnya. */}
              </p>
            </CardContent>
          </Card>

           <Card className="mb-12 bg-card/80 backdrop-blur-sm shadow-xl border-dashed border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary">Studi Kasus & Skenario Masa Depan (Segera Hadir)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm sm:text-base">
                Bagian ini akan segera diisi dengan studi kasus nyata, analisis tren, dan skenario potensial terkait perkembangan lebih lanjut dari {eraData.title}.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-dashed border-border/50 rounded-lg text-center text-muted-foreground/70">
                    <p className="font-semibold">Studi Kasus: [Nama Studi Kasus]</p>
                    <p className="text-xs mt-1">Analisis mendalam akan segera hadir.</p>
                </div>
                <div className="p-4 border border-dashed border-border/50 rounded-lg text-center text-muted-foreground/70">
                    <p className="font-semibold">Skenario Masa Depan: [Prediksi/Visi]</p>
                    <p className="text-xs mt-1">Pembahasan mendalam akan segera hadir.</p>
                </div>
              </div>
            </CardContent>
          </Card>


          <div className="text-center mt-16 mb-8">
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

    