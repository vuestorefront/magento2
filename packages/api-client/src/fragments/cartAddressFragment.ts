import gql from 'graphql-tag';

export default gql`
  fragment CartAddress on CartAddressInterface {
  firstname
  lastname
  street
  city
  company
  region {
    code
    region_id
    label
  }
  postcode
  telephone
  country {
    code
    label
  }
}`;
