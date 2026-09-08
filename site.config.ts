export const siteConfig = {
  asset: { id: 'WF-A002', status: 'planned' as const },
  site: {
    name: 'TBD',
    domain: 'TBD',
    url: 'https://example.invalid',
    language: 'en',
    locale: 'en-US',
    tagline: 'TBD',
    description: 'TBD',
  },
  brand: { logoText: 'WF', favicon: '/favicon.svg', themeColor: '#20252b' },
  editorial: { publisherName: 'TBD', methodologyUrl: null, affiliateDisclosureUrl: null },
  navigation: { primary: [], footer: [] },
  seo: { trailingSlash: 'always' as const, indexable: false, defaultOgImage: null },
  measurement: { provider: 'none' as const, analyticsId: null, trackAffiliateClicks: true },
  publication: { journalEnabled: true },
};
