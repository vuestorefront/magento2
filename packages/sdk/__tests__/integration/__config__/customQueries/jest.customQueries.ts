import { productDetails } from './productDetails';
import { categoryList } from './categoryList';
import { categorySearch } from './categorySearch';
import { productsList } from './products';
import { relatedProduct } from './relatedProduct';
import { upsellProducts } from './upsellProducts';
import { addProductToWishList } from './addProductToWishList';

export const customQueries = {
  'product-details-custom-query': productDetails,
  'category-list-custom-query': categoryList,
  'category-search-custom-query': categorySearch,
  'products-custom-query': productsList,
  'related-product-custom-query': relatedProduct,
  'upsell-products-custom-query': upsellProducts,
  'add-product-to-wishlist-custom-query': addProductToWishList
};
