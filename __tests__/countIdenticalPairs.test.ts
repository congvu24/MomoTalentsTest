import countIdenticalPairs from '../countIdenticalPairs';

describe('Test countIdenticalPairs function', () => {
  test('[1, 2, 3, 3, 5, 3, 4, 5, 5] => 6', () => {
    const result = countIdenticalPairs([1, 2, 3, 3, 5, 3, 4, 5, 5]);
    expect(result).toEqual(6);
  });

  test('[1, 2, 3, 3, 5, 3, 4, 5] => 4', () => {
    const result = countIdenticalPairs([1, 2, 3, 3, 5, 3, 4, 5]);
    expect(result).toEqual(4);
  });

  test('[1, 2, 3, 5, 3, 4, 5] => 2', () => {
    const result = countIdenticalPairs([1, 2, 3, 5, 3, 4, 5]);
    expect(result).toEqual(2);
  });

  test('[] => 0', () => {
    const result = countIdenticalPairs([]);
    expect(result).toEqual(0);
  });
});
