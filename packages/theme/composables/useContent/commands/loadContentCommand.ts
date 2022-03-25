import { Context } from '@vue-storefront/core';
import { Logger } from '~/helpers/logger';

export const loadContentCommand = {
  execute: async (context: Context, params) => {
    Logger.debug('[Magento]: Load CMS Page content', { params });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { data } = await context.$magento.api.cmsPage(params.identifier);

    Logger.debug('[Result]:', { data });

    return data.cmsPage;
  },
};
