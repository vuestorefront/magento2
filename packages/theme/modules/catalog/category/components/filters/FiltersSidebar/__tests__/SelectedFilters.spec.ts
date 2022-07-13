import userEvent from '@testing-library/user-event';
import { useContext } from '@nuxtjs/composition-api';
import { render } from '~/tests/unit/test-utils';
import { RemovableFilter, removableFiltersData } from '~/tests/unit/mocks/removableFiltersMock';
import SelectedFilters from '~/modules/catalog/category/components/filters/FiltersSidebar/SelectedFilters.vue';

jest.mock('@nuxtjs/composition-api', () => {
  const compositionApi = jest.requireActual('@nuxtjs/composition-api');
  return {
    ...compositionApi,
    inject: jest.fn(),
    useContext: jest.fn(),
  };
});

(useContext as jest.Mock).mockReturnValue({
  app: {
    i18n: {
      t: jest.fn((text: string): string => text),
    },
  },
});

describe('SelectedFilters.vue', () => {
  it('Should not have children if the component has no data', () => {
    const { queryByTestId } = render(SelectedFilters);

    expect(queryByTestId('selected-filter')).toBeNull();
  });

  it('Should render selected filters if options are exist', () => {
    const { getAllByTestId } = render(SelectedFilters, {
      props: {
        removableFilters: removableFiltersData as RemovableFilter[],
      },
    });
    const selectedFilers = getAllByTestId('selected-filter');

    expect(selectedFilers).toHaveLength(removableFiltersData.length);
  });

  it('Yes/No option should render right label', () => {
    const { getByText } = render(SelectedFilters, {
      props: {
        removableFilters: [removableFiltersData[0]] as RemovableFilter[],
      },
    });
    const filterLabel = `${removableFiltersData[0].name}: ${removableFiltersData[0].label === '1' ? 'Yes' : 'No'}`;
    const yesNoFilter = getByText(filterLabel);

    expect(yesNoFilter).toBeDefined();
  });

  it('Should have a remove button and the button should be clickable', async () => {
    const { getByTestId, emitted } = render(SelectedFilters, {
      props: {
        removableFilters: [removableFiltersData[0]] as RemovableFilter[],
      },
    });
    const removeButton = getByTestId('selected-filter-remove');

    expect(removeButton).toBeDefined();

    await userEvent.click(removeButton);

    expect(emitted().removeFilter).toHaveLength(1);
  });
});
