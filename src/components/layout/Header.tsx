
"use client";
import Link from 'next/link';
import { RocketIcon, Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { gsap } from 'gsap';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navItems = [
  { name: 'Linimasa', href: '#timeline' },
  { name: 'Konsep', href: '#concepts' },
  { name: 'Kuis', href: '#quiz' },
  { name: 'Sumber Daya', href: '#resources' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const logoRef = React.useRef<HTMLAnchorElement>(null);
  const navItemsRef = React.useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const ctx = gsap.context(() => {
      if (logoRef.current) {
        gsap.fromTo(logoRef.current, 
          { opacity: 0, y: -20 }, 
          { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' }
        );
      }
      const actualNavItems = navItemsRef.current.filter(el => el) as (HTMLButtonElement | HTMLAnchorElement)[];
      if (actualNavItems.length > 0) {
        gsap.fromTo(actualNavItems,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
        );
      }
    }, headerRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" ref={logoRef} className="flex items-center gap-2 group z-10"> {/* Added z-10 for logo */}
          <RocketIcon className="h-8 w-8 text-primary group-hover:animate-pulse" />
          <span className="text-2xl font-headline font-bold text-primary-foreground group-hover:text-primary transition-colors">
            Web Evolusioner
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map((item, index) => (
            <Button 
              key={item.name} 
              variant="ghost" 
              asChild 
              className="text-primary-foreground hover:text-accent hover:bg-accent/10"
              ref={el => navItemsRef.current[index] = el}
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Buka menu">
                <MenuIcon className="h-7 w-7 text-primary-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[340px] bg-background p-0 flex flex-col">
              <SheetHeader className="p-4 border-b border-border flex flex-row justify-between items-center">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <RocketIcon className="h-7 w-7 text-primary" />
                  <span className="text-xl font-headline font-bold text-primary-foreground">
                    Web Evolusioner
                  </span>
                </SheetTitle>
                <SheetClose asChild>
                     <Button variant="ghost" size="icon" className="rounded-full" aria-label="Tutup menu">
                        <CloseIcon className="h-5 w-5" />
                     </Button>
                </SheetClose>
              </SheetHeader>
              <nav className="flex flex-col p-4 space-y-2 mt-4 flex-grow">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-3 text-base font-medium text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
