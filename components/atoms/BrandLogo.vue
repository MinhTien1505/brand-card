<template>
  <img
    class="brand-logo"
    :src="src"
    :alt="`${name} logo`"
    loading="lazy"
    decoding="async"
  />
</template>

<script>
export default {
  name: "BrandLogo",
  props: {
    name: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as *;

.brand-logo {
  display: block;
  width: 100%;
  max-width: $brand-logo-max-width;
  max-height: $brand-logo-max-height;
  object-fit: contain;
}
</style>
