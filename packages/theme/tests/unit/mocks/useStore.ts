import { ref } from '@nuxtjs/composition-api';

export const useStoreMock = {
  stores: ref([]),
  load: jest.fn(),
  change: jest.fn(),
  error: ref({
    load: null,
    change: null,
  }),
};
