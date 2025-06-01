"use client";
import React from 'react';
import { Section } from './Section';
import { timelineData, type TimelineEvent } from '@/data/timeline-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const EraColors = {
  Web1: 'border-blue-500/50 hover:border-blue-500',
  Web2: 'border-purple-500/50 hover:border-purple-500',
  Web3: 'border-green-500/50 hover:border-green-500',
};

const EraTextColors = {
  Web1: 'text-blue-400',
  Web2: 'text-purple-400',
  Web3: 'text-green-400',
};

const TimelineCard: React.FC<{ item: TimelineEvent; index: number }> = ({ item, index }) => {
  const { Icon } = item;
  return (
    <Card 
      className={cn(
        "w-full bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1",
        EraColors[item.era],
        "border-l-4",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${0.5 + index * 0.1}s`, opacity: 0 }}
    >
      <CardHeader className="flex flex-row items-start gap-4">
        <div className={cn("p-2 rounded-md bg-primary/10", EraTextColors[item.era])}>
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <CardTitle className={cn("text-xl font-headline", EraTextColors[item.era])}>{item.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{item.era} - {item.year}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">{item.description}</p>
      </CardContent>
    </Card>
  );
};

export function InternetTimelineSection() {
  return (
    <Section id="timeline" title="Perjalanan Melalui Evolusi Web">
      <div className="relative max-w-3xl mx-auto">
        {/* Garis tengah untuk linimasa */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 hidden md:block" />
        
        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <div 
              key={item.id} 
              className={cn(
                "md:flex items-start relative",
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              )}
            >
              <div className="md:w-1/2">
                {/* Placeholder untuk penyejajaran, atau konten untuk satu sisi */}
              </div>
              <div className="md:w-1/2 md:px-8">
                 <TimelineCard item={item} index={index} />
              </div>
               {/* Titik pada linimasa */}
               <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1/2 -translate-y-1/2 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
