import gql from 'graphql-tag';

export default gql`
  mutation updateCustomerAddress($input: CustomerAddressInput) {
      updateCustomerAddress(input: $input) {
        city
        company
        country_code
        default_billing
        default_shipping
        extension_attributes
        fax
        firstname
        id
        lastname
        middlename
        postcode
        prefix
        region
        street
        suffix
        telephone
        vat_id
      }
  }
`;
