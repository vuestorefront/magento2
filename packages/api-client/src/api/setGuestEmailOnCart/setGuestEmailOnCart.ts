/** GraphQL Mutation that sets the guest user email on a cart */
export default `
  mutation setGuestEmailOnCart($input: SetGuestEmailOnCartInput) {
    setGuestEmailOnCart(input: $input) {
      cart {
        email
      }
    }
  }
`;
