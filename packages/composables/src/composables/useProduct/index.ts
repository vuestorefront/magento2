import {
  Context,
  CustomQuery,
  ProductsSearchParams,
  UseProduct,
  useProductFactory,
  UseProductFactoryParams,
} from '@vue-storefront/core';
import { ProductsListQuery, GetProductSearchParams, ProductsQueryType } from '@vue-storefront/magento-api';
import { Scalars } from '@vue-storefront/magento-api/lib/types/GraphQL';

const factoryParams: UseProductFactoryParams<ProductsListQuery['products'],
ProductsSearchParams> = {
  productsSearch: async (context: Context, params: GetProductSearchParams & {
    queryType: ProductsQueryType;
    customQuery?: CustomQuery;
    configurations?: Scalars['ID']
  }) => {
    const {
      queryType,
      customQuery,
      ...searchParams
    } = params;

    switch (queryType) {
      case ProductsQueryType.Detail:

        const productDetailsResults = await context
          .$magento
          .api
          .productDetail(searchParams as GetProductSearchParams, (customQuery || {}));

        return productDetailsResults.data.products;

      case ProductsQueryType.List:
      default:
        const productListResults = await context
          .$magento
          .api
          .products(searchParams as GetProductSearchParams, (customQuery || {}));

        return productListResults.data.products;
    }
  },
};

const useProduct:
(cacheId?: string) => UseProduct<ProductsListQuery['products'],
ProductsSearchParams> = useProductFactory<ProductsListQuery['products'],
ProductsSearchParams>(factoryParams);

export default useProduct;
