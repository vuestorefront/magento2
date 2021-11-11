import {
  useUrlResolver as urlResolver,
} from '@vue-storefront/magento';
import { useRoute, useContext } from '@nuxtjs/composition-api';

export const useUrlResolver = () => {
  const route = useRoute();
  const { error } = useContext();
  const { path } = route.value;

  const {
    search,
    result,
    loading,
  } = urlResolver(`router:${path}`);

  return {
    path,
    search: async () => {
      await search(path);
      if (!result?.value) error({ statusCode: 404 });
    },
    result,
    loading,
  };
};
