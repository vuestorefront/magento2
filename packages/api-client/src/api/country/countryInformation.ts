import gql from 'graphql-tag';

export default gql`
query countryInformation($id: String) {
  country(id: $id) {
    id
    two_letter_abbreviation
    full_name_locale
    full_name_english
    available_regions {
      id
      code
      name
    }
  }
}`;
