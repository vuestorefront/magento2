import gql from 'graphql-tag';
import CustomerAddressData from '../../fragments/addressFragment';

export default gql`
  ${CustomerAddressData}
query getCustomerAddresses {
  customer {
    addresses {
      ...CustomerAddressData
    }
  }
}`;
