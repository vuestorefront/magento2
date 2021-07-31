import gql from 'graphql-tag';
import WishlistData from '../../fragments/wishlistDataFragment';

export default gql`
  ${WishlistData}
  query wishlist($currentPage: Int = 1, $pageSize: Int = 20) {
  customer {
    wishlists(currentPage: $currentPage, pageSize: $pageSize) {
      ...WishlistData
    }
  }
}`;
