import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-brand-icon">M</span>
          MovieSphere
        </div>

        <ul className="footer-links">
          <li>
            <Link to="/" className="footer-link">Home</Link>
          </li>
          <li>
            <Link to="/search" className="footer-link">Search</Link>
          </li>
          <li>
            <Link to="/watchlist" className="footer-link">Watchlist</Link>
          </li>
          <li>
            <Link to="/favorites" className="footer-link">Favorites</Link>
          </li>
        </ul>

        <p className="footer-copy">
          &copy; {currentYear} MovieSphere. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
