const STEPS = [1, 2, 3, 4, 5];

function StepIndicator({ currentStep = 3 }) {
    return (
        <div className="container">
            <nav className="steps" aria-label="Этапы записи">
                <ol className="steps__list">
                    {STEPS.map((step) => {
                        const isDone = step <= currentStep;
                        const isCurrent = step === currentStep;

                        const classes = ['steps__item'];
                        if (isDone) classes.push('steps__item--done');
                        if (isCurrent) classes.push('steps__item--current');

                        return (
                            <li
                                key={step}
                                className={classes.join(' ')}
                                aria-current={isCurrent ? 'step' : undefined}
                            >
                                <span className="steps__circle">{step}</span>
                                <span className="steps__bar" aria-hidden="true" />
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
}

export default StepIndicator;