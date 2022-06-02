<template>
  <SfTableRow :class="['order-summary', {'order-summary--bold': bold }]">
    <SfTableData class="order-summary__spacer" />

    <SfTableData><slot name="label" /></SfTableData>
    <SfTableData><slot name="value" /></SfTableData>
  </SfTableRow>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    bold: { type: Boolean, default: false },
  },
});
</script>

<style lang="scss" scoped>
.order-summary {
  position: relative;
  display: block;
  background-color: var(--c-light);
  pointer-events: none;

  @include for-mobile {
    &:before,
    &:after {
      content: "";
      position: absolute;
      display: block;
      background-color: var(--c-light);
      top: 0;
      height: 100%;
      width: var(--spacer-sm);
    }

    &:before {
      left: calc(-1 * var(--spacer-sm));
    }

    &:after {
      right: calc(-1 * var(--spacer-sm));
    }
  }

  ::v-deep tr {
    --table-row-padding: var(--spacer-xs) 0;

    @include for-desktop {
      --table-row-padding: var(--spacer-xs) var(--spacer-sm);
    }
  }

  &--bold {
    td {
      --table-data-font-weight: var(--font-weight--semibold);
    }
  }

  &__spacer {
    @include for-desktop {
      --table-column-flex: 2;
    }
  }

  td {
    order: 0;

    &:not(:first-child) {
      --table-column-text-align: right;
    }
  }
}
</style>
