import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { EASE_EDITORIAL } from './ArchitecturalReveal';
import { AnimatedDogStaircase } from './AnimatedDogStaircase';
import { useLanguage } from '../i18n/LanguageContext';

export interface CaseStudyItem {
  num: string;
  src: string;
  title: string;
  subtitle: string;
}

const CASE_DETAILS: Record<
  string,
  Record<
    'he' | 'en' | 'es',
    {
      scope: string;
      challenge: string;
      solution: string;
      materials: string[];
    }
  >
> = {
  '01': {
    he: {
      scope: 'תכנון אדריכלי, נגרות בהתאמה אישית והום סטיילינג',
      challenge: 'יצירת חלל מגורים מואר ומזמין שמשלב אחסון נדיב, ספרייה מרכזית וזרימה פתוחה מבלי להכביד על המרחב.',
      solution: 'תכנון ספריית תצוגה המשלבת אלון טבעי וגווני שמנת בהירים, לצד נגיעות פטרול מעושן שממסגרות את אזור הישיבה.',
      materials: ['אלון טבעי', 'שמנת מאט', 'טקסטיל בוקלה', 'פטרול מעושן'],
    },
    en: {
      scope: 'Spatial Planning, Custom Joinery & Home Styling',
      challenge: 'Creating a bright, welcoming living space uniting generous storage, a centerpiece library, and effortless flow.',
      solution: 'Designed a bespoke display bookcase pairing warm oak with cream tones and subtle smoked petrol accents.',
      materials: ['Natural Oak', 'Matte Cream', 'Bouclé Linen', 'Smoked Petrol'],
    },
    es: {
      scope: 'Planificación Espacial, Carpintería a Medida y Estilismo',
      challenge: 'Crear un salón luminoso y acogedor que combine amplio almacenaje, librería central y fluidez visual.',
      solution: 'Diseñamos una librería a medida combinando roble cálido, tonos crema y toques de petróleo ahumado.',
      materials: ['Roble Natural', 'Crema Mate', 'Textil Bouclé', 'Petróleo Ahumado'],
    },
  },
  '02': {
    he: {
      scope: 'תכנון מחודש של המטבח, מערכות ותאורה',
      challenge: 'פתיחת מטבח סגור ויצירת מרכז משפחתי פונקציונלי עם משטחי עבודה רחבים ואחסון חכם.',
      solution: 'אי מרכזי רחב ידיים בשילוב חזיתות שחור מאט ועץ טבעי חם, המאפשר אירוח ובישול בנוחות מקסימלית.',
      materials: ['שחור מאט', 'פורניר אלון', 'אבן קוורץ בהירה', 'תאורת פס שקועה'],
    },
    en: {
      scope: 'Full Kitchen Redesign, MEP Systems & Lighting',
      challenge: 'Opening a closed kitchen into a highly functional family hub with generous prep surfaces and smart storage.',
      solution: 'A generous central island pairing matte black cabinetry with warm natural oak for effortless cooking and hosting.',
      materials: ['Matte Black', 'Natural Oak Veneer', 'Light Quartz Stone', 'Recessed Linear Light'],
    },
    es: {
      scope: 'Rediseño Integral de Cocina, Instalaciones e Iluminación',
      challenge: 'Abrir una cocina cerrada para crear un núcleo familiar funcional con amplias superficies y almacenaje.',
      solution: 'Isla central generosa combinando negro mate y roble natural cálido para cocinar y compartir con comodidad.',
      materials: ['Negro Mate', 'Chapa de Roble', 'Cuarzo Claro', 'Iluminación Lineal'],
    },
  },
  '03': {
    he: {
      scope: 'עיצוב סוויטת הורים, נגרות וטקסטיל',
      challenge: 'הפיכת חדר השינה למפלט רגוע ויוקרתי המשלב אחסון נסתר ותאורת אווירה רכה.',
      solution: 'שילוב מדויק של גווני שמנת מרגיעים, נגיעות פטרול מעושן, נגרות מדויקת וטקסטיל טבעי.',
      materials: ['פטרול מעושן', 'שמנת רכה', 'עץ אלון', 'פשתן טבעי'],
    },
    en: {
      scope: 'Master Suite Design, Joinery & Textiles',
      challenge: 'Transforming the bedroom into a serene, boutique-hotel retreat with concealed storage and warm ambient lighting.',
      solution: 'Layered calming cream tones with smoked petrol accents, tailored carpentry, and soft natural textiles.',
      materials: ['Smoked Petrol', 'Soft Cream', 'Natural Oak', 'Pure Linen'],
    },
    es: {
      scope: 'Diseño de Suite Principal, Carpintería y Textiles',
      challenge: 'Transformar el dormitorio en un refugio sereno con almacenaje oculto e iluminación cálida ambiental.',
      solution: 'Combinación equilibrada de tonos crema, acentos petróleo ahumado, carpintería a medida y lino natural.',
      materials: ['Petróleo Ahumado', 'Crema Suave', 'Madera Roble', 'Lino Natural'],
    },
  },
  '04': {
    he: {
      scope: 'תכנון קונסטרוקטיבי ועיצוב גרם מדרגות',
      challenge: 'הפיכת אלמנט מעבר טכני למוקד אדריכלי פיסולי ששומר על קלילות ומכניס אור לקומת המגורים.',
      solution: 'שלד מתכת שחור בקווים גיאומטריים דקים בשילוב מדרכי אלון מלאים וניצול חכם של החלל מתחת למדרגות.',
      materials: ['ברזל מושחר', 'אלון מלא', 'טיח אבן בהירה', 'פרקט עץ טבעי'],
    },
    en: {
      scope: 'Structural & Architectural Staircase Design',
      challenge: 'Turning a functional circulation element into a sculptural centerpiece that preserves light and openness.',
      solution: 'Slim blackened steel geometric balustrades paired with solid oak treads and an inviting under-stair zone.',
      materials: ['Blackened Steel', 'Solid Oak Treads', 'Light Plaster', 'Natural Wood Tile'],
    },
    es: {
      scope: 'Diseño Estructural y Arquitectónico de Escalera',
      challenge: 'Convertir un elemento técnico de paso en una pieza escultórica que conserve la luz y ligereza.',
      solution: 'Barandilla geométrica de acero negro combinada con peldaños de roble macizo y espacio útil inferior.',
      materials: ['Acero Negro', 'Roble Macizo', 'Estuco Claro', 'Suelo Efecto Madera'],
    },
  },
  '05': {
    he: {
      scope: 'תכנון חדר רחצה, סניטריה ונגרות לחה',
      challenge: 'יצירת חדר רחצה בסגנון ספא מודרני עם תחושת מרחב, אחסון נגיש ותאורה מחמיאה.',
      solution: 'ארון כיור שחור נקי, משטח בהיר, מראה עגולה מוארת וחיפויי אבן ועץ עמידים לאורך שנים.',
      materials: ['נגרות שחור מאט', 'משטח אבן לבן', 'זכוכית שקופה', 'אריחי אבן טבעית'],
    },
    en: {
      scope: 'Bathroom Architecture, Fixtures & Wet-Area Joinery',
      challenge: 'Creating a modern spa-like bathroom with generous storage, flattering light, and visual calm.',
      solution: 'Clean matte-black vanity, bright countertop, backlit round mirror, and timeless stone & wood textures.',
      materials: ['Matte Black Vanity', 'White Stone Top', 'Clear Glass', 'Natural Stone Tile'],
    },
    es: {
      scope: 'Arquitectura de Baño, Sanitarios y Carpintería',
      challenge: 'Crear un baño estilo spa moderno con almacenaje práctico, luz favorecedora y calma visual.',
      solution: 'Mueble negro mate, encimera blanca luminosa, espejo redondo y texturas atemporales de piedra y madera.',
      materials: ['Mueble Negro Mate', 'Encimera Blanca', 'Cristal Claro', 'Piedra Natural'],
    },
  },
};

