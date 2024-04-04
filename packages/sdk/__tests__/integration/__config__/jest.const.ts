/** Setup variables */
export const TEST_USER_EMAIL = 'vsf.magento.integration.test.user@gmail.com';
export const TEST_USER_PASSWORD = '9uvPv!Vvn2!Uaz.yNy4a';
export const TEST_CART_ID = 'pCS0ykep1l3wGlPKSyWLJq5fb1DxIQcp';
export const TEST_COUPON_CODE = 'integration-tests';
export const TEST_PRODUCT_SKU = 'WSH12';
export const TEST_CONF_SKU_PARENT = 'MH01';
export const TEST_CONF_SKU_VARIANT = 'MH01-XS-Black';
export const TEST_BUNDLE_SKU = '24-WG080';

export const TEST_ADDRESS = {
  firstname: 'John',
  lastname: 'Doe',
  city: 'New York',
  country_code: 'US',
  street: ['Street 1', 'Street 2'],
  telephone: '123 123 123',
  region: 'AL',
  postcode: '10001',
  save_in_address_book: false,
};
export const TEST_CUSTOMER = {
  email: 'john.doe@vuestorefront.io',
  password: 'j5E&z42DR@Hx!',
  firstname: 'John',
  lastname: 'Doe',
};

export const NOCK_FIXTURES_CATALOG_NAME = '__nock-fixtures__';
export const NOCK_MODE = 'record';
export const NOCK_EXCLUDED_SCOPE = 'localhost';
export const TEST_DESCRIBE = '[SDK][Integration Tests]';
