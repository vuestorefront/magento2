import userEvent from '@testing-library/user-event';
import { inject, useContext } from '@nuxtjs/composition-api';
import { render } from '~/tests/unit/test-utils';
import { categoryFiltersData, categoryFiltersDataWithOneOption } from '~/tests/unit/mocks/categoryFiltersMock';
import { injectMock } from '~/tests/unit/mocks/injectMock';
import YesNoType from '~/modules/catalog/category/components/filters/renderer/YesNoType.vue';
import type { Aggregation } from '~/modules/GraphQL/types';

jest.mock('@nuxtjs/composition-api', () => {
  const compositionApi = jest.requireActual('@nuxtjs/composition-api');
  return {
    ...compositionApi,
    inject: jest.fn(),
    useContext: jest.fn(),
  };
});

(inject as jest.Mock).mockReturnValue({
  isFilterSelected: jest.fn(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (id: string, optVal: string): string => id,
  ),
});
(useContext as jest.Mock).mockReturnValue({
  app: {
    i18n: {
      t: jest.fn((text: string): string => text),
    },
  },
});

describe('YesNoType.vue', () => {
  it('Should show filters if options are exist', () => {
    const { getAllByTestId } = render(YesNoType, { props: { filter: categoryFiltersData[0] as Aggregation } });
    const filters = getAllByTestId('category-filter');

    expect(filters).toHaveLength(categoryFiltersData[0].options.length);
  });

  it('Default filter should not be active', () => {
    const { getByTestId } = render(YesNoType, {
      props: {
        filter: categoryFiltersDataWithOneOption as Aggregation,
      },
    });
    const filter = getByTestId('category-filter');

    expect(filter.classList).not.toContain('is-active');
  });

  it('The filter should have a label should be clickable', async () => {
    const { getByLabelText, emitted } = render(YesNoType, {
      props: {
        filter: categoryFiltersDataWithOneOption as Aggregation,
      },
    });
    const labelText = 'No';
    const filterLabel = getByLabelText(labelText);

    await userEvent.click(filterLabel);

    expect(emitted().selectFilter).toHaveLength(1);
  });

  it('The selected filter should be active', () => {
    (inject as jest.Mock).mockReturnValue(Object.assign(
      injectMock(),
      {
        isFilterSelected: jest.fn(
          (id: string, optVal: string): string => optVal,
        ),
      },
    ));

    const { getByTestId } = render(YesNoType, {
      props: {
        filter: categoryFiltersDataWithOneOption as Aggregation,
      },
    });
    const filter = getByTestId('category-filter');

    expect(filter.classList).toContain('is-active');
  });
});
