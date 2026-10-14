export const INITIAL_KEYWORD_COUNT = 5;

export const BRAND_STATUSES = ['active', 'inactive'];

export const SOCIAL_NETWORK_TYPES = ['website', 'facebook', 'instagram', 'twitter'];

export function isBrandSummary(brand) {
  return Boolean(
    brand
    && Number.isInteger(brand.id)
    && typeof brand.name === 'string'
    && typeof brand.logoSrc === 'string'
    && BRAND_STATUSES.includes(brand.status)
    && typeof brand.products === 'number'
    && typeof brand.country === 'string'
  );
}

export function isSocialNetwork(social) {
  return Boolean(
    social
    && SOCIAL_NETWORK_TYPES.includes(social.type)
    && typeof social.url === 'string'
  );
}

export function isBrandDetails(brand) {
  return Boolean(
    isBrandSummary(brand)
    && typeof brand.company === 'string'
    && typeof brand.category === 'string'
    && typeof brand.phone === 'string'
    && Array.isArray(brand.keywords)
    && brand.keywords.every(keyword => typeof keyword === 'string')
    && Array.isArray(brand.socialNetworks)
    && brand.socialNetworks.every(isSocialNetwork)
  );
}
