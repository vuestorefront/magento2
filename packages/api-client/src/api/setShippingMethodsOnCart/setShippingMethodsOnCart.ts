import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
mutation setShippingMethodsOnCart($input: SetShippingMethodsOnCartInput) {
  setShippingMethodsOnCart(input: $input) {
    cart {
      ...CompleteCartData
    }
  }
}`;
