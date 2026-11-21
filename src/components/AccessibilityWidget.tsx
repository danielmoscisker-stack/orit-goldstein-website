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

export interface AccessibilityState {
  fontScale: number; // 90 to 150
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
  const [panelOpen, setPanelOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [state, setState] = useState<AccessibilityState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_STATE, ...JSON.parse(saved) };
    } catch {
      // ignore storage errors
    }
    return DEFAULT_STATE;
  });

  // Apply settings to documentElement
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
      // ignore storage errors
    }
  }, [state, onStopAnimationsChange]);

  // Keyboard shortcuts: Alt+A toggles accessibility menu, Escape closes dialogs
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
      announce(`${label}: ${nextVal ? 'מופעל' : 'כבוי'}`);
      return { ...prev, [key]: nextVal };
    });
  };

  const changeFontScale = (delta: number) => {
    setState((prev) => {
      const next = Math.max(90, Math.min(150, prev.fontScale + delta));
      announce(`גודל טקסט עודכן ל-${next} אחוזים`);
      return { ...prev, fontScale: next };
    });
  };

  const resetAll = () => {
    setState(DEFAULT_STATE);
    announce('כל הגדרות הנגישות אופסו לברירת המחדל');
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
      {/* Skip to Main Content Link (SI 5568 / WCAG 2.0 AA 2.4.1) */}
      <a
        href="#main-content"
        className="skip-to-content fixed top-3 right-3 z-[120] -translate-y-24 focus:translate-y-0 bg-[#183f47] text-white font-bold px-5 py-3 rounded-xl shadow-2xl border-2 border-[#d8c3a5] transition-transform focus:outline-none"
      >
        דלג לתוכן הראשי
      </a>

      {/* Screen Reader Live Region */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Floating Accessibility Trigger Button (Bottom-Right in RTL) */}
      <button
        type="button"
        onClick={() => setPanelOpen((o) => !o)}
        aria-label="פתיחת תפריט נגישות (קיצור מקלדת Alt+A)"
        aria-expanded={panelOpen}
        aria-controls="a11y-panel"
        className="a11y-exclude fixed bottom-5 right-5 z-[60] w-13 h-13 rounded-full bg-[#183f47] hover:bg-[#245d66] text-white shadow-[0_12px_32px_rgba(16,44,50,0.42)] border-2 border-[#f5f1e9] flex items-center justify-center transition-transform hover:scale-105 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#d8c3a5] cursor-pointer"
        title="נגישות (Alt+A)"
      >
        <Accessibility className="w-6 h-6" aria-hidden="true" />
        {activeCount > 0 && (
          <span
            aria-label={`${activeCount} התאמות נגישות פעילות`}
            className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#d8c3a5] text-[#102c32] text-[11px] font-extrabold flex items-center justify-center shadow"
          >
            {activeCount}
          </span>
        )}
      </button>

      {/* Accessibility Controls Panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.aside
            id="a11y-panel"
            role="dialog"
            aria-modal="false"
            aria-label="תפריט נגישות האתר"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="a11y-exclude fixed bottom-22 right-4 left-4 sm:left-auto sm:w-[360px] max-h-[78vh] overflow-y-auto z-[70] bg-[#fbf9f5] text-[#183f47] rounded-2xl shadow-[0_24px_70px_rgba(16,44,50,0.38)] border border-[#245d66]/25 p-5"
          >
            <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-[#245d66]/15">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#183f47] text-white flex items-center justify-center">
                  <Accessibility className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-sans text-base font-bold text-[#183f47] m-0">
                    תפריט נגישות
                  </h2>
                  <p className="text-xs text-[#5d6562] m-0">
                    תקן ישראלי 5568 · WCAG 2.0 AA
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="סגירת תפריט נגישות"
                className="w-9 h-9 rounded-full hover:bg-[#245d66]/10 flex items-center justify-center text-[#183f47] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Font Size Control */}
            <div className="bg-white rounded-xl border border-[#245d66]/15 p-3.5 mb-3">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-sm font-bold text-[#183f47]">גודל טקסט</span>
                <span className="text-xs font-bold text-[#245d66] bg-[#edf2ee] px-2.5 py-0.5 rounded-full">
                  {state.fontScale}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => changeFontScale(10)}
                  disabled={state.fontScale >= 150}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#f5f1e9] hover:bg-[#e6ddd1] disabled:opacity-45 text-sm font-semibold text-[#183f47] cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>הגדלת טקסט</span>
                </button>
                <button
                  type="button"
                  onClick={() => changeFontScale(-10)}
                  disabled={state.fontScale <= 90}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#f5f1e9] hover:bg-[#e6ddd1] disabled:opacity-45 text-sm font-semibold text-[#183f47] cursor-pointer transition-colors"
                >
                  <Minus className="w-4 h-4" />
                  <span>הקטנת טקסט</span>
                </button>
              </div>
            </div>

            {/* Toggle Controls */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {[
                {
                  key: 'highContrast' as const,
                  label: 'ניגודיות גבוהה',
                  icon: Contrast,
                },
                {
                  key: 'monochrome' as const,
                  label: 'גווני אפור',
                  icon: Eye,
                },
                {
                  key: 'highlightLinks' as const,
                  label: 'הדגשת קישורים',
                  icon: Link2,
                },
                {
                  key: 'readableFont' as const,
                  label: 'גופן קריא',
                  icon: Type,
                },
                {
                  key: 'stopAnimations' as const,
                  label: 'עצירת אנימציות',
                  icon: PauseCircle,
                },
                {
                  key: 'largeCursor' as const,
                  label: 'סמן עכבר מוגדל',
                  icon: MousePointer2,
                },
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
                        ? 'bg-[#183f47] text-white border-[#183f47] shadow-sm'
                        : 'bg-white text-[#183f47] border-[#245d66]/15 hover:border-[#245d66]/45 hover:bg-[#f5f1e9]/60'
                    }`}
                  >
                    {active && (
                      <Check
                        className="w-3.5 h-3.5 absolute top-2 left-2 text-[#d8c3a5]"
                        aria-hidden="true"
                      />
                    )}
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Statement + Reset Actions */}
            <div className="flex flex-col gap-2 pt-3 border-t border-[#245d66]/15">
              <button
                type="button"
                onClick={() => {
                  setPanelOpen(false);
                  setStatementOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#245d66] hover:bg-[#183f47] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>הצהרת נגישות מלאה</span>
              </button>

              <button
                type="button"
                onClick={resetAll}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-[#245d66]/25 hover:bg-[#e6ddd1]/60 text-[#183f47] text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>איפוס הגדרות נגישות</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Full Israeli Law Accessibility Statement Modal (הצהרת נגישות לפי תקנה 35) */}
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
            className="a11y-exclude fixed inset-0 z-[90] bg-[#0d2226]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[760px] max-h-[86vh] overflow-y-auto bg-[#fbf9f5] text-[#292e2e] rounded-2xl shadow-2xl border border-[#245d66]/20 p-6 sm:p-9"
            >
              <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b border-[#245d66]/15">
                <div>
                  <span className="text-xs font-bold text-[#245d66] tracking-wider">
                    תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג–2013
                  </span>
                  <h2
                    id="a11y-statement-title"
                    className="font-editorial text-3xl text-[#183f47] mt-1 m-0"
                  >
                    הצהרת נגישות
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setStatementOpen(false)}
                  aria-label="סגירת הצהרת הנגישות"
                  className="w-10 h-10 rounded-full hover:bg-[#245d66]/10 flex items-center justify-center text-[#183f47] shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5 text-sm sm:text-[0.98rem] leading-[1.82] text-[#434e4a]">
                <p className="m-0">
                  סטודיו <strong>אורית גולדשטיין – אדריכלות ועיצוב פנים</strong> רואה
                  חשיבות רבה במתן שירות שוויוני, מכבד, נגיש ומקצועי לכלל לקוחותיו
                  ולכלל הגולשים באתר, לרבות אנשים עם מוגבלות. בהתאם לחוק שוויון
                  זכויות לאנשים עם מוגבלות, תשנ״ח–1998, ולתקנות שהותקנו מכוחו,
                  הושקעו מאמצים רבים בביצוע התאמות הנגישות הנדרשות באתר.
                </p>

                <div>
                  <h3 className="font-sans text-base font-bold text-[#183f47] mb-2">
                    רמת הנגישות באתר
                  </h3>
                  <p className="m-0">
                    אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות
                    (התאמות נגישות לשירות), התשע״ג–2013. התאמות הנגישות בוצעו על פי
                    המלצות התקן הישראלי (<strong>ת״י 5568</strong>) לנגישות תכנים
                    באינטרנט ברמת <strong>AA</strong> ומסמך{' '}
                    <strong>WCAG 2.0</strong> הבינלאומי.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans text-base font-bold text-[#183f47] mb-2">
                    התאמות הנגישות שבוצעו באתר
                  </h3>
                  <ul className="list-disc pr-5 space-y-1.5 m-0">
                    <li>
                      <strong>ניווט מקלדת מלא:</strong> ניתן לנווט בכל חלקי האתר,
                      התפריטים, גלריית הפרויקטים והטפסים באמצעות מקש{' '}
                      <kbd className="px-1.5 py-0.5 bg-[#e6ddd1] rounded text-xs">Tab</kbd>
                      , חיצים,{' '}
                      <kbd className="px-1.5 py-0.5 bg-[#e6ddd1] rounded text-xs">Enter</kbd>{' '}
                      ו-
                      <kbd className="px-1.5 py-0.5 bg-[#e6ddd1] rounded text-xs">Esc</kbd>
                      , כולל קישור ״דלג לתוכן הראשי״.
                    </li>
                    <li>
                      <strong>תפריט נגישות אינטראקטיבי (קיצור Alt+A):</strong>{' '}
                      הגדלה והקטנת גופן עד 150%, מצב ניגודיות גבוהה, מצב גווני אפור,
                      הדגשת קישורים, מעבר לגופן קריא, הגדלת סמן עכבר ועצירת כלל
                      האנימציות והתנועות באתר.
                    </li>
                    <li>
                      <strong>מבנה סמנטי וקוראי מסך:</strong> שימוש בכותרות
                      היררכיות (H1–H4), אזורי ציון דרך (ARIA Landmarks), תוויות
                      נגישות לטפסים ולכפתורים, ותיאורי טקסט חלופי (Alt) לתמונות
                      הפרויקטים.
                    </li>
                    <li>
                      <strong>התאמה להעדפות מערכת:</strong> תמיכה מלאה בהגדרת
                      הפחתת תנועה (<code>prefers-reduced-motion</code>) והגדלת תצוגה
                      בדפדפן עד 200% ללא פגיעה בקריאות.
                    </li>
                    <li>
                      <strong>התאמה לדפדפנים:</strong> האתר נבדק ומותאם לדפדפנים
                      הנפוצים (Chrome, Edge, Firefox, Safari) ולגלישה במכשירים
                      ניידים.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans text-base font-bold text-[#183f47] mb-2">
                    הסדרי נגישות פיזיים וקבלת קהל
                  </h3>
                  <p className="m-0">
                    הפגישות מתקיימות בתיאום מראש בבית הלקוח, באתר הפרויקט או בפגישה
                    מקוונת מונגשת (Zoom / וידאו), על מנת לאפשר נוחות ונגישות מרבית
                    לכל לקוח.
                  </p>
                </div>

                <div className="bg-[#edf2ee] rounded-xl p-5 border border-[#245d66]/18">
                  <h3 className="font-sans text-base font-bold text-[#183f47] mt-0 mb-2">
                    פרטי רכזת הנגישות ופנייה בנושא נגישות
                  </h3>
                  <p className="m-0 mb-3">
                    אנו ממשיכים לפעול לשיפור מתמיד של נגישות האתר. אם נתקלתם בקושי
                    או בתקלה בנושא נגישות, או אם יש לכם הערה או הצעה לשיפור – נשמח
                    שתפנו אלינו ונטפל בפנייה בהקדם האפשרי:
                  </p>
                  <div className="space-y-1.5 text-sm font-semibold text-[#183f47]">
                    <div>רכזת נגישות: אורית גולדשטיין</div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#245d66]" />
                      <a href={CONTACT_INFO.phoneHref} className="underline" dir="ltr">
                        {CONTACT_INFO.phoneDisplay}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#245d66]" />
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="underline"
                        dir="ltr"
                      >
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#6b706e] m-0">
                  הצהרת הנגישות עודכנה לאחרונה בתאריך: נובמבר 2026.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
