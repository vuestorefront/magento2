const MOCK_URL = 'http://somemagentourl.doesntexist';
import { client } from '../../src/client';

jest.mock('../../src/context', () => {
  return {
    sdkContext: {
      get(key: string) {
        if (key === 'apiUrl') {
          return MOCK_URL;
        }
      }
    }
  };
});

describe('client', () => {
  it('uses with credentials', () => {
    expect(client.defaults.withCredentials).toBe(true);
  });

  it('sends requests to API URL', () => {
    expect(client.defaults.baseURL).toBe(MOCK_URL);
  });
});
