<template>
  <div class="swatch_color_wrapper">
    <SfColor
      v-for="option in facet.options"
      :key="`${facet.id}-${option.value}`"
      :color="option.attrName"
      :selected="Boolean(isFilterSelected(facet, option, selectedFilters))"
      class="swatch_color"
      @click="$emit('selectFilter', option)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { SfColor } from '@storefront-ui/vue';
import { useFilters } from '~/modules/catalog/category/components/filters/useFilters';

export default defineComponent({
  name: 'SwatchColorType',
  components: {
    SfColor,
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
<style lang="scss">
.swatch_color_wrapper {
  display: flex;
}

.swatch_color {
  margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
}
</style>
