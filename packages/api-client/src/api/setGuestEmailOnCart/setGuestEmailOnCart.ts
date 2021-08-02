import gql from 'graphql-tag';

export default gql`
mutation setGuestEmailOnCart($input: SetGuestEmailOnCartInput) {
  setGuestEmailOnCart(input: $input) {
    cart {
      email
    }
  }
}`;
