/** GraphQL Mutation that sets received payment method on cart. */
export default `
  mutation setPaymentMethodOnCart($input: SetPaymentMethodOnCartInput) {
    setPaymentMethodOnCart(input: $input) {
      cart {
        available_payment_methods {
          code
          title
        }
        selected_payment_method {
          code
          title
        }
      }
    }
  }
`;
