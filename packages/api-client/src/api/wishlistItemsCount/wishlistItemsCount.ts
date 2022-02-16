import gql from 'graphql-tag';

export default gql`
  query wishlist {
    customer {
      wishlists {
        items_count
      }
    }
  }
`;
