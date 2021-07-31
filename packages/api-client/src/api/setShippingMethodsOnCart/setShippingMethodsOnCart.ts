import gql from 'graphql-tag';

export default gql`
mutation setShippingMethodsOnCart($input: SetShippingMethodsOnCartInput) {
  setShippingMethodsOnCart(input: $input) {
    cart {
      shipping_addresses {
        selected_shipping_method {
          carrier_code
          carrier_title
          method_code
          method_title
          amount {
            value
            currency
          }
        }
      }
    }
  }
}`;
