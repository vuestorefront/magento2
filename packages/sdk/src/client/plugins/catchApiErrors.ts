import type { ErrorResponse } from '../../types';
import type { AxiosResponse } from 'axios';

function isObject(obj: unknown): obj is Record<string, unknown> {
  return (obj ?? false)?.constructor?.name === 'Object';
}

function isErrorResponse(obj: unknown): obj is ErrorResponse {
  return isObject(obj) && ('graphQLErrors' in obj || 'networkError' in obj);
}

export function handleApiError<T>(response: T | ErrorResponse) {
  if (!isErrorResponse(response)) {
    return;
  }
  if (response.graphQLErrors?.length) {
    return response.graphQLErrors[0];
  }
  if (response.networkError) {
    return response.networkError;
  }
  return 'Something went wrong. Please try again.';
}

export const catchApiErrors = (response: AxiosResponse): AxiosResponse | Promise<never> => {
  const isError = handleApiError(response.data);

  if (typeof isError === 'undefined') {
    return response;
  }
  if (typeof isError === 'string') {
    return Promise.reject(new Error(isError));
  }

  return Promise.reject(isError);
};
