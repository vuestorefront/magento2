// Creator: k6 Browser Recorder 0.6.2 (+ handmade cleanups)
import { group, check } from 'k6';
import http from 'k6/http';

import getHeaders from './utils/getHeaders.js';
import { CreateCustomer } from '../../mutation/createCustomer.js';
import { customerData } from '../../utils/customerData.js';

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

  group('[Magento] create a customer account', () => {
    response = http.post(
      `${BASE_URL}`,
      JSON.stringify({
        query: CreateCustomer,
        variables: {
          input: {
            email: customerData.getEmail(),
            password: 'Abcd123!',
            firstname: 'Load',
            lastname: 'Test',
          },
        },
      }),
      params,
    );

    check(response, {
      'is status 200': (r) => r.status === 200,
      'does not have errors': (r) => !r.json().errors,
    });
  });
}
