import gql from 'graphql-tag';

export default gql`
mutation setShippingAddressesOnCart($input: SetShippingAddressesOnCartInput) {
  setShippingAddressesOnCart(input: $input) {
    cart {
      shipping_addresses {
        city
        company
        firstname
        lastname
        postcode
        region {
          code
          label
          region_id
        }
        street
        telephone
        country {
          code
          label
        }
        available_shipping_methods {
          amount {
            currency
            value
          }
          available
          carrier_code
          carrier_title
          error_message
          method_code
          method_title
          price_excl_tax {
            currency
            value
          }
          price_incl_tax {
            currency
            value
          }
        }
      }
    }
  }
}`;
