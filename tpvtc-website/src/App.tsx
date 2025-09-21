import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Hero parallax effect
      if (heroRef.current) {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        heroRef.current.style.transform = `translateY(${rate}px)`
      }

      // Third image parallax effect
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset
        const element = parallaxRef.current
        const elementTop = element.offsetTop
        const elementHeight = element.offsetHeight
        const windowHeight = window.innerHeight
        
        // Check if element is in viewport
        if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
          const yPos = -(scrolled - elementTop) * 0.3
          const parallaxElement = element.querySelector('.full-width-image-section::before') as HTMLElement
          if (parallaxElement) {
            parallaxElement.style.transform = `translateY(${yPos}px)`
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-part-1">Tamil Pasanga </span>
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
      <section ref={heroRef} className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-center">
            <h1 className="hero-title">
              <span className="hero-highlight">Welcome to TAMIL PASANGA VTC</span>
            </h1>
            <p className="hero-description">
              Tamil Pasanga VTC is a friendly and active Virtual Trucking Company built by Tamil gamers and truck enthusiasts who love driving together on TruckersMP. Our goal is to create a fun, realistic, and respectful community where players can enjoy convoys, explore Europe's roads, and represent Tamil unity on the trucking platform.
            </p>
            <div className="hero-video">
              <button 
                className="play-button"
                onClick={() => window.open('https://truckersmp.com/vtc/73933/recruitment-form/3515-driver-recruitment-form', '_blank')}
              >
                <span className="play-icon">▶</span>
              </button>
              <span className="video-text">just press the button to apply as Driver</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Our VTC Section */}
      <section ref={parallaxRef} className="full-width-image-section">
        <div className="full-width-image-overlay"></div>
        <div className="full-width-image-content">
          <div className="container">
            <div className="why-join-section">
              <h2>Why Join Tamil Pasanga VTC?</h2>
              <p>
                Experience the ultimate virtual trucking adventure with a community that values 
                friendship, professionalism, and the thrill of the open road. Join hundreds of 
                drivers from around the world in our growing family.
              </p>
              
              <div className="benefits-grid">
                <div className="benefit-item">
                  <span className="benefit-icon">🚛</span>
                  <h3>Organized Convoys</h3>
                  <p>Join weekly convoys with professional drivers across Europe's most scenic routes.</p>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">🎯</span>
                  <h3>Special Events</h3>
                  <p>Participate in exclusive events, competitions, and seasonal celebrations.</p>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">👥</span>
                  <h3>Active Community</h3>
                  <p>Connect with friendly drivers, share experiences, and build lasting friendships.</p>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">🏆</span>
                  <h3>Career Growth</h3>
                  <p>Advance through our ranking system and earn recognition for your achievements.</p>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">🎨</span>
                  <h3>Custom Paint Jobs</h3>
                  <p>Stand out with exclusive VTC paint schemes and personalized truck designs.</p>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">📱</span>
                  <h3>24/7 Support</h3>
                  <p>Get help anytime through our Discord community and dedicated support team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Second Image Section */}
      <section className="second-image-section">
        <div className="second-image-overlay"></div>
        <div className="second-image-content">
          <div className="container">
            <div className="second-image-text">
              <h2>The Road is Better Together.</h2>
              <h3>Find Your Crew.</h3>
              <p>More than just a VTC, we're a community. Join us for regular events, custom paint jobs, and a friendly network of drivers who make every haul an adventure.</p>
              <button 
                className="cta-button"
                onClick={() => window.open('https://truckersmp.com/vtc/73933', '_blank')}
              >
                Learn More
              </button>
            </div>
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

export default App
