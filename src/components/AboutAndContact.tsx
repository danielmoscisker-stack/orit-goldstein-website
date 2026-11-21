import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MessageCircle,
  ArrowLeft,
  Award,
  CheckCircle2,
  Expand,
  X,
  Quote,
} from 'lucide-react';
import { CONTACT_INFO, CREDENTIALS } from '../data/siteData';
import { Eyebrow, Reveal, EASE_EDITORIAL } from './ArchitecturalReveal';
import { OritBrandLogo } from './OritBrandLogo';

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-[#FAF8F4] relative overflow-hidden"
    >
      <div className="max-w-[1260px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait with Editorial Sand Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
              className="relative max-w-[400px] w-full"
            >
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-[#EAE4DA] border border-[#C9BBA7] pointer-events-none" />
              <div className="relative rounded-3xl overflow-hidden shadow-[0_28px_70px_rgba(29,60,71,0.16)] bg-[#EAE4DA]">
                <img
                  src="./assets/site/orit-profile.webp"
                  alt="אורית גולדשטיין – אדריכלית ומעצבת פנים"
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover object-[center_26%] saturate-[0.92] hover:scale-[1.03] transition-transform duration-700"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.7, ease: EASE_EDITORIAL }}
                className="absolute -bottom-5 -right-3 sm:-right-6 bg-[#396373] text-[#FAF8F4] rounded-2xl px-5 py-3.5 shadow-xl border border-white/15 flex items-center gap-3"
              >
                <Award className="w-6 h-6 text-[#C9BBA7] shrink-0" />
                <div className="text-xs leading-snug">
                  <strong className="block text-sm font-bold">
                    אדריכלית ומהנדסת
                  </strong>
                  <span className="text-[#FAF8F4]/80">B.Arch · M.Sc · מרצה</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bio & Credentials */}
          <div className="lg:col-span-7">
            <Eyebrow>נעים להכיר</Eyebrow>
            <Reveal delay={0.08}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mt-4 mb-6">
                <h2 className="text-[2.4rem] sm:text-[3.4rem] font-bold leading-[1.08] text-[#343735] m-0">
                  אורית גולדשטיין
                </h2>
                <span className="font-script text-3xl sm:text-4xl text-[#396373]/80" dir="ltr">
                  Orit Goldstein
                </span>
              </div>
            </Reveal>

            <div className="space-y-4 text-[#4c524f] text-base sm:text-[1.06rem] leading-[1.86]">
              <Reveal delay={0.14}>
                <p className="m-0">
                  אדריכלית ומעצבת פנים, המאמינה שתכנון טוב מתחיל בהבנה עמוקה של
                  האנשים והמרחב. אני משלבת חשיבה אדריכלית, הבנה הנדסית ורגישות
                  עיצובית כדי ליצור בתים מדויקים, נוחים ומלאי אופי.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="m-0">
                  אני בעלת תואר ראשון באדריכלות ובינוי ערים ותואר שני בהנדסה
                  אזרחית בהתמחות בניהול פרויקטים. לצד לימודי הום סטיילינג והכשרות
                  בתחומי תאורה, חומרים וטכנולוגיות חדשות, אני מרצה לתכנון אדריכלי
                  כבר 12 שנים ומקפידה להמשיך ללמוד ולהתעדכן.
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <p className="m-0">
                  החיבור בין העולמות מאפשר לי ללוות את הפרויקט בראייה רחבה –
                  מהתכנון והמערכות ועד לחומר, לאור ולפרט העיצובי האחרון.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8">
              {CREDENTIALS.map((cred, idx) => (
                <motion.div
                  key={cred.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + idx * 0.08,
                    ease: EASE_EDITORIAL,
                  }}
                  whileHover={{ y: -3 }}
                  className="bg-[#EAE4DA]/55 rounded-2xl p-4 sm:p-5 border border-[#C9BBA7]/50 border-r-[3px] border-r-[#396373] shadow-xs flex items-center justify-between gap-3"
                >
                  <div>
                    <strong className="block text-[#343735] text-[0.98rem] font-bold">
                      {cred.title}
                    </strong>
                    <span className="block text-[#5c625f] text-xs sm:text-sm mt-0.5">
                      {cred.subtitle}
                    </span>
                  </div>
                  <span
                    className="font-num text-xl font-semibold text-[#396373] shrink-0"
                    dir="ltr"
                  >
                    {cred.accent}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RecommendationsSection() {
  const [openZoom, setOpenZoom] = useState(false);

  useEffect(() => {
    if (!openZoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenZoom(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openZoom]);

  return (
    <section
      id="recommendations"
      className="py-20 sm:py-28 bg-[#EAE4DA]/55 relative"
    >
      <div className="max-w-[1260px] mx-auto px-5 sm:px-8">
        <div className="max-w-[660px] mx-auto text-center mb-12">
          <div className="flex justify-center">
            <Eyebrow>מילים מלקוחות</Eyebrow>
          </div>
          <Reveal delay={0.08}>
            <h2 className="text-[2.3rem] sm:text-[3.35rem] font-bold leading-[1.1] text-[#343735] mt-4 mb-4">
              החוויה שמאחורי התוצאה.
            </h2>
            <p className="text-[#5c625f] text-base sm:text-[1.1rem] leading-[1.82] m-0">
              מילים מלקוחות שליוויתי לאורך תהליך התכנון והעיצוב, על הדרך המשותפת
              ועל התוצאה.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="max-w-[700px] mx-auto relative">
            <Quote className="w-12 h-12 text-[#C9BBA7]/75 absolute -top-5 -right-3 sm:-right-7 pointer-events-none" />
            <button
              type="button"
              onClick={() => setOpenZoom(true)}
              aria-label="פתיחת צילום ההמלצה בגודל מלא"
              className="group block w-full rounded-3xl overflow-hidden bg-white border border-[#C9BBA7]/50 shadow-[0_20px_55px_rgba(29,60,71,0.1)] hover:shadow-[0_28px_70px_rgba(29,60,71,0.16)] transition-all duration-400 cursor-pointer relative"
            >
              <img
                src="./assets/site/testimonial-shulamit-whatsapp.png"
                alt="צילום מסך מקורי של המלצת שולי מרטין ב-WhatsApp"
                loading="lazy"
                className="w-full h-auto block"
              />
              <div className="absolute bottom-3.5 left-3.5 bg-[#396373]/90 backdrop-blur-md text-[#FAF8F4] text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5 opacity-95 group-hover:opacity-100 transition-opacity shadow-md">
                <Expand className="w-3.5 h-3.5" />
                <span>לחצו להגדלה</span>
              </div>
            </button>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {openZoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenZoom(false)}
            role="dialog"
            aria-modal="true"
            aria-label="המלצת לקוחה מוגדלת"
            className="fixed inset-0 z-[80] bg-[#122931]/92 backdrop-blur-md flex items-center justify-center p-5"
          >
            <button
              type="button"
              onClick={() => setOpenZoom(false)}
              aria-label="סגירה"
              className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              src="./assets/site/testimonial-shulamit-whatsapp.png"
              alt="צילום מסך מקורי של המלצת שולי מרטין ב-WhatsApp"
              onClick={(e) => e.stopPropagation()}
              className="max-w-[min(780px,94vw)] max-h-[86vh] object-contain rounded-2xl shadow-2xl bg-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function ContactSection({
  selectedService,
  onClearService,
}: {
  selectedService: string | null;
  onClearService: () => void;
}) {
  const [sentSuccess, setSentSuccess] = useState(false);
  const [messageValue, setMessageValue] = useState('');

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('contact') === 'sent') {
      setSentSuccess(true);
    }
  }, []);

  useEffect(() => {
    if (selectedService) {
      setMessageValue(
        `שלום אורית, אשמח לשמוע פרטים נוספים לגבי "${selectedService}". `
      );
    }
  }, [selectedService]);

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-gradient-to-br from-[#16333d] via-[#264b58] to-[#396373] text-[#FAF8F4] relative overflow-hidden"
    >
      <div className="arch-grid-dark absolute inset-0 opacity-50 pointer-events-none" />
      <div className="pointer-events-none absolute -top-28 -left-28 w-96 h-96 rounded-full bg-[#C9BBA7]/15 blur-3xl" />

      <div className="max-w-[1260px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <Eyebrow light>הצעד הראשון לבית שלכם</Eyebrow>
            <Reveal delay={0.08}>
              <h2 className="text-[2.4rem] sm:text-[3.5rem] font-bold leading-[1.08] mt-4 mb-5 text-[#FAF8F4]">
                יש לכם חלום לבית?
                <br />
                <span className="text-[#C9BBA7]">בואו נחשוב עליו יחד.</span>
              </h2>
              <p className="text-[#FAF8F4]/82 text-base sm:text-[1.08rem] leading-[1.82] mb-9">
                בין אם אתם בתחילת הדרך, לפני רכישת דירה או כבר מתכננים שיפוץ –
                אשמח להכיר, להבין מה אתם צריכים ולבדוק איך נכון להתקדם.
              </p>
            </Reveal>

            <div className="space-y-3.5" aria-label="פרטי התקשרות">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 transition-all duration-300 group"
              >
                <span className="w-11 h-11 rounded-xl bg-white/10 text-[#C9BBA7] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <span className="block text-xs text-white/65">אימייל</span>
                  <span dir="ltr" className="text-base font-bold text-[#FAF8F4]">
                    {CONTACT_INFO.email}
                  </span>
                </div>
              </a>

              <a
                href={CONTACT_INFO.phoneHref}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 transition-all duration-300 group"
              >
                <span className="w-11 h-11 rounded-xl bg-white/10 text-[#C9BBA7] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <span className="block text-xs text-white/65">טלפון</span>
                  <span className="text-base font-bold text-[#FAF8F4]">
                    <span dir="ltr">{CONTACT_INFO.phoneDisplay}</span> · התקשרות
                  </span>
                </div>
              </a>

              <a
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/18 hover:bg-[#25D366]/28 border border-[#25D366]/35 transition-all duration-300 group"
              >
                <span className="w-11 h-11 rounded-xl bg-[#25D366]/25 text-[#9af0b9] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <div>
                  <span className="block text-xs text-[#b8f7cf]">
                    זמינה גם בוואטסאפ
                  </span>
                  <span className="text-base font-bold text-[#FAF8F4]">
                    שליחת הודעת WhatsApp
                  </span>
                </div>
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: EASE_EDITORIAL }}
            className="lg:col-span-7 bg-[#FAF8F4] text-[#343735] rounded-3xl p-6 sm:p-10 shadow-[0_28px_80px_rgba(0,0,0,0.3)] border border-white/30"
          >
            <h3 className="text-3xl font-bold text-[#343735] m-0 mb-1.5">
              ספרו לי קצת על הפרויקט
            </h3>
            <p className="text-[#5c625f] text-sm sm:text-base m-0 mb-6">
              מלאו את הפרטים ואחזור אליכם בהקדם.
            </p>

            {selectedService && (
              <div className="mb-5 inline-flex items-center gap-2 bg-[#EAE4DA] text-[#396373] border border-[#C9BBA7] px-4 py-1.5 rounded-full text-xs font-bold">
                <span>מסלול נבחר: {selectedService}</span>
                <button
                  type="button"
                  onClick={() => {
                    onClearService();
                    setMessageValue('');
                  }}
                  aria-label="הסרת מסלול נבחר"
                  className="text-[#396373] hover:text-[#1d3c47] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {sentSuccess && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-[#e9f2ec] border-r-4 border-[#4d8769] text-[#28563f] text-sm font-medium"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>תודה שפניתם! ההודעה נשלחה בהצלחה. אחזור אליכם בהקדם.</span>
              </div>
            )}

            <form
              action={CONTACT_INFO.formAction}
              method="POST"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <input
                type="hidden"
                name="_subject"
                value={
                  selectedService
                    ? `פנייה חדשה מאתר אורית גולדשטיין – ${selectedService}`
                    : 'פנייה חדשה מאתר אורית גולדשטיין'
                }
              />
              <input
                type="hidden"
                name="_next"
                value="https://orit-goldstein.pages.dev/?contact=sent#contact"
              />
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="form-honeypot"
              />

              <label className="flex flex-col gap-1.5 text-sm font-bold text-[#343735]">
                <span>שם מלא</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="איך קוראים לכם?"
                  required
                  className="w-full rounded-xl border border-[#C9BBA7]/70 bg-white px-4 py-3 text-base font-normal text-[#343735] outline-none focus:border-[#396373] focus:ring-3 focus:ring-[#396373]/15 transition-all"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-bold text-[#343735]">
                <span>טלפון</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="מספר טלפון לחזרה"
                  className="w-full rounded-xl border border-[#C9BBA7]/70 bg-white px-4 py-3 text-base font-normal text-[#343735] outline-none focus:border-[#396373] focus:ring-3 focus:ring-[#396373]/15 transition-all"
                />
              </label>

              <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm font-bold text-[#343735]">
                <span>כתובת מייל</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-xl border border-[#C9BBA7]/70 bg-white px-4 py-3 text-base font-normal text-[#343735] outline-none focus:border-[#396373] focus:ring-3 focus:ring-[#396373]/15 transition-all"
                />
              </label>

              <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm font-bold text-[#343735]">
                <span>בכמה מילים על הפרויקט</span>
                <textarea
                  name="message"
                  rows={4}
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  placeholder="ספרו לי מה אתם מתכננים..."
                  required
                  className="w-full rounded-xl border border-[#C9BBA7]/70 bg-white px-4 py-3 text-base font-normal text-[#343735] outline-none focus:border-[#396373] focus:ring-3 focus:ring-[#396373]/15 transition-all resize-y min-h-[120px]"
                />
              </label>

              <p className="sm:col-span-2 text-xs text-[#626764] leading-relaxed m-0">
                הפרטים יועברו באמצעות שירות חיצוני לצורך שליחת הפנייה למייל העסקי,
                וישמשו לחזרה אליכם בקשר לפנייה בלבד.
              </p>

              <div className="sm:col-span-2 pt-1">
                <button
                  type="submit"
                  className="btn-shimmer inline-flex items-center justify-center gap-3 bg-[#396373] hover:bg-[#1d3c47] text-[#FAF8F4] font-bold px-8 py-4 rounded-full shadow-[0_12px_28px_rgba(57,99,115,0.28)] hover:shadow-[0_16px_34px_rgba(29,60,71,0.34)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer w-full sm:w-auto group"
                >
                  <span>שליחת הפנייה</span>
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer({
  onOpenAccessibilityStatement,
}: {
  onOpenAccessibilityStatement: () => void;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#122931] text-[#FAF8F4]/72 py-10 text-xs sm:text-sm border-t border-white/10">
      <div className="max-w-[1260px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <a href="#top" aria-label="חזרה לראש העמוד" className="inline-flex">
          <OritBrandLogo variant="light" size="sm" />
        </a>

        <div className="flex flex-wrap items-center gap-5">
          <a href="#about" className="hover:text-white transition-colors">
            אודות
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            שירותים
          </a>
          <a href="#portfolio" className="hover:text-white transition-colors">
            פרויקטים
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            יצירת קשר
          </a>
          <button
            type="button"
            onClick={onOpenAccessibilityStatement}
            className="text-[#C9BBA7] hover:text-white underline underline-offset-4 transition-colors cursor-pointer bg-transparent border-0 p-0 font-semibold"
          >
            הצהרת נגישות
          </button>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            dir="ltr"
            className="hover:text-white transition-colors"
          >
            {CONTACT_INFO.email}
          </a>
        </div>

        <span className="text-white/55">© {year} אורית גולדשטיין · כל הזכויות שמורות</span>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={CONTACT_INFO.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שליחת הודעת WhatsApp לאורית גולדשטיין"
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease: EASE_EDITORIAL }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2.5 bg-[#1f8a5b] hover:bg-[#19744c] text-white px-4 py-3 rounded-full shadow-[0_14px_34px_rgba(18,41,49,0.35)] border border-white/20"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8ef5be] opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9af0b9]" />
      </span>
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm font-bold">WhatsApp</span>
    </motion.a>
  );
}
