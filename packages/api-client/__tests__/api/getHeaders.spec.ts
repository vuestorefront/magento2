import getHeaders from '../../src/api/getHeaders';
import type { Context, CustomHeaders } from '../../src';

const contextMock = ({ customerToken, store, currency }: { customerToken?: string, store?: string, currency?: string }) => ({
  config: {
    state: {
      getCustomerToken: jest.fn(() => customerToken),
      getStore: jest.fn(() => store),
      getCurrency: jest.fn(() => currency),
    } as unknown,
  },
} as Context);

describe('[Magento-API-Client] getHeaders', () => {
  it('Use without default headers', () => {
    const context: Context = contextMock({});
    expect(getHeaders(context)).toEqual({});
  });

  it('Use with default headers', () => {
    const context: Context = contextMock({
      customerToken: '123',
      store: 'default',
      currency: 'EUR',
    });
    expect(getHeaders(context)).toEqual({
      Authorization: 'Bearer 123',
      store: 'default',
      'Content-Currency': 'EUR',
    });
  });

  it('Use with custom headers', () => {
    const context: Context = contextMock({});
    const customHeaders: CustomHeaders = {
      'Accept-Language': 'en',
    };
    expect(getHeaders(context, customHeaders)).toEqual(customHeaders);
  });

  it('Use with replacing default headers', () => {
    const context: Context = contextMock({ customerToken: '123' });
    const customHeaders: CustomHeaders = {
      Authorization: 'Bearer 321',
    };
    expect(getHeaders(context, customHeaders)).toEqual({
      Authorization: 'Bearer 321',
    });
  });
});
