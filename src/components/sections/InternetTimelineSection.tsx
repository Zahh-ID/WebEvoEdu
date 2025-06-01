
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
          trigger: sectionRef.current, // Trigger based on the whole section
          start: "top 85%", // Animate title a bit earlier
          toggleActions: "play pause resume reverse",
        }
      });
    }

    let st: ScrollTrigger | undefined;
    let resizeTimeout: NodeJS.Timeout;

    const setupGsap = () => {
      st?.kill(); 
      gsap.set(scrollContainerRef.current, { clearProps: "scrollLeft,willChange" });
      if (pinElementRef.current) {
        gsap.set(pinElementRef.current, { clearProps: "transform" }); 
      }
      
      ScrollTrigger.refresh(); // Refresh ScrollTrigger to recalculate dimensions

      if (pinElementRef.current && scrollContainerRef.current) {
        // Check if the content is actually scrollable
        if (scrollContainerRef.current.scrollWidth <= scrollContainerRef.current.clientWidth) {
          // console.log("Timeline content is not wide enough to scroll horizontally.");
          return; // Don't set up scroll trigger if not scrollable
        }

        const scrollableWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
        
        // Add will-change for potentially smoother animation
        gsap.set(scrollContainerRef.current, { willChange: 'scroll-position' });

        st = ScrollTrigger.create({
          trigger: pinElementRef.current,
          pin: pinElementRef.current, // Pin the element containing the cards
          scrub: true, // Direct link to scrollbar, no easing from scrub
          start: "top top", // Start pinning when the top of pinElementRef hits the top of the viewport
          end: () => `+=${scrollableWidth * 1}`, // Adjust multiplier for scroll speed/distance
          animation: gsap.to(scrollContainerRef.current, {
            scrollLeft: scrollableWidth,
            ease: "none", // Linear animation from GSAP side
          }),
          invalidateOnRefresh: true, // Recalculate on resize
        });
      }
    };
    
    // Debounce resize handling
    const debouncedSetupGsap = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupGsap, 250); // Adjust delay as needed
    };

    // Initial setup with a small delay to allow layout to settle
    const initialSetupTimeout = setTimeout(setupGsap, 100); // Slightly increased delay

    window.addEventListener('resize', debouncedSetupGsap);
    
    // Cleanup
    return () => {
      clearTimeout(initialSetupTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedSetupGsap);
      st?.kill();
      // Clear GSAP inline styles to prevent interference on re-renders/navigation
      if (scrollContainerRef.current) {
        gsap.set(scrollContainerRef.current, { clearProps: "transform,willChange,scrollLeft" });
      }
      if (pinElementRef.current) {
        gsap.set(pinElementRef.current, { clearProps: "transform" });
      }
    };
  }, []); 

  return (
    <section id="timeline" ref={sectionRef} className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <h2 
          ref={titleRef} 
          className="text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16 text-primary-foreground"
        >
          {sectionTitleText}
        </h2>
        {/* This div will be pinned */}
        <div ref={pinElementRef}> 
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap items-start overflow-x-auto space-x-6 md:space-x-8 px-4 md:px-2 -mx-4 md:-mx-2 scrollbar-hide py-4" 
          >
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className="timeline-card-item flex-shrink-0 w-[28rem] sm:w-[32rem]" // Card width
              >
                <TimelineCard item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
