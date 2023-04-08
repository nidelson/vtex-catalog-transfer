import { padZero } from "./padZero";

export const formatTime = (date: Date) => {
  return `${padZero(date.getHours(), 2)}:${padZero(
    date.getMinutes(),
    2
  )}:${padZero(date.getSeconds(), 2)}`;
};
