
"use client";
import React, { useEffect, useRef } from 'react';
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
        "w-full bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-primary/30 transition-all duration-300 border-2 flex flex-col h-full",
        EraColors[item.era]
      )}
    >
      <CardHeader className="flex flex-row items-start gap-4 p-4 sm:p-6"> {/* Adjusted padding */}
        <div className={cn("p-2 rounded-md bg-primary/10", EraTextColors[item.era])}>
          <Icon className="h-7 w-7 sm:h-8 sm:w-8" /> {/* Slightly adjusted icon size */}
        </div>
        <div>
          <CardTitle className={cn("text-lg sm:text-xl font-headline", EraTextColors[item.era])}>{item.title}</CardTitle> {/* Adjusted text size */}
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">{item.era} - {item.year}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 flex-grow overflow-y-auto scrollbar-hide"> {/* Added overflow-y-auto, scrollbar-hide, adjusted padding */}
        <p className="text-foreground/80 text-sm sm:text-base">{item.description}</p> {/* Adjusted text size */}
      </CardContent>
    </Card>
  );
};

export function InternetTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pinElementRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (titleRef.current && sectionRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 50 });
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pinElementRef.current, 
            start: "top top+=80px", // Use 80px from header
            end: "bottom top+=80px", 
            toggleActions: "play pause resume reverse",
          }
        });
      }
      
      let st: ScrollTrigger | undefined;
      let resizeTimeout: NodeJS.Timeout;

      const setupGsap = () => {
        st?.kill(); 
        if (scrollContainerRef.current) {
          gsap.set(scrollContainerRef.current, { clearProps: "scrollLeft,willChange" });
        }
        if (pinElementRef.current) {
          gsap.set(pinElementRef.current, { clearProps: "transform" });
        }
        
        ScrollTrigger.refresh();

        if (pinElementRef.current && scrollContainerRef.current) {
          const scrollableWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
          
          if (scrollableWidth > 0) {
            gsap.set(scrollContainerRef.current, { willChange: 'scroll-position' });

            st = ScrollTrigger.create({
              trigger: pinElementRef.current,
              pin: pinElementRef.current,
              scrub: true,
              start: "top 80px", // Pin starts 80px from top (for header)
              end: () => `+=${scrollableWidth * 1.2}`, 
              animation: gsap.to(scrollContainerRef.current, {
                scrollLeft: scrollableWidth,
                ease: "none",
              }),
              invalidateOnRefresh: true,
            });
          }
        }
      };
      
      const debouncedSetupGsap = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(setupGsap, 250);
      };

      const initialSetupTimeout = setTimeout(setupGsap, 100);
      window.addEventListener('resize', debouncedSetupGsap);
      
      return () => {
        clearTimeout(initialSetupTimeout);
        clearTimeout(resizeTimeout);
        window.removeEventListener('resize', debouncedSetupGsap);
        st?.kill();
        if (scrollContainerRef.current) {
          gsap.set(scrollContainerRef.current, { clearProps: "transform,willChange,scrollLeft" });
        }
        if (pinElementRef.current) {
          gsap.set(pinElementRef.current, { clearProps: "transform" });
        }
      };
    }, sectionRef); 

    return () => { /* Cleanup logic */ };
  }, []); 

  return (
    <section id="timeline" ref={sectionRef} className="py-16 md:py-24">
      <div ref={pinElementRef}> 
        <div className="container mx-auto px-4 md:px-6">
          <h2 
            ref={titleRef} 
            className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-center mb-6 md:mb-8 text-primary-foreground" // Adjusted text size
          >
            Perjalanan Melalui Evolusi Web
          </h2>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap items-start overflow-x-auto space-x-4 sm:space-x-6 md:space-x-8 px-4 md:px-2 -mx-4 md:-mx-2 scrollbar-hide py-4 items-stretch" // Added items-stretch
        >
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className="timeline-card-item flex-shrink-0 w-[22rem] min-[420px]:w-[24rem] sm:w-[26rem] md:w-[30rem] h-112" // Adjusted widths
            >
              <TimelineCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
