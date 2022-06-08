import { useApi } from '~/composables/useApi';
import displayModesEnum from '~/modules/catalog/category/enums/displayModesEnum';
import categoryContentQuery from './categoryContent.gql';
import { CategoryTree } from '~/modules/GraphQL/types';

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

  const getContentData = async (uid: string): Promise<CmsContentInterface> => {
    const { data } = await query<{ categoryList: CategoryTree }>(categoryContentQuery, { filters: { category_uid: { eq: uid } } });
    const category = data?.categoryList[0] ?? {};
    const cmsBlock = category?.cms_block ?? { cmsBlock: { content: '' } };
    const displayMode = category?.display_mode ?? displayModesEnum.PRODUCTS;
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
