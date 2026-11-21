import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { NAV_LINKS } from '../data/siteData';
import { EASE_EDITORIAL } from './ArchitecturalReveal';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#top');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);

      const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
      let current = '#top';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            current = `#${id}`;
          }
        }
      }
      setActiveHash(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#183f47]/92 backdrop-blur-xl shadow-[0_12px_36px_rgba(14,40,46,0.22)] border-b border-white/10'
          : 'bg-[#245d66] border-b border-white/15'
      }`}
    >
      <div
        className={`max-w-[1220px] mx-auto px-5 sm:px-7 flex items-center justify-between gap-6 transition-all duration-500 ${
          scrolled ? 'min-h-[74px]' : 'min-h-[92px]'
        }`}
      >
        <a
          href="#top"
          aria-label="אורית גולדשטיין – לדף הבית"
          className="flex items-center shrink-0 group"
        >
          <img
            src="./assets/site/logo-white.png"
            alt="אורית גולדשטיין – אדריכלות ועיצוב פנים"
            className={`object-contain object-right transition-all duration-500 group-hover:opacity-90 ${
              scrolled ? 'w-[164px] h-[64px]' : 'w-[198px] h-[82px]'
            }`}
          />
        </a>

        <nav
          aria-label="ניווט ראשי"
          className="hidden lg:flex items-center gap-1 text-[0.96rem] font-medium text-white/90"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHash(link.href)}
                className={`relative px-4 py-2 rounded-full transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-white/80 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-white/12 border border-white/15"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2.5 bg-[#f5f1e9] text-[#183f47] hover:bg-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
          >
            <span>בואו נדבר</span>
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}
            aria-expanded={menuOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
            aria-label="ניווט מובייל"
            className="lg:hidden overflow-hidden bg-[#14353c] border-t border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                    activeHash === link.href
                      ? 'bg-white/12 text-white'
                      : 'text-white/85 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 bg-[#f5f1e9] text-[#183f47] font-bold py-3.5 px-5 rounded-xl"
              >
                <span>בואו נדבר על הבית שלכם</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
