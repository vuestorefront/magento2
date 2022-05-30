export const injectMock = (extend = {}) => ({
  isFilterSelected: jest.fn(
    (id: string, optVal: string): boolean => id === optVal,
  ),
  ...extend,
});
