import gql from 'graphql-tag';

export default gql`
query countriesList {
  countries {
    id
    two_letter_abbreviation
    full_name_locale
    full_name_english
  }
}`;
