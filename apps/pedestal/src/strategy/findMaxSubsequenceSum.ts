export function findMaxSubsequenceSum(hVal: number[]): number {
  let mSum = hVal[0];
  let curSum = mSum;
  let mHead = 0;
  let mTail = 0;
  for (let i = 1, count = 1; i < hVal.length; i++, count++) {
    const flag = hVal[i] > curSum + hVal[i];
    curSum = flag ? hVal[i] : curSum + hVal[i];
    if (curSum === hVal[i]) {
      count = 0;
    }
    if (curSum > mSum) {
      mTail = i;
      mHead = mTail - count;
      mSum = curSum;
    }
  }
  return mSum;
}
