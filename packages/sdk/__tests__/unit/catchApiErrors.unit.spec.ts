import { handleApiError } from '../../src/client/plugins/catchApiErrors';

describe('handleApiError', () => {
  it('should return undefined when response is a valid response object', () => {
    expect(handleApiError({ value: 'test value' })).toBeUndefined();
  });

  it('should return undefined when response is not an plain object', () => {
    [false, null, undefined, [], '', 234, new Map(), new Set()].forEach((item) => {
      expect(handleApiError(item)).toBeUndefined();
    });
  });

  it('should return first graphQLErrors value when error is GraphQL Error type', () => {
    const error = {
      graphQLErrors: [{ message: 'error occured', code: 400 }]
    };
    expect(handleApiError(error)).toEqual(error.graphQLErrors[0]);
  });

  it('should return fallback message when GraphQL Error is empty', () => {
    const error = {
      graphQLErrors: []
    };
    expect(handleApiError(error)).toEqual('Something went wrong. Please try again.');
  });

  it('should return networkError value when error is Network Error type', () => {
    const error = {
      networkError: 'network error occured'
    };
    expect(handleApiError(error)).toEqual(error.networkError);
  });

  it('should return fallback message when Error is empty', () => {
    const error = {
      graphQLErrors: [],
      networkError: null
    };
    expect(handleApiError(error)).toEqual('Something went wrong. Please try again.');
  });
});
