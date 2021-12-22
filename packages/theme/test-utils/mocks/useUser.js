export const useUserMock = (userData = {}) => ({
  load: jest.fn(),
  loading: {
    value: false,
  },
  isAuthenticated: {
    value: false,
  },
  error: {
    value: {
      register: null,
    },
  },
  ...userData,
});

export default useUserMock;
