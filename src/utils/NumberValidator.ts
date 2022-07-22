export function isNumeric(num: unknown): boolean {
  const s = String(num);
  return (
    !isNaN(+s) && isFinite(+s) && (typeof num === 'number' || !/e/i.test(s))
  );
}
