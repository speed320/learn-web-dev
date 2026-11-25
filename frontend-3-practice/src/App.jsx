import { useState } from 'react';
import Header from './components/Header';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import TimeSlots from './components/TimeSlots';
import BookingBottomBar from './components/BookingBottomBar';
import Footer from './components/Footer';
import { DAYS_OF_WEEK, MONTHS_GENITIVE, getSlotsForDate } from './data/date';

const now = new Date();
const TODAY = new Date(now.getFullYear(), now.getMonth(), now.getDate());

function App() {
  const [currentMonth, setCurrentMonth] = useState(TODAY.getMonth());
  const [currentYear, setCurrentYear] = useState(TODAY.getFullYear());
  const [selectedDay, setSelectedDay] = useState(TODAY.getDate());
  const [selectedMonth, setSelectedMonth] = useState(TODAY.getMonth());
  const [selectedYear, setSelectedYear] = useState(TODAY.getFullYear());
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState(() =>
      getSlotsForDate(TODAY.getDate(), TODAY.getMonth(), TODAY.getFullYear())
  );

  function handleDayClick(day, month, year) {
    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedTime(null);
    setSlots(getSlotsForDate(day, month, year));
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
                    today={TODAY}
                    onDayClick={handleDayClick}
                />
              </section>

              <TimeSlots
                  slots={slots}
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
          </div>
        </main>

        <Footer />
      </>
  );
}

export default App;