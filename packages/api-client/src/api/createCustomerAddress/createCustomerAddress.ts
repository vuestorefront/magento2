import gql from 'graphql-tag';

export default gql`
mutation createCustomerAddress($input: CustomerAddressInput!) {
  createCustomerAddress(input: $input) {
    id
    region {
      region
      region_id
      region_code
    }
    country_code
    street
    telephone
    postcode
    city
    default_shipping
    default_billing
  }
}`;
