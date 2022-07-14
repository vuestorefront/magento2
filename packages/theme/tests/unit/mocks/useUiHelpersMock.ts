export const useUiHelpersMock = (extend = {}) => ({
  changeSorting: jest.fn(),
  clearFilters: jest.fn(),
  getCatLink: jest.fn((val) => val),
  getFacetsFromURL: jest.fn(() => ({ filters: {} })),
  ...extend,
});

export default useUiHelpersMock;
