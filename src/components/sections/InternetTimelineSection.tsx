
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
        "w-full h-full bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-primary/30 transition-all duration-300 border-2",
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
  const sectionPinRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      if (scrollContainerRef.current && sectionPinRef.current) {
        const scrollableWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

        if (scrollableWidth > 0) {
          // Pin the section and scroll its content horizontally based on vertical page scroll
          gsap.to(scrollContainerRef.current, {
            scrollLeft: scrollableWidth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionPinRef.current,
              pin: sectionPinRef.current, // Pin the <Section> component itself
              pinType: "transform", // Use transform for pinning to avoid overflow issues
              scrub: 0.5, 
              start: "top top",
              end: () => `+=${scrollableWidth * 0.8}`, // Vertical scroll distance to drive the horizontal scroll
              invalidateOnRefresh: true,
              // markers: true, // Uncomment for debugging main pin
            },
          });

          // Animate individual cards as they come into view horizontally
          const cards = gsap.utils.toArray('.timeline-card-item') as HTMLElement[];
          cards.forEach((card, index) => {
            const initialY = index % 2 === 0 ? -15 : 15; // Vertical alternation

            // Simple animation: slide in from right, with vertical offset, then stay
            gsap.fromTo(card,
              { x: 150, opacity: 0, y: initialY }, 
              { 
                x: 0, opacity: 1, y: 0,
                ease: 'power2.out', 
                duration: 0.6,
                // delay: 0.05 * index, // Optional: slight stagger for cards already in view at start
                scrollTrigger: {
                  trigger: card,
                  scroller: scrollContainerRef.current, // Animation is driven by horizontal scroll within this container
                  horizontal: true,
                  start: "left 90%", // Start when 10% of card is visible from right
                  end: "right 90%",   // A wide range to ensure it triggers if partially visible
                  toggleActions: "play none none none", // Play once and stay
                  // markers: {startColor: "green", endColor: "red", indent: 20 * (index + 1)}, // For debugging card animations
                }
              }
            );
          });
        }
      }
    }, sectionPinRef); 
    
    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionPinRef} id="timeline" title="Perjalanan Melalui Evolusi Web">
      <div
        ref={scrollContainerRef}
        className="flex flex-nowrap overflow-x-auto space-x-6 md:space-x-8 py-4 px-4 md:px-2 -mx-4 md:-mx-2 scrollbar-hide snap-x snap-mandatory"
      >
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            className="timeline-card-item flex-shrink-0 w-80 sm:w-96 snap-start"
          >
            <TimelineCard item={item} index={index} />
          </div>
        ))}
      </div>
    </Section>
  );
}
