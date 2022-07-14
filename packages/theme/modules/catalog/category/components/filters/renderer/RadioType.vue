<template>
  <div>
    <SfHeading
      :key="`filter-title-${filter.attribute_code}`"
      :level="4"
      :title="filter.label"
      class="filters__title sf-heading--left"
    />
    <component
      :is="filter.options.length > 4 ? 'SfScrollable' : 'div' "
      max-content-height="6.875rem"
      :show-text="$t('Show more')"
      :hide-text="$t('Show less')"
    >
      <SfRadio
        v-for="option in filter.options"
        :key="`${filter.attribute_code}-${option.value}`"
        class="radio-filter"
        :label="`${option.label}`"
        :selected="selected(filter.attribute_code, option.value)"
        :value="option.value"
        name="filter__price"
        data-testid="category-filter"
        @change="$emit('selectFilter', option)"
      >
        <template #label="{ label }">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span
            :class="{ 'display-none': !label }"
            class="sf-radio__label"
            v-html="$dompurify(label)"
          />
        </template>
      </SfRadio>
    </component>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent, inject, PropType,
} from '@nuxtjs/composition-api';
import { SfRadio, SfScrollable, SfHeading } from '@storefront-ui/vue';
import type { Aggregation } from '~/modules/GraphQL/types';

export default defineComponent({
  components: {
    SfRadio,
    SfScrollable,
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

    return { selected };
  },
});
</script>
<style lang="scss">
.radio-filter {
  .sf-radio__content {
    display: flex;
    align-items: center
  }
  margin: 0 0 var(--spacer-2xs) 0;
  .sf-radio__container {
    padding: 0;
  }
}

</style>
