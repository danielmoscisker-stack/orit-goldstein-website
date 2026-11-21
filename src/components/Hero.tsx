import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ChevronDown, Sparkles } from 'lucide-react';
import { EASE_EDITORIAL, MagneticLink } from './ArchitecturalReveal';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[calc(100vh-94px)] flex items-center bg-[#FAF8F4] overflow-hidden"
    >
      {/* Full-Bleed Architectural Sunlit Photography (Left side in RTL, blending seamlessly into Cream) */}
      <div className="absolute inset-0 lg:right-[30%] overflow-hidden">
        <motion.img
          src="./assets/site/living-room.webp"
          alt="סלון ופינת אוכל בעיצוב חם ומדויק, עם נגרות בהתאמה אישית"
          fetchPriority="high"
          style={prefersReduced ? undefined : { y: imgY, scale: imgScale }}
          className="w-full h-full object-cover object-center will-change-transform"
        />
        {/* Signature Soft Cream Feathered Gradient (matching the brand board laptop hero) */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#FAF8F4] via-[#FAF8F4]/92 lg:via-[#FAF8F4]/72 to-[#FAF8F4]/15 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F4] via-transparent to-[#FAF8F4]/30 lg:hidden" />
      </div>

      {/* Organic Swaying Botanical Leaf Shadow Overlay (from top-right of brand board) */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        aria-hidden="true"
        className="animate-leaf-sway pointer-events-none absolute -top-16 -right-14 w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] opacity-[0.11] text-[#343735] blur-[3px]"
      >
        <path
          d="M460 10 C380 80 310 150 220 260"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <ellipse cx="365" cy="70" rx="58" ry="18" transform="rotate(-28 365 70)" fill="currentColor" />
        <ellipse cx="410" cy="128" rx="64" ry="20" transform="rotate(14 410 128)" fill="currentColor" />
        <ellipse cx="310" cy="135" rx="56" ry="17" transform="rotate(-35 310 135)" fill="currentColor" />
        <ellipse cx="350" cy="198" rx="62" ry="18" transform="rotate(18 350 198)" fill="currentColor" />
        <ellipse cx="265" cy="205" rx="52" ry="16" transform="rotate(-24 265 205)" fill="currentColor" />
        <ellipse cx="290" cy="265" rx="48" ry="15" transform="rotate(22 290 265)" fill="currentColor" />
      </svg>

      {/* Main Content Container */}
      <div className="max-w-[1260px] w-full mx-auto px-5 sm:px-8 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Editorial Copy Card / Column */}
          <motion.div
            style={prefersReduced ? undefined : { y: copyY }}
            className="lg:col-span-6 xl:col-span-5"
          >
            {/* Delicate Script Watermark */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE_EDITORIAL }}
              className="inline-flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-[1.5px] bg-[#C9BBA7]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.14em] text-[#396373]">
                אדריכלות · עיצוב פנים · תכנון חכם
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.22, ease: EASE_EDITORIAL }}
                className="text-[3rem] sm:text-[4.2rem] xl:text-[4.8rem] font-bold leading-[1.03] text-[#343735] mb-6"
              >
                בית שמתחיל
                <br />
                <span className="text-[#396373] relative inline-block">
                  בתכנון נכון.
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.85, delay: 0.72, ease: EASE_EDITORIAL }}
                    style={{ transformOrigin: 'right' }}
                    className="absolute right-0 -bottom-1 h-[6px] w-full bg-[#C9BBA7]/65 rounded-full -z-10"
                  />
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_EDITORIAL }}
              className="text-lg sm:text-[1.28rem] text-[#343735]/85 leading-[1.75] max-w-[490px] mb-3 font-medium"
            >
              מהתכנון ועד הפרט האחרון – בית שמתאים רק לכם.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.48, ease: EASE_EDITORIAL }}
              className="text-base sm:text-[1.08rem] text-[#5c625f] leading-[1.82] max-w-[490px] mb-9"
            >
              תכנון מדויק, חשיבה רחבה ועיצוב אישי שמחבר בין יופי, נוחות וחיי היומיום.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.58, ease: EASE_EDITORIAL }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <MagneticLink
                href="#portfolio"
                className="btn-shimmer inline-flex items-center justify-center gap-3 bg-[#396373] hover:bg-[#1d3c47] text-[#FAF8F4] font-bold px-8 py-4 rounded-full shadow-[0_14px_34px_rgba(57,99,115,0.3)] hover:shadow-[0_18px_40px_rgba(29,60,71,0.38)] transition-all duration-300 group"
              >
                <span>לצפייה בפרויקטים</span>
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </MagneticLink>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#FAF8F4]/85 hover:bg-[#EAE4DA] backdrop-blur-md border border-[#396373]/30 text-[#343735] font-bold px-7 py-4 rounded-full transition-all duration-300 shadow-xs"
              >
                <span>בואו נדבר על הבית שלכם</span>
              </a>
            </motion.div>

            {/* Elegant Palette Swatch Mini-Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              className="mt-12 pt-6 border-t border-[#C9BBA7]/50 flex flex-wrap items-center justify-between gap-4 max-w-[460px]"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5c625f]">
                <Sparkles className="w-3.5 h-3.5 text-[#396373]" />
                <span>תכנון אדריכלי ועיצוב פנים מתוך ראייה שלמה</span>
              </div>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {['#396373', '#C9BBA7', '#EAE4DA', '#FAF8F4', '#343735'].map((c) => (
                  <span
                    key={c}
                    style={{ backgroundColor: c }}
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Glassmorphic Studio Highlight Card on the Sunlit Photo Side */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col items-end justify-end h-[520px] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.65, ease: EASE_EDITORIAL }}
              className="pointer-events-auto bg-[#FAF8F4]/86 backdrop-blur-xl border border-white/80 rounded-3xl p-6 max-w-[330px] shadow-[0_24px_65px_rgba(29,60,71,0.18)]"
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="font-script text-3xl text-[#396373] leading-none" dir="ltr">
                  Orit Goldstein
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EAE4DA] text-[#396373]">
                  12+ שנות הוראה
                </span>
              </div>
              <p className="text-sm font-semibold text-[#343735] leading-relaxed m-0">
                חללים מדויקים. חומרים טבעיים. חיים שנעים לחיות בהם.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Animated Scroll Cue */}
        <motion.a
          href="#studio-board"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="hidden lg:inline-flex items-center gap-2 text-xs font-bold text-[#396373] hover:text-[#1d3c47] mt-6 transition-colors"
        >
          <motion.span
            animate={prefersReduced ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
          <span>גלילה ללוח החומרים והפרויקטים</span>
        </motion.a>
      </div>
    </section>
  );
}
