import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  RefreshCw,
  LogOut,
  Users,
  Eye,
  Clock,
  Search,
  Globe,
  Smartphone,
  MousePointerClick,
  MapPin,
  Link2,
  Copy,
  Check,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { OritBrandLogo } from './OritBrandLogo';
import { readLocalFallbackData } from '../utils/analytics';
import { useLanguage } from '../i18n/LanguageContext';
import { Lang } from '../i18n/translations';

interface InsightsResponse {
  ok: boolean;
  days: number;
  totals: { totalVisits: number; uniqueVisitors: number; last24h: number };
  dailyVisits: { day: string; visits: number; uniques: number }[];
  sources: { name: string; count: number }[];
  referrers: { name: string; count: number }[];
  searchTerms: { term: string; count: number }[];
  campaigns: { source: string; medium: string; campaign: string; count: number }[];
  countries: { name: string; count: number }[];
  cities: { name: string; count: number }[];
  devices: { name: string; count: number }[];
  browsers: { name: string; count: number }[];
  languages: { name: string; count: number }[];
  eventsSummary: { type: string; count: number }[];
  topSections: { name: string; count: number }[];
  recentVisits: {
    created_at: string;
    source_category: string;
    referrer: string;
    search_query: string;
    utm_campaign: string;
    country: string;
    city: string;
    device: string;
    browser: string;
    lang: string;
  }[];
  recentConversions: {
    created_at: string;
    event_type: string;
    event_label: string;
    event_meta: string;
    lang: string;
    country: string;
    device: string;
  }[];
}

