export const useUiHelpersMock = (extend = {}) => ({
  getCatLink: jest.fn((val) => val),
  changeSorting: jest.fn(),
  ...extend,
});

export default useUiHelpersMock;
