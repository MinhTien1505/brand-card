<template>
  <a
    v-if="isSupportedSocial"
    class="brand-social-link"
    :href="social.url"
    :aria-label="text.socialLinks[social.type]"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg v-if="social.type === 'website'" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4M12 3.5c2.1 2.3 3.1 5.1 3.1 8.5s-1 6.2-3.1 8.5c-2.1-2.3-3.1-5.1-3.1-8.5s1-6.2 3.1-8.5Z" />
    </svg>
    <svg v-else-if="social.type === 'facebook'" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 21v-8h2.8l.4-3.1h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
    </svg>
    <svg v-else-if="social.type === 'instagram'" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle class="brand-social-link__dot" cx="17.7" cy="6.5" r="1" />
    </svg>
    <svg v-else-if="social.type === 'twitter'" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 6.1a7.3 7.3 0 0 1-2.1.6 3.7 3.7 0 0 0 1.6-2 7.4 7.4 0 0 1-2.3.9 3.6 3.6 0 0 0-6.2 3.3 10.3 10.3 0 0 1-7.5-3.8 3.6 3.6 0 0 0 1.1 4.8 3.5 3.5 0 0 1-1.6-.4v.1a3.6 3.6 0 0 0 2.9 3.5 3.7 3.7 0 0 1-1.6.1 3.6 3.6 0 0 0 3.4 2.5A7.3 7.3 0 0 1 3 17.2a10.3 10.3 0 0 0 15.9-8.7v-.5A7.4 7.4 0 0 0 21 6.1Z" />
    </svg>
  </a>
</template>

<script>
import { BRAND_TEXT } from '~/constants/text/brands';
import { isSocialNetwork } from '~/constants/brand';

export default {
  name: 'BrandSocialLink',
  props: {
    social: {
      type: Object,
      required: true,
      validator: isSocialNetwork
    }
  },
  computed: {
    isSupportedSocial() {
      return isSocialNetwork(this.social);
    }
  },
  data() {
    return {
      text: BRAND_TEXT
    };
  }
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.brand-social-link {
  display: inline-flex;
  width: $social-link-size;
  height: $social-link-size;
  align-items: center;
  justify-content: center;
  border-radius: $border-radius-control;
  color: $color-icon;
  transition: color $transition-fast, background-color $transition-fast;

  &:hover {
    background: $color-pagination-hover-background;
    color: $color-pagination-hover-text;
  }

  &:focus-visible {
    outline: $space-1 solid $color-focus;
  }

  svg {
    width: $social-icon-size;
    height: $social-icon-size;
    fill: currentColor;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.7;
  }

  &:first-child svg,
  &:nth-child(3) svg {
    fill: none;
  }

  .brand-social-link__dot {
    fill: currentColor;
    stroke: none;
  }
}
</style>
