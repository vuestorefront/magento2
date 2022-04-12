import { ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { saveBillingAddressCommand } from '~/composables/useBilling/commands/saveBillingAddressCommand';
import { useShippingProvider, useCart } from '~/composables';
import type { BillingCartAddress, Maybe } from '~/modules/GraphQL/types';
import type {
  UseBillingError,
  UseBillingInterface,
  UseBillingLoadParams,
  UseBillingSaveParams,
} from './useBilling';

/**
 * @public
 *
 * The `useBilling` composable provides functions and refs to load and save the
 * billing information.
 *
 * @remarks
 *
 * Under the hood, it calls the following Server Middleware API methods:
 *
 * - {@link @vue-storefront/magento-api#setBillingAddressOnCart} for saving billing information;
 *
 * It also uses the following composables:
 *
 * - {@link useShippingProvider} to sync the billing address with the shipping one;
 *
 * - {@link useCart} for loading billing information from cart;
 *
 * It supports custom queries in the following methods:
 *
 * - {@link UseBillingInterface.load} for loading billing information;
 *
 * @example
 *
 * Initialization in component:
 *
 * ```typescript
 * import { useBilling } from '~/composables';
 *
 * export default {
 *   setup() {
 *     const { load, save, error, loading } = useBilling();
 *   },
 * };
 * ```
 *
 * @example
 *
 * Load billing information and display it:
 *
 * ```vue
 * <template>
 *   <p v-if="loading">Loading...</p>
 *   <p v-else-if="">Error: {{ error.load.message }}</p>
 *   <div v-else>
 *     <BillingInfo :billing="billing" />
 *   </div>
 * </template>
 *
 * <script>
 * import { useBilling } from '~/composables';
 * import { ref, onMounted } from '@nuxtjs/composition-api';
 * // Example of component that shows billing information
 * import BillingInfo from './BillingInfo';
 *
 * export default {
 *   components: { BillingInfo },
 *   setup() {
 *     const { error, load, loading } = useBilling();
 *     const billing = ref(null);
 *
 *     onMounted(async () => {
 *       billing.value = await load();
 *     });
 *
 *     return { billing, error, loading };
 *   },
 * };
 * </script>
 * ```
 */
export function useBilling(): UseBillingInterface {
  const context = useContext();
  const { load: loadShippingAddress, save: saveShippingAddress } = useShippingProvider();
  const { cart, load: loadCart } = useCart();

  const loading = ref(false);
  const error = ref<UseBillingError>({
    load: null,
    save: null,
  });

  const load = async ({ customQuery = null }: UseBillingLoadParams = {}): Promise<Maybe<BillingCartAddress>> => {
    Logger.debug('useBilling.load');
    let billingInfo = null;

    try {
      loading.value = true;
      if (!cart?.value?.billing_address) {
        await loadCart({ customQuery });
      }

      billingInfo = cart?.value?.billing_address ?? null;
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('useBilling/load', err);
    } finally {
      loading.value = false;
    }

    return billingInfo;
  };

  const save = async ({ billingDetails }: UseBillingSaveParams): Promise<Maybe<BillingCartAddress>> => {
    Logger.debug('useBilling.save');
    let billingInfo = null;

    try {
      loading.value = true;
      billingInfo = await saveBillingAddressCommand.execute(context, cart.value.id, billingDetails);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      /**
       * This is a workaround needed due to Magento GraphQL API
       * cleaning the Shipping method after defining the billing address
       */
      const shippingMethod = await loadShippingAddress();
      Logger.debug('[Magento]: Defining the shipping method as:', JSON.stringify(shippingMethod, null, 2));

      await saveShippingAddress({
        shippingMethod: {
          carrier_code: shippingMethod.carrier_code,
          method_code: shippingMethod.method_code,
        },
      });
      /**
       * End of GraphQL Workaround
       */

      error.value.save = null;
    } catch (err) {
      error.value.save = err;
      Logger.error('useBilling/save', err);
    } finally {
      loading.value = false;
    }

    return billingInfo;
  };

  return {
    loading,
    error,
    load,
    save,
  };
}

export { default as BillingDetails } from './BillingDetails';

export * from './useBilling';

export default useBilling;
