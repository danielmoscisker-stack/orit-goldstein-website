/* ============================================================================
   Cloudflare Pages Function: POST /api/track
   Records real visitor pageviews & behavioral events into Cloudflare D1
   with real Cloudflare Edge Geo (country, city, region) — privacy-friendly!
   ============================================================================ */

interface Env {
  ANALYTICS_DB?: D1Database;
}

interface D1Database {
  prepare(query: string): {
    bind(...values: unknown[]): {
      run(): Promise<unknown>;
      all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
      first<T = Record<string, unknown>>(): Promise<T | null>;
    };
  };
}

interface CfProperties {
  country?: string;
  city?: string;
  region?: string;
}

export const onRequestPost = async (context: {
  request: Request & { cf?: CfProperties };
  env: Env;
}) => {
  const { request, env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  };

  if (!env.ANALYTICS_DB) {
    return new Response(JSON.stringify({ ok: false, reason: 'no_db' }), {
      status: 200,
      headers,
    });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const cf = request.cf || {};
    const country = String(cf.country || 'Unknown');
    const city = String(cf.city || 'Unknown');
    const region = String(cf.region || '');

    const kind = String(body.kind || 'visit');
    const sessionId = String(body.sessionId || 'anon').slice(0, 64);

    if (kind === 'visit') {
      await env.ANALYTICS_DB.prepare(
        `INSERT INTO visits (
          session_id, path, lang, referrer, source_category, search_query,
          utm_source, utm_medium, utm_campaign, utm_term,
          country, city, region, device, browser, os, screen, timezone
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          sessionId,
          String(body.path || '/').slice(0, 200),
          String(body.lang || 'he').slice(0, 10),
          String(body.referrer || '').slice(0, 500),
          String(body.sourceCategory || 'Direct').slice(0, 60),
          String(body.searchQuery || '').slice(0, 200),
          String(body.utmSource || '').slice(0, 100),
          String(body.utmMedium || '').slice(0, 100),
          String(body.utmCampaign || '').slice(0, 120),
          String(body.utmTerm || '').slice(0, 150),
          country,
          city,
          region,
          String(body.device || 'Desktop').slice(0, 30),
          String(body.browser || 'Unknown').slice(0, 40),
          String(body.os || 'Unknown').slice(0, 40),
          String(body.screen || '').slice(0, 30),
          String(body.timezone || '').slice(0, 60)
        )
        .run();
    } else if (kind === 'event') {
      await env.ANALYTICS_DB.prepare(
        `INSERT INTO events (
          session_id, event_type, event_label, event_meta, lang, country, device
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          sessionId,
          String(body.eventType || 'custom').slice(0, 60),
          String(body.eventLabel || '').slice(0, 180),
          String(body.eventMeta || '').slice(0, 300),
          String(body.lang || 'he').slice(0, 10),
          country,
          String(body.device || 'Desktop').slice(0, 30)
        )
        .run();
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 500, headers }
    );
  }
};
