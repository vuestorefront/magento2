export const useReviewMock = (reviewData = {}) => ({
  loading: {
    value: false,
  },
  loadReviewMetadata: jest.fn(),
  metadata: {
    value: [
      {
        id: 'METADATA_ID',
        name: 'METADATA_NAME',
        values: [
          {
            value_id: '1',
            value: 'VALUE 1',
          },
        ],
      },
    ],
  },
  error: {
    value: {},
  },
  ...reviewData,
});

export default useReviewMock;