export function CaseStudyDrawer({
  item,
  onClose,
  onInquire,
}: {
  item: CaseStudyItem | null;
  onClose: () => void;
  onInquire: (title: string) => void;
}) {
  const { lang, isRtl } = useLanguage();
  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [item, onClose]);

  const details = item ? CASE_DETAILS[item.num]?.[lang] ?? CASE_DETAILS['01'][lang] : null;

  const labels = {
    he: {
      tag: 'סיפור הפרויקט',
      scope: 'היקף העבודה',
      challenge: 'האתגר התכנוני',
      solution: 'הפתרון האדריכלי',
      materials: 'חומרים וגמרים בפרויקט',
      cta: 'רוצים תכנון דומה בבית שלכם?',
    },
    en: {
      tag: 'Project Story',
      scope: 'Scope of Work',
      challenge: 'Design Challenge',
      solution: 'Architectural Solution',
      materials: 'Materials & Finishes',
      cta: 'Want a space like this?',
    },
    es: {
      tag: 'Historia del Proyecto',
      scope: 'Alcance',
      challenge: 'El Desafío',
      solution: 'La Solución Arquitectónica',
      materials: 'Materiales y Acabados',
      cta: '¿Quieres un espacio así?',
    },
  }[lang];

  return (
    <AnimatePresence>
      {item && details && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[85] bg-[#122931]/75 backdrop-blur-sm flex justify-end"
        >
          <motion.aside
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[560px] h-full bg-[#FAF8F4] text-[#343735] overflow-y-auto shadow-2xl border-s border-[#C9BBA7]/50 flex flex-col"
          >
            {/* Sticky Top Bar */}
            <div className="sticky top-0 z-20 bg-[#FAF8F4]/92 backdrop-blur-md px-6 py-4 border-b border-[#EAE4DA] flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#396373] tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {labels.tag} · {item.num}
                </span>
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-[#EAE4DA]/80 hover:bg-[#EAE4DA] flex items-center justify-center text-[#343735] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hero Photo (with interactive dog if Staircase!) */}
            <div className="relative aspect-[16/11] bg-[#EAE4DA] overflow-hidden shrink-0">
              {item.src.includes('18-staircase') ? (
                <AnimatedDogStaircase
                  alt={item.title}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover object-[center_60%]"
                  petOnImageClick
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Editorial Brief */}
            <div className="p-6 sm:p-8 space-y-6 flex-1">
              <div>
                <h3 className="text-3xl font-bold text-[#343735] m-0 mb-2">
                  {item.title}
                </h3>
                <p className="text-[#5c625f] text-base m-0 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="bg-[#EAE4DA]/60 rounded-2xl p-4 border border-[#C9BBA7]/45">
                <span className="block text-xs font-bold text-[#396373] mb-1">
                  {labels.scope}
                </span>
                <p className="text-sm font-semibold text-[#343735] m-0">
                  {details.scope}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-[#396373] mb-1">
                    {labels.challenge}
                  </h4>
                  <p className="text-sm sm:text-[0.98rem] text-[#4c524f] leading-relaxed m-0">
                    {details.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#396373] mb-1">
                    {labels.solution}
                  </h4>
                  <p className="text-sm sm:text-[0.98rem] text-[#4c524f] leading-relaxed m-0">
                    {details.solution}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="inline-flex items-center gap-1.5 text-sm font-bold text-[#396373] mb-3">
                  <Layers className="w-4 h-4" />
                  <span>{labels.materials}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {details.materials.map((m) => (
                    <span
                      key={m}
                      className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white border border-[#C9BBA7]/65 text-[#343735]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE4DA]">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onInquire(item.title);
                  }}
                  className="btn-shimmer w-full inline-flex items-center justify-center gap-2.5 bg-[#396373] hover:bg-[#1d3c47] text-[#FAF8F4] font-bold py-4 px-6 rounded-full shadow-md cursor-pointer transition-all"
                >
                  <span>{labels.cta}</span>
                  <ForwardArrow className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
