/* ============================================================================
   Cloudflare Pages Function: GET /api/insights
   Passcode-protected analytics aggregation endpoint for Orit's private vault.
   Never indexed, requires X-Studio-Code header matching STUDIO_PASSCODE.
   ============================================================================ */

interface Env {
  ANALYTICS_DB?: D1Database;
  STUDIO_PASSCODE?: string;
}

interface D1Database {
  prepare(query: string): {
    bind(...values: unknown[]): {
      all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
      first<T = Record<string, unknown>>(): Promise<T | null>;
    };
    all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
    first<T = Record<string, unknown>>(): Promise<T | null>;
  };
}

export const onRequestGet = async (context: {
  request: Request;
  env: Env;
}) => {
  const { request, env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
  };

  const expectedCode = env.STUDIO_PASSCODE || 'ORIT-2026-VAULT';
  const providedCode = request.headers.get('X-Studio-Code') || '';

  if (providedCode !== expectedCode) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Unauthorized' }),
      { status: 401, headers }
    );
  }

  if (!env.ANALYTICS_DB) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Database not bound yet' }),
      { status: 503, headers }
    );
  }

  try {
    const url = new URL(request.url);
    const daysParam = Math.min(365, Math.max(1, Number(url.searchParams.get('days') || 30)));
    const sinceExpr = `-${daysParam} days`;

    const db = env.ANALYTICS_DB;

    const [
      totals,
      dailyVisits,
      sources,
      referrers,
      searchTerms,
      campaigns,
      countries,
      cities,
      devices,
      browsers,
      languages,
      eventsSummary,
      topSections,
      recentVisits,
      recentConversions,
    ] = await Promise.all([
      db
        .prepare(
          `SELECT
            COUNT(*) as totalVisits,
            COUNT(DISTINCT session_id) as uniqueVisitors,
            SUM(CASE WHEN created_at >= datetime('now', '-1 day') THEN 1 ELSE 0 END) as last24h
           FROM visits WHERE created_at >= datetime('now', ?)`
        )
        .bind(sinceExpr)
        .first(),

      db
        .prepare(
          `SELECT substr(created_at, 1, 10) as day, COUNT(*) as visits, COUNT(DISTINCT session_id) as uniques
           FROM visits WHERE created_at >= datetime('now', ?)
           GROUP BY day ORDER BY day ASC`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT source_category as name, COUNT(*) as count
           FROM visits WHERE created_at >= datetime('now', ?)
           GROUP BY source_category ORDER BY count DESC LIMIT 12`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT referrer as name, COUNT(*) as count
           FROM visits WHERE created_at >= datetime('now', ?) AND referrer != ''
           GROUP BY referrer ORDER BY count DESC LIMIT 12`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT COALESCE(NULLIF(search_query, ''), NULLIF(utm_term, '')) as term, COUNT(*) as count
           FROM visits
           WHERE created_at >= datetime('now', ?)
             AND (search_query != '' OR utm_term != '')
           GROUP BY term ORDER BY count DESC LIMIT 20`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT utm_source as source, utm_medium as medium, utm_campaign as campaign, COUNT(*) as count
           FROM visits
           WHERE created_at >= datetime('now', ?)
             AND (utm_source != '' OR utm_campaign != '')
           GROUP BY utm_source, utm_medium, utm_campaign ORDER BY count DESC LIMIT 15`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT country as name, COUNT(*) as count
           FROM visits WHERE created_at >= datetime('now', ?)
           GROUP BY country ORDER BY count DESC LIMIT 12`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT city || ', ' || country as name, COUNT(*) as count
           FROM visits WHERE created_at >= datetime('now', ?) AND city != 'Unknown'
           GROUP BY city, country ORDER BY count DESC LIMIT 12`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT device as name, COUNT(*) as count
           FROM visits WHERE created_at >= datetime('now', ?)
           GROUP BY device ORDER BY count DESC`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT browser as name, COUNT(*) as count
           FROM visits WHERE created_at >= datetime('now', ?)
           GROUP BY browser ORDER BY count DESC LIMIT 8`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT lang as name, COUNT(*) as count
           FROM visits WHERE created_at >= datetime('now', ?)
           GROUP BY lang ORDER BY count DESC`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT event_type as type, COUNT(*) as count
           FROM events WHERE created_at >= datetime('now', ?)
           GROUP BY event_type ORDER BY count DESC LIMIT 15`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT event_label as name, COUNT(*) as count
           FROM events
           WHERE created_at >= datetime('now', ?) AND event_type = 'section_view'
           GROUP BY event_label ORDER BY count DESC LIMIT 12`
        )
        .bind(sinceExpr)
        .all(),

      db
        .prepare(
          `SELECT created_at, source_category, referrer, search_query, utm_campaign, country, city, device, browser, lang
           FROM visits ORDER BY id DESC LIMIT 30`
        )
        .all(),

      db
        .prepare(
          `SELECT created_at, event_type, event_label, event_meta, lang, country, device
           FROM events
           WHERE event_type IN ('whatsapp_click', 'phone_click', 'email_click', 'form_submit', 'service_select', 'concierge_complete')
           ORDER BY id DESC LIMIT 25`
        )
        .all(),
    ]);

    return new Response(
      JSON.stringify({
        ok: true,
        days: daysParam,
        totals: totals || { totalVisits: 0, uniqueVisitors: 0, last24h: 0 },
        dailyVisits: dailyVisits.results,
        sources: sources.results,
        referrers: referrers.results,
        searchTerms: searchTerms.results,
        campaigns: campaigns.results,
        countries: countries.results,
        cities: cities.results,
        devices: devices.results,
        browsers: browsers.results,
        languages: languages.results,
        eventsSummary: eventsSummary.results,
        topSections: topSections.results,
        recentVisits: recentVisits.results,
        recentConversions: recentConversions.results,
      }),
      { status: 200, headers }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 500, headers }
    );
  }
};
