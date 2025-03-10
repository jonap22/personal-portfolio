import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <p id="footnote-1" className="footer__footnote">
          1. <a href="https://www.vecteezy.com/free-png/3d-character">3D Character PNGs by Vecteez.</a>
        </p>
        
        <hr className="footer__divider" />

        <h1 className="footer__title">Puglla</h1>

        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>
          <li>
            <a href="#portfolio" className="footer__link">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="footer__link">
              Contacts
            </a>
          </li>
        </ul>

        <div className="footer__social">
          <a
            href="https://x.com/jona_puglla"
            className="footer__social-link"
            rel="noreferrer"
            target="_blank"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>

          <a
            href="https://linkedin.com/in/jonapuglla2000"
            className="footer__social-link"
            rel="noreferrer"
            target="_blank"
          >
            <i className="bx bxl-linkedin"></i>
          </a>

          <a
            href="https://github.com/jonap22"
            className="footer__social-link"
            rel="noreferrer"
            target="_blank"
          >
            <i className="bx bxl-github"></i>
          </a>
        </div>

        <span className="footer__copy">&#169; 2025. Made with love.</span>
      </div>
    </footer>
  );
};

export default Footer;
