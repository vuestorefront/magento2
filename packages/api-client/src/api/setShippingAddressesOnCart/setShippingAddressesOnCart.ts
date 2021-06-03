import gql from 'graphql-tag';
import cartAddressFragment from '../../fragments/cartAddressFragment';
import cartPricesFragment from '../../fragments/cartPricesFragment';

export default gql`
mutation setShippingAddressesOnCart($input: SetShippingAddressesOnCartInput) {
  setShippingAddressesOnCart(input: $input) {
    cart {
      shipping_addresses {
        ${cartAddressFragment}
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
      prices {
        ${cartPricesFragment}
      }
    }
  }
}`;
