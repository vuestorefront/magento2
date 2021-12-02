import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  mutation updateCartItems($input: UpdateCartItemsInput) {
    updateCartItems(input: $input) {
      cart {
        ${cartFragment}
      }
    }
  }`;
