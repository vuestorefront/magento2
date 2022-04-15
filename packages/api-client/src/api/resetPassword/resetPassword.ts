import gql from 'graphql-tag';

/** GraphQL Mutation that resets a users's password */
export default gql`
  mutation resetPassword($email: String!, $newPassword: String!, $resetPasswordToken: String!){
    resetPassword(email: $email, newPassword: $newPassword, resetPasswordToken: $resetPasswordToken)
  }
`;
