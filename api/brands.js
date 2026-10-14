import { MOCK_BRANDS } from '~/mocks/data/brands';
import { DEFAULT_BRAND_PAGE, DEFAULT_BRAND_PAGE_SIZE } from '~/constants/pagination';

export function getBrands(page = DEFAULT_BRAND_PAGE, pageSize = DEFAULT_BRAND_PAGE_SIZE) {
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new RangeError('pageSize must be a positive integer.');
  }

  const total = MOCK_BRANDS.length;
  const pageCount = Math.ceil(total / pageSize);
  const safePage = Math.min(Math.max(Number(page) || 1, 1), pageCount);
  const start = (safePage - 1) * pageSize;

  return Promise.resolve({
    items: MOCK_BRANDS.slice(start, start + pageSize).map((brand) => {
      const { id, name, logoSrc, status, products, country } = brand;
      return { id, name, logoSrc, status, products, country };
    }),
    page: safePage,
    pageSize,
    total,
    pageCount
  });
}

export function getBrandDetails(id) {
  const brandId = Number(id);

  if (!Number.isInteger(brandId) || brandId < 1 || brandId > MOCK_BRANDS.length) {
    return Promise.resolve(null);
  }

  const brand = MOCK_BRANDS[brandId - 1];

  return Promise.resolve({
    ...brand,
    keywords: [...brand.keywords],
    socialNetworks: brand.socialNetworks.map(social => ({ ...social }))
  });
}
