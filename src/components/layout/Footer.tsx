import React from 'react';
import { RocketIcon } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 py-8 text-center bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <RocketIcon className="h-7 w-7 text-primary" />
          <p className="text-lg font-headline font-semibold text-primary-foreground">
            Evolutionary Web
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Evolutionary Web. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Exploring the digital cosmos, one era at a time.
        </p>
      </div>
    </footer>
  );
}
