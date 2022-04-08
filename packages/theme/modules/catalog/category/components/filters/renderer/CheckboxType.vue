<template>
  <div>
    <SfCheckbox
      v-for="option in facet.options"
      :key="`${facet.id}-${option.value}`"
      :label="option.id + `${option.count ? ` (${option.count})` : ''}`"
      :selected="Boolean(isFilterSelected(facet, option, selectedFilters))"
      class="filters__item"
      @change="$emit('selectFilter', option)"
    />
  </div>
</template>
<script lang="ts">
import { SfCheckbox } from '@storefront-ui/vue';
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { useFilters } from '~/modules/catalog/category/components/filters/useFilters';

export default defineComponent({
  name: 'CheckboxType',
  components: {
    SfCheckbox,
  },
  props: {
    selectedFilters: {
      type: Object,
      default: () => ref({}),
    },
    facet: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { isFilterSelected } = useFilters();

    return { isFilterSelected };
  },
});
</script>
