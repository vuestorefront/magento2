import { Pagination } from '~/composables/types';

export const paginationData: Pagination = {
  currentPage: 1,
  totalPages: 2,
  totalItems: 11,
  itemsPerPage: 10,
  pageOptions: [10, 50, 100],
};

export const sortByData = {
  options: [
    {
      label: 'Sort: Default',
      value: '',
    },
    {
      label: 'Sort: Name A-Z',
      value: 'name_ASC',
    },
    {
      label: 'Sort: Name Z-A',
      value: 'name_DESC',
    },
    {
      label: 'Sort: Price from low to high',
      value: 'price_ASC',
    },
    {
      label: 'Sort: Price from high to low',
      value: 'price_DESC',
    },
  ],
  selected: 'name_DESC',
};
