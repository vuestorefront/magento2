import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
mutation applyGiftCardToCart($input: ApplyGiftCardToCartInput) {
  applyGiftCardToCart(input: $input) {
    cart {
      ${cartFragment}
    }
  }
}`;
