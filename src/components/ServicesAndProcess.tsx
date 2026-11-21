import { motion } from 'framer-motion';
import { ArrowLeft, Check, Home, Sparkles } from 'lucide-react';
import { PROCESS_STEPS, SERVICES, VALUE_ITEMS } from '../data/siteData';
import { Eyebrow, Reveal, EASE_EDITORIAL } from './ArchitecturalReveal';

export function ValueStrip() {
  return (
    <section
      aria-label="היתרונות של תהליך העבודה"
      className="bg-[#183f47] text-white relative overflow-hidden"
    >
      <div className="arch-grid-dark absolute inset-0 opacity-40 pointer-events-none" />
      <div className="max-w-[1220px] mx-auto px-5 sm:px-7 py-7 sm:py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/15">
          {VALUE_ITEMS.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: EASE_EDITORIAL }}
              className="flex items-center gap-5 py-4 md:py-2 md:px-7 first:md:pr-0 last:md:pl-0"
            >
              <span
                className="text-4xl text-[#d8c3a5] leading-none shrink-0"
                style={{ fontFamily: 'var(--font-num)' }}
              >
                {item.num}
              </span>
              <div>
                <strong className="block text-base font-semibold text-white">
                  {item.title}
                </strong>
                <small className="block text-white/75 text-sm mt-0.5">
                  {item.subtitle}
                </small>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="py-20 sm:py-28 bg-[#edf2ee] relative overflow-hidden"
    >
      <div className="max-w-[1220px] mx-auto px-5 sm:px-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Eyebrow>הגישה שלי</Eyebrow>
            <Reveal delay={0.1}>
              <blockquote className="font-editorial text-[2.15rem] sm:text-[3.1rem] leading-[1.18] text-[#183f47] mt-5 m-0 relative pr-6 border-r-2 border-[#245d66]">
                עיצוב טוב מתחיל בהקשבה, ומצליח כשהוא עובד נכון גם ביום־יום.
              </blockquote>
            </Reveal>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <Reveal delay={0.18}>
              <p className="text-[#4a5551] text-lg leading-[1.9] m-0">
                כל בית מספר סיפור אחר. לכן התהליך מתחיל בהבנה של האנשים שחיים בו:
                ההרגלים, הצרכים, החלומות והתקציב. מתוך ההיכרות הזו נבנה תכנון חכם
                שמנצל נכון את החלל, מחבר בין הפונקציות ויוצר שפה עיצובית שלמה.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="text-[#4a5551] text-lg leading-[1.9] m-0">
                השילוב בין השכלה אדריכלית והנדסית לבין עיצוב פנים והום סטיילינג
                מאפשר לי לראות את התמונה הרחבה – וגם לדייק בפרטים שמשפיעים על
                התוצאה.
              </p>
            </Reveal>
            <Reveal delay={0.34}>
              <a
                href="#about"
                className="inline-flex items-center gap-2.5 text-[#245d66] hover:text-[#183f47] font-bold border-b border-[#c9b8a4] pb-1.5 mt-2 transition-colors group"
              >
                <span>להכיר אותי ואת הדרך שלי</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({
  onSelectService,
}: {
  onSelectService: (serviceName: string) => void;
}) {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-[#e9e4db] arch-grid-light relative"
    >
      <div className="max-w-[1220px] mx-auto px-5 sm:px-7">
        <div className="max-w-[700px] mb-12">
          <Eyebrow>שירותים ומסלולי עבודה</Eyebrow>
          <Reveal delay={0.08}>
            <h2 className="font-editorial text-[2.3rem] sm:text-[3.45rem] font-normal leading-[1.1] text-[#183f47] mt-4 mb-4">
              היקף הליווי שמתאים לכם.
            </h2>
            <p className="text-[#56605d] text-base sm:text-[1.12rem] leading-[1.82] m-0">
              אפשר לבחור בתהליך ממוקד לחלל אחד, בתכנון מקצועי לקראת שיפוץ, או
              בליווי מלא שמחבר את כל חלקי הבית לתמונה אחת.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.article
              key={service.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: EASE_EDITORIAL }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-2xl p-7 sm:p-8 flex flex-col transition-shadow duration-400 ${
                service.highlighted
                  ? 'bg-[#183f47] text-white shadow-[0_24px_60px_rgba(24,63,71,0.28)] border border-[#245d66]'
                  : 'bg-[#fbf9f5] text-[#292e2e] border border-[#245d66]/15 hover:shadow-[0_22px_55px_rgba(24,63,71,0.12)]'
              }`}
            >
              {/* Top Accent Line */}
              <div
                className={`absolute top-0 right-6 left-6 h-[3px] rounded-b-full ${
                  service.highlighted
                    ? 'bg-gradient-to-l from-[#d8c3a5] via-[#f5f1e9] to-[#c9b8a4]'
                    : 'bg-[#6e9293]/50 group-hover:bg-[#245d66] transition-colors'
                }`}
              />

              <div className="flex items-center justify-between mb-6">
                <span
                  className={`text-4xl leading-none ${
                    service.highlighted ? 'text-[#d8c3a5]' : 'text-[#c9b8a4]'
                  }`}
                  style={{ fontFamily: 'var(--font-num)' }}
                >
                  {service.num}
                </span>
                {service.highlighted ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/12 text-[#f5f1e9] border border-white/15">
                    <Sparkles className="w-3 h-3 text-[#d8c3a5]" />
                    <span>ליווי מקיף</span>
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-[#6e9293]">
                    {service.subtitle}
                  </span>
                )}
              </div>

              <h3
                className={`font-editorial text-[1.85rem] font-normal leading-tight mb-3 ${
                  service.highlighted ? 'text-white' : 'text-[#183f47]'
                }`}
              >
                {service.title}
              </h3>

              <p
                className={`text-[1rem] leading-[1.78] mb-6 ${
                  service.highlighted ? 'text-white/80' : 'text-[#59615e]'
                }`}
              >
                {service.description}
              </p>

              <ul className="space-y-2.5 mb-8 p-0 list-none">
                {service.bullets.map((b) => (
                  <li
                    key={b}
                    className={`flex items-start gap-2.5 text-[0.95rem] leading-relaxed ${
                      service.highlighted ? 'text-white/90' : 'text-[#4c5652]'
                    }`}
                  >
                    <Check
                      className={`w-4 h-4 mt-1 shrink-0 ${
                        service.highlighted ? 'text-[#d8c3a5]' : 'text-[#245d66]'
                      }`}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div
                className={`mt-auto pt-5 border-t flex items-center justify-between gap-3 ${
                  service.highlighted
                    ? 'border-white/15'
                    : 'border-[#245d66]/12'
                }`}
              >
                <span
                  className={`font-bold text-sm sm:text-base ${
                    service.highlighted ? 'text-[#f5f1e9]' : 'text-[#183f47]'
                  }`}
                >
                  {service.bottom}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  aria-label={`התעניינות במסלול ${service.title}`}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    service.highlighted
                      ? 'bg-[#f5f1e9] text-[#183f47] hover:bg-white'
                      : 'bg-[#245d66]/10 text-[#245d66] hover:bg-[#245d66] hover:text-white'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pre-Purchase Architectural Consultation Banner */}
        <Reveal delay={0.2}>
          <div className="mt-7 rounded-2xl bg-[#fbf9f5]/90 backdrop-blur-sm border border-[#245d66]/18 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 sm:gap-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-[#245d66]/10 border border-[#245d66]/20 flex items-center justify-center text-[#245d66] shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-editorial text-2xl font-normal text-[#183f47] m-0 mb-1.5">
                ייעוץ אדריכלי לפני רכישת דירה
              </h3>
              <p className="text-[#5d6562] text-sm sm:text-[0.98rem] leading-relaxed m-0">
                מתלבטים לגבי דירה מקבלן או נכס יד שנייה? נבחן יחד את הפוטנציאל,
                את השינויים שאתם מתכננים ואת ההיתכנות שלהם – כדי לקבל החלטה
                מושכלת לפני הרכישה.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectService('ייעוץ אדריכלי לפני רכישת דירה')}
              className="inline-flex items-center justify-center gap-2.5 border border-[#245d66] text-[#245d66] hover:bg-[#245d66] hover:text-white font-semibold px-6 py-3.5 rounded-full transition-all duration-300 shrink-0 cursor-pointer group w-full md:w-auto"
            >
              <span>לפרטים על הייעוץ</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="py-20 sm:py-28 bg-[#f5f1e9] relative overflow-hidden">
      <div className="max-w-[1220px] mx-auto px-5 sm:px-7">
        <div className="max-w-[680px] mb-14">
          <Eyebrow>איך נעבוד יחד</Eyebrow>
          <Reveal delay={0.08}>
            <h2 className="font-editorial text-[2.3rem] sm:text-[3.4rem] font-normal leading-[1.1] text-[#183f47] mt-4 mb-4">
              תהליך ברור. החלטות מדויקות.
            </h2>
            <p className="text-[#5d6562] text-base sm:text-[1.12rem] leading-[1.82] m-0">
              תכנון נכון מפחית אי־ודאות ומאפשר להתקדם צעד אחר צעד, מתוך הבנה של
              התמונה המלאה.
            </p>
          </Reveal>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative">
          {/* Connecting Animated Line (Desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: EASE_EDITORIAL }}
            style={{ transformOrigin: 'right' }}
            className="hidden lg:block absolute top-10 right-8 left-8 h-[1.5px] bg-gradient-to-l from-[#245d66] via-[#6e9293] to-[#c9b8a4]"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.12,
                  ease: EASE_EDITORIAL,
                }}
                whileHover={{ y: -6 }}
                className="relative bg-[#fbf9f5] rounded-2xl p-6 sm:p-7 border border-[#245d66]/14 shadow-xs hover:shadow-[0_18px_40px_rgba(24,63,71,0.1)] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#183f47] text-[#f5f1e9] flex items-center justify-center shadow-md relative z-10">
                    <span
                      className="text-xl leading-none"
                      style={{ fontFamily: 'var(--font-num)' }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#6e9293] bg-[#edf2ee] px-3 py-1 rounded-full">
                    {step.tag}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl font-normal text-[#183f47] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-[#5d6562] text-[0.98rem] leading-[1.8] m-0">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
