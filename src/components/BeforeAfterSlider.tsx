import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal, Columns2, SlidersHorizontal } from 'lucide-react';
import { BEFORE_AFTER_CASES, BeforeAfterCase } from '../data/siteData';
import { Eyebrow, Reveal, EASE_EDITORIAL } from './ArchitecturalReveal';

function InteractiveCompareCard({ item }: { item: BeforeAfterCase }) {
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
    <div className="bg-[#fbf9f5] rounded-2xl border border-[#245d66]/14 p-4 sm:p-6 shadow-[0_14px_40px_rgba(24,63,71,0.07)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h4 className="font-editorial text-2xl text-[#183f47] m-0">{item.title}</h4>
        <span className="text-xs font-semibold text-[#6e9293]">
          גררו את הסמן ימינה ושמאלה להשוואה
        </span>
      </div>
      <p className="text-sm text-[#5d6562] mb-5">{item.subtitle}</p>

      <div
        ref={containerRef}
        dir="ltr"
        role="slider"
        tabIndex={0}
        aria-label={`השוואת לפני ואחרי – ${item.title}`}
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
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden select-none cursor-ew-resize bg-[#e6ddd1] touch-none"
      >
        {/* AFTER image (full base) */}
        <img
          src={item.afterSrc}
          alt={item.afterAlt}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* BEFORE image (clipped on the left up to position%) */}
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

        {/* Labels */}
        <span className="absolute top-3.5 left-3.5 bg-[#183f47]/85 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full pointer-events-none">
          לפני
        </span>
        <span className="absolute top-3.5 right-3.5 bg-[#f5f1e9]/92 backdrop-blur-md text-[#183f47] text-xs font-bold px-3.5 py-1.5 rounded-full pointer-events-none shadow-sm">
          אחרי
        </span>

        {/* Divider line + Handle */}
        <div
          style={{ left: `${position}%` }}
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_16px_rgba(0,0,0,0.45)] -translate-x-1/2 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#183f47] shadow-[0_6px_24px_rgba(16,44,50,0.35)] border-2 border-[#245d66]/20 flex items-center justify-center">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const [mode, setMode] = useState<'slider' | 'side'>('slider');

  return (
    <div className="mt-20 pt-16 border-t border-[#245d66]/15">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-[620px]">
          <Eyebrow>לפני ואחרי</Eyebrow>
          <Reveal delay={0.08}>
            <h3 className="font-editorial text-3xl sm:text-[2.5rem] font-normal text-[#183f47] mt-4 mb-3">
              אותו בית, שינוי שמרגישים.
            </h3>
            <p className="text-[#58635f] text-base sm:text-[1.06rem] leading-relaxed m-0">
              מבט על חלל המגורים ועל המטבח לפני השיפוץ ולאחר התכנון והעיצוב. ניתן
              להשוות בגרירה אינטראקטיבית או לצפות בתמונות המלאות זו לצד זו, ללא חיתוך.
            </p>
          </Reveal>
        </div>

        {/* Mode Switcher */}
        <div className="inline-flex items-center p-1 rounded-full bg-[#e6ddd1]/70 border border-[#245d66]/12 self-start">
          <button
            type="button"
            onClick={() => setMode('slider')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              mode === 'slider'
                ? 'bg-[#245d66] text-white shadow-sm'
                : 'text-[#183f47] hover:bg-white/60'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>סליידר השוואה</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('side')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              mode === 'side'
                ? 'bg-[#245d66] text-white shadow-sm'
                : 'text-[#183f47] hover:bg-white/60'
            }`}
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>תצוגה מלאה ללא חיתוך</span>
          </button>
        </div>
      </div>

      {mode === 'slider' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {BEFORE_AFTER_CASES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: EASE_EDITORIAL }}
            >
              <InteractiveCompareCard item={item} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {BEFORE_AFTER_CASES.map((item) => (
            <div
              key={item.id}
              className="bg-[#fbf9f5] rounded-2xl border border-[#245d66]/14 p-5 sm:p-6 shadow-sm"
            >
              <h4 className="font-editorial text-2xl text-[#183f47] mb-4">{item.title}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <figure className="m-0 rounded-xl overflow-hidden bg-[#f1ede6] border border-[#245d66]/12">
                  <img
                    src={item.beforeSrc}
                    alt={item.beforeAlt}
                    loading="lazy"
                    className="w-full h-auto block object-contain"
                  />
                  <figcaption className="px-4 py-2.5 text-sm font-bold text-[#183f47] bg-[#f8f5ef] border-t border-[#245d66]/10">
                    לפני
                  </figcaption>
                </figure>
                <figure className="m-0 rounded-xl overflow-hidden bg-[#f1ede6] border border-[#245d66]/12">
                  <img
                    src={item.afterSrc}
                    alt={item.afterAlt}
                    loading="lazy"
                    className="w-full h-auto block object-contain"
                  />
                  <figcaption className="px-4 py-2.5 text-sm font-bold text-[#183f47] bg-[#f8f5ef] border-t border-[#245d66]/10">
                    אחרי
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
