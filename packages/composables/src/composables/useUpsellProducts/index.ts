import {
  ComposableFunctionArgs,
  Context,
  Logger,
  ProductsSearchParams,
} from '@absolute-web/vsf-core';
import {
  GetProductSearchParams,
  Product,
} from '@absolute-web/magento-api';
import { useCache } from '@absolute-web/vsf-cache';
import {
  useUpsellProductsFactory,
  UseUpsellProductsFactoryParams,
} from '../../factories/useUpsellProductsFactory';
import { UseUpsellProducts } from '../../types/composables';

const factoryParams: UseUpsellProductsFactoryParams<Product[], ProductsSearchParams> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  productsSearch: async (
    context: Context,
    params: ComposableFunctionArgs<GetProductSearchParams>,
  ) => {
    Logger.debug('[Magento] Find upsell products based on ', { params });

    const {
      customQuery,
      ...searchParams
    } = {
      ...params,
    };

    const { data } = await context
      .$magento
      .getApi
      .upsellProduct(searchParams as GetProductSearchParams);

    Logger.debug('[Result]:', { data });

    if (data?.cacheTags) {
      context.cache.addTagsFromString(data.cacheTags);
    }

    return data.products?.items[0]?.upsell_products as unknown as Product[];
  },
};

const useUpsellProducts:
(cacheId?: string) => UseUpsellProducts<Product[],
ProductsSearchParams> = useUpsellProductsFactory<Product[],
ProductsSearchParams>(factoryParams);

export default useUpsellProducts;
