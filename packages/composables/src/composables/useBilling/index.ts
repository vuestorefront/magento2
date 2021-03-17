import { Context } from '@vue-storefront/core';
import { useBillingFactory, UseBillingParams } from '../../factories/useBillingFactory'
import { Address } from '../../types';

let details = {};

const params: UseBillingParams<Address, any> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    load: async (context: Context, { customQuery }) => {
        console.log('[Magento] loadBilling');
        if (!context.cart.cart?.value?.billing_address) {
            await context.cart.load({ customQuery });
        }
        return context.cart.cart.value.billing_address;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    save: async (context: Context, { billingDetails, customQuery }) => {
        console.log('[Magento] setBillingAddress');
        const { id } = context.cart.cart.value;
        const setBillingAddressOnCartResponse = await context.$ma.api.setBillingAddressOnCart({
            cart_id: id,
            billing_address: {
                address: {
                    /*
                    firstname: "Bob",
                    lastname: "Roll",
                    company: "Magento",
                    street: ["Magento Pkwy", "Main Street"],
                    city: "Austin",
                    region: "TX",
                    postcode: "78758",
                    country_code: "US",
                    telephone: "8675309",
                    save_in_address_book: false
                    */
                    ...billingDetails
                },
                same_as_shipping: false
            }
        });
        return setBillingAddressOnCartResponse.data.setBillingAddressOnCart.cart.billing_address;
    }
};

export default useBillingFactory<Address, any>(params);
