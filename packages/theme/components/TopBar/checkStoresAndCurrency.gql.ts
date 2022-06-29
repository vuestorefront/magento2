export default `
  query getStoresAndCurrencies {
      availableStores {
        store_code
      }
    currency {
      available_currency_codes
    }
  }
`;
