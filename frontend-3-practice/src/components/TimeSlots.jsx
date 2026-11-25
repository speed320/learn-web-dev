function TimeSlots({ slots, selectedTime, onTimeClick }) {
    return (
        <section className="card card--time" aria-labelledby="time-heading">
            <h2 id="time-heading" className="card__title card__title--time">
                Доступное время
            </h2>

            <div className="time-slots" role="group" aria-label="Слоты времени">
                {slots.map((slot) => {
                    const isSelected = !slot.isBusy && slot.time === selectedTime;
                    const classes = ['slot-btn'];
                    if (slot.isBusy) classes.push('slot-btn--busy');
                    if (isSelected) classes.push('slot-btn--selected');

                    return (
                        <button
                            key={slot.time}
                            type="button"
                            className={classes.join(' ')}
                            aria-label={slot.isBusy ? `${slot.time}, занято` : slot.time}
                            aria-pressed={isSelected}
                            disabled={slot.isBusy}
                            onClick={() => onTimeClick(slot.time)}
                        >
                            {slot.time}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default TimeSlots;