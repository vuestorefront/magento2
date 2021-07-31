import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
mutation removeItemFromCart($input: RemoveItemFromCartInput) {
  removeItemFromCart(input: $input) {
    cart {
      ...CompleteCartData
    }
  }
}`;
