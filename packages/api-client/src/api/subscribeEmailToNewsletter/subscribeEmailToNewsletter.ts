export default `
  mutation subscribeEmailToNewsletter($email: String!){
    subscribeEmailToNewsletter(email: $email) {
      status
    }
  }
`;
