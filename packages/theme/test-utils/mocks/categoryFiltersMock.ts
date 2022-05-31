import type { Aggregation } from '~/modules/GraphQL/types';

export const categoryFiltersData: Aggregation[] = [
  {
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
  },
  {
    label: 'Category',
    count: 7,
    attribute_code: 'category_id',
    position: 1,
    options: [
      {
        count: 12,
        label: 'Women',
        value: '20',
      },
      {
        count: 12,
        label: 'Tops',
        value: '21',
      },
    ],
  },
];

export const categoryFiltersDataWithOneOption: Aggregation = Object.assign(categoryFiltersData[0], {
  options: [categoryFiltersData[0].options[0]],
});
