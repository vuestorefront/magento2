import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  mutation addVirtualProductsToCart($input: AddVirtualProductsToCartInput) {
    addVirtualProductsToCart(input: $input) {
      cart {
        ${cartFragment}
      }
    }
  }`;
