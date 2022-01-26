export const useShippingMock = (shippingData = {}) => ({
  load: jest.fn(),
  save: jest.fn(),
  shipping: jest.fn(),
  ...shippingData,
});

export default useShippingMock;
