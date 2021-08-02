import gql from 'graphql-tag';

export default gql`
fragment OrderAddressData on OrderAddress {
  city
  country_code
  firstname
  lastname
  postcode
  prefix
  region
  street
  suffix
  telephone
}`;
