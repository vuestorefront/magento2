// Creator: k6 Browser Recorder 0.6.2 (+ handmade cleanups)
import { group, check } from 'k6';
import http from 'k6/http';

import getHeaders from './utils/getHeaders.js';
import { AddProductsToCart } from '../../mutation/addProductsToCart.js';
import CreateEmptyGuestCart from './createEmptyGuestCart.js';

/**
 * @type {import('k6/options').Options}
 */
export const options = {
  vus: 150,
  duration: '1m',
};

const { BASE_URL } = __ENV;
let response;

if (BASE_URL === undefined) {
  throw new Error('BASE_URL is not set');
}

export default function main() {
  const params = {
    headers: getHeaders(),
  };

  group('[Magento] addSimpleProductToGuestCart', () => {
    const { cartId } = CreateEmptyGuestCart();

    group('add a simple product to the cart', () => {
      response = http.post(
        `${BASE_URL}`,
        JSON.stringify({
          query: AddProductsToCart,
          variables: {
            cartId,
            cartItems: [{ quantity: Math.floor(Math.random() * 10), sku: '24-WG02' }],
          },
        }),
        params,
      );

      check(response, {
        'is status 200': (r) => r.status === 200,
        'does not have errors': (r) => !r.json().errors,
        'includes cart data': (r) => r.body.includes('addProductsToCart'),
      });
    });
  });
}
