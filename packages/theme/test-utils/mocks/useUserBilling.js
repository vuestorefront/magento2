export const useUserBillingMock = (userBillingData = {}) => ({
  load: jest.fn(),
  loading: {
    value: false,
  },
  error: {
    value: {
      register: null,
    },
  },
  ...userBillingData,
});

export default useUserBillingMock;
