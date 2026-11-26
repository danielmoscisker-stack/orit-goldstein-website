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
  Sparkles,
} from 'lucide-react';
import { OritBrandLogo } from './OritBrandLogo';
import { readLocalFallbackData } from '../utils/analytics';

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
    countries: [{ name: 'Local Preview', count: visits.length }],
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
      city: 'Dev',
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

export function StudioVaultPage() {
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

  // Built-in UTM Link Builder for Orit's Ads & Social Posts
  const [utmSource, setUtmSource] = useState('instagram');
  const [utmCampaign, setUtmCampaign] = useState('portfolio-2026');
  const [utmTerm, setUtmTerm] = useState('');
  const [copiedUtm, setCopiedUtm] = useState(false);

  // Inject noindex meta so search engines never index the vault
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
        setError('קוד גישה שגוי / Invalid access code');
        setAuthCode('');
        sessionStorage.removeItem(VAULT_SESSION_KEY);
        setData(null);
        setLoading(false);
        return;
      }

      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        // Local Vite dev server has no /api/insights — validate local passcode and show local preview data
        if (code === 'ORIT-2026-VAULT') {
          setIsLocalFallback(true);
          setData(aggregateLocalFallback(rangeDays));
          sessionStorage.setItem(VAULT_SESSION_KEY, code);
          setAuthCode(code);
        } else {
          setError('קוד גישה שגוי / Invalid access code');
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
        setError('שגיאת חיבור לשרת / Connection error');
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

  // Passcode Gate Screen
  if (!authCode || !data) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-gradient-to-br from-[#122931] via-[#1d3c47] to-[#396373] flex items-center justify-center p-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-[420px] bg-[#FAF8F4] rounded-3xl p-8 shadow-2xl border border-white/25 text-center"
        >
          <div className="mb-5 flex justify-center">
            <OritBrandLogo variant="dark" size="sm" showSubtitle={false} />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#396373]/12 text-[#396373] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-[#343735] mb-1">
            כספת נתוני הסטודיו
          </h1>
          <p className="text-sm text-[#626764] mb-6">
            גישה פרטית לסטטיסטיקות תנועה, חיפושים ופניות
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              dir="ltr"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="הזינו קוד גישה..."
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
              {loading ? 'מאמת...' : 'פתיחת לוח הנתונים'}
            </button>
          </form>

          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#396373] hover:underline mt-6"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>חזרה לאתר הראשי</span>
          </a>
        </motion.div>
      </div>
    );
  }

  const maxDaily = Math.max(...data.dailyVisits.map((d) => d.visits), 1);

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF8F4] text-[#343735] pb-16">
      {/* Top Studio Vault Header */}
      <header className="sticky top-0 z-30 bg-[#122931] text-[#FAF8F4] border-b border-white/10 shadow-lg">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <OritBrandLogo variant="light" size="sm" showSubtitle={false} />
            <div>
              <h1 className="text-lg font-bold m-0 flex items-center gap-2">
                <span>לוח בקרה וניתוח תנועה</span>
                {isLocalFallback && (
                  <span className="text-[11px] bg-[#C9BBA7] text-[#122931] px-2 py-0.5 rounded-full">
                    מצב מקומי
                  </span>
                )}
              </h1>
              <p className="text-xs text-[#C9BBA7] m-0">
                נתוני אמת · מקורות הגעה · מילות חיפוש · המרות
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Time Range Pills */}
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
                  {d} ימים
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
              <span className="hidden sm:inline">רענון</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-red-500/20 hover:bg-red-500/35 text-red-100 text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">נעילה</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1320px] mx-auto px-5 sm:px-8 pt-8 space-y-7">
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: `סה״כ ביקורים (${days} ימים)`,
              value: data.totals.totalVisits ?? 0,
              icon: Eye,
            },
            {
              label: 'מבקרים ייחודיים',
              value: data.totals.uniqueVisitors ?? 0,
              icon: Users,
            },
            {
              label: 'ביקורים ב-24 השעות האחרונות',
              value: data.totals.last24h ?? 0,
              icon: Clock,
            },
            {
              label: 'אינטראקציות והמרות',
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
              <span>מגמת ביקורים יומית</span>
            </h2>
            <span className="text-xs text-[#626764]">
              {data.dailyVisits.length} ימים פעילים
            </span>
          </div>
          {data.dailyVisits.length === 0 ? (
            <p className="text-sm text-[#626764] text-center py-8 m-0">
              עדיין אין ביקורים בטווח התאריכים שנבחר.
            </p>
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
              <span>איך אנשים מגיעים לאתר (מקורות)</span>
            </h2>
            <BarList items={data.sources} emptyText="אין נתוני מקורות עדיין" />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
            <h2 className="text-base font-bold text-[#343735] mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-[#396373]" />
              <span>מה חיפשו (מילות חיפוש ו-UTM Term)</span>
            </h2>
            <BarList
              items={data.searchTerms.map((s) => ({ name: s.term, count: s.count }))}
              emptyText="מילות חיפוש יופיעו כאן ממנועי חיפוש, קמפיינים ממומנים (Google Ads) וקישורים מתויגים."
            />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
            <h2 className="text-base font-bold text-[#343735] mb-4 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-[#396373]" />
              <span>אתרים מפנים (Referrers)</span>
            </h2>
            <BarList
              items={data.referrers}
              emptyText="עדיין אין הפניות מאתרים חיצוניים"
            />
          </div>
        </div>

        {/* Geo + Devices/Languages + Section Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
            <h2 className="text-base font-bold text-[#343735] mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#396373]" />
              <span>ערים ומדינות (Cloudflare Geo)</span>
            </h2>
            <BarList
              items={data.cities.length ? data.cities : data.countries}
              emptyText="אין נתוני מיקום עדיין"
            />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
            <h2 className="text-base font-bold text-[#343735] mb-4 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#396373]" />
              <span>מכשירים, דפדפנים ושפות</span>
            </h2>
            <div className="space-y-5">
              <BarList items={data.devices} emptyText="אין נתוני מכשירים" />
              <div className="pt-4 border-t border-[#EAE4DA]">
                <span className="block text-xs font-bold text-[#626764] mb-2">
                  שפת גלישה
                </span>
                <BarList items={data.languages} emptyText="אין נתוני שפות" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
            <h2 className="text-base font-bold text-[#343735] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#396373]" />
              <span>אילו אזורים באתר הכי מעניינים</span>
            </h2>
            <BarList
              items={
                data.topSections.length
                  ? data.topSections
                  : data.eventsSummary.map((e) => ({ name: e.type, count: e.count }))
              }
              emptyText="אין נתוני גלילה ואינטראקציות עדיין"
            />
          </div>
        </div>

        {/* High-Intent Conversions & Leads Activity */}
        <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
          <h2 className="text-base font-bold text-[#343735] mb-4">
            פעולות בעלות כוונת פנייה גבוהה (WhatsApp, טלפון, טופס, שאלון התאמה)
          </h2>
          {data.recentConversions.length === 0 ? (
            <p className="text-sm text-[#626764] py-4 text-center m-0">
              כאשר מבקרים ילחצו על וואטסאפ, טלפון, אימייל, בחירת מסלול או שאלון ההתאמה – הפעולות יופיעו כאן בזמן אמת.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-right border-collapse">
                <thead>
                  <tr className="border-b border-[#EAE4DA] text-[#626764]">
                    <th className="py-2.5 px-3">זמן (UTC)</th>
                    <th className="py-2.5 px-3">סוג פעולה</th>
                    <th className="py-2.5 px-3">פירוט</th>
                    <th className="py-2.5 px-3">שפה</th>
                    <th className="py-2.5 px-3">מכשיר / מדינה</th>
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
                      <td className="py-2.5 px-3 uppercase font-bold text-xs">
                        {ev.lang}
                      </td>
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

        {/* Recent Live Visitors Log */}
        <div className="bg-white rounded-2xl p-6 border border-[#C9BBA7]/50 shadow-xs">
          <h2 className="text-base font-bold text-[#343735] mb-4">
            מבקרים אחרונים באתר (30 אחרונים)
          </h2>
          {data.recentVisits.length === 0 ? (
            <p className="text-sm text-[#626764] py-4 text-center m-0">
              עדיין אין ביקורים רשומים.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-right border-collapse">
                <thead>
                  <tr className="border-b border-[#EAE4DA] text-[#626764]">
                    <th className="py-2.5 px-3">זמן (UTC)</th>
                    <th className="py-2.5 px-3">מקור הגעה</th>
                    <th className="py-2.5 px-3">מילת חיפוש / קמפיין</th>
                    <th className="py-2.5 px-3">מיקום</th>
                    <th className="py-2.5 px-3">מכשיר ודפדפן</th>
                    <th className="py-2.5 px-3">שפה</th>
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
                      <td className="py-2.5 px-3 uppercase font-bold text-xs">
                        {v.lang}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Built-In Campaign & Search Link Builder (UTM Generator) */}
        <div className="bg-[#1d3c47] text-[#FAF8F4] rounded-2xl p-6 shadow-lg">
          <h2 className="text-base font-bold text-[#FAF8F4] mb-1">
            מחולל קישורים למעקב קמפיינים (Instagram / Facebook / Google Ads)
          </h2>
          <p className="text-xs text-[#C9BBA7] mb-5">
            צרו קישור מתויג לשיתוף בפוסטים או מודעות כדי לראות בדיוק מאיזה פרסום ומילת חיפוש הגיעו הלקוחות.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <input
              type="text"
              value={utmSource}
              onChange={(e) => setUtmSource(e.target.value)}
              placeholder="מקור (instagram / google / whatsapp)"
              className="rounded-xl bg-white/10 border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 outline-none"
            />
            <input
              type="text"
              value={utmCampaign}
              onChange={(e) => setUtmCampaign(e.target.value)}
              placeholder="שם קמפיין (kitchen-design)"
              className="rounded-xl bg-white/10 border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 outline-none"
            />
            <input
              type="text"
              value={utmTerm}
              onChange={(e) => setUtmTerm(e.target.value)}
              placeholder="מילת חיפוש / נושא (עיצוב מטבח)"
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
              <span>{copiedUtm ? 'הועתק!' : 'העתקת קישור'}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
