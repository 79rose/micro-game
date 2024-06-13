export function findMaxValue(
  n: number,
  b: number,
  w: number[],
  v: number[]
): number {
  const dp = Array(b + 1).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = w[i]; j <= b; j++) {
      dp[j] = Math.max(dp[j], dp[j - w[i]] + v[i]);
    }
  }
  return dp[b];
}
