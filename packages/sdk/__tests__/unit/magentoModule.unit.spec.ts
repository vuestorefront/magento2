import { AxiosRequestConfig } from 'axios';
import { client, magentoModule } from '../../src';

const API_URL = 'https://storefront.example.com/api/magento';
const SSR_API_URL = 'http://localhost:8181/magento';

const emulateServerSideEnvironment = () => {
  global.window = undefined as any;
};

const emulateClientSideEnvironment = () => {
  global.window = {} as any;
};

describe('magentoModule', () => {
  let requests: AxiosRequestConfig[] = [];

  beforeAll(() => {
    // Answer every request locally and record where it would have been sent.
    client.defaults.adapter = async (config) => {
      requests.push(config);

      return { data: { data: {} }, status: 200, statusText: 'OK', headers: {}, config };
    };
  });

  beforeEach(() => {
    requests = [];
  });

  afterAll(() => {
    emulateClientSideEnvironment();
  });

  it('sends server-side requests to ssrApiUrl', async () => {
    const { connector } = magentoModule({ apiUrl: API_URL, ssrApiUrl: SSR_API_URL });

    emulateServerSideEnvironment();
    await connector.storeConfig();

    expect(requests).toHaveLength(1);
    expect(requests[0].baseURL).toBe(SSR_API_URL);
  });

  it('sends client-side requests to apiUrl', async () => {
    const { connector } = magentoModule({ apiUrl: API_URL, ssrApiUrl: SSR_API_URL });

    emulateClientSideEnvironment();
    await connector.storeConfig();

    expect(requests).toHaveLength(1);
    expect(requests[0].baseURL).toBe(API_URL);
  });

  it('falls back to apiUrl on the server when ssrApiUrl is not set', async () => {
    const { connector } = magentoModule({ apiUrl: API_URL });

    emulateServerSideEnvironment();
    await connector.storeConfig();

    expect(requests).toHaveLength(1);
    expect(requests[0].baseURL).toBe(API_URL);
  });
});
