export const changeCustomerPassword = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
        changeCustomerPassword(
          currentPassword: $currentPassword
          newPassword: $newPassword
        ) {
          ${metadata.fields}
        }
      }`,
  };
};
