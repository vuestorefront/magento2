import gql from 'graphql-tag';

/** GraphQL Query that fetches available payment methods for received cart. */
export default gql`
  query GuestAvailablePaymentMethods($cartId: String!) {
    cart(cart_id: $cartId) {
      available_payment_methods {
        code
        title
      }
    }
  }
`;
