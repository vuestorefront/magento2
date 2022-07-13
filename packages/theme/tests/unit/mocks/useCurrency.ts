import { ref } from '@nuxtjs/composition-api';

export const useCurrencyMock = {
  currency: ref({}),
  load: jest.fn(),
  change: jest.fn(),
  error: ref({
    load: null,
    change: null,
  }),
};
