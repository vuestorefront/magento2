import gql from 'graphql-tag';

export default gql`
mutation setPaymentMethodOnCart($input: SetPaymentMethodOnCartInput) {
  setPaymentMethodOnCart(input: $input) {
    cart {
      available_payment_methods {
        code
        title
      }
      selected_payment_method {
        code
        title
      }
    }
  }
}`;
