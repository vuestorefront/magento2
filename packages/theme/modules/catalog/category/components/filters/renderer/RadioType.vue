<template>
  <div>
    <SfRadio
      v-for="option in facet.options"
      :key="`${facet.id}-${option.value}`"
      :label="`${option.id}${
        option.count ? ` (${option.count})` : ''
      }`"
      :selected="isFilterSelected(facet, option, selectedFilters)"
      :value="option.value"
      name="filter__price"
      @change="$emit('selectFilter', option)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { SfRadio } from '@storefront-ui/vue';
import { useFilters } from '~/modules/catalog/category/components/filters/useFilters';

export default defineComponent({
  name: 'RadioType',
  components: {
    SfRadio,
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
