export default `
  query cartTotalQty($cartId: String!) {
    cart(cart_id:$cartId) {
      total_quantity
    }
  }
`;
