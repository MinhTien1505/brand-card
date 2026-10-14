<template>
  <div class="brand-meta">
    <span class="brand-meta__label">{{ label }}</span>
    <span class="brand-meta__value">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: "BrandMeta",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as *;

.brand-meta {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  padding: $space-4;
  color: $color-text-secondary;

  &__label {
    font-size: $font-size-micro;
  }

  &__value {
    color: $color-text-meta;
    font-size: $font-size-small;
  }
}
</style>
