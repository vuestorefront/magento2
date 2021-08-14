import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
  
  mutation addBundleProductsToCart($input: AddBundleProductsToCartInput) {
    addBundleProductsToCart(input: $input) {
    cart {
      ...CompleteCartData
    }
  }
}`;
