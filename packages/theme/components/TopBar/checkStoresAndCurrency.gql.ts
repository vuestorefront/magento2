import gql from 'graphql-tag';

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
