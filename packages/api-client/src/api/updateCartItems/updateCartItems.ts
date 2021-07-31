import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
mutation updateCartItems($input: UpdateCartItemsInput) {
  updateCartItems(input: $input) {
    cart {
      ...CompleteCartData
    }
  }
}`;
