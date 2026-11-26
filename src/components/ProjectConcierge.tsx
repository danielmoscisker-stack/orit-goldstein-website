import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Home,
  KeyRound,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Eyebrow, EASE_EDITORIAL } from './ArchitecturalReveal';
import { useLanguage } from '../i18n/LanguageContext';
import { CONTACT_INFO } from '../data/siteData';
import { trackEvent } from '../utils/analytics';

const QUIZ_COPY = {
  he: {
    eyebrow: 'התאמת מסלול אישית',
    heading: 'לא בטוחים מאיפה להתחיל?',
    sub: 'ענו על 3 שאלות קצרות וקבלו המלצה מדויקת למסלול הליווי המתאים לפרויקט שלכם.',
    stepLabel: (s: number) => `שלב ${s} מתוך 3`,
    questions: [
      {
        title: 'איזה נכס מתכננים?',
        options: [
          { id: 'existing', label: 'דירה קיימת לשיפוץ', icon: Home },
          { id: 'contractor', label: 'דירה חדשה מקבלן', icon: Building2 },
          { id: 'private', label: 'בית פרטי', icon: Sparkles },
          { id: 'prepurchase', label: 'מתלבטים לפני רכישה', icon: KeyRound },
        ],
      },
      {
        title: 'מה היקף השינוי שאתם מדמיינים?',
        options: [
          { id: 'single', label: 'דיוק חלל אחד או שניים', icon: Sparkles },
          { id: 'plans', label: 'סט תכניות מקצועי לשיפוץ', icon: Building2 },
          { id: 'full', label: 'עיצוב מלא + ליווי בשטח', icon: Home },
          { id: 'check', label: 'בדיקת פוטנציאל והיתכנות', icon: KeyRound },
        ],
      },
      {
        title: 'מתי תרצו לצאת לדרך?',
        options: [
          { id: 'now', label: 'בקרוב (1–3 חודשים)', icon: Sparkles },
          { id: 'soon', label: 'בעוד 3–6 חודשים', icon: Home },
          { id: 'exploring', label: 'בשלב בדיקה ותכנון מוקדם', icon: KeyRound },
        ],
      },
    ],
    resultBadge: 'המסלול המומלץ עבורכם',
    tracks: {
      prepurchase: {
        title: 'ייעוץ אדריכלי לפני רכישת דירה',
        desc: 'נבחן יחד את הפוטנציאל האמיתי של הנכס, את חלופות התכנון וההיתכנות לפני שחותמים.',
      },
      focused: {
        title: 'ייעוץ ותכנון ממוקד',
        desc: 'מפגש אישי וממוקד בבית ליצירת תכנית פעולה ברורה, העמדת ריהוט ופלטת חומרים לחלל שלכם.',
      },
      plans: {
        title: 'תכנון ועיצוב פנים',
        desc: 'סט תכניות עבודה מפורט ומסודר (הריסה, חשמל, אינסטלציה, מיזוג) לביצוע חלק מול הקבלן.',
      },
      full: {
        title: 'ליווי ועיצוב מלא',
        desc: 'מעטפת אדריכלית ועיצובית שלמה – מהקונספט ופרטי הנגרות ועד לבחירת החומרים והליווי בשטח.',
      },
    },
    ctaForm: 'המשך לטופס עם הפרטים',
    ctaWa: 'שליחה ישירה ב-WhatsApp',
    restart: 'התחלה מחדש',
    waTemplate: (track: string, prop: string, time: string) =>
      `שלום אורית! מילאתי את השאלון באתר: הנכס הוא "${prop}", לוח הזמנים "${time}", והמסלול המומלץ עבורי הוא "${track}". אשמח לדבר!`,
  },
  en: {
    eyebrow: 'Personal Track Matcher',
    heading: 'Not sure where to begin?',
    sub: 'Answer 3 quick questions to get a tailored recommendation for your home.',
    stepLabel: (s: number) => `Step ${s} of 3`,
    questions: [
      {
        title: 'What type of property are you planning?',
        options: [
          { id: 'existing', label: 'Existing Apartment Renovation', icon: Home },
          { id: 'contractor', label: 'New Developer Apartment', icon: Building2 },
          { id: 'private', label: 'Private House', icon: Sparkles },
          { id: 'prepurchase', label: 'Evaluating Before Purchase', icon: KeyRound },
        ],
      },
      {
        title: 'What scope do you envision?',
        options: [
          { id: 'single', label: 'Refining 1–2 Key Spaces', icon: Sparkles },
          { id: 'plans', label: 'Complete Contractor Blueprints', icon: Building2 },
          { id: 'full', label: 'Full Design & Site Guidance', icon: Home },
          { id: 'check', label: 'Feasibility & Layout Check', icon: KeyRound },
        ],
      },
      {
        title: 'What is your ideal timeline?',
        options: [
          { id: 'now', label: 'Soon (1–3 months)', icon: Sparkles },
          { id: 'soon', label: 'In 3–6 months', icon: Home },
          { id: 'exploring', label: 'Early exploration stage', icon: KeyRound },
        ],
      },
    ],
    resultBadge: 'Recommended For You',
    tracks: {
      prepurchase: {
        title: 'Pre-Purchase Architectural Consultation',
        desc: 'We will evaluate the property’s full potential, layout changes, and feasibility before you commit.',
      },
      focused: {
        title: 'Focused Consultation',
        desc: 'An actionable in-home session for layout, color palette, materials, and curated supplier guidance.',
      },
      plans: {
        title: 'Architectural & Interior Plans',
        desc: 'A complete technical drawing package (layout, electrical, plumbing, HVAC) for clear contractor execution.',
      },
      full: {
        title: 'Full Design & Accompaniment',
        desc: 'End-to-end architectural and interior care — from custom joinery to material selection and site visits.',
      },
    },
    ctaForm: 'Continue to Contact Form',
    ctaWa: 'Send via WhatsApp',
    restart: 'Start Over',
    waTemplate: (track: string, prop: string, time: string) =>
      `Hi Orit! I completed the site matcher: Property "${prop}", Timeline "${time}", Recommended track: "${track}". Would love to chat!`,
  },
  es: {
    eyebrow: 'Selector de Modalidad',
    heading: '¿No sabes por dónde empezar?',
    sub: 'Responde 3 preguntas rápidas y descubre el acompañamiento ideal para tu proyecto.',
    stepLabel: (s: number) => `Paso ${s} de 3`,
    questions: [
      {
        title: '¿Qué tipo de propiedad estás planeando?',
        options: [
          { id: 'existing', label: 'Reforma de Vivienda Actual', icon: Home },
          { id: 'contractor', label: 'Vivienda Nueva sobre Plano', icon: Building2 },
          { id: 'private', label: 'Casa Privada', icon: Sparkles },
          { id: 'prepurchase', label: 'Evaluando Antes de Comprar', icon: KeyRound },
        ],
      },
      {
        title: '¿Qué alcance imaginas?',
        options: [
          { id: 'single', label: 'Mejorar 1 o 2 Espacios', icon: Sparkles },
          { id: 'plans', label: 'Planos Técnicos para Obra', icon: Building2 },
          { id: 'full', label: 'Diseño Integral + Seguimiento', icon: Home },
          { id: 'check', label: 'Estudio de Viabilidad', icon: KeyRound },
        ],
      },
      {
        title: '¿Cuándo te gustaría empezar?',
        options: [
          { id: 'now', label: 'Pronto (1–3 meses)', icon: Sparkles },
          { id: 'soon', label: 'En 3–6 meses', icon: Home },
          { id: 'exploring', label: 'Etapa inicial de exploración', icon: KeyRound },
        ],
      },
    ],
    resultBadge: 'Recomendado Para Ti',
    tracks: {
      prepurchase: {
        title: 'Asesoría Arquitectónica Previa a la Compra',
        desc: 'Evaluaremos el potencial real de la propiedad y su viabilidad antes de tomar la decisión.',
      },
      focused: {
        title: 'Asesoría y Diseño Puntual',
        desc: 'Sesión práctica en tu hogar para distribución, paleta de materiales y lista de proveedores.',
      },
      plans: {
        title: 'Planificación y Planos Técnicos',
        desc: 'Juego completo de planos de obra para que el contratista ejecute cada detalle con precisión.',
      },
      full: {
        title: 'Diseño y Acompañamiento Integral',
        desc: 'Acompañamiento completo desde el concepto y carpintería hasta materiales y seguimiento en obra.',
      },
    },
    ctaForm: 'Continuar al Formulario',
    ctaWa: 'Enviar por WhatsApp',
    restart: 'Empezar de Nuevo',
    waTemplate: (track: string, prop: string, time: string) =>
      `¡Hola Orit! Completé el cuestionario: Propiedad "${prop}", Plazo "${time}", Modalidad recomendada: "${track}". ¡Me encantaría hablar!`,
  },
};

