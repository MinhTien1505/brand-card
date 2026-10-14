<template>
  <section class="brand-details-panel" aria-labelledby="brand-details-title">
    <div class="brand-details-panel__hero">
      <BrandLogo :name="brand.name" :src="brand.logoSrc" />
      <h1 id="brand-details-title">{{ brand.name }}</h1>
      <StatusBadge :status="brand.status" />
    </div>

    <div class="brand-details-panel__featured">
      <BrandMeta :label="text.country" :value="brand.country" />
      <BrandMeta :label="text.products" :value="brand.products" />
    </div>

    <div class="brand-details-panel__fields">
      <BrandDetailsField :label="text.id" :value="brand.id" />
      <BrandDetailsField :label="text.company" :value="brand.company" />
      <BrandDetailsField :label="text.category" :value="brand.category" />
      <BrandDetailsField :label="text.phone" :value="brand.phone" />
    </div>

    <div class="brand-details-panel__keywords">
      <div class="brand-details-panel__section-heading">{{ text.keywords }}</div>
      <div class="keyword-list">
        <span
          v-for="keyword in visibleKeywords"
          :key="keyword"
          class="keyword-list__item"
        >
          {{ keyword }}
        </span>
        <button
          v-if="brand.keywords.length > initialKeywordCount"
          class="keyword-list__toggle"
          type="button"
          :aria-expanded="showAllKeywords"
          @click="showAllKeywords = !showAllKeywords"
        >
          {{ showAllKeywords ? text.showLess : `+${brand.keywords.length - initialKeywordCount}` }}
        </button>
      </div>
    </div>

    <div class="brand-details-panel__socials" :aria-label="text.socialNetworks">
      <BrandSocialLink
        v-for="social in brand.socialNetworks"
        :key="social.type"
        :social="social"
      />
    </div>
  </section>
</template>

<script>
import BrandLogo from '~/components/atoms/BrandLogo.vue';
import BrandMeta from '~/components/atoms/BrandMeta.vue';
import BrandDetailsField from '~/components/atoms/BrandDetailsField.vue';
import BrandSocialLink from '~/components/atoms/BrandSocialLink.vue';
import StatusBadge from '~/components/atoms/StatusBadge.vue';
import { INITIAL_KEYWORD_COUNT, isBrandDetails } from '~/constants/brand';
import { BRAND_TEXT } from '~/constants/text/brands';

export default {
  name: 'BrandDetailsPanel',
  components: {
    BrandLogo,
    BrandMeta,
    BrandDetailsField,
    BrandSocialLink,
    StatusBadge
  },
  props: {
    brand: {
      type: Object,
      required: true,
      validator: isBrandDetails
    }
  },
  data() {
    return {
      initialKeywordCount: INITIAL_KEYWORD_COUNT,
      text: BRAND_TEXT,
      showAllKeywords: false
    };
  },
  computed: {
    visibleKeywords() {
      return this.showAllKeywords
        ? this.brand.keywords
        : this.brand.keywords.slice(0, this.initialKeywordCount);
    }
  }
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.brand-details-panel {
  overflow: hidden;
  border: $border-width solid $color-border;
  border-radius: $border-radius-card;
  background: $color-surface;
  box-shadow: $shadow-card;

  &__hero {
    display: flex;
    min-height: $details-logo-panel-height;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-5;
    padding: $space-8;

    h1 {
      max-width: 100%;
      margin: 0;
      color: $color-text-primary;
      font-size: $font-size-card-title;
      font-weight: $font-weight-bold;
      text-align: center;
    }
  }

  &__featured {
    display: flex;
    min-height: $space-16;
    border-top: $border-width solid $color-border-subtle;
    border-bottom: $border-width solid $color-border-subtle;

    > :first-child {
      border-right: $border-width solid $color-border-subtle;
    }
  }

  &__fields {
    display: grid;
    gap: $space-6;
    padding: $space-8;
  }

  &__keywords {
    padding: $space-6 $space-8;
    border-top: $border-width solid $color-border-subtle;
  }

  &__section-heading {
    margin-bottom: $space-4;
    color: $color-text-muted;
    font-size: $font-size-small;
    font-weight: $font-weight-semibold;
  }

  &__socials {
    display: flex;
    min-height: $social-panel-height;
    align-items: center;
    justify-content: center;
    gap: $space-6;
    border-top: $border-width solid $color-border-subtle;
  }
}

.keyword-list {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;

  &__item,
  &__toggle {
    display: inline-flex;
    min-height: $keyword-chip-height;
    align-items: center;
    padding: 0 $space-4;
    border: 0;
    border-radius: $border-radius-control;
    background: $color-chip-background;
    color: $color-text-secondary;
    font-size: $font-size-small;
  }

  &__toggle {
    background: $color-pagination-active-background;
    color: $color-pagination-active-text;
    cursor: pointer;

    &:hover {
      background: $color-pagination-active-border;
    }

    &:focus-visible {
      outline: $space-1 solid $color-focus;
    }
  }
}
</style>
