/**
 * @deprecated since version 1.0.0
 */
import {
  ComposableFunctionArgs,
  Context,
  Logger,
  ProductsSearchParams,
  UseProduct,
  useProductFactory,
  UseProductFactoryParams,
} from '@vue-storefront/core';
import { ProductsListQuery, GetProductSearchParams, ProductsQueryType } from '@vue-storefront/magento-api';
import { Scalars } from '@vue-storefront/magento-api/lib/types/GraphQL';

const factoryParams: UseProductFactoryParams<ProductsListQuery['products'],
ProductsSearchParams> = {
  productsSearch: async (context: Context, params: ComposableFunctionArgs<GetProductSearchParams & {
    queryType: ProductsQueryType;
    configurations?: Scalars['ID']
  }>) => {
    Logger.debug('[Magento]: Load product based on ', { params });

    const {
      queryType,
      customQuery,
      ...searchParams
    } = {
      ...params,
    };

    switch (queryType) {
      case ProductsQueryType.Detail:
        const productDetailsResults = await context
          .$magento
          .api
          .productDetail({
            ...searchParams,
          } as GetProductSearchParams);

        Logger.debug('[Result]:', { data: productDetailsResults });

        return productDetailsResults.data?.products;

      case ProductsQueryType.List:
      default:
        const productListResults = await context
          .$magento
          .api
          .products(searchParams as GetProductSearchParams);

        Logger.debug('[Result]:', { data: productListResults });

        return productListResults.data?.products;
    }
  },
};

const useProduct:
(cacheId?: string) => UseProduct<ProductsListQuery['products'],
ProductsSearchParams> = useProductFactory<ProductsListQuery['products'],
ProductsSearchParams>(factoryParams);

export default useProduct;
