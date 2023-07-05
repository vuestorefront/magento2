export const updateCustomerEmail = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation updateCustomerEmail($email: String!, $password: String!) {
        updateCustomerEmail(email: $email, password: $password){
          customer {
            ${metadata.fields}
          }
        }
      }
     `,
  };
};
