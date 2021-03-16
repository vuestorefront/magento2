import gql from 'graphql-tag';
import {cartFragment} from '../../fragments';

export default gql`
  mutation addConfigurableProductsToCartInput($input: AddConfigurableProductsToCartInput) {
      addConfigurableProductsToCart(input: $input) {
          cart {
              ${cartFragment}
          }
      }
  }
`;