const VAULT_COPY = {
  he: {
    loginTitle: 'כספת נתוני הסטודיו',
    loginSub: 'גישה פרטית לסטטיסטיקות תנועה, חיפושים ופניות',
    codePlaceholder: 'הזינו קוד גישה...',
    verifying: 'מאמת...',
    unlockBtn: 'פתיחת לוח הנתונים',
    backHome: 'חזרה לאתר הראשי',
    wrongCode: 'קוד גישה שגוי',
    connErr: 'שגיאת חיבור לשרת',
    headerTitle: 'לוח בקרה וניתוח תנועה',
    headerSub: 'נתוני אמת · מקורות הגעה · מילות חיפוש · המרות',
    localMode: 'מצב מקומי',
    daysLabel: (d: number) => `${d} ימים`,
    refresh: 'רענון',
    lock: 'נעילה',
    kpiTotal: (d: number) => `סה״כ ביקורים (${d} ימים)`,
    kpiUnique: 'מבקרים ייחודיים',
    kpi24h: 'ביקורים ב-24 השעות האחרונות',
    kpiEvents: 'אינטראקציות והמרות',
    dailyTrend: 'מגמת ביקורים יומית',
    activeDays: (n: number) => `${n} ימים פעילים`,
    noDaily: 'עדיין אין ביקורים בטווח התאריכים שנבחר.',
    sourcesTitle: 'איך אנשים מגיעים לאתר (מקורות)',
    noSources: 'אין נתוני מקורות עדיין',
    searchTitle: 'מה חיפשו (מילות חיפוש ו-UTM Term)',
    noSearch: 'מילות חיפוש יופיעו כאן ממנועי חיפוש, קמפיינים ממומנים (Google Ads) וקישורים מתויגים.',
    referrersTitle: 'אתרים מפנים (Referrers)',
    noReferrers: 'עדיין אין הפניות מאתרים חיצוניים',
    geoTitle: 'ערים ומדינות (Cloudflare Geo)',
    noGeo: 'אין נתוני מיקום עדיין',
    devicesTitle: 'מכשירים, דפדפנים ושפות',
    noDevices: 'אין נתוני מכשירים',
    langHeading: 'שפת גלישה',
    noLangs: 'אין נתוני שפות',
    sectionsTitle: 'אילו אזורים באתר הכי מעניינים',
    noSections: 'אין נתוני גלילה ואינטראקציות עדיין',
    convTitle: 'פעולות בעלות כוונת פנייה גבוהה (WhatsApp, טלפון, טופס, שאלון התאמה)',
    noConv: 'כאשר מבקרים ילחצו על וואטסאפ, טלפון, אימייל, בחירת מסלול או שאלון ההתאמה – הפעולות יופיעו כאן בזמן אמת.',
    colTime: 'זמן (UTC)',
    colAction: 'סוג פעולה',
    colDetail: 'פירוט',
    colLang: 'שפה',
    colDeviceCountry: 'מכשיר / מדינה',
    recentTitle: 'מבקרים אחרונים באתר (30 אחרונים)',
    noRecent: 'עדיין אין ביקורים רשומים.',
    colSource: 'מקור הגעה',
    colQuery: 'מילת חיפוש / קמפיין',
    colLocation: 'מיקום',
    colDeviceBrowser: 'מכשיר ודפדפן',
    utmTitle: 'מחולל קישורים למעקב קמפיינים (Instagram / Facebook / Google Ads)',
    utmSub: 'צרו קישור מתויג לשיתוף בפוסטים או מודעות כדי לראות בדיוק מאיזה פרסום ומילת חיפוש הגיעו הלקוחות.',
    utmSourcePh: 'מקור (instagram / google / whatsapp)',
    utmCampPh: 'שם קמפיין (kitchen-design)',
    utmTermPh: 'מילת חיפוש / נושא (עיצוב מטבח)',
    copyLink: 'העתקת קישור',
    copied: 'הועתק!',
  },
  en: {
    loginTitle: 'Studio Analytics Vault',
    loginSub: 'Private access to traffic, search queries & lead insights',
    codePlaceholder: 'Enter access code...',
    verifying: 'Verifying...',
    unlockBtn: 'Unlock Dashboard',
    backHome: 'Back to main website',
    wrongCode: 'Invalid access code',
    connErr: 'Connection error',
    headerTitle: 'Traffic & Insights Dashboard',
    headerSub: 'Real-time visitors · Traffic sources · Search terms · Conversions',
    localMode: 'Local Mode',
    daysLabel: (d: number) => `${d} Days`,
    refresh: 'Refresh',
    lock: 'Lock',
    kpiTotal: (d: number) => `Total Visits (${d}d)`,
    kpiUnique: 'Unique Visitors',
    kpi24h: 'Last 24 Hours',
    kpiEvents: 'Interactions & Leads',
    dailyTrend: 'Daily Traffic Trend',
    activeDays: (n: number) => `${n} active days`,
    noDaily: 'No visits recorded in this date range yet.',
    sourcesTitle: 'How People Find the Site (Sources)',
    noSources: 'No traffic source data yet',
    searchTitle: 'What People Searched (Queries & UTM Terms)',
    noSearch: 'Search keywords will appear here from search referrers, Google Ads, and tagged campaign links.',
    referrersTitle: 'Referring Websites',
    noReferrers: 'No external referrals yet',
    geoTitle: 'Cities & Countries (Cloudflare Geo)',
    noGeo: 'No location data yet',
    devicesTitle: 'Devices, Browsers & Languages',
    noDevices: 'No device data yet',
    langHeading: 'Browsing Language',
    noLangs: 'No language data yet',
    sectionsTitle: 'Most Viewed Sections',
    noSections: 'No scroll or interaction data yet',
    convTitle: 'High-Intent Lead Actions (WhatsApp, Phone, Form, Quiz)',
    noConv: 'When visitors click WhatsApp, phone, email, select a service, or finish the project matcher, their actions appear here in real time.',
    colTime: 'Time (UTC)',
    colAction: 'Action Type',
    colDetail: 'Details',
    colLang: 'Lang',
    colDeviceCountry: 'Device / Country',
    recentTitle: 'Recent Visitors (Last 30)',
    noRecent: 'No visitors recorded yet.',
    colSource: 'Traffic Source',
    colQuery: 'Search Query / Campaign',
    colLocation: 'Location',
    colDeviceBrowser: 'Device & Browser',
    utmTitle: 'Campaign & Search Link Builder (Instagram / Facebook / Google Ads)',
    utmSub: 'Generate a tracked link for social posts or ads to see the exact campaign and keyword each client came from.',
    utmSourcePh: 'Source (instagram / google / whatsapp)',
    utmCampPh: 'Campaign name (kitchen-design)',
    utmTermPh: 'Search keyword / topic (kitchen renovation)',
    copyLink: 'Copy Link',
    copied: 'Copied!',
  },
  es: {
    loginTitle: 'Bóveda de Analíticas',
    loginSub: 'Acceso privado a estadísticas de tráfico, búsquedas y consultas',
    codePlaceholder: 'Introduce el código...',
    verifying: 'Verificando...',
    unlockBtn: 'Abrir Panel',
    backHome: 'Volver al sitio principal',
    wrongCode: 'Código de acceso incorrecto',
    connErr: 'Error de conexión',
    headerTitle: 'Panel de Tráfico y Análisis',
    headerSub: 'Visitantes en tiempo real · Fuentes · Búsquedas · Conversiones',
    localMode: 'Modo Local',
    daysLabel: (d: number) => `${d} Días`,
    refresh: 'Actualizar',
    lock: 'Bloquear',
    kpiTotal: (d: number) => `Visitas Totales (${d}d)`,
    kpiUnique: 'Visitantes Únicos',
    kpi24h: 'Últimas 24 Horas',
    kpiEvents: 'Interacciones y Leads',
    dailyTrend: 'Tendencia Diaria de Visitas',
    activeDays: (n: number) => `${n} días activos`,
    noDaily: 'Aún no hay visitas registradas en este período.',
    sourcesTitle: 'Cómo Llegan los Visitantes (Fuentes)',
    noSources: 'Aún no hay datos de fuentes',
    searchTitle: 'Qué Buscaron (Términos y UTM)',
    noSearch: 'Las palabras clave aparecerán aquí desde buscadores, Google Ads y enlaces etiquetados.',
    referrersTitle: 'Sitios de Referencia',
    noReferrers: 'Aún no hay referencias externas',
    geoTitle: 'Ciudades y Países (Cloudflare Geo)',
    noGeo: 'Aún no hay datos de ubicación',
    devicesTitle: 'Dispositivos, Navegadores e Idiomas',
    noDevices: 'Sin datos de dispositivos',
    langHeading: 'Idioma de Navegación',
    noLangs: 'Sin datos de idioma',
    sectionsTitle: 'Secciones Más Vistas',
    noSections: 'Sin datos de desplazamiento aún',
    convTitle: 'Acciones de Alta Intención (WhatsApp, Teléfono, Formulario, Quiz)',
    noConv: 'Cuando los visitantes hagan clic en WhatsApp, teléfono, correo o completen el cuestionario, aparecerán aquí.',
    colTime: 'Hora (UTC)',
    colAction: 'Acción',
    colDetail: 'Detalle',
    colLang: 'Idioma',
    colDeviceCountry: 'Dispositivo / País',
    recentTitle: 'Visitantes Recientes (Últimos 30)',
    noRecent: 'Aún no hay visitantes registrados.',
    colSource: 'Fuente',
    colQuery: 'Búsqueda / Campaña',
    colLocation: 'Ubicación',
    colDeviceBrowser: 'Dispositivo y Navegador',
    utmTitle: 'Generador de Enlaces de Campaña (Instagram / Facebook / Google Ads)',
    utmSub: 'Crea un enlace etiquetado para publicaciones o anuncios y descubre exactamente de dónde llega cada cliente.',
    utmSourcePh: 'Fuente (instagram / google / whatsapp)',
    utmCampPh: 'Campaña (kitchen-design)',
    utmTermPh: 'Palabra clave / tema',
    copyLink: 'Copiar Enlace',
    copied: '¡Copiado!',
  },
};

