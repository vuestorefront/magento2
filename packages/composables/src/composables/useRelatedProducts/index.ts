import {
  Context,
  CustomQuery,
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

const factoryParams: UseRelatedProductsFactoryParams<RelatedProductQuery['products']['items'][0]['related_products'], ProductsSearchParams> = {
  productsSearch: async (context: Context,
    params: GetProductSearchParams & {
      customQuery?: CustomQuery;
    }) => {
    const {
      customQuery,
      ...searchParams
    } = params;

    const relatedProductsResults = await context
      .$magento
      .api
      .relatedProduct(searchParams as GetProductSearchParams, (customQuery || {}));

    return relatedProductsResults.data.products?.items[0]?.related_products;
  },
};

const useRelatedProducts:
(cacheId?: string) => UseRelatedProducts<RelatedProductQuery['products']['items'][0]['related_products'],
ProductsSearchParams> = useRelatedProductsFactory<RelatedProductQuery['products']['items'][0]['related_products'],
ProductsSearchParams>(factoryParams);

export default useRelatedProducts;
