import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
query cart($cartId: String!) {
  cart(cart_id:$cartId) {
    ...CompleteCartData
  }
}`;
