export const MONTHS_NOMINATIVE = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

export const MONTHS_GENITIVE = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

export const DAYS_OF_WEEK = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
    'Четверг', 'Пятница', 'Суббота',
];

const BASE_TIME_SLOTS = [
    '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00',
];

/**
 * Сравнивает две даты без учёта времени.
 * @param {Date} date1
 * @param {Date} date2
 * @returns {-1|0|1}
 */
export function compareDates(date1, date2) {
    const t1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getTime();
    const t2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()).getTime();

    if (t1 < t2) return -1;
    if (t1 > t2) return 1;
    return 0;
}

/**
 * Проверяет, можно ли выбрать дату (не раньше today).
 * @param {number} day
 * @param {number} month - 0-индексный месяц (0..11)
 * @param {number} year
 * @param {Date} today
 * @returns {boolean}
 */
export function isDateSelectable(day, month, year, today) {
    const candidate = new Date(year, month, day);
    return compareDates(candidate, today) >= 0;
}

/**
 * Строит сетку календаря для указанного месяца и года (недели Пн–Вс).
 * @param {number} year
 * @param {number} month - 0-индексный месяц (0..11)
 * @returns {Array<Array<{day: number, month: number, year: number, isCurrentMonth: boolean}>>}
 */
export function buildCalendarGrid(year, month) {
    const firstDayWeek = new Date(year, month, 1).getDay();
    const startOffset = (firstDayWeek + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells = [];

    for (let i = startOffset - 1; i >= 0; i--) {
        const prevDate = new Date(year, month - 1, daysInPrevMonth - i);
        cells.push({
            day: prevDate.getDate(),
            month: prevDate.getMonth(),
            year: prevDate.getFullYear(),
            isCurrentMonth: false,
        });
    }

    for (let day = 1; day <= daysInMonth; day++) {
        cells.push({
            day,
            month,
            year,
            isCurrentMonth: true,
        });
    }

    const remainder = cells.length % 7;
    if (remainder !== 0) {
        const trailingCount = 7 - remainder;
        for (let day = 1; day <= trailingCount; day++) {
            const nextDate = new Date(year, month + 1, day);
            cells.push({
                day: nextDate.getDate(),
                month: nextDate.getMonth(),
                year: nextDate.getFullYear(),
                isCurrentMonth: false,
            });
        }
    }

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }

    return weeks;
}

/**
 * Возвращает список слотов для выбранной даты.
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @returns {Array<{time: string, isBusy: boolean}>}
 */
export function getSlotsForDate(day, month, year) {
    const seed = day + month * 3 + year;

    return BASE_TIME_SLOTS.map((time, index) => ({
        time,
        isBusy: (seed + index) % 4 === 1,
    }));
}