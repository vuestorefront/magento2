import gql from 'graphql-tag';

/** GraphQL Mutation that sets the guest user email on a cart */
export default gql`
  mutation setGuestEmailOnCart($input: SetGuestEmailOnCartInput) {
    setGuestEmailOnCart(input: $input) {
      cart {
        email
      }
    }
  }
`;
