export const addressGetterMock = (extend = {}) => ({
  countriesList: jest.fn((countries) => countries),
  regionList: jest.fn((regions) => regions),
  ...extend,
});

export default addressGetterMock;
