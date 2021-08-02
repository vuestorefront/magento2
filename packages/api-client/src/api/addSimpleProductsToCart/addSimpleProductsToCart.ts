import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
mutation addSimpleProductsToCart($input: AddSimpleProductsToCartInput) {
  addSimpleProductsToCart(input: $input) {
    cart {
      ...CompleteCartData
    }
  }
}`;
