import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowLeft, ArrowRight, Globe } from 'lucide-react';
import { EASE_EDITORIAL } from './ArchitecturalReveal';
import { OritBrandLogo } from './OritBrandLogo';
import { useLanguage } from '../i18n/LanguageContext';
import { Lang } from '../i18n/translations';

const LANG_OPTIONS: { code: Lang; label: string; name: string }[] = [
  { code: 'he', label: 'עב', name: 'עברית' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
];

export function Navbar() {
  const { lang, setLang, isRtl, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#top');

  const navLinks = [
    { href: '#top', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#portfolio', label: t.nav.portfolio },
    { href: '#process', label: t.nav.process },
    { href: '#recommendations', label: t.nav.recommendations },
  ];

  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);

      const sectionIds = ['top', 'about', 'services', 'portfolio', 'process', 'recommendations'];
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
          ? 'bg-[#FAF8F4]/92 backdrop-blur-xl shadow-[0_10px_36px_rgba(29,60,71,0.09)] border-b border-[#C9BBA7]/40'
          : 'bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#EAE4DA]'
      }`}
    >
      <div
        className={`max-w-[1260px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 transition-all duration-500 ${
          scrolled ? 'min-h-[76px]' : 'min-h-[94px]'
        }`}
      >
        <a
          href="#top"
          aria-label={t.metaTitle}
          className="flex items-center shrink-0 transition-transform duration-300 hover:scale-[1.02]"
        >
          <OritBrandLogo variant="dark" size="sm" showSubtitle={!scrolled} />
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-1 text-[0.95rem] font-semibold text-[#343735]"
        >
          {navLinks.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHash(link.href)}
                className={`relative px-3.5 py-2 rounded-full transition-colors duration-200 ${
                  isActive
                    ? 'text-[#396373]'
                    : 'text-[#343735]/80 hover:text-[#396373]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#EAE4DA]/85 border border-[#C9BBA7]/50"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Sleek Language Switcher Pill (עב | EN | ES) */}
          <div
            role="group"
            aria-label="Language switcher"
            dir="ltr"
            className="inline-flex items-center p-1 rounded-full bg-[#EAE4DA]/75 border border-[#C9BBA7]/55"
          >
            <Globe className="w-3.5 h-3.5 text-[#396373] ml-1.5 mr-1 hidden sm:block" aria-hidden="true" />
            {LANG_OPTIONS.map((opt) => {
              const active = lang === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLang(opt.code)}
                  aria-label={opt.name}
                  aria-pressed={active}
                  className={`relative px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    active ? 'text-[#FAF8F4]' : 'text-[#343735]/80 hover:text-[#396373]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="lang-active-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#396373] shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{opt.label}</span>
                </button>
              );
            })}
          </div>

          <a
            href="#contact"
            className="btn-shimmer hidden sm:inline-flex items-center gap-2 bg-[#396373] hover:bg-[#1d3c47] text-[#FAF8F4] font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_8px_22px_rgba(57,99,115,0.24)] hover:shadow-[0_12px_28px_rgba(29,60,71,0.32)] hover:-translate-y-0.5 group"
          >
            <span>{t.nav.contactCta}</span>
            <ForwardArrow
              className={`w-4 h-4 transition-transform duration-300 ${
                isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
              }`}
            />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? t.portfolio.close : 'Menu'}
            aria-expanded={menuOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#396373]/25 bg-[#EAE4DA]/50 text-[#1d3c47] hover:bg-[#EAE4DA] transition-colors cursor-pointer"
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
            aria-label="Mobile navigation"
            className="lg:hidden overflow-hidden bg-[#FAF8F4] border-t border-[#EAE4DA] shadow-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-1.5">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: isRtl ? 16 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 px-4 rounded-xl text-base font-semibold transition-colors ${
                    activeHash === link.href
                      ? 'bg-[#EAE4DA] text-[#396373]'
                      : 'text-[#343735] hover:bg-[#EAE4DA]/60'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 bg-[#396373] text-[#FAF8F4] font-bold py-3.5 px-5 rounded-full shadow-md"
              >
                <span>{t.nav.mobileCta}</span>
                <ForwardArrow className="w-4 h-4" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
