import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Expand, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { GALLERY_ITEMS, GalleryCategory } from '../data/siteData';
import {
  Eyebrow,
  Reveal,
  EASE_EDITORIAL,
  useCursorLabel,
} from './ArchitecturalReveal';
import { BeforeAfterSection } from './BeforeAfterSlider';
import { AnimatedDogStaircase } from './AnimatedDogStaircase';
import { useLanguage } from '../i18n/LanguageContext';

export function PortfolioSection() {
  const { t, isRtl } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { setCursorLabel } = useCursorLabel();

  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  const localizedItems = GALLERY_ITEMS.map((item) => {
    const tr = t.portfolio.items.find((x) => x.id === item.id);
    return {
      ...item,
      title: tr?.title ?? item.title,
      alt: tr?.alt ?? item.alt,
    };
  });

  const filteredItems =
    activeCategory === 'all'
      ? localizedItems
      : localizedItems.filter((item) => item.category === activeCategory);

  const currentLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] ?? null : null;

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) =>
          i === null
            ? null
            : isRtl
            ? (i + 1) % filteredItems.length
            : (i - 1 + filteredItems.length) % filteredItems.length
        );
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) =>
          i === null
            ? null
            : isRtl
            ? (i - 1 + filteredItems.length) % filteredItems.length
            : (i + 1) % filteredItems.length
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, filteredItems.length, isRtl]);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#FAF8F4]">
      <div className="max-w-[1260px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-[660px]">
            <Eyebrow>{t.portfolio.eyebrow}</Eyebrow>
            <Reveal delay={0.08}>
              <h2 className="text-[2.3rem] sm:text-[3.35rem] font-bold leading-[1.1] text-[#343735] mt-4 mb-4">
                {t.portfolio.heading1}{' '}
                <span className="text-[#396373]">{t.portfolio.heading2}</span>
              </h2>
              <p className="text-[#5c625f] text-base sm:text-[1.12rem] leading-[1.82] m-0">
                {t.portfolio.desc}
              </p>
            </Reveal>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 text-[#396373] hover:text-[#1d3c47] font-bold border-b-2 border-[#C9BBA7] pb-1.5 self-start md:self-end transition-colors group"
          >
            <span>{t.portfolio.cta}</span>
            <ForwardArrow
              className={`w-4 h-4 transition-transform ${
                isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
              }`}
            />
          </a>
        </div>

        <div
          role="tablist"
          aria-label="Portfolio categories"
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {t.portfolio.categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? localizedItems.length
                : localizedItems.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setLightboxIndex(null);
                }}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#FAF8F4]'
                    : 'text-[#343735] bg-[#EAE4DA]/70 hover:bg-[#EAE4DA] border border-[#C9BBA7]/40'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolio-filter-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#396373] shadow-md"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <span>{cat.label}</span>
                  <span
                    className={`text-[0.72rem] ${
                      isActive ? 'text-[#C9BBA7]' : 'text-[#396373]'
                    }`}
                  >
                    ({count})
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-fr"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const isWideBento =
                activeCategory === 'all' && (idx === 0 || idx === 4 || idx === 11);
              return (
                <motion.button
                  key={item.id}
                  layout
                  type="button"
                  onMouseEnter={() => setCursorLabel(t.portfolio.cursorLabel)}
                  onMouseLeave={() => setCursorLabel(null)}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(idx * 0.03, 0.24),
                    ease: EASE_EDITORIAL,
                  }}
                  onClick={() => {
                    setCursorLabel(null);
                    setLightboxIndex(idx);
                  }}
                  aria-label={item.alt}
                  className={`group relative rounded-3xl overflow-hidden bg-[#EAE4DA] border border-[#C9BBA7]/40 shadow-xs hover:shadow-[0_22px_55px_rgba(29,60,71,0.18)] transition-all duration-500 cursor-pointer text-start ${
                    isWideBento
                      ? 'md:col-span-2 aspect-[16/10] md:aspect-auto'
                      : 'aspect-square'
                  }`}
                >
                  {item.src.includes('18-staircase') ? (
                    <AnimatedDogStaircase
                      alt={item.alt}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover object-[center_62%] transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#122931]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="self-end w-10 h-10 rounded-full bg-[#FAF8F4]/92 text-[#396373] flex items-center justify-center translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                      <Expand className="w-4 h-4" />
                    </div>
                    <div className="bg-[#FAF8F4]/92 backdrop-blur-md rounded-2xl px-4 py-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                      <span className="block text-[#343735] font-bold text-sm sm:text-base leading-snug">
                        {item.title}
                      </span>
                      <span className="hidden sm:block text-[#5c625f] text-xs mt-0.5 line-clamp-1">
                        {item.alt}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <BeforeAfterSection />
      </div>

      <AnimatePresence>
        {currentLightboxItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={currentLightboxItem.title}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[80] bg-[#122931]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[1120px] flex items-center justify-between text-[#FAF8F4]/90 mb-4"
            >
              <span className="text-sm font-bold bg-white/10 px-4 py-1.5 rounded-full">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label={t.portfolio.close}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[1120px] flex items-center justify-center"
            >
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + filteredItems.length) %
                      filteredItems.length
                  )
                }
                aria-label={t.portfolio.prev}
                className={`hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center transition-colors cursor-pointer ${
                  isRtl ? 'ml-4' : 'mr-4'
                }`}
              >
                {isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
              </button>

              <motion.div
                key={currentLightboxItem.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
                className="flex flex-col items-center"
              >
                {currentLightboxItem.src.includes('18-staircase') ? (
                  <AnimatedDogStaircase
                    alt={currentLightboxItem.alt}
                    className="max-w-full max-h-[72vh] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] bg-[#1d3c47]"
                    imgClassName="max-w-full max-h-[72vh] object-contain"
                    showBadge={false}
                    maskPreset="full"
                  />
                ) : (
                  <img
                    src={currentLightboxItem.src}
                    alt={currentLightboxItem.alt}
                    className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] bg-[#1d3c47]"
                  />
                )}
                <div className="mt-4 text-center max-w-xl">
                  <p className="text-[#FAF8F4] font-bold text-base m-0">
                    {currentLightboxItem.title}
                  </p>
                  <p className="text-[#C9BBA7] text-sm mt-1 m-0">
                    {currentLightboxItem.alt}
                  </p>
                </div>
              </motion.div>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                }
                aria-label={t.portfolio.next}
                className={`hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center transition-colors cursor-pointer ${
                  isRtl ? 'mr-4' : 'ml-4'
                }`}
              >
                {isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex sm:hidden items-center gap-4 mt-5"
            >
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + filteredItems.length) %
                      filteredItems.length
                  )
                }
                className="px-4 py-2 rounded-full bg-white/10 text-white text-sm inline-flex items-center gap-1"
              >
                {t.portfolio.prev}
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                }
                className="px-4 py-2 rounded-full bg-white/10 text-white text-sm inline-flex items-center gap-1"
              >
                {t.portfolio.next}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
