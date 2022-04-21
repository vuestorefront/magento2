import gql from 'graphql-tag';

/** GraphQL Mutation that subscribes an email in the newsletter. */
export default gql`
  mutation subscribeEmailToNewsletter($email: String!){
    subscribeEmailToNewsletter(email: $email) {
      status
    }
  }
`;
