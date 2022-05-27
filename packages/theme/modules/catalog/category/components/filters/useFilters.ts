import {
  ref, set,
} from '@nuxtjs/composition-api';
import { useUiHelpers } from '~/composables';
import { getFilterConfig } from '~/modules/catalog/category/config/FiltersConfig';
import { FilterTypeEnum } from '~/modules/catalog/category/config/config';
import type { Aggregation, AggregationOption } from '~/modules/GraphQL/types';

export interface SelectedFiltersInterface {[p: string]: string[]}

export interface RemovableFilterInterface {
  id: string;
  name: string;
  label: string;
  value: string;
  type: string;
}

export function useFilters() {
  // @ts-ignore
  const { getFacetsFromURL } = useUiHelpers();

  const getSelectedFiltersFromUrl = () => {
    const selectedFilterValues = {};
    const { filters } = getFacetsFromURL();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.keys(filters).forEach((filter) => {
      selectedFilterValues[filter] = filters[filter];
    });

    return selectedFilterValues;
  };

  const selectedFilters = ref<SelectedFiltersInterface>(getSelectedFiltersFromUrl());

  const isFilterSelected = (name: string, value: string) => {
    const selected = (selectedFilters.value[name] ?? []).find((selectedValue) => selectedValue === value);

    return selected ?? '';
  };

  const removeFilter = (attrCode: string, valToRemove: string) => {
    if (!selectedFilters.value[attrCode]) return;
    selectedFilters.value[attrCode] = selectedFilters.value[attrCode].filter((value) => value !== valToRemove);
  };

  const selectFilter = (filter: Aggregation, option: AggregationOption) => {
    const config = getFilterConfig(filter.attribute_code);
    if (!selectedFilters.value[filter.attribute_code]) {
      set(selectedFilters.value, filter.attribute_code, []);
    }

    if (config.type === FilterTypeEnum.RADIO || config.type === FilterTypeEnum.YES_NO) {
      selectedFilters.value[filter.attribute_code] = [option.value];
      return;
    }

    if (selectedFilters.value[filter.attribute_code].find((f) => f === option.value)) {
      selectedFilters.value[filter.attribute_code] = selectedFilters.value[
        filter.attribute_code
      ]?.filter((f) => f !== option.value);
      return;
    }

    selectedFilters.value[filter.attribute_code].push(String(option.value));
  };

  const getRemovableFilters = (filters: Aggregation[], selected: SelectedFiltersInterface): RemovableFilterInterface[] => {
    const result = [];

    filters.forEach((filter) => {
      filter.options.forEach((option) => {
        if ((selected[filter.attribute_code] ?? []).includes(option.value)) {
          const filterConfig = getFilterConfig(filter.attribute_code);

          result.push({
            id: filter.attribute_code, name: filter.label, label: option.label, value: option.value, type: filterConfig.type,
          });
        }
      });
    });

    return result;
  };

  return {
    getSelectedFiltersFromUrl,
    isFilterSelected,
    removeFilter,
    selectFilter,
    selectedFilters,
    getRemovableFilters,
  };
}

export default useFilters;
