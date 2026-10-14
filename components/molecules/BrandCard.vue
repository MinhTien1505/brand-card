<template>
  <nuxt-link :to="`/brands/${brand.id}`" class="brand-card-link">
    <article class="brand-card">
      <div class="brand-card__logo">
        <BrandLogo :name="brand.name" :src="brand.logoSrc" />
      </div>
      <div class="brand-card__identity">
        <h2 class="brand-card__name">{{ brand.name }}</h2>
        <StatusBadge :status="brand.status" />
      </div>
      <div class="brand-card__details">
        <BrandMeta :label="text.country" :value="brand.country" />
        <BrandMeta :label="text.products" :value="brand.products" />
      </div>
    </article>
  </nuxt-link>
</template>

<script>
import BrandLogo from "~/components/atoms/BrandLogo.vue";
import StatusBadge from "~/components/atoms/StatusBadge.vue";
import BrandMeta from "~/components/atoms/BrandMeta.vue";
import { BRAND_TEXT } from "~/constants/text/brands";
import { isBrandSummary } from "~/constants/brand";

export default {
  name: "BrandCard",
  components: {
    BrandLogo,
    StatusBadge,
    BrandMeta,
  },
  data() {
    return {
      text: BRAND_TEXT,
    };
  },
  props: {
    brand: {
      type: Object,
      required: true,
      validator: isBrandSummary,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as *;

.brand-card-link {
  display: block;
  color: inherit;
  text-decoration: none;

  &:focus-visible {
    outline: none;

    .brand-card {
      outline: $space-1 solid $color-focus;
      outline-offset: $border-width;
    }
  }
}

.brand-card {
  display: block;
  min-width: 0;
  overflow: hidden;
  border: $border-width solid $color-border;
  border-radius: $border-radius-card;
  background: $color-surface;
  box-shadow: $shadow-card;
  transition: box-shadow $transition-fast, transform $transition-fast;

  &:hover {
    box-shadow: $shadow-card-hover;
    transform: translateY(-$border-width);
  }

  &__logo {
    display: flex;
    height: $brand-card-logo-height;
    align-items: center;
    justify-content: center;
    padding: $space-5;
  }

  &__identity {
    display: flex;
    height: $brand-card-identity-height;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-4;
    border-top: $border-width solid $color-border-subtle;
  }

  &__name {
    max-width: 100%;
    overflow: hidden;
    margin: 0;
    color: $color-text-primary;
    font-size: $font-size-card-title;
    font-weight: $font-weight-bold;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__details {
    display: flex;
    height: $space-16;
    border-top: $border-width solid $color-border-subtle;

    > :first-child {
      border-right: $border-width solid $color-border-subtle;
    }
  }
}
</style>
