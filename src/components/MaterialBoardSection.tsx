import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow, Reveal, EASE_EDITORIAL } from './ArchitecturalReveal';
import { useLanguage } from '../i18n/LanguageContext';

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  architecture: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
      <path d="M8 22L24 9L40 22V39H8V22Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 39V27H29V39" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 9V21" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2 3" />
    </svg>
  ),
  styling: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
      <path d="M12 22V15C12 12.8 13.8 11 16 11H32C34.2 11 36 12.8 36 15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 24C8 22.3 9.3 21 11 21H13V28H35V21H37C38.7 21 40 22.3 40 24V33H8V24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 33V38M36 33V38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  supervision: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
      <path d="M24 10L40 18L24 26L8 18L24 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 25L24 33L40 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 32L24 40L40 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  materials: (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
      <path d="M14 37V11H22V37C22 39.2 20.2 41 18 41C15.8 41 14 39.2 14 37Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M22 16L31 12L35 19L22 28" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M22 28L37 25L39 33L21 39" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="18" cy="36" r="1.5" fill="currentColor" />
    </svg>
  ),
};

export function MaterialBoardSection() {
  const { t, lang } = useLanguage();
  const [activeId, setActiveId] = useState(t.materialBoard.swatches[0].id);

  useEffect(() => {
    setActiveId(t.materialBoard.swatches[0].id);
  }, [lang, t.materialBoard.swatches]);

  const activeSwatch =
    t.materialBoard.swatches.find((s) => s.id === activeId) ?? t.materialBoard.swatches[0];

  return (
    <section
      id="studio-board"
      className="py-20 sm:py-28 bg-[#EAE4DA]/55 arch-grid-light relative overflow-hidden border-y border-[#C9BBA7]/35"
    >
      <div className="max-w-[1260px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {t.materialBoard.pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: idx * 0.08, ease: EASE_EDITORIAL }}
              whileHover={{ y: -6 }}
              className="group bg-[#FAF8F4] rounded-2xl p-6 sm:p-7 border border-[#C9BBA7]/40 hover:border-[#396373]/45 shadow-[0_8px_30px_rgba(29,60,71,0.05)] hover:shadow-[0_18px_45px_rgba(57,99,115,0.12)] transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#EAE4DA]/65 group-hover:bg-[#396373] text-[#396373] group-hover:text-[#FAF8F4] flex items-center justify-center mb-4 transition-colors duration-300">
                {PILLAR_ICONS[pillar.id]}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#343735] mb-1.5">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#626764] leading-relaxed m-0">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <Eyebrow>{t.materialBoard.eyebrow}</Eyebrow>
            <Reveal delay={0.08}>
              <h2 className="text-[2.2rem] sm:text-[3.1rem] font-bold leading-[1.12] text-[#343735] mt-4 mb-4">
                {t.materialBoard.headingLine1}
                <br />
                <span className="text-[#396373]">{t.materialBoard.headingLine2}</span>
              </h2>
              <p className="text-[#5c625f] text-base sm:text-[1.08rem] leading-[1.82] mb-7">
                {t.materialBoard.desc}
              </p>
            </Reveal>

            <motion.div
              key={`${lang}-${activeSwatch.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FAF8F4] rounded-2xl p-5 border border-[#C9BBA7]/50 shadow-sm flex items-center gap-4"
            >
              <div
                className={`w-14 h-14 rounded-xl shrink-0 border border-black/10 shadow-inner ${activeSwatch.textureClass}`}
              />
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <strong className="text-[#343735] text-base font-bold">
                    {activeSwatch.name}
                  </strong>
                  <span
                    dir="ltr"
                    className="text-xs font-mono text-[#396373] bg-[#EAE4DA] px-2 py-0.5 rounded-md"
                  >
                    {activeSwatch.hex}
                  </span>
                </div>
                <p className="text-sm text-[#626764] m-0 mt-1">{activeSwatch.note}</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-5 gap-3 sm:gap-4 items-end">
              {t.materialBoard.swatches.map((swatch, idx) => {
                const isSelected = activeSwatch.id === swatch.id;
                const heights = [
                  'h-[190px] sm:h-[240px]',
                  'h-[220px] sm:h-[280px]',
                  'h-[200px] sm:h-[255px]',
                  'h-[185px] sm:h-[230px]',
                  'h-[175px] sm:h-[215px]',
                ];
                return (
                  <motion.button
                    key={swatch.id}
                    type="button"
                    onClick={() => setActiveId(swatch.id)}
                    onMouseEnter={() => setActiveId(swatch.id)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.65,
                      delay: idx * 0.07,
                      ease: EASE_EDITORIAL,
                    }}
                    whileHover={{ y: -10, scale: 1.03 }}
                    aria-label={`${swatch.name} (${swatch.hex})`}
                    className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border text-start flex flex-col justify-end p-3 shadow-[0_14px_34px_rgba(29,60,71,0.14)] ${
                      heights[idx]
                    } ${swatch.textureClass} ${
                      isSelected
                        ? 'ring-3 ring-[#396373] ring-offset-2 ring-offset-[#EAE4DA] border-white/60'
                        : 'border-black/10 opacity-90 hover:opacity-100'
                    }`}
                  >
                    <div className="bg-black/25 backdrop-blur-[2px] -mx-3 -mb-3 px-2.5 py-2 text-white">
                      <span className="block text-[10px] sm:text-xs font-bold truncate">
                        {swatch.name}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
