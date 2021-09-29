import {
  Context,
  CustomQuery,
  ProductsSearchParams,
} from '@vue-storefront/core';
import {
  GetProductSearchParams,
  UpsellProductsQuery,
} from '@vue-storefront/magento-api';
import {
  useUpsellProductsFactory,
  UseUpsellProductsFactoryParams,
} from '../../factories/useUpsellProductsFactory';
import { UseUpsellProducts } from '../../types/composables';

const factoryParams: UseUpsellProductsFactoryParams<UpsellProductsQuery['products']['items'][0]['upsell_products'], ProductsSearchParams> = {
  productsSearch: async (context: Context,
    params: GetProductSearchParams & {
      customQuery?: CustomQuery;
    }) => {
    const {
      customQuery,
      ...searchParams
    } = params;

    const upsellProductsResults = await context
      .$magento
      .api
      .upsellProduct(searchParams as GetProductSearchParams, (customQuery || {}));

    return upsellProductsResults.data.products?.items[0]?.upsell_products;
  },
};

const useUpsellProducts:
(cacheId?: string) => UseUpsellProducts<UpsellProductsQuery['products']['items'][0]['upsell_products'],
ProductsSearchParams> = useUpsellProductsFactory<UpsellProductsQuery['products']['items'][0]['upsell_products'],
ProductsSearchParams>(factoryParams);

export default useUpsellProducts;
