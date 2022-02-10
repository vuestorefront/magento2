// import {
//   useUrlResolver as urlResolver,
// } from '@vue-storefront/magento';
import { useRoute, useContext, ref } from '@nuxtjs/composition-api';
import {Logger} from '@vue-storefront/core';

export const useUrlResolver = () => {
  const route = useRoute();
  const { error, app } = useContext();
  const { path } = route.value;

  // const {
  //   search,
  //   result,
  //   loading,
  // } = urlResolver(`router:${path}`);

  const result = ref(null);

  return {
    path,
    search: async () => {
      // await search({ url: path });
      // console.log
      // if (!result?.value) error({ statusCode: 404 });

      const { data } = await app.context.$vsf.$magento.api.urlResolver({ url: path });

      Logger.debug('[Result]:', { data });

      result.value = data.urlResolver;

      if (!result?.value) error({ statusCode: 404 });
    },
    result,
    loading: false,
  };
};
