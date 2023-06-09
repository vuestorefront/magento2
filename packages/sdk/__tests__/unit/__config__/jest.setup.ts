import { TEST_DESCRIBE } from './jest.const';
import * as methods from '../../../src/methods';

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Creates uniform test descriptions.
 */
export function describeGroup(methodName: keyof typeof methods) {
  return `${TEST_DESCRIBE} ${methodName}`;
}
