export const currencyDataMock = {
  __typename: 'Currency',
  available_currency_codes: [
    'EUR',
    'PLN',
    'USD',
  ],
  base_currency_code: 'USD',
  base_currency_symbol: '$',
  default_display_currecy_code: null,
  default_display_currecy_symbol: null,
  default_display_currency_code: 'USD',
  default_display_currency_symbol: '$',
  exchange_rates: [
    {
      __typename: 'ExchangeRate',
      currency_to: 'EUR',
      rate: 0.93,
    },
    {
      __typename: 'ExchangeRate',
      currency_to: 'PLN',
      rate: 4.29,
    },
    {
      __typename: 'ExchangeRate',
      currency_to: 'USD',
      rate: 1,
    },
  ],
};
