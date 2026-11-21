import { useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const SECONDARY_TOKENS = [
  'Orit Goldstein',
  'Architecture & Interior Design',
  'Timeless Spatial Flow',
  'Smoked Petrol & Natural Sand',
  'Bespoke Living Spaces',
];

export function KineticMarquee() {
  const { t, isRtl } = useLanguage();
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden bg-[#122931] border-y border-white/10 py-4 select-none"
    >
      <div className="flex whitespace-nowrap overflow-hidden">
        <div
          className={`flex items-center gap-8 text-[#FAF8F4]/90 text-sm sm:text-base font-semibold tracking-[0.06em] ${
            prefersReduced
              ? ''
              : isRtl
              ? 'animate-marquee-rtl'
              : 'animate-marquee-ltr'
          }`}
        >
          {[...t.marquee, ...t.marquee, ...t.marquee].map((token, idx) => (
            <span key={idx} className="inline-flex items-center gap-8">
              <span>{token}</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C9BBA7] inline-block" />
            </span>
          ))}
        </div>
      </div>

      <div className="flex whitespace-nowrap overflow-hidden mt-2 opacity-60" dir="ltr">
        <div
          className={`flex items-center gap-10 text-[#C9BBA7] text-xs sm:text-sm tracking-[0.18em] uppercase ${
            prefersReduced ? '' : 'animate-marquee-ltr'
          }`}
        >
          {[...SECONDARY_TOKENS, ...SECONDARY_TOKENS, ...SECONDARY_TOKENS].map((token, idx) => (
            <span key={idx} className="inline-flex items-center gap-10">
              <span
                className={
                  token === 'Orit Goldstein'
                    ? 'font-script normal-case text-xl tracking-normal text-[#FAF8F4]'
                    : ''
                }
              >
                {token}
              </span>
              <span className="w-6 h-[1px] bg-[#C9BBA7]/50 inline-block" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
