
import { client } from '../../src/client';

describe('[axios client]', () => {
  it('interceptor should rejects an Error when error is a string message', async () => {
    const error = { networkError: 'some error occured', status: 200 };
    // @ts-expect-error private property
    const rejectedRes = client.interceptors.response.handlers[0].fulfilled({ data: error });
    expect(rejectedRes).rejects.toEqual(new Error(error.networkError));
  });

  it('interceptor should rejects given error value when error is a non-string value', async () => {
    const error = { graphQLErrors: [{ message: 'some error occured' }], status: 200 };

    // @ts-expect-error private property
    const rejectedRes = client.interceptors.response.handlers[0].fulfilled({ data: error });
    expect(rejectedRes).rejects.toEqual(error.graphQLErrors[0]);
  });

  it('interceptor should return response when is not an error', async () => {
    const response = { data: {}, status: 200 };

    // @ts-expect-error private property
    const rejectedRes = client.interceptors.response.handlers[0].fulfilled(response);
    expect(rejectedRes).toMatchObject(response);
  });
});
