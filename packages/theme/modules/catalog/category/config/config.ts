import RendererTypesEnum from '~/modules/catalog/category/components/filters/renderer/RendererTypesEnum';
import type { FilterConfigInterface } from '~/modules/catalog/category/config/FiltersConfig';

export enum FilterTypeEnum {
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SWATCH_COLOR = 'swatch_color',
}

/**
 * Override this to add/modify filters renderers and data
 *
 * @attrCode: Magento attribute code
 * @type: internal filter type
 * @component: filter renderer component
 * @disabled: flag to disable filter on the front; disabled filter will be not rendered
 */
export default function config(): FilterConfigInterface[] {
  return [
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
      attrCode: 'performance_fabric',
      type: FilterTypeEnum.RADIO,
      component: RendererTypesEnum.YES_NO,
    },
    {
      attrCode: 'sale',
      type: FilterTypeEnum.RADIO,
      component: RendererTypesEnum.YES_NO,
    },
  ];
}
