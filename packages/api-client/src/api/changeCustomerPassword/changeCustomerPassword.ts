export default `
  mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
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
        vat_id
      }
    }
  }
`;
