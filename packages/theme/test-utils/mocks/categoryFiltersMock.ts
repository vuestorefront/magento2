import type { Aggregation } from '~/modules/GraphQL/types';

export const categoryFiltersData: Aggregation = {
  label: 'Pattern',
  count: 2,
  attribute_code: 'pattern',
  position: 0,
  options: [
    {
      count: 11,
      label: 'Solid',
      value: '196',
    },
    {
      count: 1,
      label: '194',
      value: '194',
    },
  ],
};

export const categoryFiltersDataWithOneOption: Aggregation = Object.assign(categoryFiltersData, {
  options: [categoryFiltersData.options[0]],
});
