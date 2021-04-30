/* istanbul ignore file */
import { computed, ref } from '@vue/composition-api';
import { CustomerAddress, ShippingMethod } from '@vue-storefront/magento-api';
import { User } from '../../types';

const PAYMENT_METHODS_MOCK = [{
  label: 'Visa Debit',
  value: 'debit',
}, {
  label: 'MasterCard',
  value: 'mastercard',
}, {
  label: 'Visa Electron',
  value: 'electron',
}, {
  label: 'Cash on delivery',
  value: 'cash',
}, {
  label: 'Check',
  value: 'check',
}];

const placeOrder = async () => {};
const loadDetails = async () => {};

// @todo CHECKOUT
const useCheckout = () => ({
  paymentMethods: ref<any[]>(PAYMENT_METHODS_MOCK),
  shippingMethods: ref<ShippingMethod[]>([]),
  personalDetails: ref<User>({}),
  shippingDetails: ref<CustomerAddress>({}),
  billingDetails: ref<CustomerAddress>({}),
  chosenPaymentMethod: ref<string>(''),
  chosenShippingMethod: ref<Partial<ShippingMethod>>({}),
  placeOrder,
  loadDetails,
  loading: computed(() => false),
});

export default useCheckout;
