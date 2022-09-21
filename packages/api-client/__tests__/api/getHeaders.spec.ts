import getHeaders from '../../src/api/getHeaders';

const contextMock = ({ customerToken, store, currency }: { customerToken?: string, store?: string, currency?: string }) => ({
  config: {
    state: {
      getCustomerToken: jest.fn(() => customerToken),
      getStore: jest.fn(() => store),
      getCurrency: jest.fn(() => currency),
    },
  },
});

describe('[Magento-API-Client] getHeaders', () => {
  it('Use without default headers', () => {
    const context = contextMock({});
    // @ts-ignore
    expect(getHeaders(context)).toEqual({});
  });

  it('Use with default headers', () => {
    const context = contextMock({
      customerToken: '123',
      store: 'default',
      currency: 'EUR',
    });
    // @ts-ignore
    expect(getHeaders(context)).toEqual({
      Authorization: 'Bearer 123',
      store: 'default',
      'Content-Currency': 'EUR',
    });
  });

  it('Use with custom headers', () => {
    const context = contextMock({});
    const customHeaders = {
      'Accept-Language': 'en',
    };
    // @ts-ignore
    expect(getHeaders(context, customHeaders)).toEqual(customHeaders);
  });

  it('Use with replacing default headers', () => {
    const context = contextMock({ customerToken: '123' });
    const customHeaders = {
      Authorization: 'Bearer 321',
    };
    // @ts-ignore
    expect(getHeaders(context, customHeaders)).toEqual({
      Authorization: 'Bearer 321',
    });
  });
});
