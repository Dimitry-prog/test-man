import { BiArrowBack, BiCalendar, BiEdit } from 'react-icons/bi';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { addZero, cn, getDaysInCurrentMonth, getNextDay, getPreviousDay } from './lib/utils.ts';
import {
  colors,
  currentDay,
  currentMonth,
  currentYear,
  monthPluralNames,
} from './lib/constants.ts';
import Calendar from './components/calendar.tsx';
import { MouseEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { DateStateType } from './types';
import { useMediaQuery } from './hooks/use-media-query.ts';

function App() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [dateState, setDateState] = useState<DateStateType>({
    day: currentDay,
    month: currentMonth,
    year: currentYear,
  });
  const [choose, setChoose] = useState<Record<string, Record<string, string>>>({});
  const [editChoose, setEditChoose] = useState<string | null>(null);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const todayTitle = `${dateState.day} ${monthPluralNames[addZero(dateState.month)]}`;
  const currentChoose = choose[addZero(dateState.month)]?.[addZero(dateState.day)];
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handlePreviousDay = () => {
    const { day, month, year } = dateState;
    const previousDay = getPreviousDay(day, month, year);

    setDateState({
      ...previousDay,
    });
  };

  const handleNextDay = () => {
    const { day, month, year } = dateState;
    const nextDay = getNextDay(day, month, year);

    setDateState({
      ...nextDay,
    });
  };

  const handleCloseByOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === modalRef.current) {
      setIsOpenCalendar(false);
    }
  };

  const init = useMemo(() => {
    const days = getDaysInCurrentMonth(dateState.year, dateState.month);

    return Array.from({ length: days })
      .map((_, index) => addZero(index + 1))
      .reduce(
        (acc: Record<string, Record<string, string>>, val) => {
          if (!acc[addZero(dateState.month)]) {
            acc[addZero(dateState.month)] = {};
          }
          if (!acc[addZero(dateState.month)][val]) {
            acc[addZero(dateState.month)][val] = choose[addZero(dateState.month)]?.[val] || '';
          }
          return acc;
        },
        { ...choose }
      );
  }, [dateState.year, dateState.month]);

  useEffect(() => {
    setChoose((prev) => ({
      ...prev,
      ...init,
    }));
  }, [init]);

  useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpenCalendar(false);
      }
    };
    document.addEventListener('keydown', closeByEsc);

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  return (
    <>
      <div className="mx-auto flex h-screen max-w-7xl flex-col gap-1 p-4">
        <div className="flex items-center gap-4 p-3">
          <button type="button" className="hover:opacity-60">
            <BiArrowBack className="h-6 w-6" />
          </button>

          <p className="text-base font-medium">Питание 11.03</p>
        </div>

        <section className="flex items-center justify-between rounded-xl bg-gray-100 px-3 py-2">
          <button
            onClick={handlePreviousDay}
            type="button"
            className="rounded-md bg-white p-2.5 transition-all duration-300 hover:opacity-60"
          >
            <AiOutlineLeft className="h-4 w-4" />
          </button>

          <div
            onClick={() => setIsOpenCalendar(!isOpenCalendar)}
            className="flex w-40 cursor-pointer items-center gap-5 rounded-xl bg-white px-2.5 py-2 md:w-96 md:justify-center"
          >
            <BiCalendar className="h-6 w-6" />
            <p className="font-medium md:justify-self-center">{todayTitle}</p>
          </div>

          <button
            onClick={handleNextDay}
            type="button"
            disabled={dateState.day === new Date().getDate()}
            className={cn(
              'rounded-xl bg-white p-2.5 transition-all duration-300 hover:opacity-60 disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            <AiOutlineRight className="h-4 w-4" />
          </button>
        </section>

        <section className="group relative flex flex-col items-center justify-center gap-3 rounded-xl p-4 shadow">
          {(currentChoose === '' || editChoose === '') && (
            <>
              {colors.map((color) => (
                <p
                  key={color}
                  onClick={() => {
                    setChoose((prev) => ({
                      ...prev,
                      [addZero(dateState.month)]: {
                        ...prev[addZero(dateState.month)],
                        [addZero(dateState.day)]: color,
                      },
                    }));
                    setEditChoose(null);
                  }}
                  className={`text-base font-medium text-${color}-500`}
                >
                  Питание 11.03
                </p>
              ))}
            </>
          )}

          {currentChoose !== '' && editChoose === null && (
            <>
              {['green', 'yellow', 'gray'].includes(currentChoose) && (
                <p className={`text-base font-medium text-${currentChoose}-500`}>
                  Питание 11.03 ver2
                </p>
              )}
            </>
          )}

          {currentChoose !== '' && (
            <button
              onClick={() => {
                setEditChoose('');
              }}
              type="button"
              className="absolute bottom-4 right-4 opacity-0 transition-all duration-300 hover:opacity-60 group-hover:opacity-100"
            >
              <BiEdit className="h-6 w-6" />
            </button>
          )}
        </section>
      </div>

      <div
        ref={modalRef}
        onClick={handleCloseByOverlay}
        className={cn(
          'invisible fixed left-0 top-0 z-50 flex size-full items-center justify-center bg-black/50 px-1 opacity-0 transition-all duration-500',
          isOpenCalendar && 'visible bottom-0 opacity-100'
        )}
      >
        <div
          className={cn(
            'relative w-full max-w-2xl rounded-xl bg-white p-2 transition-all duration-500',
            isMobile && '-bottom-[100%]',
            isOpenCalendar && isMobile && '-bottom-[23%]'
          )}
        >
          <Calendar
            dateInfo={choose}
            dateState={dateState}
            setDateState={setDateState}
            onClose={setIsOpenCalendar}
          />
        </div>
      </div>
    </>
  );
}

export default App;
