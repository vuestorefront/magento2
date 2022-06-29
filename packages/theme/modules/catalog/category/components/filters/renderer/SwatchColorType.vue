<template>
  <div>
    <SfHeading
      :key="`filter-title-${filter.attribute_code}`"
      :level="4"
      :title="filter.label"
      class="filters__title sf-heading--left"
    />
    <div class="swatch_color_wrapper">
      <SfColor
        v-for="option in filter.options"
        :key="`${filter.attribute_code}-${option.value}`"
        :color="option.label"
        :selected="Boolean(selected(filter.attribute_code, option.value))"
        class="swatch_color"
        role="button"
        @click="$emit('selectFilter', option)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed, defineComponent, inject, PropType,
} from '@nuxtjs/composition-api';
import { SfColor, SfHeading } from '@storefront-ui/vue';
import type { Aggregation } from '~/modules/GraphQL/types';

export default defineComponent({
  components: {
    SfColor,
    SfHeading,
  },
  props: {
    filter: {
      type: Object as PropType<Aggregation>,
      required: true,
    },
  },
  setup() {
    const { isFilterSelected } = inject('UseFiltersProvider');
    const selected = computed(() => ((id: string, optVal: string) => isFilterSelected(id, optVal)));
    return {
      selected,
    };
  },
});
</script>
<style lang="scss">
.swatch_color_wrapper {
  display: flex;

  .sf-color {
    width: var(--checkbox-size, 1.5rem);
    height: var(--checkbox-size, 1.5rem);
  }
}

.swatch_color {
  margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
}
</style>
