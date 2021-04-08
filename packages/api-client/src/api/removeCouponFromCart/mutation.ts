import gql from 'graphql-tag';
import { cartFragment } from '../../fragments';

export default gql`
  mutation removeCouponFromCart($input: cart_id) {
      removeCouponFromCart(input: $input) {
          cart {
              ${cartFragment}
          }
      }
  }
`;
