export default `
  mutation requestPasswordResetEmail($email: String!){
      requestPasswordResetEmail(email: $email)
  }
`;
