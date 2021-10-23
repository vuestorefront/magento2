import {
  Context,
  CustomQuery, Logger,
  ProductsSearchParams,
} from '@absolute-web/vsf-core';
import {
  GetProductSearchParams,
  UsedProductsQuery,
} from '@absolute-web/magento-api';
import {
  useUsedProductsFactory,
  UseUsedProductsFactoryParams,
} from '../../factories/useUsedProductsFactory';
import { UseUsedProducts } from '../../types/composables';

const factoryParams: UseUsedProductsFactoryParams<UsedProductsQuery['products']['items'][0]['used_products'], ProductsSearchParams> = {
  productsSearch: async (context: Context,
    params: GetProductSearchParams & {
      customQuery?: CustomQuery;
    }) => {
    Logger.debug('[Magento] Find used products based on ', { params });

    const {
      customQuery,
      ...searchParams
    } = params;

    const { data } = await context
      .$magento
      .getApi
      .usedProduct(searchParams as GetProductSearchParams, (customQuery || {}));

    Logger.debug('[Result]:', { data });

    return data.products?.items[0]?.used_products;
  },
};

const useUsedProducts:
(cacheId?: string) => UseUsedProducts<UsedProductsQuery['products']['items'][0]['used_products'],
ProductsSearchParams> = useUsedProductsFactory<UsedProductsQuery['products']['items'][0]['used_products'],
ProductsSearchParams>(factoryParams);

export default useUsedProducts;
