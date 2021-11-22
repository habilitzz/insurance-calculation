import { summaryValues } from '../helper/helpers';

describe('helpers', function() {
  test('`summaryValues` should calculate donations correctly', function() {
    expect(summaryValues([1, 2, 3, 4])).toEqual(10);
  });
});
