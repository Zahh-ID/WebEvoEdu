
"use client";
import React, { useEffect, useRef } from 'react';
import { RocketIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const footerRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        gsap.from(footerRef.current.children, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%", // Animate when footer is almost visible
            toggleActions: "play none none none",
          }
        });
      }
    }, footerRef);
    return () => ctx.revert();
  }, []);
  
  return (
    <footer ref={footerRef} className="border-t border-border/50 py-8 text-center bg-background/50 backdrop-blur-sm opacity-0"> {/* Default opacity 0 */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <RocketIcon className="h-7 w-7 text-primary" />
          <p className="text-lg font-headline font-semibold text-primary-foreground">
            Web Evolusioner
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Web Evolusioner. Hak cipta dilindungi undang-undang.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Menjelajahi kosmos digital, satu era pada satu waktu.
        </p>
      </div>
    </footer>
  );
}
