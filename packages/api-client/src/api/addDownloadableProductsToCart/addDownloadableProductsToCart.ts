import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  mutation addDownloadableProductsToCart($input: AddDownloadableProductsToCartInput) {
    addDownloadableProductsToCart(input: $input) {
      cart {
        ${cartFragment}
      }
    }
  }`;
