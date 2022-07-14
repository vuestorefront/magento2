export type RemovableFilter = {
  [key: string]: string;
};

export const removableFiltersData: RemovableFilter[] = [
  {
    id: 'new',
    name: 'New',
    label: '1',
    value: '1',
    type: 'yes_no',
  },
  {
    id: 'climate',
    name: 'Climate',
    label: 'All-Weather',
    value: '201',
    type: 'checkbox',
  },
  {
    id: 'color',
    name: 'Color',
    label: 'Black',
    value: '49',
    type: 'swatch_color',
  },
];
