function TimeSlots({ slots = [], loading, error, selectedTime, onTimeClick }) {
    return (
        <section className="card card--time" aria-labelledby="time-heading">
            <h2 id="time-heading" className="card__title card__title--time">
                Доступное время
            </h2>

            {loading && (
                <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-muted)' }}>
                    Загрузка слотов…
                </div>
            )}

            {!loading && error && (
                <div style={{ textAlign: 'center', padding: '36px 0', color: '#c53030' }}>
                    {error}
                </div>
            )}

            {!loading && !error && slots.length === 0 && (
                <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-muted)' }}>
                    Нет доступных слотов на этот день
                </div>
            )}

            {!loading && !error && slots.length > 0 && (
                <div className="time-slots" role="group" aria-label="Слоты времени">
                    {slots.map((slot) => {
                        const isAvailable = slot.available !== false;
                        const isSelected = isAvailable && slot.time === selectedTime;

                        const classes = ['slot-btn'];
                        if (!isAvailable) classes.push('slot-btn--busy');
                        if (isSelected) classes.push('slot-btn--selected');

                        return (
                            <button
                                key={slot.time}
                                type="button"
                                className={classes.join(' ')}
                                aria-label={!isAvailable ? `${slot.time}, занято` : slot.time}
                                aria-pressed={isSelected}
                                disabled={!isAvailable}
                                onClick={() => onTimeClick(slot.time)}
                            >
                                {slot.time}
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default TimeSlots;