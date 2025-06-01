
import type { Metadata } from 'next';
import { explanationsData, type ExplanationContent, type KeyConcept } from '@/data/explanations-data';
import ConceptDetailClientPage from './concept-detail-client-page';

// Slugify function (consistent with the one in learn-era-client-page.tsx)
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

// Helper function to find the original concept and its era data
interface ConceptDetails {
  era: ExplanationContent;
  concept: KeyConcept;
}

function getConceptDetails(eraId: string, conceptSlug: string): ConceptDetails | null {
  const era = getEraData(eraId);
  if (!era) return null;

  const concept = era.keyConcepts.find(c => slugify(c.title) === conceptSlug);
  if (!concept) return null;

  return { era, concept };
}

export async function generateStaticParams() {
  const paramsList: { webEra: string; conceptSlug: string }[] = [];
  for (const era of explanationsData) {
    for (const concept of era.keyConcepts) {
      paramsList.push({ webEra: era.id, conceptSlug: slugify(concept.title) });
    }
  }
  return paramsList;
}

export async function generateMetadata({ params }: { params: { webEra: string; conceptSlug: string } }): Promise<Metadata> {
  const conceptDetails = getConceptDetails(params.webEra, params.conceptSlug);

  const conceptTitle = conceptDetails?.concept.title || params.conceptSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const eraName = conceptDetails?.era.title || params.webEra.toUpperCase();

  return {
    title: `Pelajari Konsep: ${conceptTitle} (${eraName})`,
    description: `Penjelasan mendalam mengenai konsep ${conceptTitle} dalam konteks ${eraName}.`,
  };
}

// This is a Server Component
export default async function Page({ params }: { params: { webEra: string; conceptSlug: string } }) {
  const conceptDetails = getConceptDetails(params.webEra, params.conceptSlug);

  return <ConceptDetailClientPage params={params} conceptDetails={conceptDetails} />;
}

