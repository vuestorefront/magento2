import {
  getFilterConfig, getDisabledFilters,
} from '../FiltersConfig';
import config, { FilterTypeEnum } from '~/modules/catalog/category/config/config';
import RendererTypesEnum from '~/modules/catalog/category/components/filters/renderer/RendererTypesEnum';

jest.mock('~/modules/catalog/category/config/config');

const defaultFiltersConfig = [
  {
    attrCode: 'price',
    type: FilterTypeEnum.RADIO,
    component: RendererTypesEnum.RADIO,
  },
  {
    attrCode: 'size',
  },
  {
    attrCode: 'color',
    type: FilterTypeEnum.SWATCH_COLOR,
    component: RendererTypesEnum.SWATCH_COLOR,
  },
  {
    attrCode: 'new',
    type: FilterTypeEnum.RADIO,
    component: RendererTypesEnum.YES_NO,
  },
  {
    attrCode: 'sale',
    type: FilterTypeEnum.RADIO,
    component: RendererTypesEnum.YES_NO,
    disabled: true,
  },
];
describe('FiltersConfig', () => {
  it('getFilterConfig with a configured attribute', () => {
    (config as jest.Mock).mockReturnValueOnce(defaultFiltersConfig);
    const result = getFilterConfig('price');
    const expected = {
      attrCode: 'price',
      type: FilterTypeEnum.RADIO,
      component: RendererTypesEnum.RADIO,
    };
    expect(result).toEqual(expected);
  });

  it('getFilterConfig with a partially configured attribute', () => {
    (config as jest.Mock).mockReturnValueOnce(defaultFiltersConfig);
    const result = getFilterConfig('size');
    const expected = {
      attrCode: 'size',
      type: FilterTypeEnum.CHECKBOX,
      component: RendererTypesEnum.CHECKBOX,
    };
    expect(result).toEqual(expected);
  });

  it('getFilterConfig with a not-configured attribute (default)', () => {
    (config as jest.Mock).mockReturnValueOnce(defaultFiltersConfig);
    const result = getFilterConfig('ANYTHING');
    const expected = {
      attrCode: 'ANYTHING',
      type: FilterTypeEnum.CHECKBOX,
      component: RendererTypesEnum.CHECKBOX,
    };
    expect(result).toEqual(expected);
  });

  it('getDisabledFilters', () => {
    (config as jest.Mock).mockReturnValueOnce(defaultFiltersConfig);
    const result = getDisabledFilters();
    const expected = ['sale'];
    expect(result).toEqual(expected);
  });
});
