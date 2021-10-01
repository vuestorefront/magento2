import { Context, Logger } from '@vue-storefront/core';
import { Page, CmsBlock } from '@vue-storefront/magento-api';
import { useContentFactory, UseContentFactoryParams } from '../../factories/useContentFactory';

const factoryParams: UseContentFactoryParams<Page, CmsBlock> = {
  loadContent: async (context: Context, identifier: string) => {
    Logger.debug('[Magento]: Load CMS Page content', { identifier });

    const { data } = await context.$magento.api.cmsPage(identifier);

    Logger.debug('[Result]:', { data });

    return data.cmsPage;
  },
  loadBlocks: async (context: Context, identifiers: string[]) => {
    Logger.debug('[Magento]: Load CMS Blocks content', { identifiers });

    const { data } = await context.$magento.api.cmsBlocks(identifiers);

    Logger.debug('[Result]:', { data });

    return data.cmsBlocks.items;
  },
};

export default useContentFactory<Page, CmsBlock>(factoryParams);
