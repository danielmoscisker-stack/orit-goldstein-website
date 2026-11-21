import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

type DogMood = 'idle' | 'blink' | 'happy' | 'paw' | 'architect' | 'walking';

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
    walkBtn: 'טייל!',
    walkingNow: 'מטייל בבית...',
    chiefBtn: 'האדריכל הראשי 📐',
    bubbles: [
      'וואף! הבית הזה מושלם! 💛',
      'אורית תכננה לי את הפינה הכי נוחה! 🐾',
      'האדריכל הראשי לשירותכם 📐✨',
    ],
    walkBubble: 'איזה מרחב כיפי לטיול! 🐕✨',
  },
  en: {
    petBtn: 'Pet Me',
    walkBtn: 'Walk!',
    walkingNow: 'Exploring...',
    chiefBtn: 'Chief Barkitect 📐',
    bubbles: [
      'Woof! Best house ever! 💛',
      'Orit designed my favorite spot! 🐾',
      'Chief Barkitect at your service 📐✨',
    ],
    walkBubble: 'So much room to explore! 🐕✨',
  },
  es: {
    petBtn: '¡Acaríciame!',
    walkBtn: '¡Pasear!',
    walkingNow: 'Paseando...',
    chiefBtn: 'Arquitecto Jefe 📐',
    bubbles: [
      '¡Guau! ¡Qué casa tan increíble! 💛',
      '¡Orit diseñó mi rincón favorito! 🐾',
      'Arquitecto Jefe a tu servicio 📐✨',
    ],
    walkBubble: '¡Qué espacio tan genial para pasear! 🐕✨',
  },
};

interface AnimatedDogStaircaseProps {
  alt: string;
  className?: string;
  imgClassName?: string;
  showBadge?: boolean;
  maskPreset?: 'cropped' | 'full';
  petOnImageClick?: boolean;
}

