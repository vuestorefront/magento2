import gql from 'graphql-tag';

export default gql`
  query currency {
    currency{
      available_currency_codes
      base_currency_code
      base_currency_symbol
      default_display_currecy_code
      default_display_currecy_symbol
      default_display_currency_code
      default_display_currency_symbol
      exchange_rates {
        currency_to
        rate
      }
    }
  }`;
