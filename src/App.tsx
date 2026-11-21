import { useState } from 'react';
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
import { HorizontalShowcase } from './components/HorizontalShowcase';
import {
  PhilosophySection,
  ProcessSection,
  ServicesSection,
  ValueStrip,
} from './components/ServicesAndProcess';
import { PortfolioSection } from './components/PortfolioSection';
import {
  AboutSection,
  ContactSection,
  FloatingWhatsApp,
  Footer,
  RecommendationsSection,
} from './components/AboutAndContact';

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
              <HorizontalShowcase />
              <ServicesSection onSelectService={handleSelectService} />
              <PortfolioSection />
              <ProcessSection />
              <AboutSection />
              <RecommendationsSection />
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
