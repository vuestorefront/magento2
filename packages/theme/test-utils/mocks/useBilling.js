export const useBillingMock = (billingData = {}) => ({
  load: () => {},
  save: () => {},
  loading: {
    value: false,
  },
  billing: {
    value: {},
  },
  address: {
    value: {},
  },
  ...billingData,
});

export default useBillingMock;
