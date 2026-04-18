export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  name: 'Schoolars Hub',
  alternateName: "Scholar's Hub Goa Coaching Centre",
  description:
    'Quality tuition coaching for Science, Mathematics, English, Hindi, Konkani, Geography and History since 2021.',
  url: 'https://schoolarshub.lovable.app',
  telephone: ['+91-88303-68198', '+91-95793-39227'],
  email: 'info@schoolarshub.com',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Thivim',
      addressLocality: 'Bardez',
      addressRegion: 'Goa',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Corlim',
      addressLocality: 'Old Goa',
      addressRegion: 'Goa',
      addressCountry: 'IN',
    },
  ],
  foundingDate: '2021',
  openingHours: 'Mo-Sa 15:00-18:30',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '40',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: ['https://share.google/IQD21xKvKrogKBaU4'],
};
