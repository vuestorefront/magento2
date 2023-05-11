/** GraphQL Query that fetches customer addresses. */
export default `
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
