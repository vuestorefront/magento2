import displayModesEnum from '~/modules/catalog/category/enums/displayModesEnum';
// @ts-ignore
import config from '~/config.js';

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
  const getContentData = async (id: number): Promise<CmsContentInterface> => {
    console.log(config.get('storeUrl'));
    const url = new URL(`__safe-cms-content/${id}`, process.env.STORE_URL).toString();
    const data = await fetch(url) as any;
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
