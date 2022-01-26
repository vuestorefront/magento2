export const useCountrySearchMock = (countrySearchData = {}) => ({
  load: jest.fn(),
  countries: [],
  search: jest.fn(),
  country: jest.fn(),
  ...countrySearchData,
});

export default useCountrySearchMock;
