import userEvent from '@testing-library/user-event';
import { inject, ref, useContext } from '@nuxtjs/composition-api';
import { render } from '~/tests/unit/test-utils';
import CategoryFilters from '../CategoryFilters.vue';
import { useUiHelpers } from '~/composables';
import { Aggregation } from '~/modules/GraphQL/types';
import { categoryFiltersData } from '~/tests/unit/mocks/categoryFiltersMock';
import { useUiHelpersMock } from '~/tests/unit/mocks/useUiHelpersMock';

jest.mock('@nuxtjs/composition-api', () => {
  const compositionApi = jest.requireActual('@nuxtjs/composition-api');
  return {
    ...compositionApi,
    inject: jest.fn(),
    useContext: jest.fn(),
  };
});
jest.mock('~/composables');
jest.mock('~/composables/useApi', () => ({
  useApi: jest.fn().mockReturnValue({
    query: jest.fn(() => ({ data: {}, errors: [] })),
  }),
}));

(useContext as jest.Mock).mockReturnValue({
  app: {
    i18n: {
      t: jest.fn((text: string): string => text),
    },
  },
});

(inject as jest.Mock).mockReturnValue({
  isFilterSelected: jest.fn(
    (id: string, optVal: string): boolean => id === optVal,
  ),
});

(useUiHelpers as jest.Mock).mockReturnValue(useUiHelpersMock());

describe('CategoryFilters', () => {
  it('Should render Skeleton when isLoading is true', () => {
    const { queryByTestId } = render(CategoryFilters, {
      props: {
        catUid: '1',
      },
      setup() {
        return {
          isLoading: ref(true),
        };
      },
    });

    expect(queryByTestId('skeleton-loader')).not.toBeNull();
  });

  it('CategoryFilters Mobile sidebar should be hidden if isVisible false', () => {
    const { queryByTestId } = render(CategoryFilters, {
      props: {
        catUid: '1',
        isVisible: false,
      },
    });

    expect(queryByTestId('mobile-sidebar').children).toHaveLength(0);
  });

  it('Should render filters if these are exist', () => {
    const { getAllByTestId } = render(CategoryFilters, {
      props: {
        catUid: '1',
        isVisible: false,
      },
      setup() {
        return {
          isLoading: ref(false),
          filters: ref(categoryFiltersData as Aggregation[]),
        };
      },
    });
    const filters = getAllByTestId('category-filter');

    expect(filters).toHaveLength(categoryFiltersData.length);
  });

  it('CategoryFilters Mobile sidebar should be visible if isVisible true', () => {
    const { queryByTestId } = render(CategoryFilters, {
      props: {
        catUid: '1',
        isVisible: true,
      },
    });

    expect(queryByTestId('mobile-sidebar').children).not.toHaveLength(0);
  });

  it('"Apply filters" and "Clear all" buttons should be clickable', async () => {
    const doApplyFilters = jest.fn();
    const doClearFilters = jest.fn();
    const { getByTestId } = render(CategoryFilters, {
      props: {
        catUid: '1',
        isVisible: false,
      },
      setup() {
        return {
          isLoading: ref(false),
          filters: ref(categoryFiltersData as Aggregation[]),
          doApplyFilters,
          doClearFilters,
        };
      },
    });
    const applyFiltersButton = getByTestId('apply-filters');
    const clearFiltersButton = getByTestId('clear-filters');

    await userEvent.click(applyFiltersButton);

    expect(doApplyFilters).toHaveBeenCalledTimes(1);

    await userEvent.click(clearFiltersButton);

    expect(doClearFilters).toHaveBeenCalledTimes(1);
  });
});
