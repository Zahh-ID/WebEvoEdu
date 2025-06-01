
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
        "w-full h-full bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-primary/30 transition-all duration-300 border-2", // Removed transform hover:-translate-y-1
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
          gsap.to(scrollContainerRef.current, {
            scrollLeft: scrollableWidth,
            ease: "none", // Linear scroll for smooth control
            scrollTrigger: {
              trigger: sectionPinRef.current,
              pin: true,
              scrub: 0.5, 
              start: "top top",
              end: () => `+=${scrollableWidth * 0.8}`, 
              invalidateOnRefresh: true,
            },
          });
        }

        const cards = gsap.utils.toArray('.timeline-card-item') as HTMLElement[];
        cards.forEach((card, index) => {
          const initialY = index % 2 === 0 ? -20 : 20; // Vertical alternation

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              scroller: scrollContainerRef.current, // Scroll based on the horizontal container
              horizontal: true,
              scrub: 0.8, // Smooth scrubbing
              start: "left right", // Animation starts when left of card hits right of viewport
              end: "right left",   // Animation ends when right of card hits left of viewport
              // markers: true, // Uncomment for debugging
            }
          });

          // Card Entry, Middle (Stable), and Exit Animation
          tl.fromTo(card,
            { xPercent: 100, opacity: 0, y: initialY }, // Start from 100% to its right, invisible, with y-offset
            { xPercent: 0, opacity: 1, y: 0, ease: 'power2.out', duration: 1 } // Animate to center, full opacity, y to 0
          )
          .to(card, {}, ">0.5") // Add a pause in the middle (0.5 relative duration units)
                                // The card will be stable at xPercent:0, opacity:1, y:0 during this phase
          .to(card,
            { xPercent: -100, opacity: 0, y: initialY, ease: 'power2.in', duration: 1 } // Animate to 100% to its left, invisible, y to initialY (or -initialY for different effect)
          );
        });
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
            className="timeline-card-item flex-shrink-0 w-80 sm:w-96 snap-start" // Ensure cards don't shrink
          >
            <TimelineCard item={item} index={index} />
          </div>
        ))}
      </div>
    </Section>
  );
}
