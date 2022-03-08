import gql from 'graphql-tag';

export default gql`
  query cartTotalQty($cartId: String!) {
    cart(cart_id:$cartId) {
      total_quantity
    }
  }
`;
