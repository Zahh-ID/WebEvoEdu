
"use client";
import React from 'react';
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  containerClassName?: string;
  animateChildren?: boolean; // New prop
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ id, title, children, className, titleClassName, containerClassName, animateChildren = true }, ref) => { // Default animateChildren to true
    const titleRef = useRef<HTMLHeadingElement>(null);
    const childrenRef = useRef<HTMLDivElement>(null);
    const internalSectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
      const currentSectionRef = (ref || internalSectionRef) as React.RefObject<HTMLElement>;

      const ctx = gsap.context(() => {
        if (titleRef.current && currentSectionRef.current) {
          gsap.set(titleRef.current, { opacity: 0, y: 30 }); // Adjusted y from 50 to 30
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out', // Added ease
            scrollTrigger: {
              trigger: currentSectionRef.current,
              start: "top 85%",
              toggleActions: "play pause resume reverse",
            }
          });
        }
        
        if (childrenRef.current && currentSectionRef.current) {
          if (animateChildren) {
            gsap.set(childrenRef.current, { opacity: 0, y: 30 }); // Adjusted y from 50 to 30
            gsap.to(childrenRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.2,
                ease: 'power2.out', // Added ease
                scrollTrigger: {
                trigger: currentSectionRef.current,
                start: "top 80%",
                toggleActions: "play pause resume reverse",
                }
            });
          } else {
            // If not animating children, ensure they are visible
            gsap.set(childrenRef.current, { opacity: 1, y: 0 });
          }
        }
      }, currentSectionRef);
      return () => ctx.revert();
    }, [ref, animateChildren]); // Add animateChildren to dependency array

    return (
      <section id={id} className={cn("py-16 md:py-24 overflow-hidden", className)} ref={ref || internalSectionRef}>
        <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
          <h2 ref={titleRef} className={cn(
            "text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16 text-primary-foreground",
            titleClassName
            )}
          >
            {title}
          </h2>
          <div ref={childrenRef}>
            {children}
          </div>
        </div>
      </section>
    );
  }
);
Section.displayName = 'Section';
