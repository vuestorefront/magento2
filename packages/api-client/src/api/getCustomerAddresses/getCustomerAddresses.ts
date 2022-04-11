import gql from 'graphql-tag';

/** GraphQL Query that fetches customer addresses. */
export default gql`
  query getCustomerAddresses {
    customer {
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
        vat_id
      }
    }
  }
`;