export function ProjectConcierge({
  onSelectRecommendation,
}: {
  onSelectRecommendation: (summary: string) => void;
}) {
  const { lang, isRtl } = useLanguage();
  const copy = QUIZ_COPY[lang];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ id: string; label: string }[]>([]);
  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  const choose = (opt: { id: string; label: string }) => {
    const next = [...answers];
    next[step] = opt;
    setAnswers(next);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  const getRecommendedTrack = () => {
    const propId = answers[0]?.id;
    const scopeId = answers[1]?.id;
    if (propId === 'prepurchase' || scopeId === 'check') return copy.tracks.prepurchase;
    if (scopeId === 'single') return copy.tracks.focused;
    if (scopeId === 'plans') return copy.tracks.plans;
    return copy.tracks.full;
  };

  const isDone = step >= 3;
  const track = isDone ? getRecommendedTrack() : null;

  const waHref = track
    ? `${CONTACT_INFO.whatsappHref}?text=${encodeURIComponent(
        copy.waTemplate(
          track.title,
          answers[0]?.label ?? '',
          answers[2]?.label ?? ''
        )
      )}`
    : CONTACT_INFO.whatsappHref;

  return (
    <section className="py-20 sm:py-24 bg-[#FAF8F4] relative overflow-hidden">
      <div className="max-w-[980px] mx-auto px-5 sm:px-8">
        <div className="bg-gradient-to-br from-[#EAE4DA]/80 via-[#FAF8F4] to-[#EAE4DA]/55 rounded-[32px] border border-[#C9BBA7]/60 p-6 sm:p-11 shadow-[0_24px_70px_rgba(29,60,71,0.09)] relative overflow-hidden">
          <div className="arch-grid-light absolute inset-0 opacity-70 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <Eyebrow>{copy.eyebrow}</Eyebrow>
                <h2 className="text-[1.9rem] sm:text-[2.6rem] font-bold text-[#343735] mt-3 mb-2 leading-tight">
                  {copy.heading}
                </h2>
                <p className="text-[#5c625f] text-sm sm:text-base m-0 max-w-xl">
                  {copy.sub}
                </p>
              </div>
              {!isDone && (
                <span className="text-xs font-bold text-[#396373] bg-white/90 px-4 py-1.5 rounded-full border border-[#C9BBA7]/50">
                  {copy.stepLabel(step + 1)}
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-[#C9BBA7]/35 rounded-full overflow-hidden mb-8">
              <motion.div
                animate={{ width: `${Math.min(100, ((step + (isDone ? 0 : 0.35)) / 3) * 100)}%` }}
                transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
                className="h-full bg-[#396373] rounded-full"
              />
            </div>

            <AnimatePresence mode="wait">
              {!isDone ? (
                <motion.div
                  key={`step-${step}-${lang}`}
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-[#343735] mb-5">
                    {copy.questions[step].title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {copy.questions[step].options.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <motion.button
                          key={opt.id}
                          type="button"
                          whileHover={{ y: -3, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => choose({ id: opt.id, label: opt.label })}
                          className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white hover:bg-[#396373] text-[#343735] hover:text-[#FAF8F4] border border-[#C9BBA7]/55 hover:border-[#396373] shadow-xs hover:shadow-lg transition-all duration-250 cursor-pointer text-start"
                        >
                          <span className="w-11 h-11 rounded-xl bg-[#EAE4DA] group-hover:bg-white/15 text-[#396373] group-hover:text-[#FAF8F4] flex items-center justify-center shrink-0 transition-colors">
                            <Icon className="w-5 h-5" />
                          </span>
                          <span className="font-bold text-sm sm:text-base flex-1">
                            {opt.label}
                          </span>
                          <ForwardArrow className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                track && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
                    className="bg-[#1d3c47] text-[#FAF8F4] rounded-3xl p-6 sm:p-8 shadow-xl border border-white/15"
                  >
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C9BBA7] bg-white/10 px-3.5 py-1 rounded-full mb-4">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{copy.resultBadge}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF8F4] mb-2">
                      {track.title}
                    </h3>
                    <p className="text-[#FAF8F4]/82 text-sm sm:text-base leading-relaxed max-w-2xl mb-7">
                      {track.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const summary = `${track.title} (${answers.map((a) => a.label).join(' · ')})`;
                          trackEvent('concierge_complete', track.title, summary);
                          onSelectRecommendation(summary);
                        }}
                        className="btn-shimmer inline-flex items-center gap-2.5 bg-[#FAF8F4] hover:bg-white text-[#1d3c47] font-bold px-6 py-3.5 rounded-full shadow-md cursor-pointer transition-all"
                      >
                        <span>{copy.ctaForm}</span>
                        <ForwardArrow className="w-4 h-4" />
                      </button>

                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent(
                            'whatsapp_click',
                            `concierge:${track.title}`,
                            answers.map((a) => a.label).join(' · ')
                          )
                        }
                        className="inline-flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/45 text-white font-bold px-6 py-3.5 rounded-full transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-[#9af0b9]" />
                        <span>{copy.ctaWa}</span>
                      </a>

                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9BBA7] hover:text-white px-3 py-2 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{copy.restart}</span>
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
