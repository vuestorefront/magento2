import gql from 'graphql-tag';

/** GraphQL Mutation that updates a customer address. */
export default gql`
  mutation updateCustomerAddress($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      id
      city
      company
      country_code
      default_billing
      default_shipping
      extension_attributes {
        attribute_code
        value
      }
      fax
      firstname
      id
      lastname
      middlename
      postcode
      prefix
      region {
        region
        region_code
        region_id
      }
      street
      suffix
      telephone
      vat_id
    }
  }
`;
