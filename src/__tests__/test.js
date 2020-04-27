import { generate } from '..';

describe('test C3H6O', () => {
  it('should return 42', () => {
    expect(generate('C3H6O')).toEqual(42);
  });
});
