import ApplyManzanaDiscount from './mutation';
import { ExecutionResult } from 'graphql';
import { Cart } from '../../types/GraphQL';

type ApplyManzanaToCartOutput = {
  cart: Cart
}

const applyManzanaToCart = async ({ client }, cart_id: String, card_number: String): Promise<ExecutionResult<ApplyManzanaToCartOutput>>=> {
  return await client.mutate({
    mutation: ApplyManzanaDiscount,
    variables: {
      cart_id,
      card_number
    }
  });
};

export default applyManzanaToCart;
