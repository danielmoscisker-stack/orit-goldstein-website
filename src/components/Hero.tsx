import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Compass, Sparkles, ChevronDown } from 'lucide-react';
import { EASE_EDITORIAL, MagneticLink } from './ArchitecturalReveal';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.12]);
  const floatCardY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative bg-[#f5f1e9] arch-grid-light overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24"
    >
      {/* Ambient architectural geometry */}
      <motion.svg
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
        animate={prefersReduced ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute -left-32 -bottom-32 w-[420px] h-[420px] text-[#245d66]/[0.08]"
      >
        <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
        <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1" />
        <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="0.75" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="0.75" />
      </motion.svg>

      <div className="max-w-[1220px] mx-auto px-5 sm:px-7 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-5 flex flex-col justify-center py-4 lg:py-10 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_EDITORIAL }}
              className="inline-flex items-center gap-2.5 self-start px-3.5 py-1.5 rounded-full bg-white/75 backdrop-blur-sm border border-[#245d66]/15 text-[#245d66] text-xs font-bold tracking-[0.1em] mb-7 shadow-xs"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>אדריכלות · עיצוב פנים · תכנון חכם</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE_EDITORIAL }}
                className="font-editorial text-[2.9rem] sm:text-[4rem] lg:text-[4.55rem] font-normal leading-[1.04] text-[#183f47] tracking-[-0.01em] mb-6"
              >
                בית שמתחיל
                <br />
                <span className="relative inline-block">
                  בתכנון נכון.
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.75, ease: EASE_EDITORIAL }}
                    style={{ transformOrigin: 'right' }}
                    className="absolute right-0 bottom-1.5 h-[8px] w-full bg-[#c9b8a4]/45 -z-10"
                  />
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: EASE_EDITORIAL }}
              className="text-[1.12rem] sm:text-[1.2rem] text-[#525b58] leading-[1.82] max-w-[500px] mb-9"
            >
              מהתכנון ועד הפרט האחרון – בית שמתאים רק לכם. תכנון מדויק, חשיבה רחבה
              ועיצוב אישי שמחבר בין יופי, נוחות וחיי היומיום.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.56, ease: EASE_EDITORIAL }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <MagneticLink
                href="#contact"
                className="inline-flex items-center justify-center gap-3 bg-[#245d66] hover:bg-[#183f47] text-white font-semibold px-7 py-4 rounded-full shadow-[0_14px_30px_rgba(36,93,102,0.28)] hover:shadow-[0_18px_36px_rgba(24,63,71,0.34)] transition-all duration-300 group"
              >
                <span>בואו נדבר על הבית שלכם</span>
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </MagneticLink>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 border border-[#245d66]/40 hover:border-[#245d66] bg-white/50 hover:bg-[#245d66] text-[#183f47] hover:text-white font-semibold px-6 py-4 rounded-full transition-all duration-300"
              >
                <span>לצפייה בפרויקטים</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.78 }}
              className="flex items-center gap-3.5 mt-11 pt-7 border-t border-[#245d66]/12 text-sm text-[#5d6562]"
            >
              <span className="block w-8 h-[1.5px] bg-[#c9b8a4] shrink-0" />
              <span>תכנון אדריכלי ועיצוב פנים מתוך ראייה שלמה של הבית</span>
            </motion.div>
          </div>

          {/* Cinematic Parallax Image Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(0 0 12% 0 round 20px)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 20px)' }}
              transition={{ duration: 1.05, delay: 0.2, ease: EASE_EDITORIAL }}
              className="relative h-[380px] sm:h-[520px] lg:h-[630px] rounded-[20px] overflow-hidden shadow-[0_30px_80px_rgba(24,63,71,0.18)] bg-[#ded7cc]"
            >
              <motion.img
                src="./assets/site/living-room.webp"
                alt="סלון ופינת אוכל בעיצוב חם ומדויק, עם נגרות בהתאמה אישית"
                fetchPriority="high"
                style={prefersReduced ? undefined : { y: imgY, scale: imgScale }}
                className="w-full h-full object-cover object-center will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102c32]/45 via-transparent to-[#102c32]/10 pointer-events-none" />

              {/* Floating Editorial Caption */}
              <motion.div
                style={prefersReduced ? undefined : { y: floatCardY }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.65, ease: EASE_EDITORIAL }}
                className="absolute bottom-5 right-5 left-5 sm:left-auto sm:max-w-[340px] bg-[#fbf9f5]/92 backdrop-blur-md border border-white/70 rounded-2xl p-4 sm:p-5 shadow-xl"
              >
                <div className="flex items-center gap-2 text-[#245d66] text-xs font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>חתימת סטודיו</span>
                </div>
                <p className="text-[#183f47] font-semibold text-sm sm:text-[0.95rem] leading-relaxed m-0">
                  חללים מדויקים. חיים שנעים לחיות בהם.
                </p>
              </motion.div>

              {/* Floating Architectural Badge (Top-Left) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.85, ease: EASE_EDITORIAL }}
                className="hidden sm:flex absolute top-5 left-5 bg-[#183f47]/85 backdrop-blur-md text-white border border-white/15 rounded-2xl px-4 py-3 items-center gap-3 shadow-lg"
              >
                <span
                  className="text-2xl font-normal text-[#d8c3a5] leading-none"
                  style={{ fontFamily: 'var(--font-num)' }}
                >
                  12+
                </span>
                <div className="text-xs leading-tight text-white/90">
                  <strong className="block font-semibold">שנות הוראה</strong>
                  <span className="text-white/70">בתכנון אדריכלי</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <motion.a
          href="#philosophy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="hidden lg:inline-flex items-center gap-2 text-xs font-semibold text-[#245d66]/75 hover:text-[#245d66] mt-8 transition-colors"
        >
          <motion.span
            animate={prefersReduced ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
          <span>גלילה לגילוי הגישה והפרויקטים</span>
        </motion.a>
      </div>
    </section>
  );
}
