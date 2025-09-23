import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Events.css'

gsap.registerPlugin(ScrollTrigger)

function Events() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // GSAP refs
  const navbarRef = useRef<HTMLElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const upcomingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP animations
  useEffect(() => {
    // Hero entrance animations
    const tl = gsap.timeline({ delay: 0.3 })
    
    if (navbarRef.current) {
      gsap.set(navbarRef.current, { y: -100, opacity: 0 })
      tl.to(navbarRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, 0)
    }

    if (breadcrumbRef.current) {
      gsap.set(breadcrumbRef.current, { x: -50, opacity: 0 })
      tl.to(breadcrumbRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, 0.3)
    }

    if (titleRef.current) {
      gsap.set(titleRef.current, { y: 50, opacity: 0 })
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, 0.6)
    }

    // Animate upcoming events section
    if (upcomingRef.current) {
      const eventCards = upcomingRef.current.querySelectorAll('.event-card')
      gsap.fromTo(eventCards, 
        {
          y: 60,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: upcomingRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="Events">
      {/* Navigation */}
      <nav ref={navbarRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <span className="logo-part-1">Tamil Pasanga</span>
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
              <Link to="/rules" className="nav-link">Rules</Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className="nav-link active">Events</Link>
            </li>
            <li className="nav-item">
              <Link to="/team" className="nav-link">Our Team</Link>
            </li>
            <li className="nav-item">
              <a href="#gallery" className="nav-link">Gallery</a>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
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
                <Link to="/rules" className="mobile-nav-link" onClick={toggleMobileMenu}>Rules</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/events" className="mobile-nav-link active" onClick={toggleMobileMenu}>Events</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/team" className="mobile-nav-link" onClick={toggleMobileMenu}>Our Team</Link>
              </li>
              <li className="mobile-nav-item">
                <a href="#gallery" className="mobile-nav-link" onClick={toggleMobileMenu}>Gallery</a>
              </li>
              <li className="mobile-nav-item">
                <Link to="/contact" className="mobile-nav-link" onClick={toggleMobileMenu}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <div ref={breadcrumbRef} className="breadcrumb">
            <Link to="/">HOME</Link>
            <span className="separator"> / </span>
            <span className="current">Events</span>
          </div>
          <h1 ref={titleRef} className="page-title">
            <span className="title-accent"></span>
            Events
          </h1>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section ref={upcomingRef} className="events-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">UPCOMING EVENTS</div>
            <h2>Join Our Next Adventures</h2>
          </div>
          <div className="events-grid">
            <div className="event-card">
              <div className="event-date">
                <span className="day">25</span>
                <span className="month">DEC</span>
              </div>
              <div className="event-content">
                <h3>Christmas Convoy 2025</h3>
                <p className="event-time">⏰ 8:00 PM IST</p>
                <p className="event-description">Join us for a festive Christmas convoy across Europe with special decorations and holiday spirit!</p>
                <div className="event-route">📍 Route: Berlin → Vienna → Prague</div>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <span className="day">31</span>
                <span className="month">DEC</span>
              </div>
              <div className="event-content">
                <h3>New Year's Eve Run</h3>
                <p className="event-time">⏰ 10:00 PM IST</p>
                <p className="event-description">Ring in the New Year with an epic midnight convoy through the highways of Europe!</p>
                <div className="event-route">📍 Route: Paris → Brussels → Amsterdam</div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Tamil Pasanga. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Events