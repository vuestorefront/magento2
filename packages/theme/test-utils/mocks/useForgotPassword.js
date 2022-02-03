import { ref } from '@nuxtjs/composition-api';

export const useForgotPasswordMock = (passwordData = {}) => ({
  result: ref({}),
  setNew: jest.fn(),
  error: ref({}),
  loading: ref(false),
  ...passwordData,
});

export default useForgotPasswordMock;
