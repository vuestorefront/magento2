import {
  useUrlResolver,
} from '@vue-storefront/magento';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';

export const useRoute = (context) => {
  const { route: { path } } = useVueRouter();

  const {
    search,
    result,
    loading,
  } = useUrlResolver(`router:${path}`);

  return {
    path,
    search: async () => {
      await search(path);
      if (!result?.value) context.root.$nuxt.error({ statusCode: 404 });
    },
    result,
    loading,
  };
};
