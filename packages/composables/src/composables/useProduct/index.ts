import {
  Products,
  GetProductSearchParams,
} from '@vue-storefront/magento-api';
import { Context, useProductFactory, ProductsSearchParams } from '@vue-storefront/core';

import { UseProduct } from '../../types';

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

const productsSearch = async (context: Context, params: GetProductSearchParams) => {
  const productResults = await context.$magento.api.products(params);

  return {
    data: productResults.data.products,
    total: productResults.data.products.total_count,
    availableFilters: productResults.data.products.aggregations,
    availableSortingOptions,
  };
};

const useProduct: (cacheId: string) => UseProduct<Products, ProductsSearchParams> = useProductFactory<Products, ProductsSearchParams>({
  productsSearch,
});

export default useProduct;
