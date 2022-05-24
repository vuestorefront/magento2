<template>
  <div class="selected-filters-wrapper">
    <SfBadge
      v-for="(filter, key) in removableFilters"
      :key="key"
      class="selected-filter"
    >
      <span class="selected-filter__label">
        {{ filter.label }}
      </span>
      <button
        type="button"
        class="selected-filter__remove"
        @click.prevent="$emit('removeFilter', {id: filter.id, value: filter.value})"
      >
        <SfIcon
          class="sf-cross__icon"
          icon="cross"
          size="20px"
          color="white"
          viewBox="0 0 24 12"
        />
      </button>
    </SfBadge>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { SfBadge, SfIcon } from '@storefront-ui/vue';

export default defineComponent({
  components: {
    SfBadge,
    SfIcon,
  },
  props: {
    removableFilters: {
      type: Array,
      default: () => [],
    },
  },
});
</script>
<style lang="scss">
.selected-filters-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.selected-filter {
  display: flex;
  margin-right: var(--spacer-xs);
  margin-bottom: var(--spacer-xs);
  padding: var(--spacer-xs) var(--spacer-xs);

  &__label {
    font-size: var(--font-size--base);
  }

  &__remove {
    display: inline-flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
  }
}
</style>
