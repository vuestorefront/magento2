export const useContextMock = (extend = {}) => ({
  app: {
    localePath: jest.fn((val) => val),
  },
  localePath: jest.fn((val) => val),
  ...extend,
});

export default useContextMock;
