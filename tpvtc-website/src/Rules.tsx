import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Rules.css'

function Rules() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="Rules">
      {/* Navigation */}
      <nav className={`rules-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="rules-nav-container">
          <div className="rules-nav-logo">
            <Link to="/">
              <span className="rules-logo-part-1">Tamil Pasanga </span>
              <span className="rules-logo-part-2">Logistics</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <ul className="rules-nav-menu">
            <li className="rules-nav-item">
              <Link to="/" className="rules-nav-link">Home</Link>
            </li>
            <li className="rules-nav-item">
              <Link to="/about" className="rules-nav-link">About</Link>
            </li>
            <li className="rules-nav-item">
              <a href="#gallery" className="rules-nav-link">Gallery</a>
            </li>
            <li className="rules-nav-item">
              <Link to="/rules" className="rules-nav-link active">Rules</Link>
            </li>
            <li className="rules-nav-item">
              <a href="#contact" className="rules-nav-link">Contact</a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="rules-mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`rules-hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Mobile Menu */}
          <div className={`rules-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="rules-mobile-nav-menu">
              <li className="rules-mobile-nav-item">
                <Link to="/" className="rules-mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li className="rules-mobile-nav-item">
                <Link to="/about" className="rules-mobile-nav-link" onClick={toggleMobileMenu}>About</Link>
              </li>
              <li className="rules-mobile-nav-item">
                <a href="#gallery" className="rules-mobile-nav-link" onClick={toggleMobileMenu}>Gallery</a>
              </li>
              <li className="rules-mobile-nav-item">
                <Link to="/rules" className="rules-mobile-nav-link active" onClick={toggleMobileMenu}>Rules</Link>
              </li>
              <li className="rules-mobile-nav-item">
                <a href="#contact" className="rules-mobile-nav-link" onClick={toggleMobileMenu}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Rules Page Header */}
      <section className="rules-page-header">
        <div className="rules-page-header-content">
          <div className="rules-breadcrumb">
            <Link to="/">HOME</Link>
            <span className="rules-separator"> / </span>
            <span className="rules-current">RULES</span>
          </div>
          <h1 className="rules-page-title">
            <span className="rules-title-accent"></span>
            RULES
          </h1>
        </div>
      </section>

      {/* Rules Content Section */}
      <section className="rules-content-section">
        <div className="rules-container">
          <div className="rules-section-label">COMPANY GUIDELINES</div>
          <h2>Tamil Pasanga Logistics Rules & Regulations</h2>
          
          <div className="rules-grid">
            <div className="rule-category">
              <h3>General Conduct</h3>
              <ul>
                <li>Respect all community members at all times</li>
                <li>Use appropriate language in all communications</li>
                <li>Follow TruckersMP rules and regulations</li>
                <li>Maintain professional behavior during convoys</li>
              </ul>
            </div>
            
            <div className="rule-category">
              <h3>Driving Standards</h3>
              <ul>
                <li>Drive safely and responsibly</li>
                <li>Maintain appropriate speed limits</li>
                <li>Keep proper following distance</li>
                <li>Use indicators and proper lane discipline</li>
              </ul>
            </div>
            
            <div className="rule-category">
              <h3>Convoy Rules</h3>
              <ul>
                <li>Arrive on time for scheduled events</li>
                <li>Follow convoy leader instructions</li>
                <li>Maintain formation and spacing</li>
                <li>Use designated communication channels</li>
              </ul>
            </div>
            
            <div className="rule-category">
              <h3>Community Guidelines</h3>
              <ul>
                <li>Be active and participate in events</li>
                <li>Help new members learn the ropes</li>
                <li>Report any violations to management</li>
                <li>Represent Tamil Pasanga Logistics with pride</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="rules-footer">
        <div className="rules-container">
          <p>&copy; 2025 Tamil Pasanga Logistics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Rules