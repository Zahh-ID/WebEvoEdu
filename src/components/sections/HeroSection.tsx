
"use client";
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDownCircleIcon } from 'lucide-react';
import { gsap } from 'gsap';

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(heroRef.current?.querySelectorAll('h1, p, div > .inline-flex'), // Target buttons as well
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.2, 
          ease: "power2.out",
          delay: 0.5 // Initial delay for the group
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-4">
      <div ref={heroRef} className="z-10 opacity-0">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary-foreground/80">
            Web Evolusioner
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Mulailah perjalanan melalui era transformatif internet. Jelajahi masa lalu, pahami masa kini, dan intip masa depan web.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="#timeline">
              Jelajahi Linimasa <ArrowDownCircleIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-accent text-accent hover:bg-accent/10 hover:text-accent font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="#quiz">
              Ikuti Kuis
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
