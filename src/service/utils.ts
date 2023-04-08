export const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function padZero(value: number, size: number) {
  let str = value.toString();
  while (str.length < size) str = "0" + str;
  return str;
}
