import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    pickupTime: ''
  })

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-part-1">TP</span>
            <span className="logo-part-2">VTC</span>
          </div>
          
          {/* Desktop Menu */}
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#home" className="nav-link active">Home</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">About</a>
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
                <a href="#home" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</a>
              </li>
              <li className="mobile-nav-item">
                <a href="#about" className="mobile-nav-link" onClick={toggleMobileMenu}>About</a>
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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">
              Now<br />
              It's easy for you<br />
              <span className="hero-highlight">learn to drive</span>
            </h1>
            <p className="hero-description">
              A premier training center that flows with modern teaching methods and supplies 
              you with the necessary skills. It is a comprehensive training facility, 
              in which expert instructors guide you.
            </p>
            <div className="hero-video">
              <button className="play-button">
                <span className="play-icon">▶</span>
              </button>
              <span className="video-text">Easy steps for learning to drive</span>
            </div>
          </div>

          <div className="hero-right">
            <div className="booking-card">
              <h3 className="booking-title">Start your journey</h3>
              
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="pickupLocation">PICK-UP LOCATION</label>
                  <input
                    type="text"
                    id="pickupLocation"
                    name="pickupLocation"
                    placeholder="City, Center, Branch, etc."
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dropoffLocation">TRAINING LOCATION</label>
                  <input
                    type="text"
                    id="dropoffLocation"
                    name="dropoffLocation"
                    placeholder="City, Center, Branch, etc."
                    value={formData.dropoffLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="pickupDate">START DATE</label>
                    <input
                      type="date"
                      id="pickupDate"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dropoffDate">END DATE</label>
                    <input
                      type="date"
                      id="dropoffDate"
                      name="dropoffDate"
                      value={formData.dropoffDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="pickupTime">PREFERRED TIME</label>
                  <input
                    type="time"
                    id="pickupTime"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="search-button">
                  Book Training
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Training Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-image">
                {/* Image will be added when you upload assets */}
                <div className="service-placeholder">🚗</div>
              </div>
              <h3>Car Driving Lessons</h3>
              <p>Learn the fundamentals of safe car driving with our expert instructors.</p>
            </div>
            <div className="service-card">
              <div className="service-image">
                <div className="service-placeholder">🏍️</div>
              </div>
              <h3>Motorcycle Training</h3>
              <p>Master two-wheel transportation with comprehensive motorcycle training.</p>
            </div>
            <div className="service-card">
              <div className="service-image">
                <div className="service-placeholder">🚛</div>
              </div>
              <h3>Commercial Vehicle Training</h3>
              <p>Professional training for commercial drivers and heavy vehicle operation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 TPVTC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
