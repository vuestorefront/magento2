import {
  Context,
  CustomQuery, Logger,
  ProductsSearchParams,
} from '@absolute-web/vsf-core';
import {
  GetProductSearchParams,
  Product,
} from '@absolute-web/magento-api';
import {
  useUsedProductsFactory,
  UseUsedProductsFactoryParams,
} from '../../factories/useUsedProductsFactory';
import { UseUsedProducts } from '../../types/composables';

const factoryParams: UseUsedProductsFactoryParams<Product[], ProductsSearchParams> = {
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

    return data.products?.items[0]?.used_products as unknown as Product[];
  },
};

const useUsedProducts:
(cacheId?: string) => UseUsedProducts<Product[],
ProductsSearchParams> = useUsedProductsFactory<Product[],
ProductsSearchParams>(factoryParams);

export default useUsedProducts;
