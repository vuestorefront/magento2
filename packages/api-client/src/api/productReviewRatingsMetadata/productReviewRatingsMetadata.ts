import gql from 'graphql-tag';

export default gql`
query productReviewRatingsMetadata{
  productReviewRatingsMetadata {
    items {
      id
      name
      values {
        value_id
        value
      }
    }
  }
}`;
