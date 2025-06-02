
"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Section } from './Section';
import { resourcesData, type ResourceItem } from '@/data/resources-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ResourceCard: React.FC<{ item: ResourceItem, index: number }> = ({ item }) => {
  const { Icon } = item;
  const cardRef = React.useRef<HTMLDivElement>(null);
  const iconWrapperRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iconWrapperRef.current && cardRef.current) {
      gsap.set(iconWrapperRef.current, { scale: 0, opacity: 0, rotation: -90 });
      const iconTween = gsap.to(iconWrapperRef.current, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        delay: 0.2 
      });
      return () => {
        iconTween.kill();
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === cardRef.current) {
            st.kill();
          }
        });
      }
    }
  }, []);


  return (
    <Card
      ref={cardRef}
      className={cn(
        "bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full resource-card-item group",
        "border-border hover:border-accent"
      )}
    >
      <CardHeader>
        <div className="flex items-start gap-3 mb-2">
          <div ref={iconWrapperRef} className="p-2 rounded-md bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[15deg]">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-headline text-primary-foreground/90">{item.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{item.type}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground/80 mb-4 text-sm">{item.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3">
        <div className="flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
              {tag}
            </Badge>
          ))}
        </div>
        <Button variant="outline" asChild className="w-full mt-2 border-accent text-accent hover:bg-accent/10 hover:text-accent">
          <Link href={item.url} target="_blank" rel="noopener noreferrer">
            Baca Lebih Lanjut <ExternalLinkIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export function ResourceLibrarySection() {
  const sectionContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (sectionContentRef.current) {
        const cards = sectionContentRef.current.querySelectorAll('.resource-card-item');
        if (cards.length > 0) {
          gsap.set(cards, { opacity: 0, y: 50, scale: 0.97 });
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.2,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionContentRef.current,
              start: "top 80%",
              toggleActions: "play pause resume reverse",
            }
          });
        }
      }
    }, sectionContentRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="resources" title="Perluas Wawasan Anda" className="bg-background/60">
      <div ref={sectionContentRef}>
        <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Selami lebih dalam evolusi web dengan makalah, artikel, dan sumber daya penting ini.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourcesData.map((item, index) => (
            <ResourceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
