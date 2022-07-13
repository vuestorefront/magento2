import userEvent from '@testing-library/user-event';
import { inject } from '@nuxtjs/composition-api';
import { render } from '~/tests/unit/test-utils';
import { categoryFiltersData, categoryFiltersDataWithOneOption } from '~/tests/unit/mocks/categoryFiltersMock';
import { injectMock } from '~/tests/unit/mocks/injectMock';
import CheckboxType from '~/modules/catalog/category/components/filters/renderer/CheckboxType.vue';
import type { Aggregation } from '~/modules/GraphQL/types';

jest.mock('@nuxtjs/composition-api', () => {
  const compositionApi = jest.requireActual('@nuxtjs/composition-api');
  return {
    ...compositionApi,
    inject: jest.fn(),
  };
});

(inject as jest.Mock).mockReturnValue(injectMock());

describe('CheckboxType.vue', () => {
  it('Should show filters if options are exist', () => {
    const { getAllByTestId } = render(CheckboxType, { props: { filter: categoryFiltersData[0] as Aggregation } });
    const filters = getAllByTestId('category-filter');

    expect(filters).toHaveLength(categoryFiltersData[0].options.length);
  });

  it('Default filter should not be active', () => {
    const { getByTestId } = render(CheckboxType, {
      props: {
        filter: categoryFiltersDataWithOneOption as Aggregation,
      },
    });
    const filter = getByTestId('category-filter');

    expect(filter.classList).not.toContain('is-active');
  });

  it('The filter should have a label should be clickable', async () => {
    const { getByLabelText, emitted } = render(CheckboxType, {
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
          (id: string, optVal: string): boolean => true,
        ),
      },
    ));

    const { getByTestId } = render(CheckboxType, {
      props: {
        filter: categoryFiltersDataWithOneOption as Aggregation,
      },
    });
    const filter = getByTestId('category-filter');

    expect(filter.classList).toContain('is-active');
  });
});
