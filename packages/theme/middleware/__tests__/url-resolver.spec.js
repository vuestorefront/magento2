import { createPinia, setActivePinia } from 'pinia';
import { usePageStore } from '~/stores/page';
import urlResolverMiddleware from '../url-resolver';

const errRes = {
  data: undefined,
  errors: [
    {
      message: 'Variable "$url" of required type "String!" was not provided.',
      extensions: {
        category: 'graphql',
      },
    },
  ],
};

const emptyRes = {
  data: {
    route: null,
  },
  errors: undefined,
};

const validRes = {
  data: {
    route: {
      type: 'CATEGORY',
      uid: 'MjEzMA==',
    },
  },
  errors: undefined,
};

const contextMockFactory = (callbackResponse) => ({
  app: {
    $vsf: {
      $magento: {
        api: {
          route: () => callbackResponse,
        },
      },
    },
  },
  route: {
    path: '/default/set-of-sprite-yoga-straps.html',
  },
  i18n: {
    locale: 'default',
  },
  error: jest.fn(),
});

describe('Url resolver middleware', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    setActivePinia(createPinia());
  });

  it('should redirect to 404 if response data is null', async () => {
    const contextMock = contextMockFactory(emptyRes);
    const pageStore = usePageStore();

    await urlResolverMiddleware(contextMock);

    expect(pageStore.routeData).toBe(null);
    expect(contextMock.error).toHaveBeenCalled();
  });

  it('should redirect to 404 if response is error', async () => {
    const contextMock = contextMockFactory(errRes);
    const pageStore = usePageStore();

    await urlResolverMiddleware(contextMock);

    expect(pageStore.routeData).toBe(null);
    expect(contextMock.error).toHaveBeenCalled();
  });

  it('should set a route data if response is data', async () => {
    const contextMock = contextMockFactory(validRes);
    const pageStore = usePageStore();

    await urlResolverMiddleware(contextMock);

    expect(typeof pageStore.routeData).toBe('object');
    expect(contextMock.error).toHaveBeenCalledTimes(0);
  });
});
