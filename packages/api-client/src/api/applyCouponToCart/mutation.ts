import gql from 'graphql-tag';
import { cartFragment } from '../../fragments';

export default gql`
  mutation applyCouponToCart($input: ApplyCouponToCartInput) {
      applyCouponToCart(input: $input) {
          cart {
              ${cartFragment}
          }
      }
  }
`;
