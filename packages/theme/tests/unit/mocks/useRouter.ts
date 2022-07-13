export const useRouterMock = (extend = {}) => ({
  push: jest.fn((val) => val),
  ...extend,
});

export default useRouterMock;
