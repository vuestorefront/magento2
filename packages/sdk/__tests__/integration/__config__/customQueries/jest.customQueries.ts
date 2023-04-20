import { productDetails } from './productDetails';
import { categoryList } from './categoryList';
import { categorySearch } from './categorySearch';
import { productsList } from './products';
import { relatedProducts } from './relatedProducts';
import { upsellProducts } from './upsellProducts';
import { addProductToWishList } from './addProductToWishList';
import { cart } from './cart';

export const customQueries = {
  'product-details-custom-query': productDetails,
  'category-list-custom-query': categoryList,
  'category-search-custom-query': categorySearch,
  'products-custom-query': productsList,
  'related-products-custom-query': relatedProducts,
  'upsell-products-custom-query': upsellProducts,
  'add-product-to-wishlist-custom-query': addProductToWishList,
  'cart-custom-query': cart
};
