import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
  
  mutation addConfigurableProductsToCart($input: AddConfigurableProductsToCartInput) {
  addConfigurableProductsToCart(input: $input) {
    cart {
      ...CompleteCartData
    }
  }
}`;
