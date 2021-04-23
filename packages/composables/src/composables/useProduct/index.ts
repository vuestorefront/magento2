import { Context, useProductFactory, ProductsSearchParams } from '@vue-storefront/core';
import { UseProductFactoryParams } from '@vue-storefront/core/lib/src/factories/useProductFactory';
import { ProductsListQuery, GetProductSearchParams } from '@vue-storefront/magento-api';

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
  productsSearch: async (context: Context, params: GetProductSearchParams) => {
    const productResults = await context.$magento.api.products(params);

    return productResults.data.products;
  },
};

export default useProductFactory<ProductsListQuery['products'], ProductsSearchParams>(factoryParams);
