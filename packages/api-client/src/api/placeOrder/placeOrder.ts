import gql from 'graphql-tag';

/** GraphQL Mutatiion that places an order. */
export default gql`
  mutation placeOrder($input: PlaceOrderInput) {
    placeOrder(input: $input) {
      order {
        order_number
      }
    }
  }
`;
