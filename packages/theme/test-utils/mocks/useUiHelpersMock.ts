export const useUiHelpersMock = (extend = {}) => ({
  getCatLink: jest.fn((val) => val),
  ...extend,
});

export default useUiHelpersMock;
