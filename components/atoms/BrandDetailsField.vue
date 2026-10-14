<template>
  <div class="brand-details-field">
    <span class="brand-details-field__label">{{ label }}</span>
    <span class="brand-details-field__value">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'BrandDetailsField',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.brand-details-field {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: $space-2;

  &__label {
    color: $color-text-muted;
    font-size: $font-size-small;
  }

  &__value {
    overflow-wrap: anywhere;
    color: $color-text-primary;
    font-size: $font-size-body;
    line-height: $line-height-normal;
  }
}
</style>
