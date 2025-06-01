
"use client";
import React, { useEffect, useRef } from 'react';
import { RocketIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Footer() {
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const footerRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        // Animasikan footer container itu sendiri
        gsap.set(footerRef.current, { opacity: 0, y: 20 });
        gsap.to(footerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          }
        });

        // Animasikan anak-anak dari footer (jika diperlukan stagger terpisah)
        // Namun, karena footerRef.current sudah dianimasikan opacity-nya,
        // animasi anak-anak mungkin tidak perlu lagi mengatur opacity dari 0.
        // Jika anak-anak juga dimulai dari opacity 0, maka perlu diatur.
        // Untuk kesederhanaan, kita bisa mengasumsikan anak-anak akan terlihat
        // ketika parent (footerRef.current) terlihat.
        // Jika ingin efek stagger pada anak-anak yang muncul dari opacity 0:
        /*
        const children = footerRef.current.children;
        gsap.set(children, { opacity: 0, y: 20 });
        gsap.to(children, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          delay: 0.2, // Delay setelah parent mulai muncul
          ease: 'power1.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          }
        });
        */
      }
    }, footerRef);
    return () => ctx.revert();
  }, []);
  
  // Dihapus: opacity-0 dari footer
  return (
    <footer ref={footerRef} className="border-t border-border/50 py-8 text-center bg-background/50 backdrop-blur-sm"> 
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
