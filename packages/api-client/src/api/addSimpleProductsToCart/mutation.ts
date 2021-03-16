import gql from 'graphql-tag';
import {cartFragment} from '../../fragments';

export default gql`
  mutation addSimpleProductsToCart($input: AddSimpleProductsToCartInput) {
      addSimpleProductsToCart(input: $input) {
          cart {
              ${cartFragment}
          }
      }
  }
`;
