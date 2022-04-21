import type { PaymentMethodInput } from '~/modules/GraphQL/types';

interface PaymentMethodParams {
  cart_id: string;
  payment_method: PaymentMethodInput;
}

export default PaymentMethodParams;
