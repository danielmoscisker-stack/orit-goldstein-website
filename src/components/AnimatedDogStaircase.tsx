import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

type DogMood = 'idle' | 'blink' | 'happy' | 'paw' | 'architect';

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotate: number;
}

const DOG_COPY = {
  he: {
    petBtn: 'לטפו אותי',
    chiefBtn: 'האדריכל הראשי 📐',
    bubbles: [
      'וואף! הבית הזה מושלם! 💛',
      'אורית תכננה לי את הפינה הכי נוחה! 🐾',
      'האדריכל הראשי לשירותכם 📐✨',
    ],
  },
  en: {
    petBtn: 'Pet Me',
    chiefBtn: 'Chief Barkitect 📐',
    bubbles: [
      'Woof! Best house ever! 💛',
      'Orit designed my favorite spot! 🐾',
      'Chief Barkitect at your service 📐✨',
    ],
  },
  es: {
    petBtn: '¡Acaríciame!',
    chiefBtn: 'Arquitecto Jefe 📐',
    bubbles: [
      '¡Guau! ¡Qué casa tan increíble! 💛',
      '¡Orit diseñó mi rincón favorito! 🐾',
      'Arquitecto Jefe a tu servicio 📐✨',
    ],
  },
};

interface AnimatedDogStaircaseProps {
  alt: string;
  className?: string;
  imgClassName?: string;
  showBadge?: boolean;
  maskPreset?: 'cropped' | 'full';
}

