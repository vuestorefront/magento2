import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api';
import { createLocalVue } from '@vue/test-utils';
import { PiniaVuePlugin, setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { render } from '@testing-library/vue';
import { useCurrency } from '../index';

const localVue = createLocalVue();
localVue.use(PiniaVuePlugin);
const pinia = createTestingPinia();
const appMock = {
  app: {
    $vsf: {
      $magento: {
        api: {
          currency: jest.fn(),
        },
      },
    },
  },
};

jest.mock('@nuxtjs/composition-api', () => {
  const actual = jest.requireActual('@nuxtjs/composition-api');
  return {
    ...actual,
    useContext: jest.fn(),
  };
});

describe('useCurrency', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const MockComponent = defineComponent({
    name: 'MockComponent',
    setup() {
      const { load } = useCurrency();

      onMounted(async () => {
        await load({
          customQuery: {
            currency: 'custom-currency-query',
          },
        });
      });
    },
    template: '<div>mock</div>',
  });

  it('the load method should receive custom query', () => {
    // given
    (useContext as jest.Mock).mockReturnValue(appMock);

    // when
    render(MockComponent, {
      localVue,
      pinia,
    });

    // then
    expect(appMock.app.$vsf.$magento.api.currency)
      .toHaveBeenCalledWith({ currency: 'custom-currency-query' }, null);
  });
});
