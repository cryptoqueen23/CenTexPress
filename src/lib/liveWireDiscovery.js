// CenTex Press Live Wire — reusable RSS/Atom discovery layer.
//
// Extracted out of NewsTicker.astro so the same fetch/parse/filter/dedupe
// logic can be reused by future Live Wire automation (an editorial inbox,
// a Briefs promotion flow, etc.) without duplicating it.
//
// Note on observability: this is a static build with no database, so
// "last successful fetch" / "last error" are NOT persisted across builds --
// each build re-fetches fresh and only knows about its own outcome. This
// module logs per-source results to the build console (visible in
// Cloudflare Pages build logs) rather than pretending to track history it
// doesn't actually have anywhere to store.

// Applied only to news-media (e.g. Google Alerts) sources, which aren't
// pre-curated the way an official government feed is.
const strongLocal = ['copperas cove','coryell county','gatesville','killeen','fort cavazos','fort hood','bell county','lampasas','kemper','nolanville','harker heights','belton','temple texas','central texas','ccisd','copperas cove isd','gatesville isd','killeen isd'];
const civicTerms = ['city council','commissioners court','school board','county judge','mayor','budget','tax','water','sewer','ordinance','election','development','police','fire department','public records','isd','county','city of'];
const sourceHints = ['.gov','kwtx','kcentv','kdhnews','fox44news','statesman','texastribune','tpr.org','kut.org','communityimpact','mysanantonio'];

// Applied to every source. Generic spam/e-commerce noise.
const reject = ['coupon','shopping','sale','deal','amazon','ebay','pinterest','horoscope','lottery','celebrity','recipe','sports betting','gambling','crypto price','stock price','real estate listing','homes for sale','apartments for rent'];

// Applied only to official-* sources. Even a curated government feed can
// carry routine noise Live Wire shouldn't surface (per Mari: don't flood
// it with job postings, every calendar event, bid postings, photo galleries).
const officialNoise = ['job opening','job posting','now hiring','employment opportunity','request for proposal','request for qualifications','invitation to bid','photo gallery','photo album'];

// Some feeds (Google Alerts included) encode their own highlight markup as
// HTML entities rather than raw tags -- "&lt;b&gt;Killeen&lt;/b&gt;" -- so
// entities must decode to real tags BEFORE tag-stripping runs, or the
// stripped-looking text still has literal "&lt;b&gt;" left in it.
const clean = (s = '') => s
  .replace(/<!\[CDATA\[|\]\]>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/<[^>]*>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/\s+/g, ' ').trim();
const tag = (block, name) => clean(block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1] || '');
const attrLink = (block) => block.match(/<link[^>]+href=["']([^"']+)["']/i)?.[1] || tag(block, 'link');
const parseDate = (value) => { const t = Date.parse(value); return Number.isNaN(t) ? 0 : t; };

// Handles both RSS <item> and Atom <entry> the same way -- covers
// ingestionType 'rss' and 'atom' without needing separate code paths.
const parseFeed = (xml) => [...xml.matchAll(/<(entry|item)\b[\s\S]*?<\/\1>/gi)]
  .map((m) => m[0])
  .map((block) => ({
    title: tag(block, 'title'),
    link: attrLink(block),
    summary: tag(block, 'summary') || tag(block, 'description'),
    published: tag(block, 'published') || tag(block, 'updated') || tag(block, 'pubDate'),
  }));

const normalizeTitle = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const normalizeLink = (link) => link.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');

const isNoise = (item, terms) => {
  const hay = `${item.title} ${item.summary}`.toLowerCase();
  return terms.some((t) => hay.includes(t));
};

const passesNewsMediaFilter = (item) => {
  const hay = `${item.title} ${item.summary} ${item.link}`.toLowerCase();
  if (reject.some((t) => hay.includes(t))) return false;
  const local = strongLocal.some((t) => hay.includes(t));
  const credible = sourceHints.some((t) => hay.includes(t));
  const civic = civicTerms.some((t) => hay.includes(t));
  return local || (credible && civic);
};

async function fetchSource(source) {
  if (!source.enabled || !source.feedUrl) {
    return { source, items: [], error: null, skipped: true };
  }
  try {
    const res = await fetch(source.feedUrl, { headers: { 'User-Agent': 'CenTexPress/1.0' } });
    if (!res.ok) {
      return { source, items: [], error: `HTTP ${res.status}`, skipped: false };
    }
    const items = parseFeed(await res.text()).map((item) => ({
      ...item,
      sourceName: source.name,
      sourceType: source.sourceType,
      jurisdiction: source.jurisdiction,
      websiteUrl: source.websiteUrl,
      feedLabel: source.feedLabel,
    }));
    return { source, items, error: null, skipped: false };
  } catch (err) {
    return { source, items: [], error: String(err), skipped: false };
  }
}

// NewsTicker.astro is rendered on every page, and Astro's static build
// calls each page's components fresh -- without this cache, a single
// `astro build` would hit every source's server once per page (20+ rapid
// requests). Small municipal servers don't tolerate that; Copperas Cove's
// started returning 429 partway through a real build before this was
// added. One process-lifetime cache means every page in a build shares
// one real fetch per source, which is also just the polite way to treat
// servers CenTex Press doesn't control.
let cachedResult = null;

/**
 * Fetch, filter, and dedupe items across every enabled source in the
 * registry. Returns { items, report } -- report is this build's per-source
 * outcome, logged to the console, not persisted anywhere.
 */
export async function discoverLiveWireItems(sources, { limit = 18 } = {}) {
  if (cachedResult) return cachedResult;
  cachedResult = await fetchAndProcess(sources, limit);
  return cachedResult;
}

async function fetchAndProcess(sources, limit) {
  const results = await Promise.allSettled(sources.map(fetchSource));
  const outcomes = results.map((r) => (r.status === 'fulfilled' ? r.value : { source: null, items: [], error: String(r.reason), skipped: false }));

  const report = outcomes
    .filter((o) => !o.skipped)
    .map((o) => ({ name: o.source?.name, feedLabel: o.source?.feedLabel, ok: !o.error, error: o.error, count: o.items.length }));
  // eslint-disable-next-line no-console
  console.log('[Live Wire] source fetch report:', JSON.stringify(report));

  const raw = outcomes.flatMap((o) => o.items);

  const seenTitles = new Set();
  const seenLinks = new Set();
  const items = raw
    .filter((item) => {
      if (!item.title || !item.link) return false;
      if (isNoise(item, reject)) return false;
      if (item.sourceType?.startsWith('official-')) {
        if (isNoise(item, officialNoise)) return false;
      } else if (!passesNewsMediaFilter(item)) {
        return false;
      }
      const titleKey = normalizeTitle(item.title);
      const linkKey = normalizeLink(item.link);
      if (seenTitles.has(titleKey) || seenLinks.has(linkKey)) return false;
      seenTitles.add(titleKey);
      seenLinks.add(linkKey);
      return true;
    })
    .sort((a, b) => parseDate(b.published) - parseDate(a.published))
    .slice(0, limit);

  return { items, report };
}
