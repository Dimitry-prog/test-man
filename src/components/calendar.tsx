import { currentMonth, monthNames, weekNames } from '../lib/constants.ts';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import {
  addZero,
  cn,
  getCurrentDay,
  getCurrentDayOfWeek,
  getDaysInCurrentMonth,
  getFirstDayInCurrentMonth,
  getLabelColor,
  getNextMonth,
  getPreviousMonth,
} from '../lib/utils.ts';
import { Dispatch, SetStateAction } from 'react';
import { DateStateType } from '../types';

type CalendarProps = {
  dateInfo: Record<string, Record<string, string>>;
  dateState: DateStateType;
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  onClose: (value: boolean) => void;
};

const Calendar = ({ dateInfo, dateState, setDateState, onClose }: CalendarProps) => {
  const handlePreviousMonth = () => {
    const { month, year } = dateState;
    const previousMonth = getPreviousMonth(month, year);
    setDateState((prev) => ({
      ...prev,
      month: previousMonth.month,
      year: previousMonth.year,
    }));
  };

  const handleNextMonth = () => {
    const { month, year } = dateState;
    const nextMonth = getNextMonth(month, year);
    setDateState((prev) => ({
      ...prev,
      month: nextMonth.month,
      year: nextMonth.year,
    }));
  };

  const handleSetDay = (day: number) => {
    setDateState((prev) => ({
      ...prev,
      day,
    }));
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <button
        onClick={() => onClose(false)}
        type="button"
        className="h-1.5 w-20 self-center rounded-xl bg-gray-300"
      />
      <h2 className="text-xl font-medium">Календарь</h2>

      <div className="flex items-center justify-between md:px-5">
        <button
          onClick={handlePreviousMonth}
          type="button"
          className="rounded-md bg-white p-2.5 transition-all duration-300 hover:opacity-60"
        >
          <AiOutlineLeft className="h-4 w-4" />
        </button>

        <div className="flex w-40 items-center justify-center gap-5 rounded-xl bg-white px-2.5 py-2">
          <p className="font-medium">{monthNames[addZero(dateState.month)]}</p>
        </div>

        <button
          onClick={handleNextMonth}
          disabled={dateState.month === new Date().getMonth() + 1}
          type="button"
          className="rounded-xl bg-white p-2.5 transition-all duration-300 hover:opacity-60 "
        >
          <AiOutlineRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Object.keys(weekNames).map((week) => (
          <div key={week} className="flex items-center justify-center p-2 text-sm text-gray-500">
            {weekNames[week].toLowerCase()}
          </div>
        ))}

        {Array.from({
          length: getFirstDayInCurrentMonth(dateState.year, dateState.month),
        }).map((_, index) => (
          <div key={index} className="p-2 text-sm font-medium" />
        ))}

        {Array.from({ length: getDaysInCurrentMonth(dateState.year, dateState.month) }).map(
          (_, index) => (
            <div
              onClick={() => handleSetDay(index + 1)}
              key={index}
              className={cn(
                'flex cursor-pointer flex-col items-center justify-center rounded-xl border border-transparent p-2 font-medium transition-all duration-300 hover:border-green-500',
                dateState.day === index + 1 && 'border-green-500',
                (getCurrentDayOfWeek(index + 1, dateState.year, dateState.month) === 6 ||
                  getCurrentDayOfWeek(index + 1, dateState.year, dateState.month) === 0) &&
                  'text-red-500',
                parseInt(getCurrentDay()) < index + 1 &&
                  currentMonth === dateState.month &&
                  'pointer-events-none opacity-50'
              )}
            >
              {index + 1}

              <span
                className={cn(
                  'h-1 w-3 rounded-xl',
                  getLabelColor(dateInfo[addZero(dateState.month)]?.[addZero(index + 1)]),
                  parseInt(getCurrentDay()) < index + 1 &&
                    currentMonth === dateState.month &&
                    'hidden'
                )}
              />
            </div>
          )
        )}
      </div>

      <button
        onClick={() => onClose(false)}
        type="button"
        className="mt-4 w-full rounded-xl bg-green-500 p-3 text-white transition-all duration-300 hover:opacity-90 md:max-w-40 md:self-center"
      >
        Выбрать
      </button>
    </div>
  );
};

export default Calendar;
