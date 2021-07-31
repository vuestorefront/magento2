import gql from 'graphql-tag';
import CustomerAddressData from './addressFragment';

export default gql`
  ${CustomerAddressData}
  
  fragment CustomerData on Customer {
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
      ...CustomerAddressData
    }
}`;
