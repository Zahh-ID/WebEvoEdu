
"use client";
import React, { useEffect, useRef } from 'react';
import { Section } from './Section';
import { explanationsData, type ExplanationContent } from '@/data/explanations-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRightCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getIconComponent } from '@/lib/icon-utils';

const ExplanationDetailCard: React.FC<{ item: ExplanationContent }> = ({ item }) => {
  const SectionIcon = getIconComponent(item.iconName);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cardTween: gsap.core.Tween | null = null;
    let contentTweens: gsap.core.Tween[] = [];

    if (cardRef.current) {
      gsap.set(cardRef.current, { opacity: 0, y: 40, scale: 0.9 }); 
      cardTween = gsap.to(cardRef.current, {
        opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.1,
        onComplete: () => {
          if (contentRef.current) {
            const animatedElements = [
              contentRef.current.querySelector('div.flex.items-center.gap-4.mb-4'), 
              ...Array.from(contentRef.current.querySelectorAll('h3')),
              ...Array.from(contentRef.current.querySelectorAll('.concept-card-item')),
              ...(item.technologies && item.technologies.length > 0 ? Array.from(contentRef.current.querySelectorAll('.tech-list-item')) : []),
              ...Array.from(contentRef.current.querySelectorAll('.impact-paragraph')),
              contentRef.current.querySelector('.placeholder-anim')
            ].filter(el => el) as HTMLElement[];

            gsap.set(animatedElements, { opacity: 0, y: 25 }); 
            contentTweens = animatedElements.map((el, index) => 
              gsap.to(el, { 
                opacity: 1, 
                y: 0, 
                duration: 0.4, 
                ease: 'power1.out', 
                delay: 0.1 + (index * 0.05),
              })
            );
          }
        }
      });
    }

    return () => {
      cardTween?.kill();
      contentTweens.forEach(tween => tween.kill());
      if (cardRef.current) gsap.set(cardRef.current, { clearProps: "all" });
      if (contentRef.current) {
         const animatedElements = [
              contentRef.current.querySelector('div.flex.items-center.gap-4.mb-4'),
              ...Array.from(contentRef.current.querySelectorAll('h3')),
              ...Array.from(contentRef.current.querySelectorAll('.concept-card-item')),
              ...(item.technologies && item.technologies.length > 0 ? Array.from(contentRef.current.querySelectorAll('.tech-list-item')) : []),
              ...Array.from(contentRef.current.querySelectorAll('.impact-paragraph')),
              contentRef.current.querySelector('.placeholder-anim')
            ].flat().filter(el => el) as HTMLElement[];
        gsap.set(animatedElements, { clearProps: "all" });
      }
    };
  }, [item]);

  const getButtonBgColor = (eraId: string) => {
    switch (eraId) {
      case 'web1':
        return 'bg-blue-500 hover:bg-blue-600 focus-visible:ring-blue-500';
      case 'web2':
        return 'bg-purple-500 hover:bg-purple-600 focus-visible:ring-purple-500';
      case 'web3':
        return 'bg-green-500 hover:bg-green-600 focus-visible:ring-green-500';
      default:
        return 'bg-primary hover:bg-primary/90';
    }
  };

  return (
    <Card ref={cardRef} className="bg-card/70 backdrop-blur-sm border-border shadow-lg w-full flex flex-col"> 
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
      <CardContent ref={contentRef} className="space-y-6 flex-grow">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-primary-foreground/90">Konsep Kunci</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {item.keyConcepts.map(concept => {
              const ConceptIcon = getIconComponent(concept.iconName);
              return (
                <div key={concept.title} className="p-4 bg-background/50 rounded-lg border border-border/50 concept-card-item h-full">
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
                <li key={tech} className="flex items-center tech-list-item">
                  <CheckCircle2 className={cn("w-4 h-4 mr-2 flex-shrink-0", item.colorClass)} /> {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-2 text-primary-foreground/90">Dampak & Visi</h3>
          <p className="text-muted-foreground impact-paragraph">{item.impact}</p>
        </div>
        <div className="mt-6 p-4 border border-dashed border-border rounded-lg text-center text-muted-foreground placeholder-anim">
          <p>Placeholder animasi masa depan untuk {item.title}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-6 mt-auto">
        <Button 
            asChild 
            className={cn(
                "w-full font-semibold text-primary-foreground",
                getButtonBgColor(item.id)
            )}
        >
          <Link href={`/learn/${item.id}`}>
            Pelajari Lebih Lanjut tentang {item.id.toUpperCase()}
            <ArrowRightCircle className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
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
        const tabTriggers = Array.from(tabsRef.current.querySelectorAll('.tab-trigger-item')) as HTMLElement[];

        if (tabsListContainer) {
          gsap.set(tabsListContainer, { opacity: 0, y: -30 }); 
          gsap.to(tabsListContainer, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 80%",
              toggleActions: "play pause resume reverse",
            }
          });
        }

        if (tabTriggers && tabTriggers.length > 0) {
          gsap.set(tabTriggers, { opacity: 0, y: 30, scale: 0.85 }); 
          gsap.to(tabTriggers, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 75%",
              toggleActions: "play pause resume reverse",
            },
            delay: 0.2 
          });
        }
      }
    }, tabsRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="concepts" title="Memahami Era Web" className="bg-background/60">
      <Tabs defaultValue="web1" className="w-full max-w-4xl mx-auto" ref={tabsRef}>
        <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm border border-border mb-8 tabs-list-anim"> 
          {explanationsData.map((item) => (
            <TabsTrigger 
              key={item.id} 
              value={item.id} 
              className={cn(
                "py-3 text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg tab-trigger-item w-full",
                 item.id === 'web1' && 'data-[state=active]:bg-blue-600 data-[state=active]:text-white focus-visible:ring-blue-500',
                 item.id === 'web2' && 'data-[state=active]:bg-purple-600 data-[state=active]:text-white focus-visible:ring-purple-500',
                 item.id === 'web3' && 'data-[state=active]:bg-green-600 data-[state=active]:text-white focus-visible:ring-green-500',
                 !(item.id === 'web1' || item.id === 'web2' || item.id === 'web3') && 'data-[state=active]:bg-primary'

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
