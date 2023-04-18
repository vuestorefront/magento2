import { productDetails } from './productDetails';
import { categoryList } from './categoryList';
import { categorySearch } from './categorySearch';
import { productsList } from './products';
import { relatedProduct } from './relatedProduct';

export const customQueries = {
  'product-details-custom-query': productDetails,
  'category-list-custom-query': categoryList,
  'category-search-custom-query': categorySearch,
  'products-custom-query': productsList,
  'related-product-custom-query': relatedProduct
};
