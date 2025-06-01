
"use client";
import React, { useEffect, useRef } from 'react';
import { timelineData, type TimelineEvent } from '@/data/timeline-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const sectionTitleText = "Perjalanan Melalui Evolusi Web";

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
        "w-full h-full bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-primary/30 transition-all duration-300 border-2 flex flex-col", // Added flex flex-col
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
      <CardContent className="p-4 flex-grow"> {/* Added flex-grow */}
        <p className="text-foreground/80">{item.description}</p>
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
    if (titleRef.current && sectionRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current, // Trigger animation when title itself is in view
          start: "top 90%", // Start animation a bit earlier
          toggleActions: "play pause resume reverse",
        }
      });
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let st: ScrollTrigger | undefined;
    let resizeTimeout: NodeJS.Timeout;

    const setupGsap = () => {
      st?.kill(); // Kill previous ScrollTrigger instance if exists
      // Clear inline styles set by GSAP to ensure a clean slate, especially for scrollLeft
      if (scrollContainerRef.current) {
        gsap.set(scrollContainerRef.current, { clearProps: "scrollLeft,willChange" });
      }
      if (pinElementRef.current) {
        gsap.set(pinElementRef.current, { clearProps: "transform" }); // Clear transform for pin element
      }
      
      ScrollTrigger.refresh(); // Refresh ScrollTrigger to recalculate positions

      if (pinElementRef.current && scrollContainerRef.current) {
        const scrollableWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
        
        if (scrollableWidth > 0) {
          gsap.set(scrollContainerRef.current, { willChange: 'scroll-position' });

          st = ScrollTrigger.create({
            trigger: pinElementRef.current,
            pin: pinElementRef.current,
            scrub: true,
            start: "top 80px", // Start pinning 80px from the top (adjust if header height changes)
            end: () => `+=${scrollableWidth * 1}`, // Pin for the duration of the horizontal scroll
            animation: gsap.to(scrollContainerRef.current, {
              scrollLeft: scrollableWidth,
              ease: "none", // Linear movement
            }),
            invalidateOnRefresh: true, // Recalculate on resize/refresh
          });
        }
      }
    };
    
    const debouncedSetupGsap = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupGsap, 250); // Debounce resize event
    };

    // Initial setup with a slight delay to ensure layout is stable
    const initialSetupTimeout = setTimeout(setupGsap, 100);

    window.addEventListener('resize', debouncedSetupGsap);
    
    return () => {
      clearTimeout(initialSetupTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedSetupGsap);
      st?.kill();
      // Clean up GSAP inline styles on unmount
      if (scrollContainerRef.current) {
        gsap.set(scrollContainerRef.current, { clearProps: "transform,willChange,scrollLeft" });
      }
      if (pinElementRef.current) {
        gsap.set(pinElementRef.current, { clearProps: "transform" });
      }
    };
  }, []); // Empty dependency array, runs once on mount and cleans up on unmount

  return (
    <section id="timeline" ref={sectionRef} className="py-16 md:py-24">
      <div ref={pinElementRef}> {/* This element will be pinned */}
        <div className="container mx-auto px-4 md:px-6">
          <h2 
            ref={titleRef} 
            className="text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16 text-primary-foreground"
          >
            {sectionTitleText}
          </h2>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap items-start overflow-x-auto space-x-6 md:space-x-8 px-4 md:px-2 -mx-4 md:-mx-2 scrollbar-hide py-4"
        >
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className="timeline-card-item flex-shrink-0 w-[28rem] sm:w-[32rem] h-80" // Added h-80 for fixed height
            >
              <TimelineCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
