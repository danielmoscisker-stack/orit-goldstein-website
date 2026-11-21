import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import { OritBrandLogo } from './OritBrandLogo';

export const EASE_EDITORIAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
      className="hidden lg:block pointer-events-none fixed top-0 left-0 w-[440px] h-[440px] rounded-full bg-[radial-gradient(circle,rgba(201,187,167,0.16)_0%,rgba(57,99,115,0.06)_42%,transparent_72%)] z-30 transition-transform duration-150 ease-out will-change-transform"
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
    const x = (e.clientX - rect.left - rect.width / 2) * 0.14;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
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
