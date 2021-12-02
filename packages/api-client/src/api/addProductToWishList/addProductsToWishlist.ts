import gql from 'graphql-tag';
import productFragment from '../../fragments/productFragment';

export default gql`
  mutation addProductsToWishlist($id: ID!, $items: [WishlistItemInput!]!) {
    addProductsToWishlist(wishlistId: $id, wishlistItems: $items) {
      wishlist {
        id
        items_count
        sharing_code
        items_v2 {
          items {
            id
            quantity
            description
            added_at
            product {
              ${productFragment}
            }
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
      }
    }
  }`;
