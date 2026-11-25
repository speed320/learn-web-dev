function Footer() {
    return (
        <footer id="contacts" className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <div className="footer__logo">SERGIO</div>
                        <p className="footer__desc">
                            Мужской барбершоп в центре Москвы: классические стрижки, оформление бороды и королевское бритьё.
                        </p>
                    </div>

                    <div className="footer__col">
                        <h3 className="footer__heading">Контакты</h3>
                        <address className="footer__address">
                            <div className="footer__contact-item">
                                <svg className="footer__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path
                                        d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                                </svg>
                                <span>ул. Садовая, 15, Москва</span>
                            </div>
                            <div className="footer__contact-item">
                                <svg className="footer__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path
                                        d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <a href="tel:+74951234567" className="footer__phone">+7 (495) 123-45-67</a>
                            </div>
                        </address>
                    </div>

                    <div className="footer__col">
                        <h3 className="footer__heading">Режим работы</h3>
                        <ul className="footer__schedule">
                            <li>Пн–Пт: 9:00 – 21:00</li>
                            <li>Сб–Вс: 10:00 – 19:00</li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">© 2026. Все права защищены.</p>
                    <a href="#privacy" className="footer__policy">Политика конфиденциальности</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;