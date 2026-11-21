import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Home, Sparkles } from 'lucide-react';
import {
  CountUpNumber,
  Eyebrow,
  Reveal,
  TiltCard3D,
  EASE_EDITORIAL,
} from './ArchitecturalReveal';
import { useLanguage } from '../i18n/LanguageContext';

export function ValueStrip() {
  const { t, isRtl } = useLanguage();

  return (
    <section
      aria-label="Key strengths"
      className="bg-gradient-to-l from-[#1d3c47] via-[#2b5260] to-[#396373] text-[#FAF8F4] relative overflow-hidden"
    >
      <div className="arch-grid-dark absolute inset-0 opacity-45 pointer-events-none" />
      <div className="max-w-[1260px] mx-auto px-5 sm:px-8 py-8 relative z-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15 ${
            isRtl ? 'md:divide-x-reverse' : ''
          }`}
        >
          {t.valueStrip.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: EASE_EDITORIAL }}
              className="flex items-center gap-5 py-4 md:py-2 md:px-7"
            >
              <span className="font-num text-4xl text-[#C9BBA7] leading-none shrink-0">
                {item.num}
              </span>
              <div>
                <strong className="block text-base font-bold text-[#FAF8F4]">
                  {item.title}
                </strong>
                <small className="block text-[#FAF8F4]/78 text-sm mt-0.5">
                  {item.subtitle}
                </small>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrubWord({
  word,
  index,
  total,
  progress,
  accent,
  isRtl,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  accent: boolean;
  isRtl: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const start = index / total;
  const end = Math.min(1, start + 1.4 / total);
  const opacity = useTransform(progress, [start, end], [0.22, 1]);

  return (
    <motion.span
      style={prefersReduced ? undefined : { opacity }}
      className={`inline-block ${isRtl ? 'ml-2.5' : 'mr-2.5'} ${
        accent ? 'text-[#396373]' : 'text-[#343735]'
      }`}
    >
      {word}
    </motion.span>
  );
}

export function PhilosophySection() {
  const { t, isRtl } = useLanguage();
  const quoteRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ['start 0.85', 'center 0.45'],
  });
  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="philosophy"
      className="py-20 sm:py-28 bg-[#FAF8F4] relative overflow-hidden"
    >
      <span
        aria-hidden="true"
        dir="ltr"
        className={`font-script pointer-events-none select-none absolute top-10 text-[7rem] sm:text-[11rem] text-[#C9BBA7]/16 leading-none ${
          isRtl ? '-left-8' : '-right-8'
        }`}
      >
        Orit Goldstein
      </span>

      <div className="max-w-[1260px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div ref={quoteRef} className="lg:col-span-6">
            <Eyebrow>{t.philosophy.eyebrow}</Eyebrow>
            <blockquote
              className={`text-[2rem] sm:text-[2.85rem] font-bold leading-[1.2] mt-5 m-0 relative border-[#396373] ${
                isRtl ? 'pr-6 border-r-[3px]' : 'pl-6 border-l-[3px]'
              }`}
            >
              {t.philosophy.quoteWords.map((word, idx) => (
                <ScrubWord
                  key={idx}
                  word={word}
                  index={idx}
                  total={t.philosophy.quoteWords.length}
                  progress={scrollYProgress}
                  accent={idx >= t.philosophy.accentFromIndex}
                  isRtl={isRtl}
                />
              ))}
            </blockquote>

            <div className="grid grid-cols-3 gap-4 mt-9 pt-7 border-t border-[#C9BBA7]/50">
              {t.philosophy.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-num text-3xl sm:text-4xl font-semibold text-[#396373]">
                    <CountUpNumber target={m.target} suffix={m.suffix} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#5c625f]">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <Reveal delay={0.18}>
              <p className="text-[#4c524f] text-lg leading-[1.9] m-0">
                {t.philosophy.p1}
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="text-[#4c524f] text-lg leading-[1.9] m-0">
                {t.philosophy.p2}
              </p>
            </Reveal>
            <Reveal delay={0.34}>
              <a
                href="#about"
                className="inline-flex items-center gap-2.5 text-[#396373] hover:text-[#1d3c47] font-bold border-b-2 border-[#C9BBA7] pb-1.5 mt-2 transition-colors group"
              >
                <span>{t.philosophy.link}</span>
                <ForwardArrow
                  className={`w-4 h-4 transition-transform ${
                    isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({
  onSelectService,
}: {
  onSelectService: (serviceName: string) => void;
}) {
  const { t, isRtl } = useLanguage();
  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-[#EAE4DA] arch-grid-light relative"
    >
      <div className="max-w-[1260px] mx-auto px-5 sm:px-8">
        <div className="max-w-[700px] mb-12">
          <Eyebrow>{t.services.eyebrow}</Eyebrow>
          <Reveal delay={0.08}>
            <h2 className="text-[2.3rem] sm:text-[3.35rem] font-bold leading-[1.1] text-[#343735] mt-4 mb-4">
              {t.services.heading}
            </h2>
            <p className="text-[#565d5a] text-base sm:text-[1.12rem] leading-[1.82] m-0">
              {t.services.desc}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, idx) => (
            <TiltCard3D key={service.num} className="rounded-3xl h-full">
              <motion.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: EASE_EDITORIAL }}
                className={`group relative h-full rounded-3xl p-7 sm:p-8 flex flex-col transition-shadow duration-400 ${
                  service.highlighted
                    ? 'bg-gradient-to-b from-[#1d3c47] to-[#396373] text-[#FAF8F4] shadow-[0_26px_65px_rgba(29,60,71,0.3)] border border-white/15'
                    : 'bg-[#FAF8F4] text-[#343735] border border-[#C9BBA7]/50 hover:shadow-[0_22px_55px_rgba(29,60,71,0.12)]'
                }`}
              >
                <div
                  className={`absolute top-0 right-7 left-7 h-[3px] rounded-b-full ${
                    service.highlighted
                      ? 'bg-gradient-to-l from-[#C9BBA7] via-[#FAF8F4] to-[#C9BBA7]'
                      : 'bg-[#C9BBA7] group-hover:bg-[#396373] transition-colors'
                  }`}
                />

                <div className="flex items-center justify-between mb-6">
                  <span className="font-num text-4xl leading-none text-[#C9BBA7]">
                    {service.num}
                  </span>
                  {service.highlighted ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1 rounded-full bg-white/14 text-[#FAF8F4] border border-white/15">
                      <Sparkles className="w-3 h-3 text-[#C9BBA7]" />
                      <span>{t.services.featuredBadge}</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#396373] bg-[#EAE4DA]/75 px-3 py-1 rounded-full">
                      {service.subtitle}
                    </span>
                  )}
                </div>

                <h3
                  className={`text-[1.7rem] font-bold leading-tight mb-3 ${
                    service.highlighted ? 'text-[#FAF8F4]' : 'text-[#343735]'
                  }`}
                >
                  {service.title}
                </h3>

                <p
                  className={`text-[1rem] leading-[1.78] mb-6 ${
                    service.highlighted ? 'text-[#FAF8F4]/85' : 'text-[#5b625f]'
                  }`}
                >
                  {service.description}
                </p>

                <ul className="space-y-2.5 mb-8 p-0 list-none">
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      className={`flex items-start gap-2.5 text-[0.95rem] leading-relaxed ${
                        service.highlighted ? 'text-[#FAF8F4]/92' : 'text-[#4c524f]'
                      }`}
                    >
                      <Check
                        className={`w-4 h-4 mt-1 shrink-0 ${
                          service.highlighted ? 'text-[#C9BBA7]' : 'text-[#396373]'
                        }`}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-auto pt-5 border-t flex items-center justify-between gap-3 ${
                    service.highlighted ? 'border-white/18' : 'border-[#EAE4DA]'
                  }`}
                >
                  <span
                    className={`font-bold text-sm sm:text-base ${
                      service.highlighted ? 'text-[#FAF8F4]' : 'text-[#396373]'
                    }`}
                  >
                    {service.bottom}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    aria-label={service.title}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      service.highlighted
                        ? 'bg-[#FAF8F4] text-[#1d3c47] hover:bg-[#EAE4DA]'
                        : 'bg-[#396373]/10 text-[#396373] hover:bg-[#396373] hover:text-[#FAF8F4]'
                    }`}
                  >
                    <ForwardArrow className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            </TiltCard3D>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-7 rounded-3xl bg-[#FAF8F4] border border-[#C9BBA7]/55 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 sm:gap-7 shadow-[0_14px_40px_rgba(29,60,71,0.06)]">
            <div className="w-14 h-14 rounded-2xl bg-[#396373]/12 border border-[#396373]/20 flex items-center justify-center text-[#396373] shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#343735] m-0 mb-1.5">
                {t.services.prepurchaseTitle}
              </h3>
              <p className="text-[#5c625f] text-sm sm:text-[0.98rem] leading-relaxed m-0">
                {t.services.prepurchaseDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectService(t.services.prepurchaseTitle)}
              className="btn-shimmer inline-flex items-center justify-center gap-2.5 bg-[#396373] hover:bg-[#1d3c47] text-[#FAF8F4] font-bold px-7 py-3.5 rounded-full transition-all duration-300 shrink-0 cursor-pointer group w-full md:w-auto shadow-md"
            >
              <span>{t.services.prepurchaseCta}</span>
              <ForwardArrow
                className={`w-4 h-4 transition-transform ${
                  isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                }`}
              />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const { t, isRtl } = useLanguage();

  return (
    <section
      id="process"
      className="py-20 sm:py-28 bg-[#EAE4DA]/65 relative overflow-hidden"
    >
      <div className="max-w-[1260px] mx-auto px-5 sm:px-8">
        <div className="max-w-[680px] mb-14">
          <Eyebrow>{t.process.eyebrow}</Eyebrow>
          <Reveal delay={0.08}>
            <h2 className="text-[2.3rem] sm:text-[3.35rem] font-bold leading-[1.1] text-[#343735] mt-4 mb-4">
              {t.process.heading}
            </h2>
            <p className="text-[#5c625f] text-base sm:text-[1.12rem] leading-[1.82] m-0">
              {t.process.desc}
            </p>
          </Reveal>
        </div>

        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: EASE_EDITORIAL }}
            style={{ transformOrigin: isRtl ? 'right' : 'left' }}
            className="hidden lg:block absolute top-11 right-8 left-8 h-[1.5px] bg-gradient-to-l from-[#396373] via-[#C9BBA7] to-[#396373]/40"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.12,
                  ease: EASE_EDITORIAL,
                }}
                whileHover={{ y: -6 }}
                className="relative bg-[#FAF8F4] rounded-3xl p-6 sm:p-7 border border-[#C9BBA7]/45 shadow-xs hover:shadow-[0_18px_42px_rgba(29,60,71,0.1)] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#396373] text-[#FAF8F4] flex items-center justify-center shadow-md relative z-10">
                    <span className="font-num text-xl leading-none">
                      {step.num}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#396373] bg-[#EAE4DA] px-3 py-1 rounded-full">
                    {step.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#343735] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-[#5c625f] text-[0.98rem] leading-[1.8] m-0">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
