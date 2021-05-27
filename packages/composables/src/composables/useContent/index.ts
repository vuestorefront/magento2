import { Context } from '@vue-storefront/core';
import { Page } from '@vue-storefront/magento-api';
import { useContentFactory, UseContentFactoryParams } from '../../factories/useContentFactory';

const factoryParams: UseContentFactoryParams<Page> = {
  loadContent: async (context: Context, identifier: string) => {
    const result = await context.$magento.api.cmsPage(identifier);
    return result.data.cmsPage;
  },
};

export default useContentFactory<Page>(factoryParams);