const VAULT_SESSION_KEY = 'orit_vault_code_v1';

function aggregateLocalFallback(days: number): InsightsResponse {
  const { visits, events } = readLocalFallbackData();
  const countBy = (arr: Record<string, string>[], key: string) => {
    const map = new Map<string, number>();
    for (const item of arr) {
      const val = item[key] || 'Unknown';
      map.set(val, (map.get(val) || 0) + 1);
    }
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  const uniqueSessions = new Set(visits.map((v) => v.sessionId)).size;
  const searchTerms = visits
    .map((v) => v.searchQuery || v.utmTerm)
    .filter(Boolean)
    .reduce<Record<string, number>>((acc, term) => {
      acc[term] = (acc[term] || 0) + 1;
      return acc;
    }, {});

  return {
    ok: true,
    days,
    totals: {
      totalVisits: visits.length,
      uniqueVisitors: uniqueSessions,
      last24h: visits.length,
    },
    dailyVisits: [
      {
        day: new Date().toISOString().slice(0, 10),
        visits: visits.length,
        uniques: uniqueSessions,
      },
    ],
    sources: countBy(visits, 'sourceCategory'),
    referrers: countBy(visits.filter((v) => v.referrer), 'referrer'),
    searchTerms: Object.entries(searchTerms).map(([term, count]) => ({ term, count })),
    campaigns: [],
    countries: [{ name: 'Local Browser', count: visits.length }],
    cities: [],
    devices: countBy(visits, 'device'),
    browsers: countBy(visits, 'browser'),
    languages: countBy(visits, 'lang'),
    eventsSummary: countBy(events, 'eventType').map((x) => ({ type: x.name, count: x.count })),
    topSections: countBy(
      events.filter((e) => e.eventType === 'section_view'),
      'eventLabel'
    ),
    recentVisits: visits.slice(0, 20).map((v) => ({
      created_at: v.created_at || '',
      source_category: v.sourceCategory || 'Direct',
      referrer: v.referrer || '',
      search_query: v.searchQuery || '',
      utm_campaign: v.utmCampaign || '',
      country: 'Local',
      city: 'Browser',
      device: v.device || 'Desktop',
      browser: v.browser || '',
      lang: v.lang || 'he',
    })),
    recentConversions: events
      .filter((e) =>
        [
          'whatsapp_click',
          'phone_click',
          'email_click',
          'form_submit',
          'service_select',
          'concierge_complete',
        ].includes(e.eventType)
      )
      .slice(0, 20)
      .map((e) => ({
        created_at: e.created_at || '',
        event_type: e.eventType || '',
        event_label: e.eventLabel || '',
        event_meta: e.eventMeta || '',
        lang: e.lang || 'he',
        country: 'Local',
        device: e.device || 'Desktop',
      })),
  };
}

function BarList({
  items,
  emptyText,
}: {
  items: { name: string; count: number }[];
  emptyText: string;
}) {
  if (!items.length) {
    return <p className="text-xs text-[#626764] py-4 text-center m-0">{emptyText}</p>;
  }
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div key={item.name}>
          <div className="flex items-center justify-between text-xs font-semibold text-[#343735] mb-1 gap-2">
            <span className="truncate">{item.name}</span>
            <span className="text-[#396373] font-bold shrink-0">{item.count}</span>
          </div>
          <div className="h-2 rounded-full bg-[#EAE4DA] overflow-hidden">
            <div
              style={{ width: `${Math.max(6, (item.count / max) * 100)}%` }}
              className="h-full rounded-full bg-gradient-to-l from-[#396373] to-[#C9BBA7]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function VaultLangSwitch({
  lang,
  setLang,
  dark = true,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  dark?: boolean;
}) {
  const opts: { code: Lang; label: string }[] = [
    { code: 'he', label: 'עב' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];
  return (
    <div
      dir="ltr"
      className={`inline-flex items-center p-1 rounded-full text-xs font-bold border ${
        dark
          ? 'bg-white/10 border-white/15'
          : 'bg-[#EAE4DA] border-[#C9BBA7]/60'
      }`}
    >
      {opts.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
            lang === o.code
              ? dark
                ? 'bg-[#C9BBA7] text-[#122931]'
                : 'bg-[#396373] text-[#FAF8F4]'
              : dark
              ? 'text-white/80 hover:text-white'
              : 'text-[#343735]/80 hover:text-[#396373]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function StudioVaultPage() {
  const { lang, setLang, isRtl } = useLanguage();
  const c = VAULT_COPY[lang];
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const [codeInput, setCodeInput] = useState('');
  const [authCode, setAuthCode] = useState<string>(() => {
    try {
      return sessionStorage.getItem(VAULT_SESSION_KEY) || '';
    } catch {
      return '';
    }
  });
  const [days, setDays] = useState<number>(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<InsightsResponse | null>(null);
  const [isLocalFallback, setIsLocalFallback] = useState(false);

  const [utmSource, setUtmSource] = useState('instagram');
  const [utmCampaign, setUtmCampaign] = useState('portfolio-2026');
  const [utmTerm, setUtmTerm] = useState('');
  const [copiedUtm, setCopiedUtm] = useState(false);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow, noarchive';
    document.head.appendChild(meta);
    document.title = 'Studio Vault · Private Insights';
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const fetchInsights = async (code: string, rangeDays: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/insights?days=${rangeDays}`, {
        headers: { 'X-Studio-Code': code },
      });

      if (res.status === 401) {
        setError(c.wrongCode);
        setAuthCode('');
        sessionStorage.removeItem(VAULT_SESSION_KEY);
        setData(null);
        setLoading(false);
        return;
      }

      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        if (code === 'ORIT-2026-VAULT') {
          setIsLocalFallback(true);
          setData(aggregateLocalFallback(rangeDays));
          sessionStorage.setItem(VAULT_SESSION_KEY, code);
          setAuthCode(code);
        } else {
          setError(c.wrongCode);
        }
        setLoading(false);
        return;
      }

      const json = (await res.json()) as InsightsResponse;
      setIsLocalFallback(false);
      setData(json);
      sessionStorage.setItem(VAULT_SESSION_KEY, code);
      setAuthCode(code);
    } catch {
      if (code === 'ORIT-2026-VAULT') {
        setIsLocalFallback(true);
        setData(aggregateLocalFallback(rangeDays));
        sessionStorage.setItem(VAULT_SESSION_KEY, code);
        setAuthCode(code);
      } else {
        setError(c.connErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authCode) {
      fetchInsights(authCode, days);
    }
  }, [authCode, days]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInput.trim()) return;
    fetchInsights(codeInput.trim(), days);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(VAULT_SESSION_KEY);
    setAuthCode('');
    setCodeInput('');
    setData(null);
  };

  const builtUtmUrl = (() => {
    const base = 'https://orit-goldstein.pages.dev/';
    const p = new URLSearchParams();
    if (utmSource.trim()) p.set('utm_source', utmSource.trim());
    if (utmCampaign.trim()) p.set('utm_campaign', utmCampaign.trim());
    if (utmTerm.trim()) p.set('utm_term', utmTerm.trim());
    return `${base}?${p.toString()}`;
  })();

  if (!authCode || !data) {
    return (
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className="min-h-screen bg-gradient-to-br from-[#122931] via-[#1d3c47] to-[#396373] flex items-center justify-center p-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-[420px] bg-[#FAF8F4] rounded-3xl p-8 shadow-2xl border border-white/25 text-center"
        >
          <div className="flex justify-end mb-3">
            <VaultLangSwitch lang={lang} setLang={setLang} dark={false} />
          </div>
          <div className="mb-5 flex justify-center">
            <OritBrandLogo variant="dark" size="sm" showSubtitle={false} />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#396373]/12 text-[#396373] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-[#343735] mb-1">
            {c.loginTitle}
          </h1>
          <p className="text-sm text-[#626764] mb-6">{c.loginSub}</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              dir="ltr"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder={c.codePlaceholder}
              autoFocus
              className="w-full text-center tracking-widest rounded-xl border border-[#C9BBA7] bg-white px-4 py-3.5 text-base font-bold text-[#343735] outline-none focus:border-[#396373] focus:ring-3 focus:ring-[#396373]/15"
            />
            {error && (
              <p className="text-xs font-bold text-red-600 m-0">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#396373] hover:bg-[#1d3c47] disabled:opacity-50 text-[#FAF8F4] font-bold py-3.5 rounded-full shadow-md transition-colors cursor-pointer"
            >
              {loading ? c.verifying : c.unlockBtn}
            </button>
          </form>

          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#396373] hover:underline mt-6"
          >
            <BackArrow className="w-3.5 h-3.5" />
            <span>{c.backHome}</span>
          </a>
        </motion.div>
      </div>
    );
  }

  const maxDaily = Math.max(...data.dailyVisits.map((d) => d.visits), 1);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-[#FAF8F4] text-[#343735] pb-16">
      <header className="sticky top-0 z-30 bg-[#122931] text-[#FAF8F4] border-b border-white/10 shadow-lg">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <OritBrandLogo variant="light" size="sm" showSubtitle={false} />
            <div>
              <h1 className="text-lg font-bold m-0 flex items-center gap-2">
                <span>{c.headerTitle}</span>
                {isLocalFallback && (
                  <span className="text-[11px] bg-[#C9BBA7] text-[#122931] px-2 py-0.5 rounded-full">
                    {c.localMode}
                  </span>
                )}
              </h1>
              <p className="text-xs text-[#C9BBA7] m-0">{c.headerSub}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <VaultLangSwitch lang={lang} setLang={setLang} dark />

            <div className="inline-flex p-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  className={`px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                    days === d ? 'bg-[#C9BBA7] text-[#122931]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {c.daysLabel(d)}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => fetchInsights(authCode, days)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{c.refresh}</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-red-500/20 hover:bg-red-500/35 text-red-100 text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{c.lock}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1320px] mx-auto px-5 sm:px-8 pt-8 space-y-7">
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: c.kpiTotal(days), value: data.totals.totalVisits ?? 0, icon: Eye },
            { label: c.kpiUnique, value: data.totals.uniqueVisitors ?? 0, icon: Users },
            { label: c.kpi24h, value: data.totals.last24h ?? 0, icon: Clock },
            {
              label: c.kpiEvents,
              value: data.eventsSummary.reduce((a, b) => a + b.count, 0),
              icon: MousePointerClick,
            },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="bg-white rounded-2xl p-5 border border-[#C9BBA7]/50 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#626764]">{kpi.label}</span>
                  <Icon className="w-4 h-4 text-[#396373]" />
                </div>
                <div className="text-3xl font-extrabold text-[#1d3c47] tabular-nums">
                  {kpi.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Daily Visits Chart */}
        <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#343735] m-0 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#396373]" />
              <span>{c.dailyTrend}</span>
            </h2>
            <span className="text-xs text-[#626764]">
              {c.activeDays(data.dailyVisits.length)}
            </span>
          </div>
          {data.dailyVisits.length === 0 ? (
            <p className="text-sm text-[#626764] text-center py-8 m-0">{c.noDaily}</p>
          ) : (
            <div className="flex items-end gap-2 h-44 overflow-x-auto pb-2" dir="ltr">
              {data.dailyVisits.map((d) => (
                <div
                  key={d.day}
                  className="flex-1 min-w-[26px] flex flex-col items-center gap-1.5 group"
                >
                  <span className="text-[10px] font-bold text-[#396373] opacity-80 group-hover:opacity-100">
                    {d.visits}
                  </span>
                  <div className="w-full bg-[#EAE4DA]/60 rounded-t-lg h-32 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${Math.max(8, (d.visits / maxDaily) * 100)}%` }}
                      className="w-full bg-gradient-to-t from-[#396373] to-[#C9BBA7] rounded-t-lg transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-[#626764]">{d.day.slice(5)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Traffic Sources + Search Queries + Referrers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
            <h2 className="text-base font-bold text-[#343735] mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#396373]" />
              <span>{c.sourcesTitle}</span>
            </h2>
            <BarList items={data.sources} emptyText={c.noSources} />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
            <h2 className="text-base font-bold text-[#343735] mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-[#396373]" />
              <span>{c.searchTitle}</span>
            </h2>
            <BarList
              items={data.searchTerms.map((s) => ({ name: s.term, count: s.count }))}
              emptyText={c.noSearch}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
            <h2 className="text-base font-bold text-[#343735] mb-4 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-[#396373]" />
              <span>{c.referrersTitle}</span>
            </h2>
            <BarList items={data.referrers} emptyText={c.noReferrers} />
          </div>
        </div>

        {/* Geo + Devices/Languages + Section Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
            <h2 className="text-base font-bold text-[#343735] mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#396373]" />
              <span>{c.geoTitle}</span>
            </h2>
            <BarList
              items={data.cities.length ? data.cities : data.countries}
              emptyText={c.noGeo}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
            <h2 className="text-base font-bold text-[#343735] mb-4 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#396373]" />
              <span>{c.devicesTitle}</span>
            </h2>
            <div className="space-y-5">
              <BarList items={data.devices} emptyText={c.noDevices} />
              <div className="pt-4 border-t border-[#EAE4DA]">
                <span className="block text-xs font-bold text-[#626764] mb-2">
                  {c.langHeading}
                </span>
                <BarList items={data.languages} emptyText={c.noLangs} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
            <h2 className="text-base font-bold text-[#343735] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#396373]" />
              <span>{c.sectionsTitle}</span>
            </h2>
            <BarList
              items={
                data.topSections.length
                  ? data.topSections
                  : data.eventsSummary.map((e) => ({ name: e.type, count: e.count }))
              }
              emptyText={c.noSections}
            />
          </div>
        </div>

        {/* High-Intent Conversions */}
        <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
          <h2 className="text-base font-bold text-[#343735] mb-4">{c.convTitle}</h2>
          {data.recentConversions.length === 0 ? (
            <p className="text-sm text-[#626764] py-4 text-center m-0">{c.noConv}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-start border-collapse">
                <thead>
                  <tr className="border-b border-[#EAE4DA] text-[#626764]">
                    <th className="py-2.5 px-3 text-start">{c.colTime}</th>
                    <th className="py-2.5 px-3 text-start">{c.colAction}</th>
                    <th className="py-2.5 px-3 text-start">{c.colDetail}</th>
                    <th className="py-2.5 px-3 text-start">{c.colLang}</th>
                    <th className="py-2.5 px-3 text-start">{c.colDeviceCountry}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE4DA]/70">
                  {data.recentConversions.map((ev, i) => (
                    <tr key={i} className="hover:bg-[#FAF8F4]">
                      <td className="py-2.5 px-3 font-mono text-xs text-[#626764]" dir="ltr">
                        {ev.created_at}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#396373]/12 text-[#396373] font-bold text-xs">
                          {ev.event_type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-medium">
                        {ev.event_label || ev.event_meta || '—'}
                      </td>
                      <td className="py-2.5 px-3 uppercase font-bold text-xs">{ev.lang}</td>
                      <td className="py-2.5 px-3 text-[#626764]">
                        {ev.device} · {ev.country}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Visitors */}
        <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
          <h2 className="text-base font-bold text-[#343735] mb-4">{c.recentTitle}</h2>
          {data.recentVisits.length === 0 ? (
            <p className="text-sm text-[#626764] py-4 text-center m-0">{c.noRecent}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-start border-collapse">
                <thead>
                  <tr className="border-b border-[#EAE4DA] text-[#626764]">
                    <th className="py-2.5 px-3 text-start">{c.colTime}</th>
                    <th className="py-2.5 px-3 text-start">{c.colSource}</th>
                    <th className="py-2.5 px-3 text-start">{c.colQuery}</th>
                    <th className="py-2.5 px-3 text-start">{c.colLocation}</th>
                    <th className="py-2.5 px-3 text-start">{c.colDeviceBrowser}</th>
                    <th className="py-2.5 px-3 text-start">{c.colLang}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE4DA]/70">
                  {data.recentVisits.map((v, i) => (
                    <tr key={i} className="hover:bg-[#FAF8F4]">
                      <td className="py-2.5 px-3 font-mono text-xs text-[#626764]" dir="ltr">
                        {v.created_at}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-[#396373]">
                        {v.source_category}
                      </td>
                      <td className="py-2.5 px-3 text-[#343735]">
                        {v.search_query || v.utm_campaign || '—'}
                      </td>
                      <td className="py-2.5 px-3 text-[#626764]">
                        {v.city !== 'Unknown' ? `${v.city}, ` : ''}
                        {v.country}
                      </td>
                      <td className="py-2.5 px-3 text-[#626764]">
                        {v.device} · {v.browser}
                      </td>
                      <td className="py-2.5 px-3 uppercase font-bold text-xs">{v.lang}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Built-In UTM Link Builder */}
        <div className="bg-[#1d3c47] text-[#FAF8F4] rounded-2xl p-6 shadow-lg">
          <h2 className="text-base font-bold text-[#FAF8F4] mb-1">{c.utmTitle}</h2>
          <p className="text-xs text-[#C9BBA7] mb-5">{c.utmSub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <input
              type="text"
              value={utmSource}
              onChange={(e) => setUtmSource(e.target.value)}
              placeholder={c.utmSourcePh}
              className="rounded-xl bg-white/10 border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 outline-none"
            />
            <input
              type="text"
              value={utmCampaign}
              onChange={(e) => setUtmCampaign(e.target.value)}
              placeholder={c.utmCampPh}
              className="rounded-xl bg-white/10 border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 outline-none"
            />
            <input
              type="text"
              value={utmTerm}
              onChange={(e) => setUtmTerm(e.target.value)}
              placeholder={c.utmTermPh}
              className="rounded-xl bg-white/10 border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 outline-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-black/25 rounded-xl p-3 border border-white/10">
            <code dir="ltr" className="text-xs text-[#C9BBA7] flex-1 break-all">
              {builtUtmUrl}
            </code>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(builtUtmUrl);
                setCopiedUtm(true);
                window.setTimeout(() => setCopiedUtm(false), 2000);
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#C9BBA7] text-[#122931] font-bold text-xs cursor-pointer shrink-0"
            >
              {copiedUtm ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUtm ? c.copied : c.copyLink}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
