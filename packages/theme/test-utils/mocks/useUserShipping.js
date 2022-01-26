export const useUserShippingMock = (extend = {}) => ({
  load: jest.fn(),
  shipping: jest.fn(),
  ...extend,
});

export default useUserShippingMock;
