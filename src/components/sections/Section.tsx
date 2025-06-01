
"use client";
import { cn } from "@/lib/utils";
import type React from "react";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 30 });
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current, // Menggunakan sectionRef untuk trigger
            start: "top 85%",
            toggleActions: "play pause resume reverse", // Diperbarui
          }
        });
      }
      if (childrenRef.current) {
        gsap.set(childrenRef.current, { opacity: 0, y: 30 });
        gsap.to(childrenRef.current, { 
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2, // Sedikit delay setelah judul
          scrollTrigger: {
            trigger: sectionRef.current, // Menggunakan sectionRef untuk trigger
            start: "top 80%", // Sedikit berbeda dari judul
            toggleActions: "play pause resume reverse", // Diperbarui
          }
        });
      }
    }, sectionRef); // Scope context ke sectionRef
    return () => ctx.revert();
  }, []);

  return (
    <section id={id} className={cn("py-16 md:py-24 overflow-hidden", className)} ref={sectionRef}>
      <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
        <h2 ref={titleRef} className={cn(
          "text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16 text-primary-foreground",
          titleClassName
          )}
          // style={{opacity: 0}} // GSAP akan menangani ini
        >
          {title}
        </h2>
        <div ref={childrenRef} /* style={{opacity:0}} */> {/* GSAP akan menangani ini */}
          {children}
        </div>
      </div>
    </section>
  );
};
