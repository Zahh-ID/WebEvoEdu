"use client";
import React from 'react';
import { Section } from './Section';
import { explanationsData, type ExplanationContent } from '@/data/explanations-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const ExplanationDetailCard: React.FC<{ item: ExplanationContent }> = ({ item }) => {
  const { Icon: SectionIcon } = item;
  return (
    <Card className="bg-card/70 backdrop-blur-sm border-border shadow-lg w-full">
      <CardHeader>
        <div className="flex items-center gap-4 mb-4">
          <div className={cn("p-3 rounded-lg bg-primary/20", item.colorClass)}>
            <SectionIcon className="w-10 h-10" />
          </div>
          <div>
            <CardTitle className={cn("text-3xl font-headline", item.colorClass)}>{item.title}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">{item.subtitle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-primary-foreground/90">Konsep Kunci</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {item.keyConcepts.map(concept => {
              const { Icon: ConceptIcon } = concept;
              return (
                <div key={concept.title} className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <ConceptIcon className={cn("w-5 h-5", item.colorClass)} />
                    <h4 className="font-semibold text-primary-foreground/80">{concept.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{concept.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-primary-foreground/90">Teknologi Inti</h3>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            {item.technologies.map(tech => (
              <li key={tech} className="flex items-center">
                <CheckCircle2 className={cn("w-4 h-4 mr-2 flex-shrink-0", item.colorClass)} /> {tech}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-primary-foreground/90">Dampak & Visi</h3>
          <p className="text-muted-foreground">{item.impact}</p>
        </div>
        {/* Placeholder untuk animasi masa depan */}
        <div className="mt-6 p-4 border border-dashed border-border rounded-lg text-center text-muted-foreground">
          <p>Placeholder animasi masa depan untuk {item.title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export function AnimatedExplanationsSection() {
  return (
    <Section id="concepts" title="Memahami Era Web" className="bg-background/30">
      <Tabs defaultValue="web1" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm border border-border mb-8">
          {explanationsData.map((item) => (
            <TabsTrigger key={item.id} value={item.id} className={cn("py-3 text-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg", item.colorClass)}>
              {item.id.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        {explanationsData.map((item) => (
          <TabsContent key={item.id} value={item.id} className="animate-fade-in-up opacity-0" style={{animationDelay: '0.6s'}}>
            <ExplanationDetailCard item={item} />
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}
