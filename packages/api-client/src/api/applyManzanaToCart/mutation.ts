import gql from 'graphql-tag';
import {cartFragment} from '../../fragments';

export default gql`
  mutation applyManzanaDiscount($cart_id: String, $card_number: String) {
      applyCouponToCart(card_id: $cart_id, card_number: $card_number) {
          cart {
              ${cartFragment}
          }
      }
  }
`;
