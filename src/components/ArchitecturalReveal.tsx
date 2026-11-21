import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';

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
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-l from-[#d8c3a5] via-[#245d66] to-[#c9b8a4] z-50 pointer-events-none"
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
    const timer = setTimeout(() => setVisible(false), 850);
    return () => clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.72, ease: EASE_EDITORIAL } }}
          className="fixed inset-0 z-[100] bg-[#14353c] flex flex-col items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <div className="arch-grid-dark absolute inset-0 opacity-60" />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
            className="relative flex flex-col items-center gap-5 px-6"
          >
            <img
              src="./assets/site/logo-white.png"
              alt="אורית גולדשטיין"
              className="w-52 sm:w-64 h-auto object-contain"
            />
            <div className="w-44 h-[1px] bg-white/20 overflow-hidden relative">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: '-100%' }}
                transition={{ duration: 0.75, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-l from-transparent via-[#d8c3a5] to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
      className={`inline-flex items-center gap-3 text-xs sm:text-[0.82rem] font-bold tracking-[0.14em] ${
        light ? 'text-[#d8c3a5]' : 'text-[#245d66]'
      }`}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE_EDITORIAL, delay: 0.1 }}
        style={{ transformOrigin: 'right' }}
        className={`block w-9 h-[1.5px] ${
          light ? 'bg-[#d8c3a5]/70' : 'bg-[#c9b8a4]'
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
