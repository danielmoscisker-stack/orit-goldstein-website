import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Eyebrow, EASE_EDITORIAL, useCursorLabel } from './ArchitecturalReveal';
import { AnimatedDogStaircase } from './AnimatedDogStaircase';

const PROMENADE_SLIDES = [
  {
    num: '01',
    title: 'חלל המגורים',
    subtitle: 'זרימה פתוחה, אור טבעי ונגרות ספרייה מדויקת',
    src: './assets/gallery/01-living-room.webp',
  },
  {
    num: '02',
    title: 'המטבח',
    subtitle: 'ניגודיות אלגנטית של עץ טבעי, שחור מאט ואי מרכזי',
    src: './assets/gallery/05-kitchen.webp',
  },
  {
    num: '03',
    title: 'סוויטת ההורים',
    subtitle: 'גווני שמנת ופטרול מעושן לאווירה שקטה ומרגיעה',
    src: './assets/gallery/06-master-bedroom.webp',
  },
  {
    num: '04',
    title: 'גרם המדרגות',
    subtitle: 'שלד מתכת שחורה ומדרכי עץ המפסלים את החלל',
    src: './assets/gallery/18-staircase.webp',
  },
  {
    num: '05',
    title: 'חדר הרחצה',
    subtitle: 'אבן טבעית, זכוכית נקייה ונגרות בהתאמה אישית',
    src: './assets/gallery/17-bathroom-vanity.webp',
  },
];

export function HorizontalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { setCursorLabel } = useCursorLabel();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // In RTL, translating positive X reveals items extending off to the left seamlessly
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '58%']);

  return (
    <section
      ref={containerRef}
      aria-label="טיילת פרויקטים פנורמית"
      className="relative bg-[#142e37] text-[#FAF8F4] lg:h-[240vh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center overflow-hidden py-16 lg:py-0">
        <div className="arch-grid-dark absolute inset-0 opacity-45 pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-[1260px] w-full mx-auto px-5 sm:px-8 mb-8 lg:mb-10 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Eyebrow light>סיור אדריכלי פנורמי</Eyebrow>
            <h2 className="text-[2.1rem] sm:text-[3.1rem] font-bold leading-[1.08] text-[#FAF8F4] mt-3 m-0">
              חללים שנעים לחוות{' '}
              <span className="text-[#C9BBA7]">מכל זווית.</span>
            </h2>
          </div>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#C9BBA7] hover:text-white transition-colors self-start sm:self-end group"
          >
            <span>לכל 21 התמונות בתיק העבודות</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </a>
        </div>

        {/* Scroll-Driven Horizontal Filmstrip (Desktop) / Swipeable Strip (Mobile) */}
        <div className="relative z-10 w-full overflow-x-auto lg:overflow-visible px-5 sm:px-8 pb-4 lg:pb-0">
          <motion.div
            style={prefersReduced ? undefined : { x }}
            className="flex gap-6 sm:gap-8 w-max lg:pr-8 will-change-transform"
          >
            {PROMENADE_SLIDES.map((slide, idx) => (
              <motion.a
                key={slide.num}
                href="#portfolio"
                onMouseEnter={() => setCursorLabel('לתיק העבודות')}
                onMouseLeave={() => setCursorLabel(null)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: EASE_EDITORIAL }}
                className="group relative w-[82vw] sm:w-[440px] lg:w-[480px] shrink-0 rounded-3xl overflow-hidden bg-[#1d3c47] border border-white/15 shadow-[0_28px_70px_rgba(0,0,0,0.38)]"
              >
                <div className="aspect-[16/11] overflow-hidden">
                  {slide.src.includes('18-staircase') ? (
                    <AnimatedDogStaircase
                      alt={`${slide.title} – ${slide.subtitle}`}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover object-[center_58%] transition-transform duration-700 ease-out group-hover:scale-106"
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
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll Progress Indicator inside the Sticky Promenade */}
        <div className="hidden lg:flex max-w-[1260px] w-full mx-auto px-8 mt-8 items-center gap-4 relative z-10">
          <span className="text-xs font-bold text-[#C9BBA7] tracking-wider">
            המשיכו לגלול לסיור
          </span>
          <div className="flex-1 h-[2px] bg-white/15 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: '100% 50%' }}
              className="h-full bg-gradient-to-l from-[#C9BBA7] to-[#FAF8F4]"
            />
          </div>
          <span className="font-num text-sm text-white/70">01 — 05</span>
        </div>
      </div>
    </section>
  );
}
