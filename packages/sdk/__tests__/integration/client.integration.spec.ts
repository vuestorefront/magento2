import { client } from '../../src/client';

describe('client', () => {
  it('can handle successful request', () => {
    const result = client.get('https://example.com');
    expect(result).resolves.not.toThrow();
  });
});
