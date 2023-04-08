export const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const formatTime = (date: Date) => {
  return `${padZero(date.getHours(), 2)}:${padZero(
    date.getMinutes(),
    2
  )}:${padZero(date.getSeconds(), 2)}`;
};

export function padZero(value: number, size: number) {
  let str = value.toString();
  while (str.length < size) str = "0" + str;
  return str;
}
