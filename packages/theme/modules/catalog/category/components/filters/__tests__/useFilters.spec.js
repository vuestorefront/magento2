import useFilters from '~/modules/catalog/category/components/filters/useFilters';
import { getFilterableAttributes } from '~/modules/catalog/category/config/FiltersConfig';

import { useUiHelpers } from '~/composables';

jest.mock('~/composables', () => {
  const originalModule = jest.requireActual('~/composables');

  return {
    ...originalModule,
    useUiHelpers: jest.fn(),
  };
});

jest.mock('~/modules/catalog/category/config/FiltersConfig');

describe('useFilter', () => {
  it('getSelectedFilters returns empty data if no filter is selected', () => {
    useUiHelpers.mockReturnValue({ getFacetsFromURL: jest.fn(() => ({ filters: {} })) });
    getFilterableAttributes.mockReturnValue(['color']);
    const { getSelectedFilters } = useFilters();
    expect(getSelectedFilters()).toMatchObject({ value: { color: [] } });
  });

  it('getSelectedFilters returns selected filters from url data', () => {
    useUiHelpers.mockReturnValue({ getFacetsFromURL: jest.fn(() => ({ filters: { color: ['50'] } })) });
    getFilterableAttributes.mockReturnValue(['color']);
    const { getSelectedFilters } = useFilters();
    expect(getSelectedFilters()).toMatchObject({ value: { color: ['50'] } });
  });

  it.todo('isFilterSelected returns true if filter is selected');
  it.todo('isFilterSelected returns false if filter is NOT selected');
  it.todo('selectFilter adds filter to the selected filters pool');
});
