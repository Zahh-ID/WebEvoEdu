"use client";
import Link from 'next/link';
import { RocketIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import * as React from 'react';

const navItems = [
  { name: 'Linimasa', href: '#timeline' },
  { name: 'Konsep', href: '#concepts' },
  { name: 'Arsitektur', href: '#architecture' },
  { name: 'Kuis', href: '#quiz' },
  { name: 'Sumber Daya', href: '#resources' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <RocketIcon className="h-8 w-8 text-primary group-hover:animate-pulse" />
          <span className="text-2xl font-headline font-bold text-primary-foreground group-hover:text-primary transition-colors">
            Web Evolusioner
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild className="text-primary-foreground hover:text-accent hover:bg-accent/10">
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </nav>
        <div className="md:hidden">
          {/* Tombol menu mobile bisa ditambahkan di sini */}
        </div>
      </div>
    </header>
  );
}
