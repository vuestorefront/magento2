import userEvent from '@testing-library/user-event';
import { inject } from '@nuxtjs/composition-api';
import { render } from '~/tests/unit/test-utils';
import { categoryFiltersData, categoryFiltersDataWithOneOption } from '~/tests/unit/mocks/categoryFiltersMock';
import { injectMock } from '~/tests/unit/mocks/injectMock';
import RadioType from '~/modules/catalog/category/components/filters/renderer/RadioType.vue';
import type { Aggregation } from '~/modules/GraphQL/types';

jest.mock('@nuxtjs/composition-api', () => {
  const compositionApi = jest.requireActual('@nuxtjs/composition-api');
  return {
    ...compositionApi,
    inject: jest.fn(),
  };
});

(inject as jest.Mock).mockReturnValue({
  isFilterSelected: jest.fn(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (id: string, optVal: string): string => id,
  ),
});

describe('RadioType.vue', () => {
  it('Should show filters if options are exist', () => {
    const { getAllByTestId } = render(RadioType, { props: { filter: categoryFiltersData[0] as Aggregation } });
    const filters = getAllByTestId('category-filter');

    expect(filters).toHaveLength(categoryFiltersData[0].options.length);
  });

  it('Default filter should not be active', () => {
    const { getByTestId } = render(RadioType, {
      props: {
        filter: categoryFiltersDataWithOneOption as Aggregation,
      },
    });
    const filter = getByTestId('category-filter');

    expect(filter.classList).not.toContain('is-active');
  });

  it('The filter should have a label should be clickable', async () => {
    const { getByLabelText, emitted } = render(RadioType, {
      props: {
        filter: categoryFiltersDataWithOneOption as Aggregation,
      },
    });
    const labelText = `${categoryFiltersDataWithOneOption.options[0].label}`;
    const filterLabel = getByLabelText(labelText);

    await userEvent.click(filterLabel);

    expect(emitted().selectFilter).toHaveLength(1);
  });

  it('The selected filter should be active', () => {
    (inject as jest.Mock).mockReturnValue(Object.assign(
      injectMock(),
      {
        isFilterSelected: jest.fn(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (id: string, optVal: string): string => optVal,
        ),
      },
    ));

    const { getByTestId } = render(RadioType, {
      props: {
        filter: categoryFiltersDataWithOneOption as Aggregation,
      },
    });
    const filter = getByTestId('category-filter');

    expect(filter.classList).toContain('is-active');
  });
});
