import React, { useEffect, useState } from 'react';
import "./header.css";

export const Header = () => {
    /* Toggle menu */
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeNav, setActiveNav] = useState("#home");

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector("#header");
            if (!header) {
                return;
            }

            if (window.scrollY >= 80) {
                header.classList.add("scroll-header");
                return;
            }

            header.classList.remove("scroll-header");
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleNavClick = (sectionId) => {
        setActiveNav(sectionId);
        setIsMenuOpen(false);
    };

    return (
        <header id="header" className={`!backdrop-blur-xl !bg-white/30 header`}>
            <nav className="nav container">
                <a href="index.html" className="nav__logo">
                    Puglla
                </a>

                <div className={isMenuOpen ? "nav__menu show-menu" : "nav__menu"}>
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <a href="#home" onClick={() => handleNavClick('#home')} className={activeNav === "#home" ? "nav__link active-link" : "nav__link"}>
                                <i className="uil uil-estate nav__icon"></i> Home
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="#about" onClick={() => handleNavClick('#about')} className={activeNav === "#about" ? "nav__link active-link" : "nav__link"}>
                                <i className="uil uil-user nav__icon"></i> About
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="#skills" onClick={() => handleNavClick('#skills')} className={activeNav === "#skills" ? "nav__link active-link" : "nav__link"}>
                                <i className="uil uil-file-alt nav__icon"></i> Skills
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="#qualification" onClick={() => handleNavClick('#qualification')} className={activeNav === "#qualification" ? "nav__link active-link" : "nav__link"}>
                                <i className="uil uil-briefcase-alt nav__icon"></i> Qualification
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="#portfolio" onClick={() => handleNavClick('#portfolio')} className={activeNav === "#portfolio" ? "nav__link active-link" : "nav__link"}>
                                <i className="uil uil-scenery nav__icon"></i> Portfolio
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="#contact" onClick={() => handleNavClick('#contact')} className={activeNav === "#contact" ? "nav__link active-link" : "nav__link"}>
                                <i className="uil uil-message nav__icon"></i> Contact
                            </a>
                        </li>
                    </ul>

                    <i className="uil uil-times nav__close" onClick={() => setIsMenuOpen((currentState) => !currentState)}></i>
                </div>

                <div className="nav__toggle" onClick={() => setIsMenuOpen((currentState) => !currentState)}>
                    <i className="uil uil-apps"></i>
                </div>
            </nav>
        </header>
    )
}

export default Header