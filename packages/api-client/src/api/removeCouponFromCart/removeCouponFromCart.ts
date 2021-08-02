import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
  
mutation removeCouponFromCart($input: RemoveCouponFromCartInput) {
  removeCouponFromCart(input: $input) {
    cart {
      ...CompleteCartData
    }
  }
}`;
