"use client";
import React from 'react';
import Link from 'next/link';
import { Section } from './Section';
import { resourcesData, type ResourceItem } from '@/data/resources-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ResourceCard: React.FC<{ item: ResourceItem, index: number }> = ({ item, index }) => {
  const { Icon } = item;
  return (
    <Card 
      className={cn(
        "bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full",
        "border-border hover:border-accent",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${0.5 + index * 0.1}s`, opacity: 0 }}
    >
      <CardHeader>
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2 rounded-md bg-accent/10 text-accent">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-headline text-primary-foreground/90">{item.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{item.type}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground/80 mb-4 text-sm">{item.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3">
        <div className="flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
              {tag}
            </Badge>
          ))}
        </div>
        <Button variant="outline" asChild className="w-full mt-2 border-accent text-accent hover:bg-accent/10 hover:text-accent">
          <Link href={item.url} target="_blank" rel="noopener noreferrer">
            Read More <ExternalLinkIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export function ResourceLibrarySection() {
  return (
    <Section id="resources" title="Expand Your Horizons" className="bg-background/30">
      <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
        Dive deeper into the evolution of the web with these seminal papers, articles, and resources.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resourcesData.map((item, index) => (
          <ResourceCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}
