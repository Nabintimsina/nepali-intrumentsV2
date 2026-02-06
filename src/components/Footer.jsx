import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <h3>About Platform</h3>
          <p>
            Dedicated to preserving and promoting the rich heritage of traditional 
            Nepali musical instruments through digital innovation and education.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/instruments">Instruments</Link></li>
            <li><Link to="/learn">Learn</Link></li>
            <li><Link to="/experts">Experts</Link></li>
            <li><Link to="/about">About Project</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li><a href="#documentation">Documentation</a></li>
            <li><a href="#research">Research Papers</a></li>
            <li><a href="#gallery">Photo Gallery</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Use</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="footer-contact">
            <li>
              <Mail size={18} />
              <span>info@nepaliinstruments.edu.np</span>
            </li>
            <li>
              <Phone size={18} />
              <span>+977-1-4123456</span>
            </li>
            <li>
              <MapPin size={18} />
              <span>Kathmandu, Nepal</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-credits">
            <p>&copy; {currentYear} Traditional Musical Instruments of Nepal. All rights reserved.</p>
            <p className="supported-by">
              Supported by: Ministry of Culture, Tourism & Civil Aviation | 
              Nepal Music Academy | UNESCO Nepal
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
