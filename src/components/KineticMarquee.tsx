import { useReducedMotion } from 'framer-motion';

const HEBREW_TOKENS = [
  'תכנון אדריכלי',
  'עיצוב פנים',
  'חומרים טבעיים',
  'נגרות בהתאמה אישית',
  'אור ומרחב',
  'ראייה הנדסית',
  'ליווי אישי מלא',
];

const ENGLISH_TOKENS = [
  'Orit Goldstein',
  'Architecture & Interior Design',
  'Timeless Spatial Flow',
  'Smoked Petrol & Natural Sand',
  'Bespoke Living Spaces',
];

export function KineticMarquee() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden bg-[#122931] border-y border-white/10 py-4 select-none"
    >
      {/* Row 1: Hebrew Architectural Ribbon */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div
          className={`flex items-center gap-8 text-[#FAF8F4]/90 text-sm sm:text-base font-semibold tracking-[0.06em] ${
            prefersReduced ? '' : 'animate-marquee-rtl'
          }`}
        >
          {[...HEBREW_TOKENS, ...HEBREW_TOKENS, ...HEBREW_TOKENS].map((token, idx) => (
            <span key={idx} className="inline-flex items-center gap-8">
              <span>{token}</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C9BBA7] inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: Subtle Reverse-Direction English Editorial Ribbon */}
      <div className="flex whitespace-nowrap overflow-hidden mt-2 opacity-60" dir="ltr">
        <div
          className={`flex items-center gap-10 text-[#C9BBA7] text-xs sm:text-sm tracking-[0.18em] uppercase ${
            prefersReduced ? '' : 'animate-marquee-ltr'
          }`}
        >
          {[...ENGLISH_TOKENS, ...ENGLISH_TOKENS, ...ENGLISH_TOKENS].map((token, idx) => (
            <span key={idx} className="inline-flex items-center gap-10">
              <span className={token === 'Orit Goldstein' ? 'font-script normal-case text-xl tracking-normal text-[#FAF8F4]' : ''}>
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
