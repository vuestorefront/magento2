import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  mutation addBundleProductsToCart($input: AddBundleProductsToCartInput) {
    addBundleProductsToCart(input: $input) {
      cart {
        ${cartFragment}
      }
    }
  }
`;
