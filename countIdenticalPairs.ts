export default function countIdenticalPairs(A: number[]): number {
  let countArr = new Map<number, number>();
  let result = 0;

  for (let i = 0; i < A.length; i++) {
    countArr.set(A[i], (countArr.get(A[i]) ?? 0) + 1);
  }
  countArr.forEach(value => {
    result += (value * (value - 1)) / 2;
  });
  return result;
}
