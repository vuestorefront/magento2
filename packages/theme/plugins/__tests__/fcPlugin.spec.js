import fcPlugin from '~/plugins/fcPlugin';

const injectFnMock = jest.fn();

describe('Format currency plugin', () => {
  it('should inject $fc', () => {
    fcPlugin({ app: {} }, injectFnMock);
    expect(injectFnMock).toHaveBeenCalledTimes(1);
  });
});
