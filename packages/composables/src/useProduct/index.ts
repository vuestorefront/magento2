import {
  Context, ProductsSearchParams, ProductsSearchResult, useProductFactory, UseProductFactoryParams
} from '@vue-storefront/core';
import { Product, UseProduct } from '../types';

const params: UseProductFactoryParams<Product, any> = {
  productsSearch: async (context: Context, params: ProductsSearchParams): Promise<ProductsSearchResult<Product>> => {
    return await context.$m2.api.getProduct(params);
  }
};

const useProduct: (cacheId: string) => UseProduct<Product> = useProductFactory<Product, any>(params);

export default useProduct;
