import userEvent from '@testing-library/user-event';
import { inject } from '@nuxtjs/composition-api';
import { render } from '~/tests/unit/test-utils';
import { categoryFiltersData, categoryFiltersDataWithOneOption } from '~/tests/unit/mocks/categoryFiltersMock';
import { injectMock } from '~/tests/unit/mocks/injectMock';
import SwatchColorType from '~/modules/catalog/category/components/filters/renderer/SwatchColorType.vue';
import type { Aggregation } from '~/modules/GraphQL/types';

jest.mock('@nuxtjs/composition-api', () => {
  const compositionApi = jest.requireActual('@nuxtjs/composition-api');
  return {
    ...compositionApi,
    inject: jest.fn(),
  };
});

(inject as jest.Mock).mockReturnValue(injectMock());

describe('SwatchColorType.vue', () => {
  it('Should show filters if options are exist', () => {
    const { getAllByRole } = render(SwatchColorType, { props: { filter: categoryFiltersData[0] as Aggregation } });
    const filters = getAllByRole('button');

    expect(filters).toHaveLength(categoryFiltersData[0].options.length);
  });

  it('Default filter should not be active', () => {
    const { getByRole } = render(SwatchColorType, {
      props: {
        filter: categoryFiltersDataWithOneOption as Aggregation,
      },
    });
    const filter = getByRole('button');

    expect(filter.classList).not.toContain('is-active');
  });

  it('The filter should be clickable', async () => {
    const { getByRole, emitted } = render(SwatchColorType, {
      props: {
        filter: categoryFiltersDataWithOneOption as Aggregation,
      },
    });
    const filter = getByRole('button');

    await userEvent.click(filter);

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

    const { getByRole } = render(SwatchColorType, {
      props: {
        filter: categoryFiltersDataWithOneOption as Aggregation,
      },
    });
    const filter = getByRole('button');

    expect(filter.classList).toContain('is-active');
  });
});
