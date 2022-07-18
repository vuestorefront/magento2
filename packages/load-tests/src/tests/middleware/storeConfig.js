// Creator: k6 Browser Recorder 0.6.2 (+ handmade cleanups)
import { sleep, check, group } from 'k6';
import http from 'k6/http';
import getHeaders from './utils/getHeaders.js';

/**
 * @type {import('k6/options').Options}
 */
export const options = {
  vus: 150,
  duration: '1m',
};

const { BASE_URL } = __ENV;

if (BASE_URL === undefined) {
  throw new Error('BASE_URL is not set');
}

export default function main() {
  const params = {
    headers: getHeaders(),
  };

  group('[Middleware] storeConfig', () => {
    const response = http.post(
      `${BASE_URL}/git magento/customQuery`,
      '[{"query":"\\n  query storeConfig {\\n    storeConfig {\\n        store_code,\\n        default_title,\\n        store_name,\\n        default_display_currency_code,\\n        locale,\\n        header_logo_src,\\n        logo_width,\\n        logo_height,\\n        logo_alt\\n    }\\n  }\\n"}]',
      params,
    );

    sleep(0.5);

    check(response, {
      'is status 200': (r) => r.status === 200,
      'does not have errors': (r) => !r.json().errors,
      'includes storeConfig data': (r) => r.body.includes('storeConfig'),
    });
  });
}
