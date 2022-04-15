import gql from 'graphql-tag';

/** GraphQL Mutation that requests a password reset email to be sent */
export default gql`
  mutation requestPasswordResetEmail($email: String!){
      requestPasswordResetEmail(email: $email)
  }
`;
