import gql from 'graphql-tag';
import cartAddressFragment from '../../fragments/cartAddressFragment';

export default gql`
mutation setBillingAddressOnCart($input: SetBillingAddressOnCartInput) {
  setBillingAddressOnCart(input: $input) {
    cart {
      billing_address {
        ${cartAddressFragment}
      }
    }
  }
}`;
