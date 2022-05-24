import { useApi } from '~/composables/useApi';
import displayModesEnum from '~/modules/catalog/category/enums/displayModesEnum';
import categoryContentQuery from './categoryContent.gql';

export interface CmsBlockInterface {
  /** CMS block content */
  content?: string;
  /** CMS block identifier */
  identifier?: string;
  /** CMS block title */
  title?: string;
}

interface CmsContentInterface {
  cmsBlock: CmsBlockInterface
  displayMode: string
  isShowCms: boolean
  isShowProducts: boolean
}

export const useCategoryContent = () => {
  const { query } = useApi();

  const getContentData = async (id: number): Promise<CmsContentInterface> => {
    const data = await query(categoryContentQuery, { id });
    const cmsBlock = data?.category?.cms_block ?? { cmsBlock: { content: '' } };
    const displayMode = data?.category?.display_mode ?? displayModesEnum.PRODUCTS;
    const isShowCms = displayMode === displayModesEnum.PAGE || displayMode === displayModesEnum.PRODUCTS_AND_PAGE;
    const isShowProducts = displayMode === displayModesEnum.PRODUCTS || displayMode === displayModesEnum.PRODUCTS_AND_PAGE;

    return {
      cmsBlock,
      displayMode,
      isShowCms,
      isShowProducts,
    };
  };

  return {
    getContentData,
  };
};

export default useCategoryContent;
