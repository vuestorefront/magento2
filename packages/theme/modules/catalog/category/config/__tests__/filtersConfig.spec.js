import {
  getFilterConfig, getFilterableAttributes, FilterTypeEnum,
} from '../FiltersConfig';
import RendererTypesEnum from '~/modules/catalog/category/components/filters/renderer/RendererTypesEnum';

describe('FiltersConfig', () => {
  it('getFilterableAttributes', () => {
    const result = getFilterableAttributes();
    expect(result).toEqual(['price', 'size', 'color']);
  });

  it('getFilterConfig with a configured attribute', () => {
    const result = getFilterConfig('price');
    const expected = {
      attrCode: 'price',
      type: FilterTypeEnum.RADIO,
      component: RendererTypesEnum.RADIO,
    };
    expect(result).toEqual(expected);
  });

  it('getFilterConfig with a partially configured attribute', () => {
    const result = getFilterConfig('size');
    const expected = {
      attrCode: 'size',
      type: FilterTypeEnum.CHECKBOX,
      component: RendererTypesEnum.CHECKBOX,
    };
    expect(result).toEqual(expected);
  });

  it('getFilterConfig with a not-configured attribute (default)', () => {
    const result = getFilterConfig('ANYTHING');
    const expected = {
      attrCode: 'ANYTHING',
      type: FilterTypeEnum.CHECKBOX,
      component: RendererTypesEnum.CHECKBOX,
    };
    expect(result).toEqual(expected);
  });
});
