import { HelloTest } from '@/shared/HelloTest'

describe('First test', () => {
  it('should return true', () => {
    const result = HelloTest();
    expect(result).toBe(true);
  });
});
