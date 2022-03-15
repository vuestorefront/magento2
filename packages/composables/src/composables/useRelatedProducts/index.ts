import {
  ComposableFunctionArgs,
  Context,
  Logger,
  ProductsSearchParams,
} from '@vue-storefront/core';
import {
  GetProductSearchParams,
  RelatedProductQuery,
} from '@vue-storefront/magento-api';
import { UseRelatedProducts } from '../../types/composables';
import {
  useRelatedProductsFactory,
  UseRelatedProductsFactoryParams,
} from '../../factories/useRelatedProductsFactory';

/**
 * @deprecated since version1.0.0
 */
const factoryParams: UseRelatedProductsFactoryParams<RelatedProductQuery['products']['items'][0]['related_products'], ProductsSearchParams> = {
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
      .api
      .relatedProduct(searchParams as GetProductSearchParams);

    Logger.debug('[Result]:', { data });

    return data.products?.items[0]?.related_products;
  },
};

const useRelatedProducts:
(cacheId?: string) => UseRelatedProducts<RelatedProductQuery['products']['items'][0]['related_products'],
ProductsSearchParams> = useRelatedProductsFactory<RelatedProductQuery['products']['items'][0]['related_products'],
ProductsSearchParams>(factoryParams);

export default useRelatedProducts;
