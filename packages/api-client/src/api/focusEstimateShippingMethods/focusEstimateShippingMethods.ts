import gql from 'graphql-tag';

export default gql`
mutation focusEstimateShippingMethods($input: focusEstimateShippingMethodsInput) {
  focusEstimateShippingMethods(input: $input) {
    amount {
      currency
      value
    }
    available
    base_amount {
      currency
      value
    }
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
    additional_data
    description
  }
}`;
