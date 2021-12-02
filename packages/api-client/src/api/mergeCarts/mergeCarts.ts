import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  mutation mergeCarts($sourceCartId: String!, $destinationCartId: String!) {
    mergeCarts(source_cart_id: $sourceCartId, destination_cart_id: $destinationCartId) {
      ${cartFragment}
    }
  }`;
