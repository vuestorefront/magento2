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
import { UseRelatedProducts } from '../../types/composables';
import {
  useRelatedProductsFactory,
  UseRelatedProductsFactoryParams,
} from '../../factories/useRelatedProductsFactory';

const factoryParams: UseRelatedProductsFactoryParams<Product[], ProductsSearchParams> = {
  provide() {
    return {
      cache: useCache(),
    };
  },
  productsSearch: async (
    context: Context,
    params: ComposableFunctionArgs<GetProductSearchParams>,
  ) => {
    Logger.debug('[Magento] Load related products based on ', { params });

    const {
      customQuery,
      ...searchParams
    } = params;

    const { data } = await context
      .$magento
      .getApi
      .relatedProduct(searchParams as GetProductSearchParams);

    Logger.debug('[Result]:', { data });

    if (data?.cacheTags) {
      context.cache.addTagsFromString(data.cacheTags);
    }

    return data.products?.items[0]?.related_products as unknown as Product[];
  },
};

const useRelatedProducts:
(cacheId?: string) => UseRelatedProducts<Product[],
ProductsSearchParams> = useRelatedProductsFactory<Product[],
ProductsSearchParams>(factoryParams);

export default useRelatedProducts;
