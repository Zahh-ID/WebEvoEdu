
import type { Metadata } from 'next';
import { explanationsData, type ExplanationContent } from '@/data/explanations-data';
import TechnologyDetailClientPage from './technology-detail-client-page';

// Slugify function (consistent with the one in [webEra]/page.tsx)
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/\([^)]*\)/g, '') 
    .replace(/[^\w-]+/g, '') 
    .replace(/--+/g, '-') 
    .replace(/^-+/, '') 
    .replace(/-+$/, '') 
    .trim();
}

// Helper function to get Web Era data
function getEraData(eraId: string): ExplanationContent | undefined {
  return explanationsData.find(e => e.id === eraId);
}

// Helper function to find the original technology name and its era data
function getTechnologyDetails(eraId: string, techSlug: string): { era: ExplanationContent; techNameOriginal: string | null } | null {
  const era = getEraData(eraId);
  if (!era || !era.technologies) return null;

  const techNameOriginal = era.technologies.find(t => slugify(t) === techSlug) || null;

  return { era, techNameOriginal };
}


export async function generateStaticParams() {
  const paramsList: { webEra: string; techName: string }[] = [];
  for (const era of explanationsData) {
    if (era.technologies) {
      for (const tech of era.technologies) {
        paramsList.push({ webEra: era.id, techName: slugify(tech) });
      }
    }
  }
  return paramsList;
}

export async function generateMetadata({ params }: { params: { webEra: string; techName: string } }): Promise<Metadata> {
  const techDetails = getTechnologyDetails(params.webEra, params.techName);

  const technologyName = techDetails?.techNameOriginal || params.techName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const eraName = techDetails?.era.title || params.webEra.toUpperCase();

  return {
    title: `Pelajari Teknologi: ${technologyName} (${eraName})`,
    description: `Penjelasan sederhana mengenai teknologi ${technologyName} dalam konteks ${eraName}.`,
  };
}

// This is now a Server Component
export default async function Page({ params }: { params: { webEra: string; techName: string } }) {
  const techDetails = getTechnologyDetails(params.webEra, params.techName);

  return <TechnologyDetailClientPage params={params} techDetails={techDetails} />;
}
