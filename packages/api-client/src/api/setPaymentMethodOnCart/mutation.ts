import gql from 'graphql-tag';

export default gql`
  mutation setPaymentMethodOnCart($input: SetPaymentMethodOnCartInput) {
    setGuestEmailOnCart(input: $input) {
      cart {
        selected_payment_method {
          code
          title
        }
      }
    }
  }
`;
