import * as nock from 'nock';
import * as path from 'path';
import { client } from '../../../src/client';
import { NOCK_EXCLUDED_SCOPE, NOCK_FIXTURES_CATALOG_NAME, NOCK_MODE, TEST_DESCRIBE, TEST_USER_EMAIL, TEST_USER_PASSWORD } from './jest.const';
import * as methods from '../../../src/methods';

let nockDone: any;

/**
 * Sets Nock mode, fixture name and directory.
 */
async function setupNock(customFixtureName?: string) {
  nock.back.setMode(NOCK_MODE);
  nock.back.fixtures = path.join(__dirname, '../', NOCK_FIXTURES_CATALOG_NAME);
  const fixtureName = customFixtureName ?? expect?.getState()?.currentTestName?.split(' ').join('-') ?? '';
  const afterRecord = (recordings: any[]) => recordings.filter(
    (recording) => !recording.scope.toString().includes(NOCK_EXCLUDED_SCOPE)
  );

  const { nockDone } = await nock.back(fixtureName, { afterRecord });

  nock.enableNetConnect();

  return nockDone;
}

beforeEach(async () => {
  nockDone = await setupNock();
});

afterEach(() => {
  nockDone();
});

/**
 * Creates mocked response object with all
 * properties set to `expect.any()`.
 */
export function createResponseMock(...fields: any[]) {
  return fields.reduce((response, field) => {
    response[field] = expect.anything();
    return response;
  }, {});
}

/**
 * Gets real user access token for integration tests.
 */
export async function getUserToken() {
  const response = await client.post('generateCustomerToken', [{
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD
  }]);

  const { token } = response.data.data.generateCustomerToken;
  return token;
}

/**
 * Creates uniform test descriptions.
 */
export function describeGroup(methodName: keyof typeof methods) {
  return `${TEST_DESCRIBE} ${methodName}`;
}
