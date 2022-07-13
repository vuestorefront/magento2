import { ref } from '@nuxtjs/composition-api';

export const useUserMock = (userData = {}) => ({
  load: jest.fn(),
  loading: ref(false),
  isAuthenticated: ref(false),
  error: ref({
    register: null,
  }),
  ...userData,
});

export default useUserMock;
