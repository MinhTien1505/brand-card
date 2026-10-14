<template>
  <main class="brand-details-page">
    <header class="brand-details-page__header">
      <nuxt-link to="/" class="back-link">
        <span aria-hidden="true">←</span>
        {{ text.backToBrands }}
      </nuxt-link>
      <h1>{{ text.issueGiftCard }}</h1>
    </header>

    <div class="brand-details-layout">
      <BrandDetailsPanel :brand="brand" />
      <IssueGiftCardPanel :brand-id="brand.id" />
    </div>
  </main>
</template>

<script>
import { getBrandDetails } from '~/api/brands';
import BrandDetailsPanel from '~/components/organisms/BrandDetailsPanel.vue';
import IssueGiftCardPanel from '~/components/organisms/IssueGiftCardPanel.vue';
import { BRAND_TEXT } from '~/constants/text/brands';

export default {
  name: 'BrandDetailsPage',
  components: {
    BrandDetailsPanel,
    IssueGiftCardPanel
  },
  data() {
    return {
      text: BRAND_TEXT
    };
  },
  async asyncData({ params, error }) {
    const brand = await getBrandDetails(params.id);

    if (!brand) {
      error({ statusCode: 404, message: BRAND_TEXT.notFound });
      return {};
    }

    return { brand };
  }
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.brand-details-page {
  min-height: 100vh;
  width: 100%;
  max-width: $page-max-width;
  margin: 0 auto;
  padding: 32px;
  background: $color-page-background;
  color: $color-text-primary;

  &__header {
    margin-bottom: $space-14;

    h1 {
      margin: $space-8 0 0;
      font-size: $font-size-page-title;
      font-weight: $font-weight-bold;
    }
  }
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  color: $color-pagination-hover-text;
  font-size: $font-size-small;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: $space-1 solid $color-focus;
    outline-offset: $border-width;
  }
}

.brand-details-layout {
  display: grid;
  grid-template-columns: minmax(280px, $details-panel-width) minmax(0, 1fr);
  align-items: start;
  gap: $space-14;
}

@media (max-width: $breakpoint-details-stack) {
  .brand-details-page {
    padding: $space-10;
  }

  .brand-details-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: $breakpoint-mobile) {
  .brand-details-page {
    padding: $space-9;
  }
}
</style>
