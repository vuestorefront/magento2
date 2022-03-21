import useApi from '~/composables/useApi';
import categoryContentQuery from './categoryContent.gql';
import displayModesEnum from '~/modules/catalog/category/enums/displayModesEnum';
import type { CategoryTree } from '~/composables/types';
import type { CmsBlock } from '~/modules/GraphQL/types';

export type CategoryQuery = {
  category: CategoryTree
};

interface CmsContentInterface {
  cmsBlock?: CmsBlock
  displayMode: string
  isShowCms: boolean
  isShowProducts: boolean
}

export const useCategoryContent = () => {
  const { query } = useApi();

  const getContentData = async (id: number): Promise<CmsContentInterface> => {
    const data = await query<CategoryQuery, { id: number }>({
      document: categoryContentQuery,
      variables: { id },
      debugInfo: 'Category Content'
    });
    const cmsBlock = data?.category?.cms_block ?? { content: '' };
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
