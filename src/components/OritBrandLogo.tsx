import { motion } from 'framer-motion';

interface OritBrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showSubtitle?: boolean;
}

export function OritBrandLogo({
  variant = 'dark',
  size = 'md',
  animated = false,
  showSubtitle = true,
}: OritBrandLogoProps) {
  const strokeColor = variant === 'light' ? '#FAF8F4' : '#1d3c47';
  const textColor = variant === 'light' ? '#FAF8F4' : '#1d3c47';
  const subColor = variant === 'light' ? 'rgba(250,248,244,0.82)' : '#343735';
  const ruleColor = variant === 'light' ? 'rgba(201,187,167,0.65)' : '#396373';

  const dimensions = {
    sm: { iconW: 66, iconH: 40, script: 'text-[1.45rem]', sub: 'text-[0.62rem]' },
    md: { iconW: 92, iconH: 56, script: 'text-[2.1rem]', sub: 'text-[0.72rem]' },
    lg: { iconW: 150, iconH: 92, script: 'text-[3.4rem] sm:text-[4.2rem]', sub: 'text-sm sm:text-base' },
  }[size];

  const drawTransition = { duration: 1.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return (
    <div className="inline-flex flex-col items-center select-none" dir="ltr">
      {/* Iconic Architectural House Roofline + Vertical Slats */}
      <svg
        width={dimensions.iconW}
        height={dimensions.iconH}
        viewBox="0 0 180 110"
        fill="none"
        aria-hidden="true"
        className="overflow-visible"
      >
        {/* Slatted warm sand / stone / petrol fill panels on right roof slope */}
        <motion.polygon
          points="92,14 114,32 114,96 92,96"
          fill="#C9BBA7"
          fillOpacity={variant === 'light' ? 0.85 : 0.72}
          initial={animated ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        />
        <motion.polygon
          points="114,32 136,50 136,96 114,96"
          fill="#EAE4DA"
          fillOpacity={variant === 'light' ? 0.75 : 0.9}
          initial={animated ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        />
        <motion.polygon
          points="136,50 156,66 156,96 136,96"
          fill={variant === 'light' ? '#5c8a9b' : '#C9BBA7'}
          fillOpacity={variant === 'light' ? 0.75 : 0.55}
          initial={animated ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        />

        {/* Main architectural pitched house outline */}
        <motion.path
          d="M24 96 L24 64 L92 12 L156 64 L156 96"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animated ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
        />

        {/* Tall left architectural axis / chimney line */}
        <motion.line
          x1="48"
          y1="18"
          x2="48"
          y2="96"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.2 }}
        />

        {/* Center ridge vertical axis */}
        <motion.line
          x1="92"
          y1="12"
          x2="92"
          y2="96"
          stroke={strokeColor}
          strokeWidth="2.8"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.25 }}
        />

        {/* Right vertical slat dividers */}
        <motion.line
          x1="114"
          y1="30"
          x2="114"
          y2="96"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeOpacity="0.6"
          initial={animated ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.35 }}
        />
        <motion.line
          x1="136"
          y1="48"
          x2="136"
          y2="96"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeOpacity="0.6"
          initial={animated ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.4 }}
        />
      </svg>

      {/* Signature Script Wordmark */}
      <motion.span
        initial={animated ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        style={{ color: textColor }}
        className={`font-script leading-[0.88] -mt-1 tracking-wide ${dimensions.script}`}
      >
        Orit Goldstein
      </motion.span>

      {/* Hebrew Tagline with Hairlines */}
      {showSubtitle && (
        <motion.div
          dir="rtl"
          initial={animated ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{ color: subColor }}
          className={`flex items-center gap-2.5 mt-1 font-medium tracking-[0.06em] ${dimensions.sub}`}
        >
          <span style={{ backgroundColor: ruleColor }} className="block w-5 sm:w-7 h-[1px]" />
          <span>אדריכלות | עיצוב פנים</span>
          <span style={{ backgroundColor: ruleColor }} className="block w-5 sm:w-7 h-[1px]" />
        </motion.div>
      )}
    </div>
  );
}
