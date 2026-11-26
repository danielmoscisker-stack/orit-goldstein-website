import { lazy, Suspense, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
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
import { trackEvent, trackPageVisit } from './utils/analytics';

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
const StudioVaultPage = lazy(() =>
  import('./components/StudioVaultPage').then((m) => ({
    default: m.StudioVaultPage,
  }))
);

function isSecretVaultRoute(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.pathname.includes('studio-vault-947x') ||
    window.location.hash.includes('studio-vault-947x')
  );
}

function SiteExperience() {
  const { lang } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [statementOpen, setStatementOpen] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);
  const [inVault, setInVault] = useState<boolean>(isSecretVaultRoute);

  useEffect(() => {
    const onNav = () => setInVault(isSecretVaultRoute());
    window.addEventListener('hashchange', onNav);
    window.addEventListener('popstate', onNav);
    return () => {
      window.removeEventListener('hashchange', onNav);
      window.removeEventListener('popstate', onNav);
    };
  }, []);

  // Real-time visitor + section + scroll-depth analytics
  useEffect(() => {
    if (inVault) return;
    trackPageVisit(lang);

    const seenSections = new Set<string>();
    const sectionIds = [
      'top',
      'studio-board',
      'philosophy',
      'services',
      'portfolio',
      'process',
      'about',
      'recommendations',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id && !seenSections.has(entry.target.id)) {
            seenSections.add(entry.target.id);
            trackEvent('section_view', entry.target.id);
          }
        }
      },
      { threshold: 0.3 }
    );

    const timer = window.setTimeout(() => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    }, 900);

    const reachedDepths = new Set<number>();
    const onScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollMax <= 0) return;
      const pct = Math.round((window.scrollY / scrollMax) * 100);
      for (const milestone of [25, 50, 75, 100]) {
        if (pct >= milestone && !reachedDepths.has(milestone)) {
          reachedDepths.add(milestone);
          trackEvent('scroll_depth', `${milestone}%`);
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [inVault, lang]);

  if (inVault) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#122931]" />}>
        <StudioVaultPage />
      </Suspense>
    );
  }

  const handleSelectService = (serviceName: string) => {
    trackEvent('service_select', serviceName);
    setSelectedService(serviceName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: stopAnimations ? 'auto' : 'smooth' });
    }
  };

  return (
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
  );
}

export function App() {
  return (
    <LanguageProvider>
      <SiteExperience />
    </LanguageProvider>
  );
}

export default App;
