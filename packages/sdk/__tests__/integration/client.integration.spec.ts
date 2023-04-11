import { client } from '../../src/client';

describe('client', () => {
  it('smoke test', () => {
    const result = client.get('https://example.com');
    expect(result).resolves.not.toThrow();
  });
});
