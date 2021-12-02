import gql from 'graphql-tag';
import cartFragment from '../../fragments/cartFragment';

export default gql`
  query cart($cartId: String!) {
    cart(cart_id:$cartId) {
      ${cartFragment}
    }
  }`;
