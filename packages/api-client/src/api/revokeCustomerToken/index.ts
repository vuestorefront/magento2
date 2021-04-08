import revokeCustomerTokenMutation from './mutation';
import { Context } from '../../types/context';

const removeItemFromCart = async ({ client }: Context): Promise<boolean> => {
  const { data } = await client.mutate({
    mutation: revokeCustomerTokenMutation,
  });
  return data;
};

export default removeItemFromCart;
