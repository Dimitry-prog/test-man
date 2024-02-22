export const currentDate = new Date();

export const currentYear = currentDate.getFullYear();
export const currentMonth = currentDate.getMonth() + 1;
export const currentDay = currentDate.getDate();

export const monthPluralNames: {
  [K: string]: string;
} = {
  '01': 'Января',
  '02': 'Февраля',
  '03': 'Марта',
  '04': 'Апреля',
  '05': 'Мая',
  '06': 'Июня',
  '07': 'Июля',
  '08': 'Августа',
  '09': 'Сентября',
  '10': 'Октября',
  '11': 'Ноября',
  '12': 'Декабря',
};

export const monthNames: {
  [K: string]: string;
} = {
  '01': 'Январь',
  '02': 'Февраль',
  '03': 'Март',
  '04': 'Апрель',
  '05': 'Май',
  '06': 'Июнь',
  '07': 'Июль',
  '08': 'Август',
  '09': 'Сентябрь',
  '10': 'Октябрь',
  '11': 'Ноябрь',
  '12': 'Декабрь',
};

export const weekNames: {
  [K: string]: string;
} = {
  '1': 'Пн',
  '2': 'Вт',
  '3': 'Ср',
  '4': 'Чт',
  '5': 'Пт',
  '6': 'Сб',
  '7': 'Вс',
};

export const colors = ['green', 'yellow', 'gray'];
