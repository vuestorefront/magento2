/* istanbul ignore file */

import { computed, Ref, ref } from '@vue/composition-api';
import { ShippingMethod, User, UserAddress } from '../../types';

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
const paymentMethods: Ref<any[]> = ref(PAYMENT_METHODS_MOCK);
const shippingMethods: Ref<any[]> = ref([]);
const personalDetails: Ref<User> = ref({});
const shippingDetails: Ref<UserAddress> = ref({});
const billingDetails: Ref<UserAddress> = ref({});
const chosenPaymentMethod: Ref<string> = ref('');
const chosenShippingMethod: Ref<ShippingMethod> = ref({});
const placeOrder = async () => {};
const loadDetails = async () => {};

// @todo CHECKOUT
const useCheckout: () => {
  chosenShippingMethod: Ref<ShippingMethod>;
  shippingDetails: Ref<UserAddress>;
  billingDetails: Ref<UserAddress>;
  chosenPaymentMethod: Ref<string>;
  placeOrder: () => Promise<any>;
  loadDetails: () => Promise<any>;
  paymentMethods: Ref<any[]>;
  personalDetails: Ref<User>;
  loading: Readonly<Ref<Readonly<boolean>>>;
  shippingMethods: Ref<any[]>;
} = () => ({
  paymentMethods,
  shippingMethods,
  personalDetails,
  shippingDetails,
  billingDetails,
  chosenPaymentMethod,
  chosenShippingMethod,
  placeOrder,
  loadDetails,
  loading: computed(() => false),
});

export default useCheckout;
