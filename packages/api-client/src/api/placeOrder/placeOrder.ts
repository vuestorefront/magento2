import gql from 'graphql-tag';

export default gql`
mutation placeOrder($input: PlaceOrderInput) {
  placeOrder(input: $input) {
    order {
      order_number
    }
  }
}`;
