/** GraphQL Mutation that creates new customer address. */
export default `
  mutation createCustomerAddress($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
      lastname
      prefix
      suffix
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
      vat_id
    }
  }
`;
