// Creator: k6 Browser Recorder 0.6.2 (+ handmade cleanups)
import { sleep, group, check } from 'k6';
import http from 'k6/http';

import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js';
import getHeaders from './utils/getHeaders.js';
import { CreateEmptyCartMutation } from '../../mutation/createEmptyCart.js';

/**
 * @type {import('k6/options').Options}
 */
export const options = {
  vus: 150,
  duration: '1m',
};

const { BASE_URL } = __ENV;
const vars = {};
let response;
if (BASE_URL === undefined) {
  throw new Error('BASE_URL is not set');
}

export default function main() {
  const params = {
    headers: getHeaders(),
  };

  group('[Magento] create an empty cart', () => {
    response = http.post(
      `${BASE_URL}`,
      JSON.stringify({ query: CreateEmptyCartMutation }),
      params,
    );
    sleep(0.2);
    [vars.cartId] = jsonpath.query(response.json(), '$.data.createEmptyCart');

    check(response, {
      'is status 200': (r) => r.status === 200,
      'does not have errors': (r) => !r.json().errors,
      'includes cart id': () => vars.cartId,
    });
  });

  return { cartId: vars.cartId };
}
