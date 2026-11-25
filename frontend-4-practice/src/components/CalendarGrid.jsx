import { buildCalendarGrid, isDateSelectable, MONTHS_GENITIVE } from '../data/date';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function CalendarGrid({
                          currentMonth,
                          currentYear,
                          selectedDay,
                          selectedMonth,
                          selectedYear,
                          today,
                          onDayClick,
                      }) {
    const weeks = buildCalendarGrid(currentYear, currentMonth);

    return (
        <>
            <div className="calendar__weekdays" aria-hidden="true">
                {WEEKDAYS.map((dayName) => (
                    <span key={dayName} className="calendar__weekday">
            {dayName}
          </span>
                ))}
            </div>

            <div className="calendar__days" role="group" aria-label="Даты месяца">
                {weeks.map((week) =>
                    week.map((cell) => {
                        const selectable =
                            cell.isCurrentMonth &&
                            isDateSelectable(cell.day, cell.month, cell.year, today);

                        const isSelected =
                            cell.isCurrentMonth &&
                            cell.day === selectedDay &&
                            cell.month === selectedMonth &&
                            cell.year === selectedYear;

                        const classes = ['day-btn'];
                        if (!selectable) classes.push('day-btn--disabled');
                        if (isSelected) classes.push('day-btn--selected');

                        const monthName = MONTHS_GENITIVE[cell.month];
                        const ariaLabel = selectable
                            ? `${cell.day} ${monthName} ${cell.year}`
                            : `${cell.day} ${monthName} ${cell.year}, недоступно`;

                        return (
                            <button
                                key={`${cell.year}-${cell.month}-${cell.day}`}
                                type="button"
                                className={classes.join(' ')}
                                aria-label={ariaLabel}
                                aria-pressed={isSelected}
                                disabled={!selectable}
                                onClick={() => onDayClick(cell.day, cell.month, cell.year)}
                            >
                                {cell.day}
                            </button>
                        );
                    })
                )}
            </div>
        </>
    );
}

export default CalendarGrid;