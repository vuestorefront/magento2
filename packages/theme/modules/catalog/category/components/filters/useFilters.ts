import { ref } from '@nuxtjs/composition-api';
import { useUiHelpers } from '~/composables';
import { FacetInterface, GroupedFacetInterface } from '~/modules/catalog/category/types';
import { getFilterConfig, getFilterableAttributes, FilterTypeEnum } from '~/modules/catalog/category/config/FiltersConfig';

export const useFilters = () => {
  // @ts-ignore
  const { getFacetsFromURL } = useUiHelpers();
  const getSelectedFilterValues = () => {
    const availableFacets = getFilterableAttributes();

    const selectedFilterValues = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      availableFacets.map((curr: string) => [
        curr,
        [],
      ]),
    );
    const { filters } = getFacetsFromURL();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.keys(filters).forEach((filter) => {
      selectedFilterValues[filter] = filters[filter];
    });

    return selectedFilterValues;
  };

  const selectedFilters = ref(getSelectedFilterValues());
  const getSelectedFilters = () => selectedFilters;

  const isFilterSelected = (facet: GroupedFacetInterface, option: FacetInterface, filtersPool = getSelectedFilters().value) => {
    const selected = (filtersPool[facet.id] || []).find((filterOpt) => filterOpt === option.value);

    return selected ?? '';
  };

  const selectFilter = (facet: GroupedFacetInterface, option: FacetInterface) => {
    const config = getFilterConfig(facet.id);
    if (config.type === FilterTypeEnum.RADIO) {
      selectedFilters.value[facet.id] = [option.value];
      return;
    }

    if (!selectedFilters.value[facet.id]) {
      selectedFilters.value[facet.id] = [];
    }

    if (selectedFilters.value[facet.id].find((f) => f === option.value)) {
      selectedFilters.value[facet.id] = selectedFilters.value[
        facet.id
      ]?.filter((f) => f !== option.value);
      return;
    }

    selectedFilters.value[facet.id].push(option.value);
  };

  return {
    getSelectedFilterValues,
    isFilterSelected,
    selectFilter,
    getSelectedFilters,
  };
};

export default useFilters;
