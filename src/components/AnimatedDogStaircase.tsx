import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type DogMood = 'idle' | 'blink' | 'happy';

interface AnimatedDogStaircaseProps {
  alt: string;
  className?: string;
  imgClassName?: string;
  showBadge?: boolean;
  maskPreset?: 'cropped' | 'full';
}

/**
 * Seamlessly animates the golden retriever sitting under the staircase in 18-staircase.webp.
 * Uses a feathered radial mask strictly around the dog region so the architecture,
 * staircase, lighting, and studio watermark remain 100% razor-sharp from the original photo.
 */
export function AnimatedDogStaircase({
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  showBadge = true,
  maskPreset = 'cropped',
}: AnimatedDogStaircaseProps) {
  const prefersReduced = useReducedMotion();
  const [mood, setMood] = useState<DogMood>('idle');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setMood('idle');
      return;
    }

    if (hovered) {
      setMood('happy');
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
      // 0s: attentive idle
      setMood('idle');
      // 2.2s: quick natural blink
      schedule(() => setMood('blink'), 2200);
      schedule(() => setMood('idle'), 2520);
      // 3.9s: happy smile, head tilt & tail wag
      schedule(() => setMood('happy'), 3900);
      // 6.4s: quick blink transition back to idle
      schedule(() => setMood('blink'), 6400);
      schedule(() => setMood('idle'), 6700);
      // 8.6s: repeat loop
      schedule(runCycle, 8600);
    };

    runCycle();

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [prefersReduced, hovered]);

  // Feathered radial mask tightly covering only the dog (head, torso, and wagging tail)
  const maskGradient =
    maskPreset === 'full'
      ? 'radial-gradient(ellipse 24% 22% at 28% 69%, #000 62%, transparent 100%)'
      : 'radial-gradient(ellipse 32% 38% at 29% 78%, #000 62%, transparent 100%)';

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

      {/* Blinking overlay (masked strictly to the dog) */}
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

      {/* Happy smile, head tilt & tail wag overlay (masked strictly to the dog) */}
      {!prefersReduced && (
        <motion.img
          src="./assets/gallery/18-staircase-dog-happy.jpg"
          alt=""
          aria-hidden="true"
          style={dogMaskStyle}
          animate={{
            opacity: mood === 'happy' ? 1 : 0,
            scale: mood === 'happy' ? [1, 1.006, 1] : 1,
          }}
          transition={{
            opacity: { duration: 0.32, ease: 'easeInOut' },
            scale: { duration: 1.3, repeat: mood === 'happy' ? Infinity : 0, ease: 'easeInOut' },
          }}
          className={`absolute inset-0 pointer-events-none ${imgClassName}`}
        />
      )}

      {/* Subtle playful floating heart/sparkle when the dog is happy */}
      <AnimatePresence>
        {!prefersReduced && hovered && showBadge && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.6 }}
            animate={{ opacity: 1, y: -6, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.7 }}
            transition={{ duration: 0.45 }}
            aria-hidden="true"
            className="pointer-events-none absolute top-[52%] left-[24%] bg-[#FAF8F4]/92 backdrop-blur-sm text-[#396373] text-xs font-bold px-2.5 py-1 rounded-full shadow-md border border-[#C9BBA7]/60"
          >
            🐾
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
