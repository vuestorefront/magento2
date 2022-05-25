import RendererTypesEnum from '~/modules/catalog/category/components/filters/renderer/RendererTypesEnum';
import config, { FilterTypeEnum } from './config';

export interface FilterConfigInterface {
  attrCode: string;
  component?: RendererTypesEnum;
  type?: FilterTypeEnum;
  disabled?: boolean
}

export const getFilterConfig = (attrCode: string): FilterConfigInterface => {
  const defaultCfg = {
    attrCode,
    type: FilterTypeEnum.CHECKBOX,
    component: RendererTypesEnum.CHECKBOX,
    disabled: false,
  };

  const find = config().find((cfgItem) => cfgItem.attrCode === attrCode) ?? {};
  return { ...defaultCfg, ...find };
};

export const getDisabledFilters = () => config().filter((filter) => filter.disabled).map((filter) => filter.attrCode);
export const isFilterEnabled = (attrCode: string) => config().find((attr) => attr.attrCode === attrCode && !attr.disabled);
