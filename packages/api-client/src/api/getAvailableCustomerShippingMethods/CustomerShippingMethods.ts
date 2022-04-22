import gql from 'graphql-tag';

/** GraphQL Query that retrieves a user's shipping methods */
export default gql`
  query CustomerAvailableShippingMethods {
    customerCart {
      shipping_addresses {
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
`;