export function AnimatedDogStaircase({
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  showBadge = true,
  maskPreset = 'cropped',
}: AnimatedDogStaircaseProps) {
  const { lang } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [mood, setMood] = useState<DogMood>('idle');
  const [hovered, setHovered] = useState(false);
  const [petCount, setPetCount] = useState(0);
  const [speech, setSpeech] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lockedUntil, setLockedUntil] = useState<number>(0);

  const copy = DOG_COPY[lang];

  // Autonomous natural living loop (blinking, happy smile, playful paw wave)
  useEffect(() => {
    if (prefersReduced) {
      setMood('idle');
      return;
    }

    if (Date.now() < lockedUntil) return;

    if (hovered) {
      setMood('paw');
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
    };

    const runCycle = () => {
      setMood('idle');
      // 1.8s: quick natural blink
      schedule(() => setMood('blink'), 1800);
      schedule(() => setMood('idle'), 2100);
      // 3.3s: joyful smile & tail wag
      schedule(() => setMood('happy'), 3300);
      // 5.2s: cute waving paw!
      schedule(() => setMood('paw'), 5200);
      // 7.4s: blink back to attentive idle
      schedule(() => setMood('blink'), 7400);
      schedule(() => setMood('idle'), 7700);
      // 9.6s: repeat
      schedule(runCycle, 9600);
    };

    runCycle();

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [prefersReduced, hovered, lockedUntil]);

  // Unlock timer after interactive pet reaction finishes
  useEffect(() => {
    if (!lockedUntil) return;
    const remaining = lockedUntil - Date.now();
    if (remaining <= 0) {
      setLockedUntil(0);
      setSpeech(null);
      return;
    }
    const id = window.setTimeout(() => {
      setLockedUntil(0);
      setSpeech(null);
    }, remaining);
    return () => window.clearTimeout(id);
  }, [lockedUntil]);

  const handlePetDog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (prefersReduced) return;

    const nextCount = petCount + 1;
    setPetCount(nextCount);

    const stage = (nextCount - 1) % 3;
    const nextMood: DogMood =
      stage === 0 ? 'paw' : stage === 1 ? 'happy' : 'architect';
    const durationMs = stage === 2 ? 4800 : 3200;

    setMood(nextMood);
    setSpeech(copy.bubbles[stage]);
    setLockedUntil(Date.now() + durationMs);

    // Spawn celebratory floating hearts / paws / architectural sparkles
    const emojis =
      stage === 2
        ? ['📐', '✨', '🐾', '💛', '✨', '🎓', '🐾']
        : ['💛', '🐾', '✨', '💛', '🐾', '✨'];
    const burst: Particle[] = emojis.map((emoji, i) => ({
      id: Date.now() + i,
      emoji,
      x: (i - (emojis.length - 1) / 2) * 26 + (Math.random() * 14 - 7),
      y: -(36 + Math.random() * 44),
      rotate: Math.random() * 40 - 20,
    }));
    setParticles(burst);
    window.setTimeout(() => setParticles([]), 1200);
  };

  // Feathered radial mask tightly covering only the dog (including raised paw & wagging tail)
  const maskGradient =
    maskPreset === 'full'
      ? 'radial-gradient(ellipse 28% 24% at 27% 68%, #000 62%, transparent 100%)'
      : 'radial-gradient(ellipse 38% 42% at 28% 76%, #000 62%, transparent 100%)';

  const dogMaskStyle: React.CSSProperties = {
    WebkitMaskImage: maskGradient,
    maskImage: maskGradient,
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Original crisp architectural photo */}
      <img
        src="./assets/gallery/18-staircase.webp"
        alt={alt}
        loading="lazy"
        className={imgClassName}
      />

      {/* Blinking frame */}
      {!prefersReduced && (
        <motion.img
          src="./assets/gallery/18-staircase-dog-blink.jpg"
          alt=""
          aria-hidden="true"
          style={dogMaskStyle}
          animate={{ opacity: mood === 'blink' ? 1 : 0 }}
          transition={{ duration: 0.14, ease: 'easeInOut' }}
          className={`absolute inset-0 pointer-events-none ${imgClassName}`}
        />
      )}

      {/* Happy smile & tail wag frame */}
      {!prefersReduced && (
        <motion.img
          src="./assets/gallery/18-staircase-dog-happy.jpg"
          alt=""
          aria-hidden="true"
          style={dogMaskStyle}
          animate={{
            opacity: mood === 'happy' ? 1 : 0,
            scale: mood === 'happy' ? [1, 1.007, 1] : 1,
          }}
          transition={{
            opacity: { duration: 0.28, ease: 'easeInOut' },
            scale: {
              duration: 1.1,
              repeat: mood === 'happy' ? Infinity : 0,
              ease: 'easeInOut',
            },
          }}
          className={`absolute inset-0 pointer-events-none ${imgClassName}`}
        />
      )}

      {/* Waving Paw Hello frame */}
      {!prefersReduced && (
        <motion.img
          src="./assets/gallery/18-staircase-dog-paw.jpg"
          alt=""
          aria-hidden="true"
          style={dogMaskStyle}
          animate={{
            opacity: mood === 'paw' ? 1 : 0,
            y: mood === 'paw' ? [0, -2, 0] : 0,
          }}
          transition={{
            opacity: { duration: 0.26, ease: 'easeInOut' },
            y: {
              duration: 0.75,
              repeat: mood === 'paw' ? Infinity : 0,
              ease: 'easeInOut',
            },
          }}
          className={`absolute inset-0 pointer-events-none ${imgClassName}`}
        />
      )}

      {/* Secret Chief Architect Glasses frame */}
      {!prefersReduced && (
        <motion.img
          src="./assets/gallery/18-staircase-dog-architect.jpg"
          alt=""
          aria-hidden="true"
          style={dogMaskStyle}
          animate={{
            opacity: mood === 'architect' ? 1 : 0,
            scale: mood === 'architect' ? [1, 1.01, 1] : 1,
          }}
          transition={{
            opacity: { duration: 0.3, ease: 'easeInOut' },
            scale: { duration: 1.6, repeat: mood === 'architect' ? Infinity : 0 },
          }}
          className={`absolute inset-0 pointer-events-none ${imgClassName}`}
        />
      )}

      {/* Floating Heart / Paw / Sparkle Burst */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[56%] left-[25%] z-20"
      >
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 1, 0], x: p.x, y: p.y, scale: 1.15, rotate: p.rotate }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="absolute text-base sm:text-lg drop-shadow"
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Cute Localized Speech Bubble on Pet */}
      <AnimatePresence>
        {!prefersReduced && speech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 360, damping: 24 }}
            className="pointer-events-none absolute top-[38%] sm:top-[42%] left-3 sm:left-5 z-20 max-w-[210px] bg-[#FAF8F4]/95 backdrop-blur-md text-[#343735] text-xs font-bold px-3.5 py-2 rounded-2xl shadow-xl border border-[#C9BBA7]"
          >
            {speech}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive "Pet Me 🐾" Pill Button */}
      {!prefersReduced && showBadge && (
        <motion.button
          type="button"
          onClick={handlePetDog}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          aria-label={copy.petBtn}
          className="absolute top-3 left-3 z-30 inline-flex items-center gap-1.5 bg-[#FAF8F4]/92 hover:bg-white backdrop-blur-md text-[#1d3c47] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-[0_8px_24px_rgba(18,41,49,0.28)] border border-[#C9BBA7]/75 cursor-pointer transition-colors"
        >
          <span>🐾</span>
          <span>{mood === 'architect' ? copy.chiefBtn : copy.petBtn}</span>
        </motion.button>
      )}
    </div>
  );
}
