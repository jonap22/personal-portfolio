import React from 'react';


const Footer = () => {
  return (
    <div className="footer">
        <div className="footer__container container">
            <h1 className="footer__title">Puglla</h1>

            <ul className="footer__list">
                <li>
                    <a href="#about" className="footer__link">About</a>
                </li>
                <li>
                    <a href="#portfolio" className="footer__link">Projects</a>
                </li>
                <li>
                    <a href="#contact" className="footer__link">Contacts</a>
                </li>
            </ul>

            <div className="footer__social"></div>
        </div>
    </div>
  )
}

export default Footer