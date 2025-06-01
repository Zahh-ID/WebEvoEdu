
"use client";
import React, { useEffect, useRef } from 'react';
import { Section } from './Section';
import { explanationsData, type ExplanationContent } from '@/data/explanations-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ExplanationDetailCard: React.FC<{ item: ExplanationContent }> = ({ item }) => {
  const { Icon: SectionIcon } = item;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Card ini sudah menggunakan gsap.fromTo dengan opacity awal 0, jadi ini sudah benar
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 } // Tambahkan sedikit delay
      );
    }
  }, [item]); 

  return (
    // opacity-0 di sini dikontrol oleh GSAP di useEffect di atas
    <Card ref={cardRef} className="bg-card/70 backdrop-blur-sm border-border shadow-lg w-full opacity-0"> 
      <CardHeader>
        <div className="flex items-center gap-4 mb-4">
          <div className={cn("p-3 rounded-lg bg-primary/20", item.colorClass)}>
            <SectionIcon className="w-10 h-10" />
          </div>
          <div>
            <CardTitle className={cn("text-3xl font-headline", item.colorClass)}>{item.title}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">{item.subtitle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-primary-foreground/90">Konsep Kunci</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {item.keyConcepts.map(concept => {
              const { Icon: ConceptIcon } = concept;
              return (
                <div key={concept.title} className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <ConceptIcon className={cn("w-5 h-5", item.colorClass)} />
                    <h4 className="font-semibold text-primary-foreground/80">{concept.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{concept.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-primary-foreground/90">Teknologi Inti</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            {item.technologies.map(tech => (
              <li key={tech} className="flex items-center">
                <CheckCircle2 className={cn("w-4 h-4 mr-2 flex-shrink-0", item.colorClass)} /> {tech}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-primary-foreground/90">Dampak & Visi</h3>
          <p className="text-muted-foreground">{item.impact}</p>
        </div>
        <div className="mt-6 p-4 border border-dashed border-border rounded-lg text-center text-muted-foreground">
          <p>Placeholder animasi masa depan untuk {item.title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export function AnimatedExplanationsSection() {
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (tabsRef.current) {
        const tabsList = tabsRef.current.querySelector('.tabs-list-anim');
        if (tabsList) {
          gsap.set(tabsList, { opacity: 0, y: -20 }); // Atur keadaan awal
          gsap.to(tabsList, { // Animasikan ke keadaan akhir
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            }
          });
        }
      }
    }, tabsRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="concepts" title="Memahami Era Web" className="bg-background/30">
      <Tabs defaultValue="web1" className="w-full max-w-4xl mx-auto" ref={tabsRef}>
        {/* Dihapus: opacity-0 dari TabsList */}
        <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm border border-border mb-8 tabs-list-anim"> 
          {explanationsData.map((item) => (
            <TabsTrigger key={item.id} value={item.id} className={cn("py-3 text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg", item.colorClass)}>
              {item.id.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        {explanationsData.map((item) => (
          <TabsContent key={item.id} value={item.id}>
            <ExplanationDetailCard item={item} />
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}
