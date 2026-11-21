import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import {
  AmbientCursorGlow,
  ArchitecturalPreloader,
  ScrollProgressBar,
} from './components/ArchitecturalReveal';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MaterialBoardSection } from './components/MaterialBoardSection';
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
    <MotionConfig reducedMotion={stopAnimations ? 'always' : 'user'}>
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
          <ValueStrip />
          <MaterialBoardSection />
          <PhilosophySection />
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
    </MotionConfig>
  );
}

export default App;
