import gql from 'graphql-tag';
import {cartFragment} from '../../fragments';

export default gql`
  mutation mergeCarts($source_cart_id: String!, $destination_cart_id: String!) {
      mergeCarts(source_cart_id: $source_cart_id, destination_cart_id: $destination_cart_id) {
          ${cartFragment}
      }
  }
`;
