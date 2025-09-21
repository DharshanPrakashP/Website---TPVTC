import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './About.css'

function About() {
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
    <div className="About">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <span className="logo-text">AUTOROAD</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link active">About</Link>
            </li>
            <li className="nav-item">
              <a href="#pricing" className="nav-link">Pricing</a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link">Our Services</a>
            </li>
            <li className="nav-item">
              <a href="#blog" className="nav-link">Blog</a>
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
                <Link to="/about" className="mobile-nav-link active" onClick={toggleMobileMenu}>About</Link>
              </li>
              <li className="mobile-nav-item">
                <a href="#pricing" className="mobile-nav-link" onClick={toggleMobileMenu}>Pricing</a>
              </li>
              <li className="mobile-nav-item">
                <a href="#services" className="mobile-nav-link" onClick={toggleMobileMenu}>Our Services</a>
              </li>
              <li className="mobile-nav-item">
                <a href="#blog" className="mobile-nav-link" onClick={toggleMobileMenu}>Blog</a>
              </li>
              <li className="mobile-nav-item">
                <a href="#contact" className="mobile-nav-link" onClick={toggleMobileMenu}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb">
            <Link to="/">HOME</Link>
            <span className="separator"> / </span>
            <span className="current">About Us</span>
          </div>
          <h1 className="page-title">
            <span className="title-accent"></span>
            About Us
          </h1>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <div className="section-label">ABOUT US</div>
              <h2>Choose A Perfect Car</h2>
              <p>
                A small river named Duden flows by their place and supplies it 
                with the necessary regelialia. It is a paradisematic country, in 
                which roasted parts of sentences fly into your mouth.
              </p>
              <p>
                On her way she met a copy. The copy warned the Little Blind 
                Text, that where it came from it would have been rewritten a 
                thousand times and everything that was left from its origin 
                would be the word "and" and the Little Blind Text should turn 
                around and return to its own, safe country. But nothing the 
                copy said could convince her and so it didn't take long until a 
                few insidious Copy Writers ambushed her, made her drunk with 
                Longe and Parole and dragged her into their agency, where 
                they abused her for their.
              </p>
              <button className="search-button">Search Vehicle</button>
            </div>
            <div className="about-image">
              <img src="/api/placeholder/600/400" alt="Group with car" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">OUR SERVICES</div>
            <h2>Our Services</h2>
          </div>
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">🚗</div>
              <h3>24/7 Car Support</h3>
              <p>A small river named Duden flows by their place and supplies it with you</p>
            </div>
            <div className="service-item">
              <div className="service-icon">📍</div>
              <h3>Lots of location</h3>
              <p>A small river named Duden flows by their place and supplies it with you</p>
            </div>
            <div className="service-item">
              <div className="service-icon">📋</div>
              <h3>Reservation</h3>
              <p>A small river named Duden flows by their place and supplies it with you</p>
            </div>
            <div className="service-item">
              <div className="service-icon">🚙</div>
              <h3>Rental Cars</h3>
              <p>A small river named Duden flows by their place and supplies it with you</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="workflow-section">
        <div className="workflow-overlay"></div>
        <div className="container">
          <div className="section-header">
            <div className="section-label">WORK FLOW</div>
            <h2>How it works</h2>
          </div>
          <div className="workflow-grid">
            <div className="workflow-item">
              <div className="workflow-icon">
                <span className="icon-circle">💵</span>
              </div>
              <h3>Pick Destination</h3>
              <p>A small river named Duden flows by their place and supplies it with you</p>
            </div>
            <div className="workflow-item">
              <div className="workflow-icon">
                <span className="icon-circle">👆</span>
              </div>
              <h3>Select Term</h3>
              <p>A small river named Duden flows by their place and supplies it with you</p>
            </div>
            <div className="workflow-item">
              <div className="workflow-icon">
                <span className="icon-circle">🚗</span>
              </div>
              <h3>Choose A Car</h3>
              <p>A small river named Duden flows by their place and supplies it with you</p>
            </div>
            <div className="workflow-item">
              <div className="workflow-icon">
                <span className="icon-circle">🎯</span>
              </div>
              <h3>Enjoy The Ride</h3>
              <p>A small river named Duden flows by their place and supplies it with you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">TESTIMONIAL</div>
            <h2>Happy Clients</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-item">
              <div className="testimonial-avatar">
                <img src="/api/placeholder/80/80" alt="Roger Scott" />
              </div>
              <p className="testimonial-text">
                Far far away, behind the word mountains, far from the countries 
                Vokalia and Consonantia, there live the blind texts.
              </p>
              <div className="testimonial-author">
                <h4>Roger Scott</h4>
                <span>System Analyst</span>
              </div>
            </div>
            <div className="testimonial-item">
              <div className="testimonial-avatar">
                <img src="/api/placeholder/80/80" alt="Roger Scott" />
              </div>
              <p className="testimonial-text">
                Far far away, behind the word mountains, far from the countries 
                Vokalia and Consonantia, there live the blind texts.
              </p>
              <div className="testimonial-author">
                <h4>Roger Scott</h4>
                <span>Marketing Manager</span>
              </div>
            </div>
            <div className="testimonial-item">
              <div className="testimonial-avatar">
                <img src="/api/placeholder/80/80" alt="Roger Scott" />
              </div>
              <p className="testimonial-text">
                Far far away, behind the word mountains, far from the countries 
                Vokalia and Consonantia, there live the blind texts.
              </p>
              <div className="testimonial-author">
                <h4>Roger Scott</h4>
                <span>Interface Designer</span>
              </div>
            </div>
          </div>
          <div className="testimonial-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Tamil Pasanga VTC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default About