import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal, Columns2, SlidersHorizontal } from 'lucide-react';
import { BEFORE_AFTER_CASES, BeforeAfterCase } from '../data/siteData';
import { Eyebrow, Reveal, EASE_EDITORIAL } from './ArchitecturalReveal';
import { useLanguage } from '../i18n/LanguageContext';

function InteractiveCompareCard({
  item,
  dragHint,
  beforeLabel,
  afterLabel,
}: {
  item: BeforeAfterCase;
  dragHint: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(4, Math.min(96, pct)));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => setIsDragging(false);

  return (
    <div className="bg-[#FAF8F4] rounded-3xl border border-[#C9BBA7]/50 p-4 sm:p-6 shadow-[0_14px_40px_rgba(29,60,71,0.07)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h4 className="text-2xl font-bold text-[#343735] m-0">{item.title}</h4>
        <span className="text-xs font-bold text-[#396373]">{dragHint}</span>
      </div>
      <p className="text-sm text-[#5c625f] mb-5">{item.subtitle}</p>

      <div
        ref={containerRef}
        dir="ltr"
        role="slider"
        tabIndex={0}
        aria-label={`${beforeLabel} / ${afterLabel} – ${item.title}`}
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={Math.round(position)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPosition((p) => Math.max(4, p - 5));
          if (e.key === 'ArrowRight') setPosition((p) => Math.min(96, p + 5));
        }}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-[#EAE4DA] touch-none"
      >
        <img
          src={item.afterSrc}
          alt={item.afterAlt}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          className="absolute inset-0"
        >
          <img
            src={item.beforeSrc}
            alt={item.beforeAlt}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <span className="absolute top-3.5 left-3.5 bg-[#1d3c47]/88 backdrop-blur-md text-[#FAF8F4] text-xs font-bold px-3.5 py-1.5 rounded-full pointer-events-none">
          {beforeLabel}
        </span>
        <span className="absolute top-3.5 right-3.5 bg-[#FAF8F4]/92 backdrop-blur-md text-[#343735] text-xs font-bold px-3.5 py-1.5 rounded-full pointer-events-none shadow-sm">
          {afterLabel}
        </span>

        <div
          style={{ left: `${position}%` }}
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_16px_rgba(0,0,0,0.45)] -translate-x-1/2 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FAF8F4] text-[#396373] shadow-[0_6px_24px_rgba(18,41,49,0.35)] border-2 border-[#C9BBA7] flex items-center justify-center">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'slider' | 'side'>('slider');

  const localizedCases = BEFORE_AFTER_CASES.map((c) => {
    const tr = t.beforeAfter.cases.find((x) => x.id === c.id);
    return {
      ...c,
      title: tr?.title ?? c.title,
      subtitle: tr?.subtitle ?? c.subtitle,
    };
  });

  return (
    <div className="mt-20 pt-16 border-t border-[#C9BBA7]/45">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-[620px]">
          <Eyebrow>{t.beforeAfter.eyebrow}</Eyebrow>
          <Reveal delay={0.08}>
            <h3 className="text-3xl sm:text-[2.5rem] font-bold text-[#343735] mt-4 mb-3">
              {t.beforeAfter.heading}
            </h3>
            <p className="text-[#5c625f] text-base sm:text-[1.06rem] leading-relaxed m-0">
              {t.beforeAfter.desc}
            </p>
          </Reveal>
        </div>

        <div className="inline-flex items-center p-1 rounded-full bg-[#EAE4DA] border border-[#C9BBA7]/50 self-start">
          <button
            type="button"
            onClick={() => setMode('slider')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'slider'
                ? 'bg-[#396373] text-[#FAF8F4] shadow-sm'
                : 'text-[#343735] hover:bg-white/60'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{t.beforeAfter.sliderMode}</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('side')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'side'
                ? 'bg-[#396373] text-[#FAF8F4] shadow-sm'
                : 'text-[#343735] hover:bg-white/60'
            }`}
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>{t.beforeAfter.sideMode}</span>
          </button>
        </div>
      </div>

      {mode === 'slider' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {localizedCases.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: EASE_EDITORIAL }}
            >
              <InteractiveCompareCard
                item={item}
                dragHint={t.beforeAfter.dragHint}
                beforeLabel={t.beforeAfter.beforeLabel}
                afterLabel={t.beforeAfter.afterLabel}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {localizedCases.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF8F4] rounded-3xl border border-[#C9BBA7]/50 p-5 sm:p-6 shadow-sm"
            >
              <h4 className="text-2xl font-bold text-[#343735] mb-4">{item.title}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <figure className="m-0 rounded-2xl overflow-hidden bg-[#EAE4DA]/60 border border-[#C9BBA7]/40">
                  <img
                    src={item.beforeSrc}
                    alt={item.beforeAlt}
                    loading="lazy"
                    className="w-full h-auto block object-contain"
                  />
                  <figcaption className="px-4 py-2.5 text-sm font-bold text-[#343735] bg-[#FAF8F4] border-t border-[#EAE4DA]">
                    {t.beforeAfter.beforeLabel}
                  </figcaption>
                </figure>
                <figure className="m-0 rounded-2xl overflow-hidden bg-[#EAE4DA]/60 border border-[#C9BBA7]/40">
                  <img
                    src={item.afterSrc}
                    alt={item.afterAlt}
                    loading="lazy"
                    className="w-full h-auto block object-contain"
                  />
                  <figcaption className="px-4 py-2.5 text-sm font-bold text-[#343735] bg-[#FAF8F4] border-t border-[#EAE4DA]">
                    {t.beforeAfter.afterLabel}
                  </figcaption>
                </figure>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
