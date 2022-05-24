<template>
  <div>
    <h4 class="heading__title h4 desktop-only">
      {{ $t('Filters') }}
    </h4>
    <div v-if="isLoading">
      <div
        v-for="n in 3"
        :key="n"
      >
        <SkeletonLoader
          class="filters__title sf-heading--left sf-heading"
          height="20px"
          width="85%"
        />
        <SkeletonLoader width="50%" />
        <SkeletonLoader
          width="62%"
        />
        <SkeletonLoader
          width="40%"
          height="10px"
        />
      </div>
    </div>
    <div
      v-else
      class="filters desktop-only"
    >
      <SelectedFilters
        :removable-filters="removableFilters"
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
      <div class="filters__buttons">
        <SfButton
          class="sf-button--full-width"
          @click="doApplyFilters"
        >
          {{ $t('Apply filters') }}
        </SfButton>
        <SfButton
          class="sf-button--full-width filters__button-clear"
          @click="doClearFilters"
        >
          {{ $t('Clear all') }}
        </SfButton>
      </div>
    </div>
    <SfSidebar
      :visible="isVisible"
      class="sidebar-filters smartphone-only"
      title="Filters"
      @close="$emit('close')"
    >
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
            {{ $t('Apply filters') }}
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
  </div>
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

import SkeletonLoader from '~/components/SkeletonLoader/index.vue';
import { useUiHelpers } from '~/composables';
import { getFilterConfig, getDisabledFilters } from '~/modules/catalog/category/config/FiltersConfig';
import SelectedFilters from '~/modules/catalog/category/components/filters/FiltersSidebar/SelectedFilters.vue';
import { getProductFilterByCategoryCommand } from '~/modules/catalog/category/components/filters/command/getProductFilterByCategoryCommand';

import type { Aggregation } from '~/modules/GraphQL/types';
import type { SelectedFiltersInterface } from './useFilters';
import { useFilters } from './useFilters';

export interface UseFiltersProviderInterface {
  selectedFilters: Ref<SelectedFiltersInterface>,
  filters: Ref<Aggregation[]>,
}

export default defineComponent({
  name: 'CategoryFilters',
  components: {
    SelectedFilters,
    SkeletonLoader,
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
  setup(props, { emit }) {
    const { changeFilters, clearFilters } = useUiHelpers();
    const removableFilters = ref([]);
    const filters = ref<Aggregation[]>([]);
    const isLoading = ref(true);

    const {
      selectedFilters, selectFilter, removeFilter, isFilterSelected, getRemovableFilters,
    } = useFilters();

    const updateRemovableFilters = () => {
      removableFilters.value = getRemovableFilters(filters.value, selectedFilters.value);
    };

    const doApplyFilters = () => {
      changeFilters(selectedFilters.value, false);
      updateRemovableFilters();
      if (window?.scroll) {
        window.scroll(0, 0);
      }
      emit('reloadProducts');
      emit('close');
    };

    const doRemoveFilter = ({ id, value }: { id: string, value: string }) => {
      removeFilter(id, value);
      changeFilters(selectedFilters.value, false);
      updateRemovableFilters();
      emit('reloadProducts');
      emit('close');
    };

    const doClearFilters = () => {
      clearFilters(false);
      selectedFilters.value = {};
      updateRemovableFilters();
      emit('reloadProducts');
      emit('close');
    };

    onMounted(async () => {
      const loadedFilters = await getProductFilterByCategoryCommand.execute({ eq: props.catUid });
      filters.value = loadedFilters.filter((filter) => !getDisabledFilters().includes(filter.attribute_code));
      updateRemovableFilters();
      isLoading.value = false;
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
      isLoading,
      removableFilters,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './CategoryFilters.scss';
</style>
