
import type { Metadata } from 'next';
import { explanationsData, type ExplanationContent } from '@/data/explanations-data';
import LearnEraClientPage from './learn-era-client-page';

// Helper function to get data for a specific web era
function getEraData(era: string): ExplanationContent | undefined {
  return explanationsData.find(e => e.id === era);
}

// generateStaticParams and generateMetadata are server-side functionalities.
export async function generateStaticParams() {
  return explanationsData.map((era) => ({
    webEra: era.id,
  }));
}

export async function generateMetadata({ params }: { params: { webEra: string } }): Promise<Metadata> {
  const eraData = getEraData(params.webEra);
  const eraName = eraData ? eraData.title : "Evolusi Web";
  return {
    title: `Pembelajaran Mendalam: ${eraName}`,
    description: `Pelajari lebih lanjut tentang ${eraName} dan evolusi internet.`,
  };
}

// This is now a Server Component
export default async function Page({ params }: { params: { webEra: string } }) {
  const eraData = getEraData(params.webEra);

  // The client component will handle the "Not Found" UI and the main layout structure
  // including Header, Footer, ParticleBackground for consistency.
  return <LearnEraClientPage params={params} eraData={eraData} />;
}
