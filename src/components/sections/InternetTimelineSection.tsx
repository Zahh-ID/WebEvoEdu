
"use client";
import React, { useEffect, useRef } from 'react';
import { Section } from './Section';
import { timelineData, type TimelineEvent } from '@/data/timeline-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EraColors = {
  Web1: 'border-blue-500/70 hover:border-blue-500',
  Web2: 'border-purple-500/70 hover:border-purple-500',
  Web3: 'border-green-500/70 hover:border-green-500',
};

const EraTextColors = {
  Web1: 'text-blue-400',
  Web2: 'text-purple-400',
  Web3: 'text-green-400',
};

const TimelineCard: React.FC<{ item: TimelineEvent; index: number }> = ({ item }) => {
  const { Icon } = item;
  return (
    <Card
      className={cn(
        "w-full h-full bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 border-2", // Added border-2, removed border-l-4
        EraColors[item.era]
      )}
    >
      <CardHeader className="flex flex-row items-start gap-4">
        <div className={cn("p-2 rounded-md bg-primary/10", EraTextColors[item.era])}>
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <CardTitle className={cn("text-xl font-headline", EraTextColors[item.era])}>{item.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{item.era} - {item.year}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">{item.description}</p>
      </CardContent>
    </Card>
  );
};

export function InternetTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null); // Ref for the main section
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the horizontal scroll container

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (scrollContainerRef.current) {
        const cards = gsap.utils.toArray('.timeline-card-item') as HTMLElement[];
        cards.forEach((card, index) => {
          gsap.set(card, { opacity: 0, x: 200, scale: 0.95 }); // Start from the right
          gsap.to(card, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              scroller: scrollContainerRef.current, // Set scroller to the horizontal container
              start: "left 90%", // Trigger when card's left is 90% in view
              end: "right 10%",   // For reversing animation
              toggleActions: "play pause resume reverse",
              horizontal: true, // Crucial for horizontal scroll
              // markers: true, // Uncomment for debugging ScrollTrigger
            },
            delay: index * 0.1 // Stagger animation slightly
          });
        });
      }
    }, sectionRef); // Scope GSAP context to the main section
    return () => ctx.revert();
  }, []);

  return (
    <Section id="timeline" title="Perjalanan Melalui Evolusi Web">
      <div 
        ref={scrollContainerRef} 
        className="flex flex-nowrap overflow-x-auto space-x-6 md:space-x-8 py-4 px-4 md:px-2 -mx-4 md:-mx-2 scrollbar-hide snap-x snap-mandatory"
      >
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            className="timeline-card-item flex-shrink-0 w-80 sm:w-96 snap-start" // Define width for each card
          >
            <TimelineCard item={item} index={index} />
          </div>
        ))}
      </div>
    </Section>
  );
}
