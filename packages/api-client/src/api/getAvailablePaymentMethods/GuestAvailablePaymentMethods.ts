import gql from 'graphql-tag';

export default gql`
query GuestAvailablePaymentMethods($cartId: String!) {
  cart(cart_id: $cartId) {
    available_payment_methods {
      code
      title
    }
  }
}`;
