import type { PaymentMethodInput } from '~/modules/GraphQL/types';

export interface PaymentMethodParams {
  cart_id: string;
  payment_method: PaymentMethodInput;
}
