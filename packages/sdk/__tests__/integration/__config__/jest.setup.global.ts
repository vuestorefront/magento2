import { createServer } from '@vue-storefront/middleware';
import { customQueries } from './customQueries/jest.customQueries';

const cookieNames = {
  currencyCookieName: 'vsf-currency',
  countryCookieName: 'vsf-country',
  localeCookieName: 'vsf-locale',
  cartCookieName: 'vsf-cart',
  customerCookieName: 'vsf-customer',
  storeCookieName: 'vsf-store',
  messageCookieName: 'vsf-message'
};

const middlewareConfig = {
  helmet: {
    crossOriginResourcePolicy: true,
    referrerPolicy: { policy: 'origin' },
    frameguard: { action: 'deny' },
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
    contentSecurityPolicy: { useDefaults: true },
    expectCt: { maxAge: 86_400 }
  },
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      customQueries,
      configuration: {
        api: 'https://magento2-instance.vuestorefront.io/graphql',
        cookies: {
          ...cookieNames
        },
        cookiesDefaultOpts: {
          httpOnly: process.env.VSF_COOKIE_HTTP_ONLY || false,
          secure: process.env.VSF_COOKIE_SECURE || false,
          sameSite: process.env.VSF_COOKIE_SAME_SITE || 'lax',
          path: process.env.VSF_COOKIE_PATH || '/'
        },
        defaultStore: 'default',
        customApolloHttpLinkOptions: {
          useGETForQueries: true
        },
        magentoBaseUrl: 'https://magento2-instance.vuestorefront.io',
        magentoApiEndpoint: 'https://magento2-instance.vuestorefront.io/graphql',
        imageProvider: 'IPX',
        recaptcha: {
          isEnabled: 'false',
          sitekey: process.env.VSF_RECAPTCHA_SITE_KEY,
          secretkey: process.env.VSF_RECAPTCHA_SECRET_KEY,
          version: process.env.VSF_RECAPTCHA_VERSION,
          score: process.env.VSF_RECAPTCHA_MIN_SCORE
        },
        customer: {
          customer_create_account_confirm: true
        }
      }
    }
  }
};

export default async () => {
  const app = await createServer(middlewareConfig);
  const server = await runMiddleware(app);

  // eslint-disable-next-line
  (globalThis as any).__MIDDLEWARE__ = server;
};

async function runMiddleware(app: any) {
  return new Promise((resolve) => {
    const server = app.listen(8181, async () => {
      resolve(server);
    });
  });
}
