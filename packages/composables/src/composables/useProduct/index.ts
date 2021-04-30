import { Context, useProductFactory, ProductsSearchParams } from '@vue-storefront/core';
import { UseProductFactoryParams } from '@vue-storefront/core/lib/src/factories/useProductFactory';
import { ProductsListQuery, GetProductSearchParams, ProductsQueryType } from '@vue-storefront/magento-api';

const availableSortingOptions = [{
  value: 'latest',
  label: 'Latest',
}, {
  value: 'price-up',
  label: 'Price from low to high',
}, {
  value: 'price-down',
  label: 'Price from high to low',
}];

const factoryParams: UseProductFactoryParams<ProductsListQuery['products'], ProductsSearchParams> = {
  productsSearch: async (context: Context, params: GetProductSearchParams & { queryType: ProductsQueryType; }) => {
    const { queryType, ...searchParams } = params;
    switch (queryType) {
      case ProductsQueryType.Detail:
        const productDetailsResults = await context.$magento.api.productDetail(searchParams as GetProductSearchParams);
        return productDetailsResults.data.products;

      case ProductsQueryType.List:
      default:
        const productListResults = await context.$magento.api.products(searchParams as GetProductSearchParams);
        return productListResults.data.products;
    }
  },
};

export default useProductFactory<ProductsListQuery['products'], ProductsSearchParams>(factoryParams);
