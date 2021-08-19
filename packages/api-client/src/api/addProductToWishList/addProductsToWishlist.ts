import gql from 'graphql-tag';
import WishlistData from '../../fragments/wishlistDataFragment';

export default gql`
  ${WishlistData}
  
mutation addProductsToWishlist($id: ID!, $items: [WishlistItemInput!]!) {
  addProductsToWishlist(wishlistId: $id, wishlistItems: $items) {
    wishlist {
      ...WishlistData
    }
  }
}`;
