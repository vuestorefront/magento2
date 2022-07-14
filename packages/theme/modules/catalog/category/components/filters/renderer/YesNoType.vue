<template>
  <div>
    <SfHeading
      :key="`filter-title-${filter.attribute_code}`"
      :level="4"
      :title="filter.label"
      class="filters__title sf-heading--left"
    />
    <SfRadio
      v-for="option in filter.options"
      :key="`${filter.attribute_code}-${option.value}`"
      class="radio-filter"
      :label="label(option)"
      :selected="selected(filter.attribute_code, option.value)"
      :value="option.value"
      name="filter__price"
      data-testid="category-filter"
      @change="$emit('selectFilter', option)"
    />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent, inject, PropType, useContext,
} from '@nuxtjs/composition-api';
import { SfRadio, SfHeading } from '@storefront-ui/vue';
import type { Aggregation, AggregationOption } from '~/modules/GraphQL/types';

export default defineComponent({
  components: {
    SfRadio,
    SfHeading,
  },
  props: {
    filter: {
      type: Object as PropType<Aggregation>,
      required: true,
    },
  },
  setup() {
    const { app: { i18n } } = useContext();
    const { isFilterSelected } = inject('UseFiltersProvider');
    const selected = computed(() => ((id: string, optVal: string) => isFilterSelected(id, optVal)));
    const label = (option: AggregationOption) => `${(option.value === '1' ? i18n.t('Yes') : i18n.t('No'))}`;
    return { selected, label };
  },
});
</script>
<style lang="scss">
.radio-filter {
  margin: 0 0 var(--spacer-2xs) 0;
  .sf-radio__container {
    padding: 0;
  }
}

</style>
