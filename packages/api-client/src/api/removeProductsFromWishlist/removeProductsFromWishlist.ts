import gql from 'graphql-tag';
import WishlistData from '../../fragments/wishlistDataFragment';

export default gql`
  ${WishlistData}
  
mutation removeProductsFromWishlist($id: ID!, $items: [ID!]!) {
  removeProductsFromWishlist(wishlistId: $id, wishlistItemsIds: $items) {
    wishlist {
      ...WishlistData
    }
  }
}`;
