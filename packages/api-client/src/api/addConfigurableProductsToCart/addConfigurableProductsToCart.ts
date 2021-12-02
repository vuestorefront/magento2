import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  mutation addConfigurableProductsToCart($input: AddConfigurableProductsToCartInput) {
    addConfigurableProductsToCart(input: $input) {
      cart {
        ${cartFragment}
      }
    }
  }
`;
