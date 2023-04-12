import { client } from '../../src/client';

describe('client', () => {
  it('can handle succesful request', () => {
    const result = client.get('https://example.com');
    expect(result).resolves.not.toThrow();
  });
});
