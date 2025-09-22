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
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <span className="logo-part-1">Tamil Pasanga </span>
              <span className="logo-part-2">Logistics</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <a href="#gallery" className="nav-link">Gallery</a>
            </li>
            <li className="nav-item">
              <Link to="/rules" className="nav-link active">Rules</Link>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">Contact</a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="mobile-nav-menu">
              <li className="mobile-nav-item">
                <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/about" className="mobile-nav-link" onClick={toggleMobileMenu}>About</Link>
              </li>
              <li className="mobile-nav-item">
                <a href="#gallery" className="mobile-nav-link" onClick={toggleMobileMenu}>Gallery</a>
              </li>
              <li className="mobile-nav-item">
                <Link to="/rules" className="mobile-nav-link active" onClick={toggleMobileMenu}>Rules</Link>
              </li>
              <li className="mobile-nav-item">
                <a href="#contact" className="mobile-nav-link" onClick={toggleMobileMenu}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Header - Matching the design */}
      <section className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb">
            <Link to="/">HOME</Link>
            <span className="separator"> / </span>
            <span className="current">RULES</span>
          </div>
          <h1 className="page-title">
            <span className="title-accent"></span>
            RULES
          </h1>
        </div>
      </section>

      {/* Rules Content Section */}
      <section className="rules-content-section">
        <div className="container">
          <div className="section-label">COMPANY GUIDELINES</div>
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
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Tamil Pasanga Logistics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Rules