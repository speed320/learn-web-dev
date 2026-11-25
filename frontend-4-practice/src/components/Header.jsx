import StepIndicator from './StepIndicator';

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__top">
                    <a href="#" className="logo">SERGIO</a>
                    <nav className="nav" aria-label="Основная навигация">
                        <ul className="nav__list">
                            <li className="nav__item"><a href="#services" className="nav__link">Услуга</a></li>
                            <li className="nav__item"><a href="#gallery" className="nav__link">Галерея</a></li>
                            <li className="nav__item"><a href="#team" className="nav__link">Команда</a></li>
                            <li className="nav__item"><a href="#reviews" className="nav__link">Отзывы</a></li>
                            <li className="nav__item"><a href="#contacts" className="nav__link">Контакты</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="header__divider" />

            <StepIndicator currentStep={3} />

            <div className="header__divider" />
        </header>
    );
}

export default Header;