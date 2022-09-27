import { Logger } from '~/helpers/logger';
import { BillingCartAddress, Maybe, SetBillingAddressOnCartInput } from '~/modules/GraphQL/types';

export const saveBillingAddressCommand = {
  execute: async (context, cartId, billingDetails, customQuery, customHeaders): Promise<Maybe<BillingCartAddress>> => {
    const {
      apartment,
      neighborhood,
      extra,
      sameAsShipping,
      customerAddressId,
      ...address
    } = billingDetails;

    const billingData = customerAddressId
      ? ({ customer_address_id: customerAddressId })
      : ({
        address: {
          ...address,
          street: [address.street, apartment, neighborhood, extra].filter(Boolean),
        },
        same_as_shipping: sameAsShipping,
      });

    const setBillingAddressOnCartInput: SetBillingAddressOnCartInput = {
      cart_id: cartId,
      billing_address: billingData,
    };

    const { data } = await context.$vsf.$magento.api.setBillingAddressOnCart(
      setBillingAddressOnCartInput,
      customQuery,
      customHeaders,
    );

    Logger.debug('[Result]:', { data });

    return data?.setBillingAddressOnCart?.cart?.billing_address ?? null;
  },
};