export function AnimatedDogStaircase({
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  showBadge = true,
  maskPreset = 'cropped',
  petOnImageClick = false,
}: AnimatedDogStaircaseProps) {
  const { lang } = useLanguage();
  const prefersReduced = useReducedMotion();
  const [mood, setMood] = useState<DogMood>('idle');
  const [hovered, setHovered] = useState(false);
  const [petCount, setPetCount] = useState(0);
  const [speech, setSpeech] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lockedUntil, setLockedUntil] = useState<number>(0);

  // Walking state
  const [walkFrame, setWalkFrame] = useState<0 | 1>(0);
  const [walkPos, setWalkPos] = useState<{ left: string; facing: 1 | -1 }>({
    left: '16%',
    facing: 1,
  });

  const copy = DOG_COPY[lang];
  const isWalking = mood === 'walking';

  // Alternate walking stride frames cleanly while trotting
  useEffect(() => {
    if (!isWalking || prefersReduced) return;
    const interval = window.setInterval(() => {
      setWalkFrame((f) => (f === 0 ? 1 : 0));
    }, 220);
    return () => window.clearInterval(interval);
  }, [isWalking, prefersReduced]);

  // Choreographed walking path across the wood floor under the stairs
  const triggerWalk = (durationMs = 6600, showBubble = true) => {
    if (prefersReduced) return;
    setMood('walking');
    if (showBubble) setSpeech(copy.walkBubble);
    setLockedUntil(Date.now() + durationMs);

    // Step 1: trot right along the wood floor under the stairs
    setWalkPos({ left: '16%', facing: 1 });
    const t1 = window.setTimeout(() => setWalkPos({ left: '34%', facing: 1 }), 120);
    // Step 2: turn left and trot all the way to the left wall
    const t2 = window.setTimeout(() => setWalkPos({ left: '4%', facing: -1 }), 2100);
    // Step 3: turn right and trot back to his favorite spot under the stairs
    const t3 = window.setTimeout(() => setWalkPos({ left: '17%', facing: 1 }), 4500);
    // Step 4: sit back down with a cute paw wave!
    const t4 = window.setTimeout(() => {
      setMood('paw');
      setSpeech(null);
    }, durationMs - 400);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  };

  // Autonomous natural living loop (blink, smile, wave, AND periodic stroll under the stairs!)
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
      // 1.6s: quick natural blink
      schedule(() => setMood('blink'), 1600);
      schedule(() => setMood('idle'), 1900);
      // 3.0s: joyful smile & tail wag
      schedule(() => setMood('happy'), 3000);
      // 4.8s: cute waving paw
      schedule(() => setMood('paw'), 4800);
      // 6.8s: stand up and take a cute walk around the floor under the stairs!
      schedule(() => {
        setMood('walking');
        setWalkPos({ left: '16%', facing: 1 });
      }, 6800);
      schedule(() => setWalkPos({ left: '33%', facing: 1 }), 6950);
      schedule(() => setWalkPos({ left: '4%', facing: -1 }), 9000);
      schedule(() => setWalkPos({ left: '17%', facing: 1 }), 11400);
      // 13.3s: sit back down happily
      schedule(() => setMood('happy'), 13300);
      schedule(() => setMood('idle'), 15000);
      schedule(runCycle, 16500);
    };

    runCycle();

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [prefersReduced, hovered, lockedUntil]);

  // Unlock timer after interactive pet/walk reaction finishes
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

    const stage = (nextCount - 1) % 4;
    if (stage === 3) {
      triggerWalk(6600, true);
      return;
    }

    const nextMood: DogMood =
      stage === 0 ? 'paw' : stage === 1 ? 'happy' : 'architect';
    const durationMs = stage === 2 ? 4800 : 3200;

    setMood(nextMood);
    setSpeech(copy.bubbles[stage]);
    setLockedUntil(Date.now() + durationMs);

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

  const handleWalkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (prefersReduced || isWalking) return;
    triggerWalk(6600, true);
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
      onClick={petOnImageClick ? handlePetDog : undefined}
      className={`relative overflow-hidden ${petOnImageClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Original crisp architectural photo */}
      <img
        src="./assets/gallery/18-staircase.webp"
        alt={alt}
        loading="lazy"
        className={imgClassName}
      />

      {/* Clean Plate (Empty Floor Under Stairs) — seamlessly hides sitting dog while walking */}
      {!prefersReduced && (
        <motion.img
          src="./assets/gallery/18-staircase-empty.jpg"
          alt=""
          aria-hidden="true"
          style={dogMaskStyle}
          animate={{ opacity: isWalking ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className={`absolute inset-0 pointer-events-none ${imgClassName}`}
        />
      )}

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

      {/* LIVE WALKING GOLDEN RETRIEVER SPRITE ON THE FLOOR UNDER THE STAIRS */}
      <AnimatePresence>
        {!prefersReduced && isWalking && (
          <motion.div
            initial={{ opacity: 0, left: '16%' }}
            animate={{
              opacity: 1,
              left: walkPos.left,
              y: [0, -4, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              left: { duration: 2.0, ease: 'easeInOut' },
              opacity: { duration: 0.28 },
              y: { duration: 0.44, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{
              bottom: maskPreset === 'full' ? '18%' : '4%',
            }}
            aria-hidden="true"
            className="pointer-events-none absolute z-15 w-[34%] sm:w-[32%]"
          >
            {/* Realistic soft floor contact shadow */}
            <div className="absolute -bottom-1 left-[12%] right-[12%] h-3 rounded-full bg-black/35 blur-[5px]" />

            <motion.img
              src={
                walkFrame === 0
                  ? './assets/gallery/dog-walk-1.png'
                  : './assets/gallery/dog-walk-2.png'
              }
              alt=""
              animate={{ scaleX: walkPos.facing }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-auto block drop-shadow-[0_6px_12px_rgba(0,0,0,0.28)] brightness-[0.95] contrast-[0.98]"
            />
          </motion.div>
        )}
      </AnimatePresence>

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
              animate={{
                opacity: [0, 1, 1, 0],
                x: p.x,
                y: p.y,
                scale: 1.15,
                rotate: p.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="absolute text-base sm:text-lg drop-shadow"
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Cute Localized Speech Bubble */}
      <AnimatePresence>
        {!prefersReduced && speech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 360, damping: 24 }}
            className="pointer-events-none absolute top-[38%] sm:top-[42%] left-3 sm:left-5 z-20 max-w-[220px] bg-[#FAF8F4]/95 backdrop-blur-md text-[#343735] text-xs font-bold px-3.5 py-2 rounded-2xl shadow-xl border border-[#C9BBA7]"
          >
            {speech}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Direct Clickable Hotspot Right Over the Dog (inside gallery tiles & lightbox) */}
      {!prefersReduced && !petOnImageClick && (
        <div
          role="button"
          tabIndex={0}
          onClick={handlePetDog}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ')
              handlePetDog(e as unknown as React.MouseEvent);
          }}
          aria-label={copy.petBtn}
          title={copy.petBtn}
          className="absolute left-[12%] top-[52%] w-[34%] h-[42%] z-25 cursor-pointer rounded-full"
        />
      )}

      {/* Interactive Action Pills: "Pet Me 🐾" + "Walk! 🐕" */}
      {!prefersReduced && showBadge && (
        <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5">
          <motion.div
            role="button"
            tabIndex={0}
            onClick={handlePetDog}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ')
                handlePetDog(e as unknown as React.MouseEvent);
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label={copy.petBtn}
            className="inline-flex items-center gap-1.5 bg-[#FAF8F4]/95 hover:bg-white backdrop-blur-md text-[#1d3c47] text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_8px_24px_rgba(18,41,49,0.28)] border border-[#C9BBA7]/75 cursor-pointer transition-colors select-none"
          >
            <span>🐾</span>
            <span>{mood === 'architect' ? copy.chiefBtn : copy.petBtn}</span>
          </motion.div>

          <motion.div
            role="button"
            tabIndex={0}
            onClick={handleWalkClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ')
                handleWalkClick(e as unknown as React.MouseEvent);
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label={copy.walkBtn}
            className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_8px_24px_rgba(18,41,49,0.28)] border cursor-pointer transition-colors select-none ${
              isWalking
                ? 'bg-[#396373] text-[#FAF8F4] border-[#C9BBA7]'
                : 'bg-[#1d3c47]/90 hover:bg-[#396373] text-[#FAF8F4] border-white/20'
            }`}
          >
            <span>🐕</span>
            <span>{isWalking ? copy.walkingNow : copy.walkBtn}</span>
          </motion.div>
        </div>
      )}
    </div>
  );
}
