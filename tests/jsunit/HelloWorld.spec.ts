import { HelloTest } from '../../src/HelloTest';
import { expect } from 'chai';
import 'mocha';

describe('First test',
  () => {
    it('should return true', () => {
      const result = HelloTest();
      expect(result).to.equal(true);
  });
});
