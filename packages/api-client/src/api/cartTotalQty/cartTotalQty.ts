import gql from 'graphql-tag';

export default gql`
  query cart($cartId: String!) {
    cart(cart_id:$cartId) {
      total_quantity
    }
  }
`;
