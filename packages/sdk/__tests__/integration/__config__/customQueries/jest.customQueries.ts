import { productDetails } from './productDetails';
import { categoryList } from './categoryList';
import { categorySearch } from './categorySearch';
import { relatedProduct } from './relatedProduct';

export const customQueries = {
  'product-details-custom-query': productDetails,
  'category-list-custom-query': categoryList,
  'category-search-custom-query': categorySearch,
  'related-product-custom-query': relatedProduct
};
