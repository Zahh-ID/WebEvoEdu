"use client";
import React from 'react';
import Image from 'next/image';
import { Section } from './Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CuboidIcon, LayersIcon, GitForkIcon } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

const modelData = [
  {
    id: 'web1',
    title: 'Web1 Architecture: Simple & Direct',
    description: 'Characterized by client-server architecture. Users request static HTML files from a web server.',
    Icon: CuboidIcon,
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'simple network diagram',
    colorClass: 'border-blue-500/70 text-blue-400',
  },
  {
    id: 'web2',
    title: 'Web2 Architecture: Complex & Centralized',
    description: 'Three-tier architecture (client, application server, database) enabling dynamic content and user interaction, often hosted on centralized cloud platforms.',
    Icon: LayersIcon,
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'cloud architecture diagram',
    colorClass: 'border-purple-500/70 text-purple-400',
  },
  {
    id: 'web3',
    title: 'Web3 Architecture: Decentralized & Distributed',
    description: 'Peer-to-peer networks, blockchain for state management, decentralized storage (IPFS), and smart contracts forming the backend.',
    Icon: GitForkIcon,
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'decentralized network p2p',
    colorClass: 'border-green-500/70 text-green-400',
  },
];

export function ThreeDModelsSection() {
  return (
    <Section id="architecture" title="Visualizing Web Architectures">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modelData.map((model, index) => {
          const { Icon } = model;
          return (
            <Card 
              key={model.id} 
              className={cn(
                "bg-card/80 backdrop-blur-sm shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col",
                model.colorClass,
                "border-t-4",
                "animate-fade-in-up"
              )}
              style={{ animationDelay: `${0.5 + index * 0.15}s`, opacity: 0 }}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn("p-2 rounded-md bg-primary/10", model.colorClass)}>
                     <Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className={cn("text-2xl font-headline", model.colorClass.replace('border-', 'text-'))}>{model.title}</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground h-20">{model.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-center items-center">
                <div className="w-full aspect-video bg-background/30 rounded-md overflow-hidden mb-4 border border-border">
                  <Image
                    src={model.imageUrl}
                    alt={`${model.title} placeholder`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    data-ai-hint={model.aiHint}
                  />
                </div>
                <p className="text-sm text-accent text-center">3D model visualization coming soon!</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
