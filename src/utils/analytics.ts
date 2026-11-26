/* ============================================================================
   Lightweight Privacy-Friendly Client Analytics Tracker
   Sends to /api/track (Cloudflare Pages Function -> D1) and mirrors a local
   ring buffer in localStorage so local dev preview works out of the box too.
   ============================================================================ */

const SESSION_KEY = 'orit_sid_v1';
const LOCAL_VISITS_KEY = 'orit_local_visits_v1';
const LOCAL_EVENTS_KEY = 'orit_local_events_v1';

function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return `s-${Math.random().toString(36).slice(2, 10)}`;
  }
}

function detectDevice(): string {
  const ua = navigator.userAgent;
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (window.innerWidth >= 768 && window.innerWidth <= 1024 && 'ontouchstart' in window)) {
    return 'Tablet';
  }
  if (/Mobi|Android|iPhone|iPod/i.test(ua) || window.innerWidth < 768) {
    return 'Mobile';
  }
  return 'Desktop';
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (/Edg\//i.test(ua)) return 'Edge';
  if (/OPR\//i.test(ua)) return 'Opera';
  if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) return 'Chrome';
  if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return 'Safari';
  if (/Firefox\//i.test(ua)) return 'Firefox';
  return 'Other';
}

function detectOS(): string {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Mac OS X/i.test(ua)) return 'macOS';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Other';
}

function classifySource(referrer: string, params: URLSearchParams): {
  sourceCategory: string;
  searchQuery: string;
} {
  const utmSource = (params.get('utm_source') || '').toLowerCase();
  const hasGclid = params.has('gclid');
  const hasFbclid = params.has('fbclid');

  let searchQuery =
    params.get('q') ||
    params.get('query') ||
    params.get('search') ||
    params.get('keyword') ||
    params.get('utm_term') ||
    '';

  if (referrer) {
    try {
      const refUrl = new URL(referrer);
      const host = refUrl.hostname.toLowerCase();

      if (!searchQuery) {
        searchQuery =
          refUrl.searchParams.get('q') ||
          refUrl.searchParams.get('p') ||
          refUrl.searchParams.get('text') ||
          '';
      }

      if (host.includes('google.')) return { sourceCategory: hasGclid ? 'Google Ads' : 'Google Search', searchQuery };
      if (host.includes('bing.com')) return { sourceCategory: 'Bing Search', searchQuery };
      if (host.includes('duckduckgo.')) return { sourceCategory: 'DuckDuckGo', searchQuery };
      if (host.includes('yahoo.')) return { sourceCategory: 'Yahoo Search', searchQuery };
      if (host.includes('yandex.')) return { sourceCategory: 'Yandex Search', searchQuery };
      if (host.includes('chatgpt.com') || host.includes('openai.com')) return { sourceCategory: 'ChatGPT / AI', searchQuery };
      if (host.includes('perplexity.ai')) return { sourceCategory: 'Perplexity AI', searchQuery };
      if (host.includes('instagram.com') || host.includes('l.instagram.com')) return { sourceCategory: 'Instagram', searchQuery };
      if (host.includes('facebook.com') || host.includes('fb.com') || host.includes('l.facebook.com')) return { sourceCategory: 'Facebook', searchQuery };
      if (host.includes('whatsapp.com') || host.includes('wa.me')) return { sourceCategory: 'WhatsApp', searchQuery };
      if (host.includes('linkedin.com')) return { sourceCategory: 'LinkedIn', searchQuery };
      if (host.includes('tiktok.com')) return { sourceCategory: 'TikTok', searchQuery };
      if (host.includes('youtube.com')) return { sourceCategory: 'YouTube', searchQuery };
      if (host === window.location.hostname) return { sourceCategory: 'Direct', searchQuery };
      return { sourceCategory: `Referral (${host.replace(/^www\./, '')})`, searchQuery };
    } catch {
      // ignore invalid referrer URL
    }
  }

  if (hasGclid || utmSource.includes('google')) return { sourceCategory: hasGclid ? 'Google Ads' : 'Google Search', searchQuery };
  if (hasFbclid || utmSource.includes('facebook') || utmSource === 'fb') return { sourceCategory: 'Facebook', searchQuery };
  if (utmSource.includes('instagram') || utmSource === 'ig') return { sourceCategory: 'Instagram', searchQuery };
  if (utmSource.includes('whatsapp') || utmSource === 'wa') return { sourceCategory: 'WhatsApp', searchQuery };
  if (utmSource) return { sourceCategory: utmSource, searchQuery };

  return { sourceCategory: 'Direct', searchQuery };
}

function saveLocal(key: string, entry: Record<string, unknown>) {
  try {
    const raw = localStorage.getItem(key);
    const arr = raw ? (JSON.parse(raw) as Record<string, unknown>[]) : [];
    arr.unshift(entry);
    localStorage.setItem(key, JSON.stringify(arr.slice(0, 120)));
  } catch {
    // ignore storage quota errors
  }
}

function sendPayload(payload: Record<string, unknown>, useBeacon = false) {
  const json = JSON.stringify(payload);
  try {
    if (useBeacon && navigator.sendBeacon) {
      const blob = new Blob([json], { type: 'application/json' });
      navigator.sendBeacon('/api/track', blob);
      return;
    }
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json,
      keepalive: true,
    }).catch(() => {
      // silent fail on local static dev
    });
  } catch {
    // ignore
  }
}

let visitTracked = false;

export function trackPageVisit(lang: string) {
  if (visitTracked) return;
  // Do not track visits to the private analytics vault itself
  if (
    window.location.hash.includes('studio-vault-947x') ||
    window.location.pathname.includes('studio-vault-947x')
  ) {
    return;
  }
  visitTracked = true;

  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || '';
  const { sourceCategory, searchQuery } = classifySource(referrer, params);

  const payload = {
    kind: 'visit',
    sessionId: getSessionId(),
    created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
    path: window.location.pathname + window.location.search,
    lang,
    referrer,
    sourceCategory,
    searchQuery,
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmTerm: params.get('utm_term') || '',
    device: detectDevice(),
    browser: detectBrowser(),
    os: detectOS(),
    screen: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
  };

  saveLocal(LOCAL_VISITS_KEY, payload);
  sendPayload(payload);
}

export function trackEvent(
  eventType: string,
  eventLabel = '',
  eventMeta = '',
  useBeacon = false
) {
  if (
    window.location.hash.includes('studio-vault-947x') ||
    window.location.pathname.includes('studio-vault-947x')
  ) {
    return;
  }
  const lang = document.documentElement.lang || 'he';
  const payload = {
    kind: 'event',
    sessionId: getSessionId(),
    created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
    eventType,
    eventLabel,
    eventMeta,
    lang,
    device: detectDevice(),
  };

  saveLocal(LOCAL_EVENTS_KEY, payload);
  sendPayload(payload, useBeacon);
}

export function readLocalFallbackData() {
  try {
    const visits = JSON.parse(localStorage.getItem(LOCAL_VISITS_KEY) || '[]') as Record<string, string>[];
    const events = JSON.parse(localStorage.getItem(LOCAL_EVENTS_KEY) || '[]') as Record<string, string>[];
    return { visits, events };
  } catch {
    return { visits: [], events: [] };
  }
}
