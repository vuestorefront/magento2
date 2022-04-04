import RendererTypesEnum from '~/modules/catalog/category/components/filters/renderer/RendererTypesEnum';

export enum FilterTypeEnum {
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SWATCH_COLOR = 'swatch_color',
}

export interface FilterConfigInterface {
  attrCode: string;
  component?: RendererTypesEnum;
  type?: FilterTypeEnum;
  [key: string]: any;
}

/**
 * Override this to add/modify filters set and data
 */
function config(): FilterConfigInterface[] {
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
  ];
}

export const getFilterConfig = (attrCode: string): FilterConfigInterface => {
  const defaultCfg = {
    attrCode,
    type: FilterTypeEnum.CHECKBOX,
    component: RendererTypesEnum.CHECKBOX,
  };

  const find = config().find((cfgItem) => cfgItem.attrCode === attrCode) ?? defaultCfg;
  return { ...defaultCfg, ...find };
};

export const getFilterableAttributes = () => config().map((filter) => filter.attrCode);
