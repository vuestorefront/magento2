<template>
  <div>
    <div class="sf-heading filters__title">
      <h2 class="sf-heading__title h2">
        {{ $t('Filters') }}
      </h2>
    </div>
    <div class="selected-filters-wrapper">
      <SfBadge
        v-for="(filter, key) in removableFilters"
        :key="key"
        class="selected-filter"
      >
        <a
          href="#"
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
        </a>
        <span class="selected-filter__label">
          {{ filter.label }}
        </span>
      </SfBadge>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from '@nuxtjs/composition-api';
import { SfBadge, SfIcon } from '@storefront-ui/vue';
import type { UseFiltersProviderInterface } from '~/modules/catalog/category/components/filters/CategoryFilters.vue';

export default defineComponent({
  name: 'SelectedFilters',
  components: {
    SfBadge,
    SfIcon,
  },
  setup() {
    const { selectedFilters, filters }: UseFiltersProviderInterface = inject('UseFiltersProvider');

    const removableFilters = computed(() => {
      const result = [];

      filters.value.forEach((filter) => {
        filter.options.forEach((option) => {
          if ((selectedFilters.value[filter.attribute_code] ?? []).includes(option.value)) {
            result.push({
              id: filter.attribute_code, name: filter.label, label: option.label, value: option.value,
            });
          }
        });
      });

      return result;
    });
    return {
      removableFilters,
    };
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
  &__label {
    font-size: var(--font-size--base);
  }
  &__remove {
    display: inline-flex;
    align-items: center;
    margin-right: 6px;
  }
}
</style>
