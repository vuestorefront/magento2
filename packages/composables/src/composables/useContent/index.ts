import { Context } from '@vue-storefront/core';
import { Page } from '@vue-storefront/magento-api';
import { usePageFactory, UsePageFactoryParams } from '../../factories/usePageFactory';

const factoryParams: UsePageFactoryParams<Page> = {
  loadPage: async (context: Context, identifier: string) => {
    const result = await context.$magento.api.cmsPage(identifier);
    return result.data.cmsPage;
  },
};

export default usePageFactory<Page>(factoryParams);
