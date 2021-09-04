import gql from 'graphql-tag';

export default gql`
  mutation resetPassword($email: String!, $newPassword: String!, $resetPasswordToken: String!){
    resetPassword(email: $email, newPassword: $newPassword, resetPasswordToken: $resetPasswordToken)
  }
`;
