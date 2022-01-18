import stockStatusEnum from '~/enums/stockStatusEnum';

export const cartGettersMock = (extend = {}) => ({
  getItems: jest.fn(() => []),
  getTotals: jest.fn(() => 0),
  getTotalItems: jest.fn(),
  getStockStatus: jest.fn(() => stockStatusEnum.inStock),
  ...extend,
});

export default cartGettersMock;
