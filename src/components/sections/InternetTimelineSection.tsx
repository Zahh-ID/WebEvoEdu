
"use client";
import React, { useEffect, useRef } from 'react';
import { timelineData, type TimelineEvent } from '@/data/timeline-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from './Section';

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
  const sectionRef = useRef<HTMLElement>(null);
  const pinElementRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (scrollContainerRef.current) {
      gsap.set(scrollContainerRef.current, { willChange: 'scroll-position' });
    }

    let st: ScrollTrigger | undefined;
    let resizeTimeout: NodeJS.Timeout;

    const setupGsap = () => {
      st?.kill(); 

      if (scrollContainerRef.current) {
        // Reset scrollLeft before recalculating scrollableWidth
        // This ensures that if the container was previously scrolled,
        // scrollWidth is calculated correctly without being affected by its current scroll position.
        // scrollContainerRef.current.scrollLeft = 0; // No, this might cause a jump if called during resize when already scrolled.
        // clearProps is better here if we want to reset transforms or other GSAP-controlled props
        gsap.set(scrollContainerRef.current, { clearProps: "scrollLeft" });
      }
      if (pinElementRef.current) {
        gsap.set(pinElementRef.current, { clearProps: "transform" }); 
      }
      
      ScrollTrigger.refresh(); // Refresh ScrollTrigger to ensure calculations are up-to-date

      if (pinElementRef.current && scrollContainerRef.current) {
        const scrollableWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
        
        if (scrollableWidth > 0) {
          st = ScrollTrigger.create({
            trigger: pinElementRef.current,
            pin: pinElementRef.current,
            pinType: "transform",
            scrub: true, 
            start: "top top", 
            end: "+=200%", // Reverted to "+=200%"
            animation: gsap.to(scrollContainerRef.current, {
              scrollLeft: scrollableWidth,
              ease: "none", // Linear movement for direct scroll feel
            }),
            invalidateOnRefresh: true, // Recalculate on resize/refresh
          });
        } else {
           // If not scrollable, ensure no pin is active
           if (pinElementRef.current) {
             ScrollTrigger.getAll().forEach(trigger => {
               if (trigger.trigger === pinElementRef.current) {
                 trigger.kill();
               }
             });
           }
        }
      }
    };
    
    const debouncedSetupGsap = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupGsap, 250); // Debounce resize
    };

    // Delay initial setup slightly to ensure layout is stable
    const initialSetupTimeout = setTimeout(setupGsap, 100);
    window.addEventListener('resize', debouncedSetupGsap);
    
    return () => {
      clearTimeout(initialSetupTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedSetupGsap);
      st?.kill(); 
      if (scrollContainerRef.current) {
        // Clear GSAP-set properties to avoid conflicts on unmount/re-mount
        gsap.set(scrollContainerRef.current, { clearProps: "transform,willChange,scrollLeft" });
      }
      if (pinElementRef.current) {
        gsap.set(pinElementRef.current, { clearProps: "transform" });
      }
    };
  }, []); 

  return (
    // Using the generic Section component, but disabling its children animation
    // so the horizontal scroll can be managed by this component's useEffect.
    <Section ref={sectionRef} id="timeline" title={sectionTitleText} animateChildren={false}>
      <div ref={pinElementRef}> 
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap overflow-x-auto space-x-6 md:space-x-8 px-4 md:px-2 -mx-4 md:-mx-2 py-4 scrollbar-hide"
          // style={{ willChange: 'scroll-position' }} // Applied via GSAP
        >
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              // Each card item has a fixed width to allow horizontal scrolling
              className="timeline-card-item flex-shrink-0 w-[28rem] sm:w-[32rem]"
            >
              <TimelineCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
