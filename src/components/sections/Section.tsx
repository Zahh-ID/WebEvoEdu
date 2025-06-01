
"use client";
import { cn } from "@/lib/utils";
import type React from "react";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, className, titleClassName, containerClassName }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      }
      if (childrenRef.current) {
        gsap.from(childrenRef.current, { 
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id={id} className={cn("py-16 md:py-24 overflow-hidden", className)} ref={sectionRef}>
      <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
        <h2 ref={titleRef} className={cn(
          "text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16 text-primary-foreground opacity-0", // Default opacity 0
          titleClassName
          )}
        >
          {title}
        </h2>
        <div ref={childrenRef} className="opacity-0"> {/* Default opacity 0 */}
          {children}
        </div>
      </div>
    </section>
  );
};
