import { Logger } from '~/helpers/logger';
import { VsfContext } from '~/composables/context';

export const loadBlocksCommand = {
  execute: async (context: VsfContext, params) => {
    Logger.debug('[Magento]: Load CMS Blocks content', { params });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { data } = await context.$magento.api.cmsBlocks(params.identifiers, params.customQuery ?? null, params?.customHeaders);

    Logger.debug('[Result]:', { data });

    return data.cmsBlocks.items;
  },
};
