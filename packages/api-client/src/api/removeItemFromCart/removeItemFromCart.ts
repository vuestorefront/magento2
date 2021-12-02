import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  mutation removeItemFromCart($input: RemoveItemFromCartInput) {
    removeItemFromCart(input: $input) {
      cart {
        ${cartFragment}
      }
    }
  }`;
