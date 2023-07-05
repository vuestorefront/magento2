export const getAvailableShippingMethods = ({ variables, metadata }: { variables: any; metadata: any }) => {
  return {
    variables,
    query: `
      query GuestAvailableShippingMethods($cart_id: String!) {
        cart(cart_id:$cart_id) {
          shipping_addresses {
            available_shipping_methods {
              ${metadata.fields}
            }
          }
        }
      }
     `,
  };
};
