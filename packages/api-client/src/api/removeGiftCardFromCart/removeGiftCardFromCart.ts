import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
mutation removeGiftCardFromCart($input: RemoveGiftCardFromCartInput) {
  removeGiftCardFromCart(input: $input) {
    cart {
      ${cartFragment}
    }
  }
}`;
