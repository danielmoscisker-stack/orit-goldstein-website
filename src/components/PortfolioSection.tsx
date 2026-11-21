import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Expand, X, ChevronRight, ChevronLeft } from 'lucide-react';
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  GalleryCategory,
  GalleryItem,
} from '../data/siteData';
import { Eyebrow, Reveal, EASE_EDITORIAL } from './ArchitecturalReveal';
import { BeforeAfterSection } from './BeforeAfterSlider';

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const currentLightboxItem: GalleryItem | null =
    lightboxIndex !== null ? filteredItems[lightboxIndex] ?? null : null;

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) =>
          i === null ? null : (i + 1) % filteredItems.length
        );
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) =>
          i === null
            ? null
            : (i - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#fbf9f5]">
      <div className="max-w-[1220px] mx-auto px-5 sm:px-7">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-[660px]">
            <Eyebrow>מתוך תיק העבודות</Eyebrow>
            <Reveal delay={0.08}>
              <h2 className="font-editorial text-[2.3rem] sm:text-[3.4rem] font-normal leading-[1.1] text-[#183f47] mt-4 mb-4">
                בתים עם אופי. תכנון עם מחשבה.
              </h2>
              <p className="text-[#5d6562] text-base sm:text-[1.12rem] leading-[1.82] m-0">
                מבחר חללים ופרטים מתוך פרויקטים שתכננתי ועיצבתי – מהתמונה הרחבה
                ועד הפרטים הקטנים.
              </p>
            </Reveal>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 text-[#245d66] hover:text-[#183f47] font-bold border-b border-[#c9b8a4] pb-1.5 self-start md:self-end transition-colors group"
          >
            <span>יש לכם פרויקט בראש?</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </a>
        </div>

        {/* Animated Category Filter Pills */}
        <div
          role="tablist"
          aria-label="סינון תיק עבודות לפי חלל"
          className="flex flex-wrap items-center gap-2 mb-9"
        >
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((i) => i.category === cat.id).length;

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
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-[#183f47] bg-[#f5f1e9] hover:bg-[#e6ddd1]/80 border border-[#245d66]/10'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolio-filter-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#245d66] shadow-md"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <span>{cat.label}</span>
                  <span
                    className={`text-[0.72rem] ${
                      isActive ? 'text-[#d8c3a5]' : 'text-[#6e9293]'
                    }`}
                  >
                    ({count})
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated Curated Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.button
                key={item.id}
                layout
                type="button"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.03, 0.25),
                  ease: EASE_EDITORIAL,
                }}
                onClick={() => setLightboxIndex(idx)}
                aria-label={`פתיחת תמונה בגודל מלא: ${item.alt}`}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#f1ede6] border border-[#245d66]/12 shadow-xs hover:shadow-[0_18px_45px_rgba(24,63,71,0.16)] transition-shadow duration-500 cursor-pointer text-right focus-visible:outline-3 focus-visible:outline-[#245d66]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Hover Architectural Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#102c32]/82 via-[#102c32]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <div className="self-end w-9 h-9 rounded-full bg-white/90 text-[#183f47] flex items-center justify-center translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                    <Expand className="w-4 h-4" />
                  </div>
                  <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="block text-white font-semibold text-sm sm:text-base leading-snug">
                      {item.title}
                    </span>
                    <span className="hidden sm:block text-white/75 text-xs mt-1 line-clamp-2">
                      {item.alt}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Before & After Section */}
        <BeforeAfterSection />
      </div>

      {/* Premium Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="תצוגת תמונה מוגדלת"
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[80] bg-[#0d2226]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[1120px] flex items-center justify-between text-white/85 mb-4"
            >
              <span className="text-sm font-medium bg-white/10 px-3.5 py-1.5 rounded-full">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="סגירה"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Stage */}
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
                aria-label="תמונה קודמת"
                className="hidden sm:flex shrink-0 ml-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <motion.div
                key={currentLightboxItem.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
                className="flex flex-col items-center"
              >
                <img
                  src={currentLightboxItem.src}
                  alt={currentLightboxItem.alt}
                  className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] bg-[#142d32]"
                />
                <div className="mt-4 text-center max-w-xl">
                  <p className="text-white font-semibold text-base m-0">
                    {currentLightboxItem.title}
                  </p>
                  <p className="text-white/70 text-sm mt-1 m-0">
                    {currentLightboxItem.alt}
                  </p>
                </div>
              </motion.div>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                }
                aria-label="תמונה הבאה"
                className="hidden sm:flex shrink-0 mr-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Buttons */}
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
                <ChevronRight className="w-4 h-4" /> הקודם
              </button>
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                }
                className="px-4 py-2 rounded-full bg-white/10 text-white text-sm inline-flex items-center gap-1"
              >
                הבא <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
