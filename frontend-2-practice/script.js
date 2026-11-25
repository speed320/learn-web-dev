// JavaScript для страницы выбора даты и времени.
//
// ЗАДАНИЕ
// ========
// Оживить свою свёрстанную страницу. Скорее всего на ней будет работать:
//   1. При открытии страницы выбрать день по умолчанию.
//   2. По клику на день — день становится выбранным,
//      слоты обновляются.
//   3. По клику на слот — время становится выбранным,
//      попадает в нижнюю панель.
//   4. Стрелки «‹» и «›» листают месяцы.
//   5. Дни раньше «сегодня» нельзя выбрать.
//   6. Нижняя панель обновляется при выборе дня и времени.
//
// ГДЕ ЖИВУТ ДАННЫЕ
// ----------------
// Слотов пока нет с сервера. Захардкодьте массив в этом файле.
// Формат слота: { time: "10:00", available: true }.
// «Сегодня» можно взять из new Date() или захардкодить —
// как удобнее для проверки.
//
// СТРУКТУРА КОДА
// --------------
// Разделите код на смысловые части комментариями:
//   1. Данные (слоты, «сегодня»).
//   2. Состояние (месяц, день, время, слоты).
//   3. Чистые функции (для работы с датами).
//   4. Отрисовка и обработчики.
//   5. Инициализация.
//
// ЧИСТЫЕ ФУНКЦИИ
// --------------
// Если понадобится строить сетку календаря — вот функция,
// которую можно использовать. Она не зависит от DOM,
// просто принимает год и месяц и возвращает массив недель.
//
// function buildCalendarGrid(year, month) {
//   const firstDay = new Date(year, month, 1);
//   const lastDay = new Date(year, month + 1, 0);
//   const daysInMonth = lastDay.getDate();
//   const startDayOfWeek = firstDay.getDay();
//   const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
//   const prevMonthLastDay = new Date(year, month, 0).getDate();
//
//   const cells = [];
//
//   for (let i = offset - 1; i >= 0; i--) {
//     cells.push({ day: prevMonthLastDay - i, otherMonth: true });
//   }
//   for (let d = 1; d <= daysInMonth; d++) {
//     cells.push({ day: d, otherMonth: false });
//   }
//   const totalCells = Math.ceil(cells.length / 7) * 7;
//   let nextDay = 1;
//   while (cells.length < totalCells) {
//     cells.push({ day: nextDay, otherMonth: true });
//     nextDay++;
//   }
//
//   const weeks = [];
//   for (let i = 0; i < cells.length; i += 7) {
//     weeks.push(cells.slice(i, i + 7));
//   }
//   return weeks;
// }

// Начните писать код здесь.
/* ================= ДАННЫЕ ================= */

const MONTHS_NOMINATIVE = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const MONTHS_GENITIVE = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];

const DAYS_OF_WEEK = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
    'Четверг', 'Пятница', 'Суббота',
];

const BASE_TIME_SLOTS = [
    '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00',
];

/* ================= СОСТОЯНИЕ ================= */

const now = new Date();
const TODAY = new Date(now.getFullYear(), now.getMonth(), now.getDate());

const state = {
    today: TODAY,
    currentMonth: TODAY.getMonth(),
    currentYear: TODAY.getFullYear(),
    selectedDay: TODAY.getDate(),
    selectedMonth: TODAY.getMonth(),
    selectedYear: TODAY.getFullYear(),
    selectedTime: null,
    slots: [],
};

/* ================= ЧИСТЫЕ ФУНКЦИИ ================= */

/**
 * Сравнивает две даты без учёта времени.
 * @param {Date} date1
 * @param {Date} date2
 * @returns {-1|0|1}
 */
function compareDates(date1, date2) {
    const t1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getTime();
    const t2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()).getTime();

    if (t1 < t2) return -1;
    if (t1 > t2) return 1;
    return 0;
}

/**
 * Проверяет, доступна ли дата для выбора (не раньше today).
 * @param {number} day
 * @param {number} month - 0-индексный месяц (0..11)
 * @param {number} year
 * @param {Date} today
 * @returns {boolean}
 */
function isDateSelectable(day, month, year, today) {
    const candidate = new Date(year, month, day);
    return compareDates(candidate, today) >= 0;
}

/**
 * Строит сетку календаря для заданного года и месяца (недели Пн–Вс).
 * @param {number} year
 * @param {number} month - 0-индексный месяц (0..11)
 * @returns {Array<Array<{day: number, month: number, year: number, isCurrentMonth: boolean}>>}
 */
