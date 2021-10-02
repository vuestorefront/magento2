import gql from 'graphql-tag';

export default gql`
  mutation createCustomer($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        allow_remote_shopping_assistance
        date_of_birth
        default_billing
        default_shipping
        email
        firstname
        is_subscribed
        lastname
        middlename
        prefix
        suffix
        taxvat
        addresses {
          city
          country_code
          default_billing
          default_shipping
          extension_attributes {
            attribute_code
            value
          }
          firstname
          id
          lastname
          postcode
          prefix
          region {
            region_code
            region_id
            region
          }
          street
          suffix
          telephone
        }
      }
    }
  }`;
