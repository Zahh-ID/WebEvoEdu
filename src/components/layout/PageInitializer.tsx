
"use client";

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname, useSearchParams } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export function PageInitializer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Read searchParams to trigger effect on full URL change

  useEffect(() => {
    // Ensure ScrollTrigger is refreshed after navigation, especially with hash changes.
    // A small delay can help ensure the DOM has updated and scroll position is settled.
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150); // Adjusted delay slightly

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]); // Rerun on pathname or searchParams change

  return <>{children}</>;
}
