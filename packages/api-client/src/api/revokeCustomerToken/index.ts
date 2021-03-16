import revokeCustomerTokenMutation from './mutation';

const removeItemFromCart = async({ client }): Promise<boolean> => {
  const response = client.mutate({
    mutation: revokeCustomerTokenMutation
  });
  return response;
};

export default removeItemFromCart;
