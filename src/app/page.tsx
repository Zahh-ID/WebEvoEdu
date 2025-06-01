
import { Header } from '@/components/layout/Header';
import ParticleBackground from '@/components/layout/ParticleBackground';
import { HeroSection } from '@/components/sections/HeroSection';
import { InternetTimelineSection } from '@/components/sections/InternetTimelineSection';
import { AnimatedExplanationsSection } from '@/components/sections/AnimatedExplanationsSection';
// import { ThreeDModelsSection } from '@/components/sections/ThreeDModelsSection'; // Dihapus
import { KnowledgeQuizSection } from '@/components/sections/KnowledgeQuizSection';
import { ResourceLibrarySection } from '@/components/sections/ResourceLibrarySection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Removed bg-background */}
      <ParticleBackground />
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <InternetTimelineSection />
        <AnimatedExplanationsSection />
        {/* <ThreeDModelsSection /> Dihapus */}
        <KnowledgeQuizSection />
        <ResourceLibrarySection />
      </main>
      <Footer />
    </div>
  );
}
