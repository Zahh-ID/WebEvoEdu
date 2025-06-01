import { cn } from "@/lib/utils";
import React from "type-definitions";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, className, titleClassName, containerClassName }) => {
  return (
    <section id={id} className={cn("py-16 md:py-24 overflow-hidden", className)}>
      <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
        <h2 className={cn(
          "text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16 text-primary-foreground animate-fade-in-up",
          titleClassName
          )}
          style={{ animationDelay: '0.2s', opacity: 0 }} // Initial opacity for animation
        >
          {title}
        </h2>
        <div 
          className="animate-fade-in-up"
          style={{ animationDelay: '0.4s', opacity: 0 }} // Initial opacity for animation
        >
          {children}
        </div>
      </div>
    </section>
  );
};
