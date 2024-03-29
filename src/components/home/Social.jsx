import React from 'react'

const Social = () => {
  return (
    <div className="home__social">
        <a 
            href="https://twitter.com/Jonathan2525252" 
            className="home__social-icon"
            rel="noreferrer" 
            target='_blank'
        >
            <i className="fa-brands fa-x-twitter"></i>
        </a>

        <a 
            href="https://linkedin.com/in/jonapuglla2000" 
            className="home__social-icon"
            rel="noreferrer" 
            target='_blank'
        >
            <i className="uil uil-linkedin"></i>
        </a>

        <a 
            href="https://github.com/jonap22" 
            className="home__social-icon"
            rel="noreferrer" 
            target='_blank'
        >
            <i className="uil uil-github-alt"></i>
        </a>
    </div>
  )
}

export default Social