function buildCalendarGrid(year, month) {
    const firstDayWeek = new Date(year, month, 1).getDay();
    const startOffset = (firstDayWeek + 6) % 7; // Сдвиг так, чтобы неделя начиналась с Пн
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
 * Формирует список временных слотов для выбранной даты.
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @returns {Array<{time: string, isBusy: boolean}>}
 */
function getSlotsForDate(day, month, year) {
    const seed = day + month * 3 + year;

    return BASE_TIME_SLOTS.map((time, index) => {
        const isBusy = (seed + index) % 4 === 1;
        return { time, isBusy };
    });
}

/* ================= РЕНДЕР ================= */

/**
 * Отрисовывает заголовок месяца и сетку дней календаря, навешивает обработчики клика.
 */
function renderCalendar() {
    const headingEl = document.querySelector('#calendar-heading');
    const daysContainer = document.querySelector('.calendar__days');

    headingEl.textContent = `${MONTHS_NOMINATIVE[state.currentMonth]} ${state.currentYear}`;

    const weeks = buildCalendarGrid(state.currentYear, state.currentMonth);
    let html = '';

    weeks.forEach((week) => {
        week.forEach((cell) => {
            const selectable = cell.isCurrentMonth &&
                isDateSelectable(cell.day, cell.month, cell.year, state.today);

            const isSelected =
                cell.isCurrentMonth &&
                cell.day === state.selectedDay &&
                cell.month === state.selectedMonth &&
                cell.year === state.selectedYear;

            const classes = ['day-btn'];
            if (!selectable) classes.push('day-btn--disabled');
            if (isSelected) classes.push('day-btn--selected');

            const monthName = MONTHS_GENITIVE[cell.month];
            const ariaLabel = selectable
                ? `${cell.day} ${monthName} ${cell.year}`
                : `${cell.day} ${monthName} ${cell.year}, недоступно`;

            html += `
        <button
          type="button"
          class="${classes.join(' ')}"
          data-day="${cell.day}"
          data-month="${cell.month}"
          data-year="${cell.year}"
          aria-label="${ariaLabel}"
          aria-pressed="${isSelected}"
          ${!selectable ? 'disabled' : ''}
        >
          ${cell.day}
        </button>
      `;
        });
    });

    daysContainer.innerHTML = html;

    const dayButtons = daysContainer.querySelectorAll('.day-btn:not(:disabled)');
    dayButtons.forEach((btn) => {
        btn.addEventListener('click', onDayClick);
    });
}

/**
 * Отрисовывает слоты времени для выбранного дня и навешивает обработчики клика.
 */
function renderTimeSlots() {
    const slotsContainer = document.querySelector('.time-slots');
    let html = '';

    state.slots.forEach((slot) => {
        const isSelected = !slot.isBusy && slot.time === state.selectedTime;
        const classes = ['slot-btn'];
        if (slot.isBusy) classes.push('slot-btn--busy');
        if (isSelected) classes.push('slot-btn--selected');

        const ariaLabel = slot.isBusy ? `${slot.time}, занято` : slot.time;

        html += `
      <button
        type="button"
        class="${classes.join(' ')}"
        data-time="${slot.time}"
        aria-label="${ariaLabel}"
        aria-pressed="${isSelected}"
        ${slot.isBusy ? 'disabled' : ''}
      >
        ${slot.time}
      </button>
    `;
    });

    slotsContainer.innerHTML = html;

    const slotButtons = slotsContainer.querySelectorAll('.slot-btn:not(:disabled)');
    slotButtons.forEach((btn) => {
        btn.addEventListener('click', onTimeSlotClick);
    });
}

/**
 * Обновляет текст нижней панели и состояние кнопки «Ввести данные».
 */
function updateBottomBar() {
    const hintEl = document.querySelector('.booking-actions__hint');
    const submitBtn = document.querySelector('.btn--submit');

    const dateObj = new Date(state.selectedYear, state.selectedMonth, state.selectedDay);
    const weekDay = DAYS_OF_WEEK[dateObj.getDay()];
    const monthGenitive = MONTHS_GENITIVE[state.selectedMonth];
    const dateString = `${weekDay}, ${state.selectedDay} ${monthGenitive} ${state.selectedYear}`;

    if (state.selectedTime) {
        hintEl.textContent = `${dateString} • ${state.selectedTime}`;
        submitBtn.disabled = false;
    } else {
        hintEl.textContent = `${dateString} • выберите время визита`;
        submitBtn.disabled = true;
    }
}

/* ================= ОБРАБОТЧИКИ СОБЫТИЙ ================= */

/**
 * Обработчик клика по доступному дню календаря.
 * @param {MouseEvent} event
 */
function onDayClick(event) {
    const button = event.currentTarget;
    const day = parseInt(button.dataset.day, 10);
    const month = parseInt(button.dataset.month, 10);
    const year = parseInt(button.dataset.year, 10);

    state.selectedDay = day;
    state.selectedMonth = month;
    state.selectedYear = year;
    state.selectedTime = null;
    state.slots = getSlotsForDate(day, month, year);

    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
}

/**
 * Обработчик клика по свободному слоту времени.
 * @param {MouseEvent} event
 */
function onTimeSlotClick(event) {
    const button = event.currentTarget;
    state.selectedTime = button.dataset.time;

    renderTimeSlots();
    updateBottomBar();
}

/**
 * Настраивает кнопки переключения месяцев (‹ и ›).
 */
function setupMonthNavigation() {
    const prevBtn = document.querySelector('.js-prev-month');
    const nextBtn = document.querySelector('.js-next-month');

    prevBtn.addEventListener('click', () => {
        state.currentMonth -= 1;
        if (state.currentMonth < 0) {
            state.currentMonth = 11;
            state.currentYear -= 1;
        }
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        state.currentMonth += 1;
        if (state.currentMonth > 11) {
            state.currentMonth = 0;
            state.currentYear += 1;
        }
        renderCalendar();
    });
}

/**
 * Настраивает кнопку подтверждения выбора («Ввести данные»).
 */
function setupSubmitButton() {
    const submitBtn = document.querySelector('.btn--submit');

    submitBtn.addEventListener('click', () => {
        if (!state.selectedTime) return;

        const dateObj = new Date(state.selectedYear, state.selectedMonth, state.selectedDay);
        const weekDay = DAYS_OF_WEEK[dateObj.getDay()];
        const monthGenitive = MONTHS_GENITIVE[state.selectedMonth];

        alert(`Вы выбрали запись: ${weekDay}, ${state.selectedDay} ${monthGenitive} ${state.selectedYear} в ${state.selectedTime}`);
    });
}

/* ================= ИНИЦИАЛИЗАЦИЯ ================= */

/**
 * Инициализирует страницу выбора даты и времени.
 */
function init() {
    state.slots = getSlotsForDate(state.selectedDay, state.selectedMonth, state.selectedYear);

    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
    setupMonthNavigation();
    setupSubmitButton();
}

document.addEventListener('DOMContentLoaded', init);