import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accessibility,
  X,
  Plus,
  Minus,
  Contrast,
  Eye,
  Link2,
  Type,
  PauseCircle,
  MousePointer2,
  RotateCcw,
  FileText,
  Check,
  Phone,
  Mail,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/siteData';
import { useLanguage } from '../i18n/LanguageContext';

export interface AccessibilityState {
  fontScale: number;
  highContrast: boolean;
  monochrome: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  stopAnimations: boolean;
  largeCursor: boolean;
}

const DEFAULT_STATE: AccessibilityState = {
  fontScale: 100,
  highContrast: false,
  monochrome: false,
  highlightLinks: false,
  readableFont: false,
  stopAnimations: false,
  largeCursor: false,
};

const STORAGE_KEY = 'orit_a11y_settings_v1';

export function AccessibilityWidget({
  statementOpen,
  setStatementOpen,
  onStopAnimationsChange,
}: {
  statementOpen: boolean;
  setStatementOpen: (open: boolean) => void;
  onStopAnimationsChange: (stopped: boolean) => void;
}) {
  const { t } = useLanguage();
  const [panelOpen, setPanelOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [state, setState] = useState<AccessibilityState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_STATE, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${state.fontScale}%`;
    root.classList.toggle('a11y-high-contrast', state.highContrast);
    root.classList.toggle('a11y-monochrome', state.monochrome);
    root.classList.toggle('a11y-highlight-links', state.highlightLinks);
    root.classList.toggle('a11y-readable-font', state.readableFont);
    root.classList.toggle('a11y-stop-animations', state.stopAnimations);
    root.classList.toggle('a11y-large-cursor', state.largeCursor);

    onStopAnimationsChange(state.stopAnimations);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, onStopAnimationsChange]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key.toLowerCase() === 'a' || e.key === 'ש')) {
        e.preventDefault();
        setPanelOpen((o) => !o);
      }
      if (e.key === 'Escape') {
        if (statementOpen) setStatementOpen(false);
        else if (panelOpen) setPanelOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [panelOpen, statementOpen, setStatementOpen]);

  const announce = (msg: string) => {
    setAnnouncement('');
    requestAnimationFrame(() => setAnnouncement(msg));
  };

  const toggle = (key: keyof Omit<AccessibilityState, 'fontScale'>, label: string) => {
    setState((prev) => {
      const nextVal = !prev[key];
      announce(`${label}: ${nextVal ? 'ON' : 'OFF'}`);
      return { ...prev, [key]: nextVal };
    });
  };

  const changeFontScale = (delta: number) => {
    setState((prev) => {
      const next = Math.max(90, Math.min(150, prev.fontScale + delta));
      announce(`${t.a11y.fontSize}: ${next}%`);
      return { ...prev, fontScale: next };
    });
  };

  const resetAll = () => {
    setState(DEFAULT_STATE);
    announce(t.a11y.reset);
  };

  const activeCount =
    (state.fontScale !== 100 ? 1 : 0) +
    (state.highContrast ? 1 : 0) +
    (state.monochrome ? 1 : 0) +
    (state.highlightLinks ? 1 : 0) +
    (state.readableFont ? 1 : 0) +
    (state.stopAnimations ? 1 : 0) +
    (state.largeCursor ? 1 : 0);

  return (
    <>
      <a
        href="#main-content"
        className="skip-to-content fixed top-3 right-3 z-[120] -translate-y-24 focus:translate-y-0 bg-[#1d3c47] text-white font-bold px-5 py-3 rounded-xl shadow-2xl border-2 border-[#C9BBA7] transition-transform focus:outline-none"
      >
        {t.a11y.skipToContent}
      </a>

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <button
        type="button"
        onClick={() => setPanelOpen((o) => !o)}
        aria-label={`${t.a11y.menuTitle} (Alt+A)`}
        aria-expanded={panelOpen}
        aria-controls="a11y-panel"
        className="a11y-exclude fixed bottom-5 right-5 z-[60] w-13 h-13 rounded-full bg-[#1d3c47] hover:bg-[#396373] text-white shadow-[0_12px_32px_rgba(18,41,49,0.42)] border-2 border-[#FAF8F4] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
        title={`${t.a11y.menuTitle} (Alt+A)`}
      >
        <Accessibility className="w-6 h-6" aria-hidden="true" />
        {activeCount > 0 && (
          <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#C9BBA7] text-[#122931] text-[11px] font-extrabold flex items-center justify-center shadow">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {panelOpen && (
          <motion.aside
            id="a11y-panel"
            role="dialog"
            aria-modal="false"
            aria-label={t.a11y.menuTitle}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="a11y-exclude fixed bottom-22 right-4 left-4 sm:left-auto sm:w-[360px] max-h-[78vh] overflow-y-auto z-[70] bg-[#FAF8F4] text-[#343735] rounded-2xl shadow-[0_24px_70px_rgba(18,41,49,0.38)] border border-[#C9BBA7] p-5"
          >
            <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-[#EAE4DA]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#396373] text-white flex items-center justify-center">
                  <Accessibility className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#343735] m-0">
                    {t.a11y.menuTitle}
                  </h2>
                  <p className="text-xs text-[#626764] m-0">{t.a11y.menuSub}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label={t.portfolio.close}
                className="w-9 h-9 rounded-full hover:bg-[#EAE4DA] flex items-center justify-center text-[#343735] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white rounded-xl border border-[#EAE4DA] p-3.5 mb-3">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-sm font-bold text-[#343735]">
                  {t.a11y.fontSize}
                </span>
                <span className="text-xs font-bold text-[#396373] bg-[#EAE4DA] px-2.5 py-0.5 rounded-full">
                  {state.fontScale}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => changeFontScale(10)}
                  disabled={state.fontScale >= 150}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#FAF8F4] hover:bg-[#EAE4DA] disabled:opacity-45 text-xs font-bold text-[#343735] cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.a11y.increaseFont}</span>
                </button>
                <button
                  type="button"
                  onClick={() => changeFontScale(-10)}
                  disabled={state.fontScale <= 90}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#FAF8F4] hover:bg-[#EAE4DA] disabled:opacity-45 text-xs font-bold text-[#343735] cursor-pointer transition-colors"
                >
                  <Minus className="w-4 h-4" />
                  <span>{t.a11y.decreaseFont}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {[
                { key: 'highContrast' as const, label: t.a11y.highContrast, icon: Contrast },
                { key: 'monochrome' as const, label: t.a11y.monochrome, icon: Eye },
                { key: 'highlightLinks' as const, label: t.a11y.highlightLinks, icon: Link2 },
                { key: 'readableFont' as const, label: t.a11y.readableFont, icon: Type },
                { key: 'stopAnimations' as const, label: t.a11y.stopAnimations, icon: PauseCircle },
                { key: 'largeCursor' as const, label: t.a11y.largeCursor, icon: MousePointer2 },
              ].map(({ key, label, icon: Icon }) => {
                const active = state[key];
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggle(key, label)}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer relative ${
                      active
                        ? 'bg-[#396373] text-white border-[#396373] shadow-sm'
                        : 'bg-white text-[#343735] border-[#EAE4DA] hover:border-[#C9BBA7]'
                    }`}
                  >
                    {active && (
                      <Check
                        className="w-3.5 h-3.5 absolute top-2 left-2 text-[#C9BBA7]"
                        aria-hidden="true"
                      />
                    )}
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-[#EAE4DA]">
              <button
                type="button"
                onClick={() => {
                  setPanelOpen(false);
                  setStatementOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#396373] hover:bg-[#1d3c47] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{t.a11y.fullStatement}</span>
              </button>

              <button
                type="button"
                onClick={resetAll}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-[#C9BBA7] hover:bg-[#EAE4DA] text-[#343735] text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.a11y.reset}</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {statementOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStatementOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-statement-title"
            className="a11y-exclude fixed inset-0 z-[90] bg-[#122931]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[760px] max-h-[86vh] overflow-y-auto bg-[#FAF8F4] text-[#343735] rounded-2xl shadow-2xl border border-[#C9BBA7] p-6 sm:p-9"
            >
              <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b border-[#EAE4DA]">
                <div>
                  <span className="text-xs font-bold text-[#396373] tracking-wider">
                    {t.a11y.statementKicker}
                  </span>
                  <h2
                    id="a11y-statement-title"
                    className="text-3xl font-bold text-[#343735] mt-1 m-0"
                  >
                    {t.a11y.statementTitle}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setStatementOpen(false)}
                  aria-label={t.portfolio.close}
                  className="w-10 h-10 rounded-full hover:bg-[#EAE4DA] flex items-center justify-center text-[#343735] shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5 text-sm sm:text-[0.98rem] leading-[1.82] text-[#4c524f]">
                <p className="m-0">{t.a11y.statementIntro}</p>

                <div>
                  <h3 className="text-base font-bold text-[#343735] mb-2">
                    {t.a11y.statementLevelTitle}
                  </h3>
                  <p className="m-0">{t.a11y.statementLevelBody}</p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#343735] mb-2">
                    {t.a11y.statementListTitle}
                  </h3>
                  <ul className="list-disc ps-5 space-y-1.5 m-0">
                    {t.a11y.statementList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#343735] mb-2">
                    {t.a11y.statementPhysicalTitle}
                  </h3>
                  <p className="m-0">{t.a11y.statementPhysicalBody}</p>
                </div>

                <div className="bg-[#EAE4DA]/65 rounded-xl p-5 border border-[#C9BBA7]/50">
                  <h3 className="text-base font-bold text-[#343735] mt-0 mb-2">
                    {t.a11y.statementCoordTitle}
                  </h3>
                  <p className="m-0 mb-3">{t.a11y.statementCoordBody}</p>
                  <div className="space-y-1.5 text-sm font-bold text-[#343735]">
                    <div>{t.a11y.statementCoordName}</div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#396373]" />
                      <a href={CONTACT_INFO.phoneHref} className="underline" dir="ltr">
                        {CONTACT_INFO.phoneDisplay}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#396373]" />
                      <a href={`mailto:${CONTACT_INFO.email}`} className="underline" dir="ltr">
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#626764] m-0">
                  {t.a11y.statementUpdated}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
