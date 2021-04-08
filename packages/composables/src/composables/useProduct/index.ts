import {
  ProductAttributeFilter,
  ProductAttributeSortInput,
  Products,
  ProductsQueryType,
} from '@vue-storefront/magento-api';
import { Context, useProductFactory, ProductsSearchParams } from '@vue-storefront/core';

import { ProductAttributeFilterInput } from '@vue-storefront/magento-api/src';
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

const productsSearch = async (context: Context, params: {
  search?: string;
  filter?: ProductAttributeFilter;
  pageSize?: number;
  currentPage?: number;
  sort?: ProductAttributeSortInput;
  queryType?: ProductsQueryType;
}) => {
  const productResults = await context.$ma.api.products({
    pageSize: params.pageSize,
    currentPage: params.currentPage,
    queryType: params.queryType,
    search: params.search,
    filter: params.filter,
    sort: params.sort,
  });

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
