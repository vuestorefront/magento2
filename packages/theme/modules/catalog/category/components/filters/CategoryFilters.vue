<template>
  <SfSidebar
    :visible="isVisible"
    class="sidebar-filters"
    title="Filters"
    @close="$emit('close')"
  >
    <div class="filters desktop-only">
      <div
        v-for="(facet, i) in facets"
        :key="i"
      >
        <SfHeading
          :key="`filter-title-${facet.id}`"
          :level="4"
          :title="facet.label"
          class="filters__title sf-heading--left"
        />
        <component
          :is="getFilterConfig(facet.id).component"
          :facet="facet"
          :selected-filters="selectedFilters"
          @selectFilter="selectFilter(facet, $event)"
        />
      </div>
    </div>
    <SfAccordion class="filters smartphone-only">
      <div
        v-for="(facet, i) in facets"
        :key="i"
      >
        <SfAccordionItem
          :key="`filter-title-${facet.id}`"
          :header="facet.label"
          class="filters__accordion-item"
        >
          <component
            :is="getFilterConfig(facet.id).component"
            :facet="facet"
            :selected-filters="selectedFilters"
            @selectFilter="selectFilter(facet, $event)"
          />
        </SfAccordionItem>
      </div>
    </SfAccordion>
    <template #content-bottom>
      <div class="filters__buttons">
        <SfButton
          class="sf-button--full-width"
          @click="applyFilters"
        >
          {{ $t('Done') }}
        </SfButton>
        <SfButton
          class="sf-button--full-width filters__button-clear"
          @click="clearFilters"
        >
          {{ $t('Clear all') }}
        </SfButton>
      </div>
    </template>
  </SfSidebar>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import {
  SfAccordion,
  SfButton,
  SfFilter,
  SfHeading,
  SfRadio,
  SfSidebar,
} from '@storefront-ui/vue';

import { useUiHelpers } from '~/composables';
import { useFilters } from './useFilters';
import { getFilterConfig } from '~/modules/catalog/category/config/FiltersConfig';

import RadioType from '~/modules/catalog/category/components/filters/renderer/RadioType.vue';
import SwatchColorType from '~/modules/catalog/category/components/filters/renderer/SwatchColorType.vue';
import CheckboxType from '~/modules/catalog/category/components/filters/renderer/CheckboxType.vue';

export default defineComponent({
  name: 'CategoryFilters',
  components: {
    CheckboxType,
    SwatchColorType,
    RadioType,
    SfSidebar,
    SfHeading,
    SfAccordion,
    SfFilter,
    SfButton,
    SfRadio,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    availableFacets: {
      type: Array,
      default: () => [],
    },
    facets: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const { changeFilters } = useUiHelpers();
    const { getSelectedFilters, isFilterSelected, selectFilter } = useFilters();
    const selectedFilters = getSelectedFilters();

    const applyFilters = () => {
      changeFilters(getSelectedFilters().value);
      emit('close');
    };

    const clearFilters = () => {
      changeFilters({});
      emit('close');
    };

    return {
      isFilterSelected,
      selectFilter,
      applyFilters,
      clearFilters,
      getFilterConfig,
      selectedFilters,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './CategoryFilters.scss';
</style>
