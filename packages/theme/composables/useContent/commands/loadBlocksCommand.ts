import { Context, Logger } from '@vue-storefront/core';

export const loadBlocksCommand = {
  execute: async (context: Context, params) => {
    Logger.debug('[Magento]: Load CMS Blocks content', { params });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { data } = await context.$magento.api.cmsBlocks(params.identifiers);

    Logger.debug('[Result]:', { data });

    return data.cmsBlocks.items;
  },
};
