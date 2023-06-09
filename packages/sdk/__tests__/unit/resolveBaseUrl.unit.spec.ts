import { resolveBaseUrl } from '../../src/client/resolvers';
import { sdkContext } from '../../src/context';

const emulateServerSideEnvironment = () => {
  global.window = undefined as any;
};

const emulateClientSideEnvironment = () => {
  global.window = {} as any;
};

describe('resolveBaseUrl', () => {
  beforeAll(() => {
    sdkContext.set('apiUrl', 'https://api.magento.com');
    sdkContext.set('ssrApiUrl', 'https://ssr.api.magento.com');
  });

  it('should return base url in the client', () => {
    emulateClientSideEnvironment();
    expect(resolveBaseUrl()).toEqual('https://api.magento.com');
  });

  it('should return ssr base url in the server environment', () => {
    emulateServerSideEnvironment();
    expect(resolveBaseUrl()).toEqual('https://ssr.api.magento.com');
  });

});
