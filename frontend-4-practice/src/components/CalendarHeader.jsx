import { MONTHS_NOMINATIVE } from '../data/date';

function CalendarHeader({ currentMonth, currentYear, onPrevMonth, onNextMonth }) {
    return (
        <div className="calendar__header">
            <h2 id="calendar-heading" className="card__title">
                {MONTHS_NOMINATIVE[currentMonth]} {currentYear}
            </h2>
            <div className="calendar__controls">
                <button
                    type="button"
                    className="calendar__arrow"
                    aria-label="Предыдущий месяц"
                    onClick={onPrevMonth}
                >
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
                        <path
                            d="M6.5 1L1.5 6L6.5 11"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    className="calendar__arrow"
                    aria-label="Следующий месяц"
                    onClick={onNextMonth}
                >
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
                        <path
                            d="M1.5 1L6.5 6L1.5 11"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default CalendarHeader;