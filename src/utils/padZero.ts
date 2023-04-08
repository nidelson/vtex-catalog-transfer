export function padZero(value: number, size: number) {
  let str = value.toString();
  while (str.length < size) str = "0" + str;
  return str;
}
