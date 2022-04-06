import { PaymentMethodInput, Scalars } from '~/modules/GraphQL/types';

export interface SetPaymentMethodOnCartInput {
  cart_id: Scalars['String'];
  payment_method: PaymentMethodInput;
}

export interface SetPaymentMethodOnCartInputs extends SetPaymentMethodOnCartInput {
  [k: string]: any;
}
