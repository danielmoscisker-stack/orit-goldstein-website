import { lazy, Suspense, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from './i18n/LanguageContext';
import {
  AmbientCursorGlow,
  ArchitecturalPreloader,
  CustomCursorProvider,
  ScrollProgressBar,
} from './components/ArchitecturalReveal';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KineticMarquee } from './components/KineticMarquee';
import { MaterialBoardSection } from './components/MaterialBoardSection';
import {
  PhilosophySection,
  ProcessSection,
  ServicesSection,
  ValueStrip,
} from './components/ServicesAndProcess';
import {
  AboutSection,
  ContactSection,
  FloatingWhatsApp,
  Footer,
  RecommendationsSection,
} from './components/AboutAndContact';

// Code-split heavy below-the-fold interactive modules for instant initial load
const HorizontalShowcase = lazy(() =>
  import('./components/HorizontalShowcase').then((m) => ({
    default: m.HorizontalShowcase,
  }))
);
const PortfolioSection = lazy(() =>
  import('./components/PortfolioSection').then((m) => ({
    default: m.PortfolioSection,
  }))
);
const ProjectConcierge = lazy(() =>
  import('./components/ProjectConcierge').then((m) => ({
    default: m.ProjectConcierge,
  }))
);

export function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [statementOpen, setStatementOpen] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: stopAnimations ? 'auto' : 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <MotionConfig reducedMotion={stopAnimations ? 'always' : 'user'}>
        <CustomCursorProvider disabled={stopAnimations}>
          <div className="min-h-screen bg-[#FAF8F4] text-[#343735]">
            <AccessibilityWidget
              statementOpen={statementOpen}
              setStatementOpen={setStatementOpen}
              onStopAnimationsChange={setStopAnimations}
            />
            <ArchitecturalPreloader />
            <AmbientCursorGlow />
            <ScrollProgressBar />
            <Navbar />
            <main id="main-content" tabIndex={-1} className="outline-none">
              <Hero />
              <KineticMarquee />
              <ValueStrip />
              <MaterialBoardSection />
              <PhilosophySection />
              <Suspense fallback={<div className="min-h-[420px] bg-[#142e37]" />}>
                <HorizontalShowcase onInquire={handleSelectService} />
              </Suspense>
              <ServicesSection onSelectService={handleSelectService} />
              <Suspense fallback={<div className="min-h-[420px] bg-[#FAF8F4]" />}>
                <PortfolioSection />
              </Suspense>
              <ProcessSection />
              <AboutSection />
              <RecommendationsSection />
              <Suspense fallback={<div className="min-h-[320px] bg-[#FAF8F4]" />}>
                <ProjectConcierge onSelectRecommendation={handleSelectService} />
              </Suspense>
              <ContactSection
                selectedService={selectedService}
                onClearService={() => setSelectedService(null)}
              />
            </main>
            <Footer onOpenAccessibilityStatement={() => setStatementOpen(true)} />
            <FloatingWhatsApp />
          </div>
        </CustomCursorProvider>
      </MotionConfig>
    </LanguageProvider>
  );
}

export default App;
