export enum SortingOptionsValuesEnum {
  DEFAULT = '',
  NAME_ASC = 'name_ASC',
  NAME_DESC = 'name_DESC',
  PRICE_ASC = 'price_ASC',
  PRICE_DESC = 'price_DESC',
}

export interface SortingOptionsInterface {
  label: string,
  value: SortingOptionsValuesEnum
}

export const SortingOptions: SortingOptionsInterface[] = [
  {
    label: 'Sort: Default',
    value: SortingOptionsValuesEnum.DEFAULT,
  },
  {
    label: 'Sort: Name A-Z',
    value: SortingOptionsValuesEnum.NAME_ASC,
  },
  {
    label: 'Sort: Name Z-A',
    value: SortingOptionsValuesEnum.NAME_DESC,
  },
  {
    label: 'Sort: Price from low to high',
    value: SortingOptionsValuesEnum.PRICE_ASC,
  },
  {
    label: 'Sort: Price from high to low',
    value: SortingOptionsValuesEnum.PRICE_DESC,
  },
];
