import gql from 'graphql-tag';

export default gql`
mutation createProductReview($input: CreateProductReviewInput!) {
  createProductReview(input: $input){
    review {
      average_rating
      ratings_breakdown {
        name
        value
      }
      nickname
      summary
      text
      created_at
    }
  }
}`;
