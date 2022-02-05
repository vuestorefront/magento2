import gql from 'graphql-tag';

export default gql`
mutation setPaymentMethodAndPlaceOrder($setPaymentMethod: SetPaymentMethodOnCartInput, $placeOrder: PlaceOrderInput) {
  setPaymentMethodOnCart(input: $setPaymentMethod) {
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
  placeOrder(input: $placeOrder) {
    order {
      order_number
      split_order_numbers
    }
  }
}`;
