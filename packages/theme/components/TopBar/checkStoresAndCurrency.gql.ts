import { gql } from 'graphql-request';

export default gql`
  query getStoresAndCurrencies {
      availableStores {
        store_code
      }
    currency {
      available_currency_codes
    }
  }
`;
