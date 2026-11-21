import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import { OritBrandLogo } from './OritBrandLogo';

export const EASE_EDITORIAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* =========================================================
   Custom Interactive Magnetic Cursor Pill (Awwwards style)
   ========================================================= */
interface CursorContextType {
  setCursorLabel: (label: string | null) => void;
}
const CursorContext = createContext<CursorContextType>({ setCursorLabel: () => {} });
export const useCursorLabel = () => useContext(CursorContext);

export function CustomCursorProvider({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const [label, setLabel] = useState<string | null>(null);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const smoothX = useSpring(mouseX, { stiffness: 320, damping: 28, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 320, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (disabled || prefersReduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [disabled, prefersReduced, mouseX, mouseY]);

  return (
    <CursorContext.Provider value={{ setCursorLabel: setLabel }}>
      {children}
      {!disabled && !prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{ x: smoothX, y: smoothY }}
          className="hidden lg:block fixed top-0 left-0 z-[95] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        >
          <AnimatePresence>
            {label && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2, ease: EASE_EDITORIAL }}
                className="px-4 py-2 rounded-full bg-[#1d3c47]/92 backdrop-blur-md text-[#FAF8F4] text-xs font-bold tracking-wider shadow-[0_12px_30px_rgba(18,41,49,0.35)] border border-[#C9BBA7]/50 whitespace-nowrap"
              >
                {label}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </CursorContext.Provider>
  );
}

/* =========================================================
   3D Perspective Tilt Card with Live Sunlight Specular Glare
   ========================================================= */
export function TiltCard3D({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), {
    stiffness: 220,
    damping: 22,
  });
  const glareX = useTransform(x, [0, 1], ['0%', '100%']);
  const glareY = useTransform(y, [0, 1], ['0%', '100%']);

  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    setHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        prefersReduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1100,
              transformStyle: 'preserve-3d',
            }
      }
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.22), transparent 58%)`,
            opacity: hovered ? 1 : 0,
          }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-20"
        />
      )}
    </motion.div>
  );
}

/* =========================================================
   Animated Architectural Counter (counts smoothly into view)
   ========================================================= */
export function CountUpNumber({
  target,
  suffix = '',
  duration = 1.4,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (!inView || prefersReduced) {
      if (prefersReduced) setValue(target);
      return;
    }
    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min(1, (ts - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, prefersReduced]);

  return (
    <span ref={ref} dir="ltr" className="inline-block tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

/* =========================================================
   Architectural Curtain Image Wipe Reveal
   ========================================================= */
export function CurtainReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 1 }
          : { clipPath: 'inset(12% 0% 0% 0% round 24px)', opacity: 0, scale: 1.04 }
      }
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)', opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.95, delay, ease: EASE_EDITORIAL }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '100% 50%' }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-l from-[#396373] via-[#C9BBA7] to-[#396373] z-50 pointer-events-none"
    />
  );
}

export function ArchitecturalPreloader() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(!prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(false), 1150);
    return () => clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.78, ease: EASE_EDITORIAL } }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-[#122931] via-[#1d3c47] to-[#396373] flex flex-col items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <div className="arch-grid-dark absolute inset-0 opacity-50" />
          <motion.div
            exit={{ opacity: 0, y: -24, transition: { duration: 0.35 } }}
            className="relative flex flex-col items-center gap-6 px-6"
          >
            <OritBrandLogo variant="light" size="lg" animated />
            <div className="w-48 h-[1.5px] bg-white/15 overflow-hidden relative rounded-full">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: '-100%' }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-l from-transparent via-[#C9BBA7] to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AmbientCursorGlow() {
  const prefersReduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    if (prefersReduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        setPos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        transform: `translate3d(${pos.x - 220}px, ${pos.y - 220}px, 0)`,
      }}
      className="hidden lg:block pointer-events-none fixed top-0 left-0 w-[440px] h-[440px] rounded-full bg-[radial-gradient(circle,rgba(201,187,167,0.18)_0%,rgba(57,99,115,0.07)_42%,transparent_72%)] z-30 transition-transform duration-150 ease-out will-change-transform"
    />
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
      className={`inline-flex items-center gap-3 text-xs sm:text-[0.84rem] font-bold tracking-[0.14em] ${
        light ? 'text-[#C9BBA7]' : 'text-[#396373]'
      }`}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE_EDITORIAL, delay: 0.1 }}
        style={{ transformOrigin: 'right' }}
        className={`block w-9 h-[1.5px] ${
          light ? 'bg-[#C9BBA7]/75' : 'bg-[#C9BBA7]'
        }`}
      />
      <span>{children}</span>
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: EASE_EDITORIAL }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MagneticLink({
  href,
  children,
  className = '',
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    setPos({ x, y });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.4 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
