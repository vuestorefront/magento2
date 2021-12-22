export const useGuestUserMock = (questUserData = {}) => ({
  loading: {
    value: false,
  },
  error: {
    value: {
      attachToCart: null,
    },
  },
  attachToCart: jest.fn(),
  guestUser: {
    value: null,
  },
  ...questUserData,
});

export default useGuestUserMock;
