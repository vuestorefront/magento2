import gql from 'graphql-tag';
import CompleteCartData from '../../fragments/completeCartFragment';

export default gql`
  ${CompleteCartData}
mutation addProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
  addProductsToCart(cartId,: $cartId, cartItems,: $cartItems) {
    cart {
      ...CompleteCartData
    }
  }
}`;
