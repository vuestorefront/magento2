import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  mutation addProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
    addProductsToCart(cartId,: $cartId, cartItems,: $cartItems) {
      cart {
        ${cartFragment}
      }
    }
  }`;
