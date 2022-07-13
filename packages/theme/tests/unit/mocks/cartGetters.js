import { ProductStockStatus } from '~/modules/GraphQL/types';

export const cartGettersMock = (extend = {}) => ({
  getItems: jest.fn(() => []),
  getTotals: jest.fn(() => 0),
  getTotalItems: jest.fn(),
  getStockStatus: jest.fn(() => ProductStockStatus.InStock),
  ...extend,
});

export default cartGettersMock;
