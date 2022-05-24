import { usePrice } from '~/modules/catalog/pricing/usePrice';
import { useApi } from '~/composables/useApi';
import getPricesQuery from '~/modules/catalog/pricing/getPricesQuery.gql';

jest.mock('~/composables/useApi', () => ({
  useApi: jest.fn(),
}));

describe('usePrice', () => {
  it('Factory returns required methods', () => {
    const actual = usePrice();
    expect(actual).toHaveProperty('getPricesBySku');
    expect(actual).toHaveProperty('getPrices');
  });

  it('getPrices', async () => {
    const { getPrices } = usePrice();
    const pageSize = 20;
    const currentPage = 1;
    const variables = { filter: { sku: { eq: 'test' } }, pageSize, currentPage };
    const expectedResult = { items: [] };
    const useApiMock = { query: jest.fn(() => (expectedResult)) };

    (useApi as jest.Mock).mockReturnValue(useApiMock);
    const actualResult = await getPrices(variables);

    expect(useApiMock.query).toBeCalledTimes(1);
    expect(useApiMock.query).toBeCalledWith(getPricesQuery, variables);
    expect(expectedResult).toMatchObject(actualResult);
  });

  it('getPricesBySku', async () => {
    const { getPricesBySku } = usePrice();
    const pageSize = 20;
    const currentPage = 1;
    const skus = ['sku1', 'sku2'];
    const expectedVariables = { filter: { sku: { in: skus } }, pageSize, currentPage };
    const expectedResult = { items: [] };
    const useApiMock = { query: jest.fn(() => (expectedResult)) };

    (useApi as jest.Mock).mockReturnValue(useApiMock);
    const actualResult = await getPricesBySku(skus, pageSize, currentPage);

    expect(useApiMock.query).toBeCalledTimes(1);
    expect(useApiMock.query).toBeCalledWith(getPricesQuery, expectedVariables);
    expect(expectedResult).toMatchObject(actualResult);
  });
});
