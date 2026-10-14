<template>
  <section class="brands-grid-section" aria-labelledby="brands-title">
    <h1 id="brands-title" class="brands-grid-section__title">{{ text.listingTitle }}</h1>
    <div class="brands-grid">
      <BrandCard v-for="brand in brands" :key="brand.id" :brand="brand" />
    </div>
  </section>
</template>

<script>
import BrandCard from "~/components/molecules/BrandCard.vue";
import { BRAND_TEXT } from "~/constants/text/brands";
import { isBrandSummary } from "~/constants/brand";

export default {
  name: "BrandsGrid",
  components: {
    BrandCard,
  },
  data() {
    return {
      text: BRAND_TEXT,
    };
  },
  props: {
    brands: {
      type: Array,
      required: true,
      validator: brands => Array.isArray(brands) && brands.every(isBrandSummary),
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as *;

.brands-grid-section {
  &__title {
    margin: $space-1 0 $space-13;
    color: $color-text-primary;
    font-size: $font-size-section-title;
    font-weight: $font-weight-bold;
    line-height: $line-height-tight;
  }
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: $space-11;
}

@media (max-width: $breakpoint-tablet) {
  .brands-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-7;
  }
}

@media (max-width: $breakpoint-small-mobile) {
  .brands-grid {
    grid-template-columns: 1fr;
  }
}
</style>
