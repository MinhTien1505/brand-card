const brandTemplates = [
  {
    name: 'Grab',
    logoSrc: '/brands/grab.png',
    status: 'active',
    products: 250,
    country: 'Singapore'
  },
  {
    name: 'Amazon',
    logoSrc: '/brands/amazon.png',
    status: 'inactive',
    products: 400,
    country: 'Singapore'
  },
  {
    name: 'Esprit',
    logoSrc: '/brands/esprit.png',
    status: 'active',
    products: 250,
    country: 'Singapore'
  },
  {
    name: 'Grab',
    logoSrc: '/brands/grab.png',
    status: 'active',
    products: 250,
    country: 'Singapore'
  },
  {
    name: 'Lazada',
    logoSrc: '/brands/lazada.png',
    status: 'active',
    products: 300,
    country: 'Singapore'
  },
  {
    name: 'Subway',
    logoSrc: '/brands/subway.png',
    status: 'inactive',
    products: 100,
    country: 'Singapore'
  },
  {
    name: 'Kaspersky Lab',
    logoSrc: '/brands/kaspersky.png',
    status: 'active',
    products: 30,
    country: 'Singapore'
  },
  {
    name: 'Lazada',
    logoSrc: '/brands/lazada.png',
    status: 'active',
    products: 300,
    country: 'Singapore'
  },
  {
    name: 'Amazon',
    logoSrc: '/brands/amazon.png',
    status: 'inactive',
    products: 400,
    country: 'Singapore'
  },
  {
    name: 'Esprit',
    logoSrc: '/brands/esprit.png',
    status: 'active',
    products: 250,
    country: 'Singapore'
  }
];

const brandDetails = {
  Grab: {
    company: 'Grab Holdings Inc.',
    category: 'Transportation & Delivery',
    phone: '+65 6655 0005',
    keywords: ['grab', 'grab gift', 'grab voucher', 'promo code', 'ride', 'food delivery', 'rewards']
  },
  Amazon: {
    company: 'Amazon Asia-Pacific Holdings',
    category: 'E-commerce',
    phone: '+65 6722 0600',
    keywords: ['amazon', 'shopping', 'gift card', 'online store', 'books', 'electronics']
  },
  Esprit: {
    company: 'Esprit Retail Pte. Ltd.',
    category: 'Fashion',
    phone: '+65 6737 2838',
    keywords: ['fashion', 'apparel', 'style', 'clothing', 'accessories', 'sale']
  },
  Lazada: {
    company: 'Lazada Singapore Pte. Ltd.',
    category: 'E-commerce',
    phone: '+65 6995 2888',
    keywords: ['lazada', 'shopping', 'marketplace', 'electronics', 'fashion', 'deals']
  },
  Subway: {
    company: 'Subway Singapore',
    category: 'Food & Beverage',
    phone: '+65 6222 2888',
    keywords: ['subway', 'sandwich', 'fresh', 'lunch', 'meal', 'food']
  },
  'Kaspersky Lab': {
    company: 'Kaspersky Lab Singapore',
    category: 'Technology',
    phone: '+65 3158 0120',
    keywords: ['cybersecurity', 'internet security', 'antivirus', 'privacy', 'technology']
  }
};

function createBrandRecord(template, id) {
  const details = brandDetails[template.name] || {
    company: `${template.name} Singapore Pte. Ltd.`,
    category: 'Retail',
    phone: '+65 6123 4567',
    keywords: [template.name.toLowerCase(), 'gift card', 'shopping', 'rewards', 'special offer']
  };
  const websiteSlug = template.name.toLowerCase().replace(/\s+/g, '');

  return {
    id,
    ...template,
    ...details,
    socialNetworks: [
      { type: 'website', url: `https://www.${websiteSlug}.com` },
      { type: 'facebook', url: 'https://www.facebook.com' },
      { type: 'instagram', url: 'https://www.instagram.com' },
      { type: 'twitter', url: 'https://www.twitter.com' }
    ]
  };
}

export const MOCK_BRANDS = Array.from({ length: 198 }, (_, index) => {
  const template = brandTemplates[index % brandTemplates.length];
  return createBrandRecord(template, index + 1);
});
