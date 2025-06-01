
"use client";
import React, { useEffect, useRef } from 'react';
import { timelineData, type TimelineEvent } from '@/data/timeline-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Moved from Section component context, as we are customizing layout here
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
  const sectionRef = useRef<HTMLElement>(null); // Ref for the entire section
  const titleRef = useRef<HTMLHeadingElement>(null); // Ref for the title H2
  const pinElementRef = useRef<HTMLDivElement>(null); // Ref for the element to be pinned (wrapper around cards)
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the horizontally scrolling card container

  // GSAP animation for the title (standard fade-in/slide-up)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%", // Animate when title is 85% from top of viewport
            toggleActions: "play pause resume reverse",
          }
        }
      );
    }
  }, []);

  // GSAP animation for horizontal scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let st: ScrollTrigger | undefined;
    let resizeTimeout: NodeJS.Timeout;

    const setupGsap = () => {
      st?.kill(); 
      if (scrollContainerRef.current) {
        // Ensure will-change is applied for performance hint
        gsap.set(scrollContainerRef.current, { clearProps: "all", willChange: "scroll-position" });
      }

      if (pinElementRef.current && scrollContainerRef.current) {
        const scrollableWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
        
        if (scrollableWidth > 0) {
          st = ScrollTrigger.create({
            trigger: pinElementRef.current, // Trigger pinning when this element enters viewport
            pin: pinElementRef.current, // Pin this element
            pinType: "transform",
            scrub: true, 
            start: "top top", // Start pinning when top of pinElementRef hits top of viewport
            end: () => `+=${scrollableWidth * 1}`, // Entire horizontal scroll maps to vertical scroll distance = scrollableWidth
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
        gsap.set(scrollContainerRef.current, { clearProps: "transform,willChange" });
      }
    };
  }, []); 

  return (
    <section ref={sectionRef} id="timeline" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <h2 
          ref={titleRef} 
          className="text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16 text-primary-foreground"
        >
          {sectionTitleText}
        </h2>
        {/* This div will be pinned, containing the scrollable cards */}
        <div ref={pinElementRef}> 
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap overflow-x-auto space-x-6 md:space-x-8 py-4 px-4 md:px-2 -mx-4 md:-mx-2 scrollbar-hide"
          >
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className="timeline-card-item flex-shrink-0 w-[28rem] sm:w-[32rem]"
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
