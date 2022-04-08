<template>
  <SfSidebar
    :visible="isVisible"
    class="sidebar-filters"
    title="Filters"
    @close="$emit('close')"
  >
    <div class="filters desktop-only">
      <SelectedFilters
        @removeFilter="doRemoveFilter($event)"
      />
      <hr class="sf-divider">
      <div
        v-for="(filter, i) in filters"
        :key="i"
      >
        <SfHeading
          :key="`filter-title-${filter.attribute_code}`"
          :level="4"
          :title="filter.label"
          class="filters__title sf-heading--left"
        />
        <component
          :is="getFilterConfig(filter.attribute_code).component"
          :filter="filter"
          @selectFilter="selectFilter(filter, $event)"
        />
      </div>
    </div>
    <SfAccordion class="filters smartphone-only">
      <SelectedFilters
        @removeFilter="doRemoveFilter($event)"
      />
      <hr class="sf-divider">
      <div
        v-for="(filter, i) in filters"
        :key="i"
      >
        <SfAccordionItem
          :key="`filter-title-${filter.attribute_code}`"
          :header="filter.label"
          class="filters__accordion-item"
        >
          <component
            :is="getFilterConfig(filter.attribute_code).component"
            :filter="filter"
            @selectFilter="selectFilter(filter, $event)"
          />
        </SfAccordionItem>
      </div>
    </SfAccordion>
    <template #content-bottom>
      <div class="filters__buttons">
        <SfButton
          class="sf-button--full-width"
          @click="doApplyFilters"
        >
          {{ $t('Done') }}
        </SfButton>
        <SfButton
          class="sf-button--full-width filters__button-clear"
          @click="doClearFilters"
        >
          {{ $t('Clear all') }}
        </SfButton>
      </div>
    </template>
  </SfSidebar>
</template>
<script lang="ts">
import {
  defineComponent, onMounted, provide, Ref, ref,
} from '@nuxtjs/composition-api';
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
import { getFilterConfig, getDisabledFilters } from '~/modules/catalog/category/config/FiltersConfig';
import SelectedFilters from '~/modules/catalog/category/components/filters/FiltersSidebar/SelectedFilters.vue';
import getProductFilterByCategoryCommand from '~/modules/catalog/category/components/filters/command/getProductFilterByCategoryCommand';

import type { SelectedFiltersInterface } from './useFilters';
import type { Aggregation } from '~/modules/GraphQL/types';

export interface UseFiltersProviderInterface {
  selectedFilters: Ref<SelectedFiltersInterface>,
  filters: Ref<Aggregation[]>,
}

export default defineComponent({
  name: 'CategoryFilters',
  components: {
    SelectedFilters,
    CheckboxType: () => import('~/modules/catalog/category/components/filters/renderer/CheckboxType.vue'),
    SwatchColorType: () => import('~/modules/catalog/category/components/filters/renderer/SwatchColorType.vue'),
    RadioType: () => import('~/modules/catalog/category/components/filters/renderer/RadioType.vue'),
    YesNoType: () => import('~/modules/catalog/category/components/filters/renderer/YesNoType.vue'),
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
    catUid: {
      type: String,
      required: true,
    },
  },
  setup({ catUid }, { emit }) {
    const { changeFilters, clearFilters } = useUiHelpers();
    const {
      selectedFilters, selectFilter, removeFilter, isFilterSelected,
    } = useFilters();

    const doApplyFilters = () => {
      changeFilters(selectedFilters.value, false);
      emit('reloadProducts');
      emit('close');
    };

    const doRemoveFilter = ({ id, value }: { id: string, value: string }) => {
      removeFilter(id, value);
      changeFilters(selectedFilters.value, false);
      emit('reloadProducts');
      emit('close');
    };

    const doClearFilters = () => {
      clearFilters(false);
      selectedFilters.value = {};
      emit('reloadProducts');
      emit('close');
    };

    const filters = ref<Aggregation[]>([]);

    onMounted(async () => {
      const loadedFilters = await getProductFilterByCategoryCommand.execute({ eq: catUid });
      filters.value = loadedFilters.filter((filter) => !getDisabledFilters().includes(filter.attribute_code));
    });

    provide('UseFiltersProvider', { isFilterSelected, selectedFilters, filters });

    return {
      selectFilter,
      doApplyFilters,
      doRemoveFilter,
      doClearFilters,
      getFilterConfig,
      selectedFilters,
      filters,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './CategoryFilters.scss';
</style>
