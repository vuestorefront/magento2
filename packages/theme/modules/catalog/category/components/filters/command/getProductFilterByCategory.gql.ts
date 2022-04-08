import { gql } from 'graphql-request';

export default gql`
  query getProductFiltersByCategory($categoryIdFilter: FilterEqualTypeInput!) {
    products(filter: { category_uid: $categoryIdFilter }) {
      aggregations {
        label
        count
        attribute_code
        options {
          count
          label
          value
          __typename
        }
        position
        __typename
      }
      __typename
    }
  }
`;
