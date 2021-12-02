import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  mutation removeCouponFromCart($input: RemoveCouponFromCartInput) {
    removeCouponFromCart(input: $input) {
      cart {
        ${cartFragment}
      }
    }
  }`;
