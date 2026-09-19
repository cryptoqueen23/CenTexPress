// CenTex Press Live Wire — official source registry.
//
// To add a source later: add an entry here. No page or component code
// needs to change — NewsTicker.astro just iterates this list.
//
// ingestionType: 'rss' | 'atom' | 'json' | 'html-structured'
//   Only 'rss'/'atom' are implemented (src/lib/liveWireDiscovery.js parses
//   both the same way, since RSS <item> and Atom <entry> use the same
//   matching logic). 'json' and 'html-structured' are reserved for sources
//   without a real feed, once a specific ingestion method is verified and
//   built for them -- never assume one of these can be added by just
//   pointing feedUrl at a webpage.
//
// Every feedUrl below was verified with a real request before being added
// here (checked status code AND that the body is actually RSS/Atom XML,
// not a soft-404 page that happens to return HTTP 200).

export const LIVE_WIRE_SOURCES = [
  // --- City of Copperas Cove -------------------------------------------
  {
    name: 'City of Copperas Cove',
    jurisdiction: 'Copperas Cove',
    sourceType: 'official-government',
    websiteUrl: 'https://www.copperascovetx.gov',
    feedUrl: 'https://www.copperascovetx.gov/RSSFeed.aspx?ModID=1&CID=Media-Release-8',
    feedLabel: 'Media Releases',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Copperas Cove',
    jurisdiction: 'Copperas Cove',
    sourceType: 'official-government',
    websiteUrl: 'https://www.copperascovetx.gov',
    feedUrl: 'https://www.copperascovetx.gov/RSSFeed.aspx?ModID=63&CID=Public-Notices-8',
    feedLabel: 'Public Notices',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Copperas Cove',
    jurisdiction: 'Copperas Cove',
    sourceType: 'official-government',
    websiteUrl: 'https://www.copperascovetx.gov',
    feedUrl: 'https://www.copperascovetx.gov/RSSFeed.aspx?ModID=63&CID=Water-Alerts-6',
    feedLabel: 'Water Alerts',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Copperas Cove',
    jurisdiction: 'Copperas Cove',
    sourceType: 'official-government',
    websiteUrl: 'https://www.copperascovetx.gov',
    feedUrl: 'https://www.copperascovetx.gov/RSSFeed.aspx?ModID=58&CID=City-Meetings-14',
    feedLabel: 'City Meetings',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Copperas Cove',
    jurisdiction: 'Copperas Cove',
    sourceType: 'official-government',
    websiteUrl: 'https://www.copperascovetx.gov',
    feedUrl: 'https://www.copperascovetx.gov/RSSFeed.aspx?ModID=58&CID=City-Events-25',
    feedLabel: 'City Events',
    ingestionType: 'rss',
    enabled: true,
  },
  // Facebook stays in the registry as a known supplemental source, but is
  // not ingested -- do not scrape Facebook HTML. Investigate an official/
  // API-supported path separately before ever setting enabled: true here.
  {
    name: 'City of Copperas Cove (Facebook)',
    jurisdiction: 'Copperas Cove',
    sourceType: 'official-government',
    websiteUrl: 'https://www.copperascovetx.gov',
    facebookUrl: 'https://www.facebook.com/cityofcopperascove',
    feedUrl: null,
    feedLabel: null,
    ingestionType: null,
    enabled: false,
  },

  // --- City of Killeen ---------------------------------------------------
  {
    name: 'City of Killeen',
    jurisdiction: 'Killeen',
    sourceType: 'official-government',
    websiteUrl: 'https://www.killeentexas.gov',
    feedUrl: 'https://www.killeentexas.gov/RSSFeed.aspx?ModID=63&CID=Emergency-Alerts-14',
    feedLabel: 'Emergency Alerts',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Killeen',
    jurisdiction: 'Killeen',
    sourceType: 'official-government',
    websiteUrl: 'https://www.killeentexas.gov',
    feedUrl: 'https://www.killeentexas.gov/RSSFeed.aspx?ModID=63&CID=Public-Notices-7',
    feedLabel: 'Public Notices',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Killeen',
    jurisdiction: 'Killeen',
    sourceType: 'official-government',
    websiteUrl: 'https://www.killeentexas.gov',
    feedUrl: 'https://www.killeentexas.gov/RSSFeed.aspx?ModID=63&CID=RoadTrash-Alerts-5',
    feedLabel: 'Road/Trash Alerts',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Killeen',
    jurisdiction: 'Killeen',
    sourceType: 'official-government',
    websiteUrl: 'https://www.killeentexas.gov',
    feedUrl: 'https://www.killeentexas.gov/RSSFeed.aspx?ModID=63&CID=Water-Notices-call-2545016515-for-update-9',
    feedLabel: 'Water Notices',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Killeen',
    jurisdiction: 'Killeen',
    sourceType: 'official-government',
    websiteUrl: 'https://www.killeentexas.gov',
    feedUrl: 'https://www.killeentexas.gov/RSSFeed.aspx?ModID=1&CID=City-News-16',
    feedLabel: 'City News',
    ingestionType: 'rss',
    enabled: true,
  },

  // --- City of Lampasas ---------------------------------------------------
  {
    name: 'City of Lampasas',
    jurisdiction: 'Lampasas',
    sourceType: 'official-government',
    websiteUrl: 'https://www.lampasas.org',
    feedUrl: 'https://www.lampasas.org/RSSFeed.aspx?ModID=1&CID=City-of-Lampasas-News-Announcements-1',
    feedLabel: 'News & Announcements',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Lampasas',
    jurisdiction: 'Lampasas',
    sourceType: 'official-government',
    websiteUrl: 'https://www.lampasas.org',
    feedUrl: 'https://www.lampasas.org/RSSFeed.aspx?ModID=63&CID=Police-Department-Alerts-8',
    feedLabel: 'Police Alerts',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Lampasas',
    jurisdiction: 'Lampasas',
    sourceType: 'official-government',
    websiteUrl: 'https://www.lampasas.org',
    feedUrl: 'https://www.lampasas.org/RSSFeed.aspx?ModID=63&CID=Fire-Department-Alerts-7',
    feedLabel: 'Fire Alerts',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Lampasas',
    jurisdiction: 'Lampasas',
    sourceType: 'official-government',
    websiteUrl: 'https://www.lampasas.org',
    feedUrl: 'https://www.lampasas.org/RSSFeed.aspx?ModID=63&CID=Street-Closures-4',
    feedLabel: 'Street Closures',
    ingestionType: 'rss',
    enabled: true,
  },
  {
    name: 'City of Lampasas',
    jurisdiction: 'Lampasas',
    sourceType: 'official-government',
    websiteUrl: 'https://www.lampasas.org',
    feedUrl: 'https://www.lampasas.org/RSSFeed.aspx?ModID=63&CID=Weather-Delays-Closed-Facilities-12',
    feedLabel: 'Weather/Facility Closures',
    ingestionType: 'rss',
    enabled: true,
  },

  // --- Copperas Cove ISD ---------------------------------------------------
  {
    name: 'Copperas Cove ISD',
    jurisdiction: 'Copperas Cove',
    sourceType: 'official-school',
    websiteUrl: 'https://www.ccisd.com/apps/news/category/25893',
    feedUrl: 'https://www.ccisd.com/apps/news/rss?categoryid=25893',
    feedLabel: 'News & Announcements',
    ingestionType: 'rss',
    enabled: true,
  },

  // --- Not yet implemented: no verified structured feed found -----------
  // Investigated 2026-09-19, no RSS/Atom/JSON endpoint confirmed. Do not
  // set enabled: true or add a feedUrl without verifying a real endpoint
  // first -- see the handoff notes for what was actually checked.
  {
    name: 'City of Gatesville',
    jurisdiction: 'Gatesville',
    sourceType: 'official-government',
    websiteUrl: 'https://www.gatesvilletx.com',
    feedUrl: null,
    feedLabel: null,
    ingestionType: null,
    enabled: false,
  },
  {
    name: 'Coryell County',
    jurisdiction: 'Coryell County',
    sourceType: 'official-government',
    websiteUrl: 'https://www.coryellcounty.org',
    feedUrl: null,
    feedLabel: null,
    ingestionType: null,
    enabled: false,
  },
  {
    name: 'Gatesville ISD',
    jurisdiction: 'Gatesville',
    sourceType: 'official-school',
    websiteUrl: 'https://www.gatesvilleisd.org',
    feedUrl: null,
    feedLabel: null,
    ingestionType: null,
    enabled: false,
  },
  {
    name: 'Bell County',
    jurisdiction: 'Bell County',
    sourceType: 'official-government',
    websiteUrl: 'https://www.bellcountytx.com',
    feedUrl: null,
    feedLabel: null,
    ingestionType: null,
    enabled: false,
  },
  {
    name: 'TxDOT',
    jurisdiction: 'Central Texas',
    sourceType: 'official-government',
    websiteUrl: 'https://www.txdot.gov',
    feedUrl: null,
    feedLabel: null,
    ingestionType: null,
    enabled: false,
  },

  // --- Existing Google Alerts discovery (preserved, unchanged) -----------
  ...[
    'https://www.google.com/alerts/feeds/06216087127701347144/2641948236984536074',
    'https://www.google.com/alerts/feeds/06216087127701347144/16725158625857398981',
    'https://www.google.com/alerts/feeds/06216087127701347144/14158007006402028422',
    'https://www.google.com/alerts/feeds/06216087127701347144/10987992935396880387',
    'https://www.google.com/alerts/feeds/06216087127701347144/12024562057337739454',
    'https://www.google.com/alerts/feeds/06216087127701347144/6055422325229224555',
    'https://www.google.com/alerts/feeds/06216087127701347144/13331200608399096138',
    'https://www.google.com/alerts/feeds/06216087127701347144/6443056713699249503',
    'https://www.google.com/alerts/feeds/06216087127701347144/12175840774455302830',
    'https://www.google.com/alerts/feeds/06216087127701347144/1549079199892422464',
    'https://www.google.com/alerts/feeds/06216087127701347144/12175565520471968437',
    'https://www.google.com/alerts/feeds/06216087127701347144/14519644568321256964',
    'https://www.google.com/alerts/feeds/06216087127701347144/1970066642565730743',
  ].map((feedUrl) => ({
    name: 'Google Alerts (Central Texas)',
    jurisdiction: 'Central Texas',
    sourceType: 'news-media',
    websiteUrl: null,
    feedUrl,
    feedLabel: null,
    ingestionType: 'rss',
    enabled: true,
  })),
];
