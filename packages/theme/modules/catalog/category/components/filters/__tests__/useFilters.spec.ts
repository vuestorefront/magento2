import { useFilters } from '~/modules/catalog/category/components/filters/useFilters';
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
  it('getSelectedFiltersFromUrl returns empty data if no filter is selected', () => {
    (useUiHelpers as jest.Mock).mockReturnValue({ getFacetsFromURL: jest.fn(() => ({ filters: {} })) });
    const { getSelectedFiltersFromUrl } = useFilters();
    expect(getSelectedFiltersFromUrl()).toMatchObject({});
  });

  it('getSelectedFiltersFromUrl returns selected filters from url data', () => {
    (useUiHelpers as jest.Mock).mockReturnValue({ getFacetsFromURL: jest.fn(() => ({ filters: { color: ['50'] } })) });
    const { getSelectedFiltersFromUrl } = useFilters();
    expect(getSelectedFiltersFromUrl()).toMatchObject({ color: ['50'] });
  });

  it.todo('isFilterSelected returns true if filter is selected');
  it.todo('isFilterSelected returns false if filter is NOT selected');
  it.todo('selectFilter adds filter to the selected filters pool');
});
