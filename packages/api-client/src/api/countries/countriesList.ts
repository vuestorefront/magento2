import gql from 'graphql-tag';

/** GraphQL Query that fetches the list of countries from the API */
export default gql`
  query countriesList {
    countries {
      id
      two_letter_abbreviation
      full_name_locale
      full_name_english
    }
  }
`;
