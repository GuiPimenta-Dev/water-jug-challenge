export default function greatCommonDivisor(a: number, b: number): number {
  return b == 0 ? Math.abs(a) : greatCommonDivisor(b, a % b);
}
