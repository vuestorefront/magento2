import gql from 'graphql-tag';
import {cartFragment} from '../../fragments';

export default gql`
  mutation updateCartItems($input: UpdateCartItemsInput) {
      updateCartItems(input: $input) {
          cart {
              ${cartFragment}
          }
      }
  }
`;
