
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
    // Card ini memiliki opacity-0 dari className-nya.
    // GSAP fromTo akan menganimasikannya dari keadaan tersebut.
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [item]); // Animasi dijalankan ulang ketika item (tab aktif) berubah

  return (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {item.keyConcepts.map(concept => {
              const { Icon: ConceptIcon } = concept;
              return (
                <div key={concept.title} className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <ConceptIcon className={cn("w-5 h-5", item.colorClass)} />
                    <h4 className="font-semibold text-primary-foreground/80">{concept.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{concept.description}</p>
                  {concept.examples && concept.examples.length > 0 && (
                    <div>
                      <h5 className="text-xs font-semibold text-muted-foreground/80 mb-1">Contoh Aplikasi/Platform:</h5>
                      <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                        {concept.examples.map(example => (
                          <li key={example}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {item.technologies && item.technologies.length > 0 && (
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
        )}

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
        const tabsListContainer = tabsRef.current.querySelector('.tabs-list-anim');
        const tabTriggers = tabsRef.current.querySelectorAll('.tab-trigger-item');

        // Animasikan container TabsList
        if (tabsListContainer) {
          gsap.set(tabsListContainer, { opacity: 0, y: -20 });
          gsap.to(tabsListContainer, {
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

        // Animasikan individual TabsTrigger dengan stagger
        if (tabTriggers && tabTriggers.length > 0) {
          gsap.set(tabTriggers, { opacity: 0, y: 20 });
          gsap.to(tabTriggers, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 75%", // Mulai sedikit lebih awal atau bersamaan dengan TabsList
              toggleActions: "play none none none",
            },
            delay: 0.2 // Beri sedikit jeda setelah container TabsList mulai muncul
          });
        }
        
        // Animasi untuk ExplanationDetailCard sudah ditangani di dalam komponennya sendiri
        // dan akan terpicu ketika Tabs component (parent dari Card) menjadi visible
        // karena Section component (parent dari Tabs) menganimasikan children-nya.
      }
    }, tabsRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="concepts" title="Memahami Era Web" className="bg-background/30">
      <Tabs defaultValue="web1" className="w-full max-w-4xl mx-auto" ref={tabsRef}>
        <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm border border-border mb-8 tabs-list-anim"> 
          {explanationsData.map((item) => (
            <TabsTrigger 
              key={item.id} 
              value={item.id} 
              className={cn(
                "py-3 text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg tab-trigger-item w-full", // Ditambahkan w-full untuk simetri dan tab-trigger-item untuk selector GSAP
                item.colorClass
              )}
            >
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
