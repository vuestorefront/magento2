// Creator: k6 Browser Recorder 0.6.2
import { check, sleep, group } from 'k6';
import http from 'k6/http';
import { setDefaultCookies } from './utils/setDefaultCookies.js';
import { customerData } from '../../utils/customerData.js';

export const options = {
  vus: 200,
  duration: '5m',
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
  },
};

const { BASE_URL } = __ENV;

if (BASE_URL === undefined) {
  throw new Error('BASE_URL is not set');
}

const headers = {
  accept: 'application/json, text/plain, */*',
  'content-type': 'application/json',
  'upgrade-insecure-requests': '1',
  'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
};

const executeCommonChecks = (res) => {
  check(res, {
    'is status 200': (r) => r.status === 200,
    'has no errors': (r) => !r.json().errors,
  });
};

export default function main() {
  let res;
  setDefaultCookies(BASE_URL);

  group(
    `New user registration - page ${BASE_URL}`,
    () => {
      res = http.get(
        `${BASE_URL}/default`,
        {
          headers,
        },
      );
      sleep(0.6);

      group('Input user data', () => {
        res = http.post(
          `${BASE_URL}/api/magento/customQuery`,
          '[{"query":"\\n  query storeConfig {\\n    storeConfig {\\n        store_code,\\n        default_title,\\n        store_name,\\n        default_display_currency_code,\\n        locale,\\n        header_logo_src,\\n        logo_width,\\n        logo_height,\\n        logo_alt\\n    }\\n  }\\n"}]',
          {
            headers,
          },
        );
        executeCommonChecks(res);

        res = http.post(
          `${BASE_URL}/api/magento/customQuery`,
          '[{"query":"\\n  query getStoresAndCurrencies {\\n      availableStores {\\n        store_code\\n      }\\n    currency {\\n      available_currency_codes\\n    }\\n  }\\n"}]',
          {
            headers,
          },
        );
        executeCommonChecks(res);

        res = http.post(
          `${BASE_URL}/api/magento/customQuery`,
          '[{"query":"\\n  query getStoresAndCurrencies {\\n      availableStores {\\n        store_code\\n      }\\n    currency {\\n      available_currency_codes\\n    }\\n  }\\n"}]',
          {
            headers,
          },
        );
        executeCommonChecks(res);
        sleep(8);
      });

      group('Save new user', () => {
        res = http.post(
          `${BASE_URL}/api/magento/createCustomer`,
          `[{"email":"${customerData.getEmail()}","password":"Admin123!","recaptchaToken":"recaptcha_bypass_code","firstname":"load","lastname":"test","is_subscribed":false},{}]`,
          {
            headers,
          },
        );
      });

      executeCommonChecks(res);
    },
  );
}
