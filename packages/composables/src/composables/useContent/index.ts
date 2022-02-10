/**
 * @deprecated since version <version?>
 *
 * @see <add docs link>
 */
import { Context, Logger } from '@vue-storefront/core';
import { Page, CmsBlock } from '@vue-storefront/magento-api';
import { useContentFactory, UseContentFactoryParams } from '../../factories/useContentFactory';

const factoryParams: UseContentFactoryParams<Page, CmsBlock> = {
  loadContent: async (context: Context, params) => {
    Logger.debug('[Magento]: Load CMS Page content', { params });

    const { data } = await context.$magento.api.cmsPage(params.identifier);

    Logger.debug('[Result]:', { data });

    return data.cmsPage;
  },
  loadBlocks: async (context: Context, params) => {
    Logger.debug('[Magento]: Load CMS Blocks content', { params });

    const { data } = await context.$magento.api.cmsBlocks(params.identifiers);

    Logger.debug('[Result]:', { data });

    return data.cmsBlocks.items;
  },
};

export default useContentFactory<Page, CmsBlock>(factoryParams);
