import { DAYS_OF_WEEK, MONTHS_GENITIVE } from '../data/date';

function BookingBottomBar({
                              selectedDay,
                              selectedMonth,
                              selectedYear,
                              selectedTime,
                              onSubmit,
                          }) {
    const dateObj = new Date(selectedYear, selectedMonth, selectedDay);
    const weekDay = DAYS_OF_WEEK[dateObj.getDay()];
    const monthGenitive = MONTHS_GENITIVE[selectedMonth];
    const dateString = `${weekDay}, ${selectedDay} ${monthGenitive} ${selectedYear}`;

    return (
        <div className="booking-actions">
            <p className="booking-actions__hint">
                {selectedTime ? `${dateString} • ${selectedTime}` : `${dateString} • выберите время визита`}
            </p>
            <button
                type="button"
                className="btn btn--primary btn--submit"
                disabled={!selectedTime}
                onClick={onSubmit}
            >
                Ввести данные
            </button>
        </div>
    );
}

export default BookingBottomBar;