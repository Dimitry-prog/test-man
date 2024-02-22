import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { currentDay, currentMonth, currentYear } from './constants.ts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getLabelColor = (color: string) => {
  switch (color) {
    case 'green':
      return 'bg-green-500 text-green-500';
    case 'yellow':
      return 'bg-yellow-500 text-yellow-500';
    case 'gray':
      return 'bg-gray-500 text-gray-500';
    default:
      return 'bg-gray-500 text-gray-500';
  }
};

export const addZero = (value: number) => {
  const str = value.toString();
  if (str.length < 2) {
    return `0${value}`;
  } else {
    return value.toString();
  }
};

export const getCurrentDayOfWeek = (
  day: number = currentDay,
  year: number = currentYear,
  month: number = currentMonth
) => {
  return new Date(year, month - 1, day).getDay();
};

export const getCurrentDay = (
  year: number = currentYear,
  month: number = currentMonth,
  day: number = currentDay
) => {
  return addZero(new Date(year, month, day).getDate());
};

export const getCurrentMonth = () => {
  return addZero(new Date().getMonth() + 1);
};

export const getDaysInCurrentMonth = (year: number = currentYear, month: number = currentMonth) => {
  return new Date(year, month, 0).getDate();
};

export const getFirstDayInCurrentMonth = (
  year: number = currentYear,
  month: number = currentMonth
) => {
  return new Date(`${year}-${month}-01`).getDay() - 1;
};

export const getPreviousMonth = (month: number = currentMonth, year: number = currentYear) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;
  return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month: number = currentMonth, year: number = currentYear) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return { month: nextMonth, year: nextMonthYear };
};

export const getPreviousDay = (
  day: number = currentDay,
  month: number = currentMonth,
  year: number = currentYear
) => {
  const daysInMonth = getDaysInCurrentMonth(year, day > 1 ? month : month - 1);
  const prevDay = day > 1 ? day - 1 : daysInMonth;
  const prevMonth = day === 1 ? month - 1 : month;
  const prevMonthYear = month > 1 ? year : year - 1;
  return { day: prevDay, month: prevMonth, year: prevMonthYear };
};

export const getNextDay = (
  day: number = currentDay,
  month: number = currentMonth,
  year: number = currentYear
) => {
  const daysInMonth = getDaysInCurrentMonth(year, month);
  const nextDay = day < daysInMonth ? day + 1 : 1;
  const nextMonth = day === daysInMonth ? month + 1 : month;
  const nextMonthYear = month < 12 ? year : year + 1;
  return { day: nextDay, month: nextMonth, year: nextMonthYear };
};
