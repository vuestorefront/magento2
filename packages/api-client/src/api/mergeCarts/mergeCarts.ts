import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
  
mutation mergeCarts($sourceCartId: String!, $destinationCartId: String!) {
  mergeCarts(source_cart_id: $sourceCartId, destination_cart_id: $destinationCartId) {
    ...CompleteCartData
  }
}`;
