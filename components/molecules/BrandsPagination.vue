<template>
  <footer class="brands-pagination">
    <nav class="pagination" :aria-label="text.pagination.navigation">
      <button
        class="pagination__arrow"
        type="button"
        :aria-label="text.pagination.previousPage"
        :disabled="currentPage <= 1"
        @click="$emit('change', currentPage - 1)"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M12.5 4.5 7 10l5.5 5.5M7.5 10h9" />
        </svg>
      </button>
      <button
        v-for="item in visiblePages"
        :key="item.key"
        class="pagination__item"
        :class="{ 'pagination__item--active': item.page === currentPage }"
        type="button"
        :disabled="item.page === null"
        :aria-current="item.page === currentPage ? 'page' : null"
        @click="item.page && $emit('change', item.page)"
      >
        {{ item.label }}
      </button>
      <button
        class="pagination__arrow"
        type="button"
        :aria-label="text.pagination.nextPage"
        :disabled="currentPage >= pageCount"
        @click="$emit('change', currentPage + 1)"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m7.5 4.5 5.5 5.5-5.5 5.5M12.5 10h-9" />
        </svg>
      </button>
    </nav>
    <p class="brands-pagination__summary">
      <strong>{{ firstResult }}–{{ lastResult }}</strong> {{ text.pagination.resultsSeparator }}
      <strong>{{ total }}</strong> {{ text.pagination.resultsLabel }}
    </p>
  </footer>
</template>

<script>
import { BRAND_TEXT } from "~/constants/text/brands";

export default {
  name: "BrandsPagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      text: BRAND_TEXT,
    };
  },
  computed: {
    firstResult() {
      return this.total ? (this.currentPage - 1) * this.pageSize + 1 : 0;
    },
    lastResult() {
      return Math.min(this.currentPage * this.pageSize, this.total);
    },
    visiblePages() {
      const pages = [];
      const addPage = (page) =>
        pages.push({ key: `page-${page}`, page, label: page });
      const addEllipsis = (key) => pages.push({ key, page: null, label: "…" });

      if (this.pageCount <= 7) {
        for (let page = 1; page <= this.pageCount; page += 1) {
          addPage(page);
        }
        return pages;
      }

      addPage(1);
      if (this.currentPage > 5) addEllipsis("start-ellipsis");

      const start = Math.max(2, this.currentPage - 3);
      const end = Math.min(this.pageCount - 1, this.currentPage + 1);
      for (let page = start; page <= end; page += 1) addPage(page);

      if (this.currentPage < this.pageCount - 3) addEllipsis("end-ellipsis");
      addPage(this.pageCount);
      return pages;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as *;

.brands-pagination {
  display: flex;
  min-height: $space-17;
  align-items: center;
  justify-content: space-between;
  gap: $space-10;
  margin-top: $space-12;

  &__summary {
    margin: 0;
    color: $color-text-muted;
    font-size: $font-size-body;
    white-space: nowrap;

    strong {
      color: $color-text-strong;
      font-weight: $font-weight-semibold;
    }
  }
}

.pagination {
  display: inline-flex;
  min-height: $space-17;
  align-items: center;
  gap: $space-2;
  padding: $space-2;
  border: $border-width solid $color-pagination-border;
  border-radius: $border-radius-pagination;
  background: $color-surface;
  box-shadow: $shadow-pagination;

  button {
    display: inline-flex;
    min-width: $space-15;
    height: $space-14;
    align-items: center;
    justify-content: center;
    padding: 0 $space-5;
    border: 0;
    border-radius: $border-radius-control;
    background: none;
    color: $color-pagination-text;
    font-size: $font-size-body;
    font-weight: $font-weight-medium;
    transition: color $transition-fast, background-color $transition-fast,
      box-shadow $transition-fast;

    &:not(:disabled) {
      cursor: pointer;
    }

    &:not(:disabled):hover {
      background: $color-pagination-hover-background;
      color: $color-pagination-hover-text;
    }

    &:focus-visible {
      outline: $space-1 solid $color-focus;
      outline-offset: $border-width;
    }

    &:disabled {
      color: $color-pagination-disabled;
      cursor: default;
    }
  }

  &__arrow {
    width: $space-8;

    svg {
      width: $space-8;
      height: $space-8;
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.6;
    }
  }

  &__item--active {
    background: $color-pagination-active-background !important;
    color: $color-pagination-active-text !important;
    font-weight: 700 !important;
    box-shadow: inset 0 0 0 $border-width $color-pagination-active-border;
  }
}

@media (max-width: $breakpoint-mobile) {
  .brands-pagination {
    align-items: stretch;
    flex-direction: column-reverse;
    gap: $space-6;

    &__summary {
      align-self: flex-end;
    }
  }

  .pagination {
    align-self: flex-start;

    button {
      min-width: $space-14;
      padding: 0 $space-5;
    }
  }
}
</style>
