import gql from 'graphql-tag';

export default gql`
mutation subscribeEmailToNewsletter($email: String!){
  subscribeEmailToNewsletter(email: $email) {
    status
  }
}`;
