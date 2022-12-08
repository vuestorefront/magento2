import { Logger } from '~/helpers/logger';
import { VsfContext } from '~/composables/context';

export const loadContentCommand = {
  execute: async (context: VsfContext, params) => {
    Logger.debug('[Magento]: Load CMS Page content', { params });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { data } = await context.$magento.api.cmsPage(params.identifier, params.customQuery ?? null, params?.customHeaders);

    Logger.debug('[Result]:', { data });

    return data.cmsPage;
  },
};
