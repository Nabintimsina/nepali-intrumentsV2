import { Link, useLocation } from 'react-router-dom'
import { Music, Menu, X } from 'lucide-react'
import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <Music className="logo-icon" />
          <span className="logo-text">Nepali Instruments</span>
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className={isActive('/')} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/instruments" className={isActive('/instruments')} onClick={closeMenu}>
              Instruments
            </Link>
          </li>
          <li>
            <Link to="/learn" className={isActive('/learn')} onClick={closeMenu}>
              Learn
            </Link>
          </li>
          <li>
            <Link to="/experts" className={isActive('/experts')} onClick={closeMenu}>
              Experts
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about')} onClick={closeMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/login" className="btn-login" onClick={closeMenu}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
