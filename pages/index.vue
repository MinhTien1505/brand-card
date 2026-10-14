<template>
  <main class="brands-page">
    <BrandsGrid :brands="brands" />
    <BrandsPagination
      :current-page="pagination.page"
      :page-count="pagination.pageCount"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      @change="changePage"
    />
  </main>
</template>

<script>
import { getBrands } from "~/api/brands";
import BrandsGrid from "~/components/organisms/BrandsGrid.vue";
import BrandsPagination from "~/components/molecules/BrandsPagination.vue";
import { DEFAULT_BRAND_PAGE, DEFAULT_BRAND_PAGE_SIZE } from "~/constants/pagination";

export default {
  name: "BrandsPage",
  components: {
    BrandsGrid,
    BrandsPagination,
  },
  watchQuery: ["page"],
  async asyncData({ query }) {
    const requestedPage = Number(query.page) || DEFAULT_BRAND_PAGE;
    const result = await getBrands(requestedPage, DEFAULT_BRAND_PAGE_SIZE);

    return {
      brands: result.items,
      pagination: {
        page: result.page,
        pageCount: result.pageCount,
        pageSize: result.pageSize,
        total: result.total,
      },
    };
  },
  methods: {
    changePage(page) {
      if (page === this.pagination.page) return;

      this.$router.push({
        query: page === 1 ? {} : { ...this.$route.query, page: String(page) },
      });
    },
  },
};
</script>

<style lang="scss">
@use "~/assets/scss/variables" as *;

.brands-page {
  min-height: 100vh;
  padding: $space-10;
  background: $color-page-background;
  color: $color-text-primary;
}

@media (max-width: $breakpoint-page-mobile) {
  .brands-page {
    padding: $space-9 $space-7;
  }
}
</style>
