<template>
  <span class="status-badge" :class="`status-badge--${status}`">
    {{ text.status[status] }}
  </span>
</template>

<script>
import { BRAND_TEXT } from "~/constants/text/brands";
import { BRAND_STATUSES } from "~/constants/brand";

export default {
  name: "StatusBadge",
  props: {
    status: {
      type: String,
      required: true,
      validator: value => BRAND_STATUSES.includes(value),
    },
  },
  data() {
    return {
      text: BRAND_TEXT,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as *;

.status-badge {
  display: inline-block;
  padding: $space-1 $space-3;
  border-radius: $border-radius-small;
  font-size: $font-size-micro;
  line-height: $line-height-badge;

  &--active {
    background: $color-status-active-background;
    color: $color-status-active-text;
  }

  &--inactive {
    background: $color-status-inactive-background;
    color: $color-status-inactive-text;
  }
}
</style>
