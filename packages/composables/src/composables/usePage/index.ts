import { Context } from '@vue-storefront/core';
import { Page, UsePage } from '../../types';
import { usePageFactory } from '../../factories/usePageFactory';

const usePage: (cacheId: string) => UsePage<Page> = usePageFactory<Page>({
  loadPage: async (context: Context, identifer: string) => {
    const result = await context.$ma.api.cmsPage(identifer);
    return result.data.cmsPage;
  },
});

export default usePage;
