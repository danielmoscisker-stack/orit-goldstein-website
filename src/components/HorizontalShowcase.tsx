import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Eyebrow, EASE_EDITORIAL, useCursorLabel } from './ArchitecturalReveal';
import { AnimatedDogStaircase } from './AnimatedDogStaircase';
import { useLanguage } from '../i18n/LanguageContext';

export function HorizontalShowcase() {
  const { t, isRtl } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { setCursorLabel } = useCursorLabel();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Positive X glides left-ward in RTL; negative X glides right-ward in LTR
  const x = useTransform(scrollYProgress, [0, 1], ['0%', isRtl ? '58%' : '-58%']);
  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={containerRef}
      aria-label={t.horizontal.eyebrow}
      className="relative bg-[#142e37] text-[#FAF8F4] lg:h-[240vh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center overflow-hidden py-16 lg:py-0">
        <div className="arch-grid-dark absolute inset-0 opacity-45 pointer-events-none" />

        <div className="max-w-[1260px] w-full mx-auto px-5 sm:px-8 mb-8 lg:mb-10 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Eyebrow light>{t.horizontal.eyebrow}</Eyebrow>
            <h2 className="text-[2.1rem] sm:text-[3.1rem] font-bold leading-[1.08] text-[#FAF8F4] mt-3 m-0">
              {t.horizontal.heading1}{' '}
              <span className="text-[#C9BBA7]">{t.horizontal.heading2}</span>
            </h2>
          </div>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#C9BBA7] hover:text-white transition-colors self-start sm:self-end group"
          >
            <span>{t.horizontal.cta}</span>
            <ForwardArrow
              className={`w-4 h-4 transition-transform ${
                isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
              }`}
            />
          </a>
        </div>

        <div className="relative z-10 w-full overflow-x-auto lg:overflow-visible px-5 sm:px-8 pb-4 lg:pb-0">
          <motion.div
            style={prefersReduced ? undefined : { x }}
            className={`flex gap-6 sm:gap-8 w-max will-change-transform ${
              isRtl ? 'lg:pr-8' : 'lg:pl-8'
            }`}
          >
            {t.horizontal.slides.map((slide, idx) => {
              const isDogSlide = slide.src.includes('18-staircase');
              const cardClasses =
                'group relative w-[82vw] sm:w-[440px] lg:w-[480px] shrink-0 rounded-3xl overflow-hidden bg-[#1d3c47] border border-white/15 shadow-[0_28px_70px_rgba(0,0,0,0.38)]';

              const cardInner = (
                <>
                  <div className="aspect-[16/11] overflow-hidden">
                    {isDogSlide ? (
                      <AnimatedDogStaircase
                        alt={`${slide.title} – ${slide.subtitle}`}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover object-[center_58%] transition-transform duration-700 ease-out group-hover:scale-106"
                        petOnImageClick
                      />
                    ) : (
                      <img
                        src={slide.src}
                        alt={`${slide.title} – ${slide.subtitle}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                    )}
                  </div>
                  <div className="p-6 flex items-start justify-between gap-4 bg-gradient-to-t from-[#122931] via-[#173540] to-[#1d3c47]">
                    <div>
                      <h3 className="text-xl font-bold text-[#FAF8F4] m-0 mb-1 group-hover:text-[#C9BBA7] transition-colors">
                        {slide.title}
                      </h3>
                      <p className="text-sm text-[#FAF8F4]/72 m-0 leading-relaxed">
                        {slide.subtitle}
                      </p>
                    </div>
                    <span className="font-num text-3xl text-[#C9BBA7]/85 leading-none shrink-0">
                      {slide.num}
                    </span>
                  </div>
                </>
              );

              if (isDogSlide) {
                return (
                  <motion.div
                    key={slide.num}
                    onMouseEnter={() => setCursorLabel(null)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: idx * 0.08, ease: EASE_EDITORIAL }}
                    className={cardClasses}
                  >
                    {cardInner}
                  </motion.div>
                );
              }

              return (
                <motion.a
                  key={slide.num}
                  href="#portfolio"
                  onMouseEnter={() => setCursorLabel(t.horizontal.cursorLabel)}
                  onMouseLeave={() => setCursorLabel(null)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: idx * 0.08, ease: EASE_EDITORIAL }}
                  className={cardClasses}
                >
                  {cardInner}
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        <div className="hidden lg:flex max-w-[1260px] w-full mx-auto px-8 mt-8 items-center gap-4 relative z-10">
          <span className="text-xs font-bold text-[#C9BBA7] tracking-wider">
            {t.horizontal.scrollPrompt}
          </span>
          <div className="flex-1 h-[2px] bg-white/15 rounded-full overflow-hidden">
            <motion.div
              style={{
                scaleX: scrollYProgress,
                transformOrigin: isRtl ? '100% 50%' : '0% 50%',
              }}
              className="h-full bg-gradient-to-l from-[#C9BBA7] to-[#FAF8F4]"
            />
          </div>
          <span className="font-num text-sm text-white/70" dir="ltr">
            01 — 05
          </span>
        </div>
      </div>
    </section>
  );
}
