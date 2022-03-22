import gql from 'graphql-tag';

export default gql`
  query focusDeliveryTimeForAddress($input: FocusDeliveryTimeForAddressInput!) {
    focusDeliveryTimeForAddress(input: $input) {
      carrier
      carrier_label
      method
      method_label
      delivery_time
    }
  }
`;
