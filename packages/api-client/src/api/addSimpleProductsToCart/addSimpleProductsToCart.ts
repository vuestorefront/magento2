import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  mutation addSimpleProductsToCart($input: AddSimpleProductsToCartInput) {
    addSimpleProductsToCart(input: $input) {
      cart {
        ${cartFragment}
      }
    }
  }`;
