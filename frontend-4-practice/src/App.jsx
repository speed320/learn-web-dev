import { useState, useEffect } from 'react';
import Header from './components/Header';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import TimeSlots from './components/TimeSlots';
import BookingBottomBar from './components/BookingBottomBar';
import Footer from './components/Footer';
import { DAYS_OF_WEEK, MONTHS_GENITIVE } from './data/date';
import { fetchToday, fetchSlots } from './api';

function App() {
  const [todayLoading, setTodayLoading] = useState(true);
  const [todayError, setTodayError] = useState(null);
  const [todayDateObj, setTodayDateObj] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2026);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [selectedTime, setSelectedTime] = useState(null);

  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);

  // ========================================================
  // 1. Загрузка даты «сегодня» при первом открытии страницы
  // ========================================================
  useEffect(() => {
    let isMounted = true;

    async function loadToday() {
      setTodayLoading(true);
      setTodayError(null);

      try {
        const todayData = await fetchToday(); // { day, month, year }
        if (!isMounted) return;

        setCurrentMonth(todayData.month);
        setCurrentYear(todayData.year);

        setSelectedDay(todayData.day);
        setSelectedMonth(todayData.month);
        setSelectedYear(todayData.year);

        setTodayDateObj(new Date(todayData.year, todayData.month, todayData.day));
      } catch (err) {
        if (!isMounted) return;
        setTodayError(err.message || 'Не удалось получить данные сервера');
      } finally {
        if (isMounted) {
          setTodayLoading(false);
        }
      }
    }

    loadToday();

    return () => {
      isMounted = false;
    };
  }, []);

  // ========================================================
  // 2. Загрузка слотов при смене выбранного дня
  //    (срабатывает при первом появлении selectedDay и при каждом клике)
  // ========================================================
  useEffect(() => {
    if (selectedDay === null || selectedMonth === null || selectedYear === null) {
      return;
    }

    const requestDate = {
      day: selectedDay,
      month: selectedMonth,
      year: selectedYear,
    };

    let isCancelled = false;

    async function loadSlots() {
      setSlotsLoading(true);
      setSlotsError(null);

      try {
        const res = await fetchSlots(requestDate);

        if (isCancelled) return;

        if (
            res.date &&
            (res.date.day !== requestDate.day ||
                res.date.month !== requestDate.month ||
                res.date.year !== requestDate.year)
        ) {
          return;
        }

        setSlots(res.slots || []);
      } catch (err) {
        if (!isCancelled) {
          setSlotsError(err.message || 'Не удалось загрузить доступные слоты');
        }
      } finally {
        if (!isCancelled) {
          setSlotsLoading(false);
        }
      }
    }

    loadSlots();

    return () => {
      isCancelled = true;
    };
  }, [selectedDay, selectedMonth, selectedYear]);

  function handleDayClick(day, month, year) {
    if (day === selectedDay && month === selectedMonth && year === selectedYear) {
      return;
    }

    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedTime(null);
  }

  function handleTimeClick(time) {
    setSelectedTime(time);
  }

  function handlePrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  function handleSubmit() {
    if (!selectedTime) return;
    const dateObj = new Date(selectedYear, selectedMonth, selectedDay);
    const weekDay = DAYS_OF_WEEK[dateObj.getDay()];
    const monthGenitive = MONTHS_GENITIVE[selectedMonth];

    alert(`Вы выбрали запись: ${weekDay}, ${selectedDay} ${monthGenitive} ${selectedYear} в ${selectedTime}`);
  }

  return (
      <>
        <Header />

        <main className="main">
          <div className="container">
            <div className="booking-top">
              <a href="#services" className="btn btn--secondary btn--back">← К выбору услуг</a>
              <h1 className="booking-top__title">На какую дату планируем?</h1>
            </div>

            {todayLoading && (
                <div style={{ textAlign: 'center', padding: '80px 0', fontSize: '18px', color: 'var(--text-soft)' }}>
                  Загрузка…
                </div>
            )}

            {!todayLoading && todayError && (
                <div style={{ textAlign: 'center', padding: '80px 0', fontSize: '18px', color: '#ff8a8a' }}>
                  Ошибка: {todayError}. Попробуйте обновить страницу.
                </div>
            )}

            {!todayLoading && !todayError && (
                <>
                  <div className="booking-grid">
                    <section className="card card--calendar" aria-labelledby="calendar-heading">
                      <CalendarHeader
                          currentMonth={currentMonth}
                          currentYear={currentYear}
                          onPrevMonth={handlePrevMonth}
                          onNextMonth={handleNextMonth}
                      />
                      <CalendarGrid
                          currentMonth={currentMonth}
                          currentYear={currentYear}
                          selectedDay={selectedDay}
                          selectedMonth={selectedMonth}
                          selectedYear={selectedYear}
                          today={todayDateObj}
                          onDayClick={handleDayClick}
                      />
                    </section>

                    <TimeSlots
                        slots={slots}
                        loading={slotsLoading}
                        error={slotsError}
                        selectedTime={selectedTime}
                        onTimeClick={handleTimeClick}
                    />
                  </div>

                  <BookingBottomBar
                      selectedDay={selectedDay}
                      selectedMonth={selectedMonth}
                      selectedYear={selectedYear}
                      selectedTime={selectedTime}
                      onSubmit={handleSubmit}
                  />
                </>
            )}
          </div>
        </main>

        <Footer />
      </>
  );
}

export default App;