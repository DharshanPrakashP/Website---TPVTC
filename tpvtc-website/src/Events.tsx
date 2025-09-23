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
  const navbarRef = useRef<HTMLDivElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const eventsGridRef = useRef<HTMLDivElement>(null)

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
    if (navbarRef.current && breadcrumbRef.current && titleRef.current) {
      const tl = gsap.timeline()
      
      // Main hero timeline
      tl.fromTo(navbarRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(breadcrumbRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
    }

    // Animate events grid on scroll
    if (eventsGridRef.current) {
      const eventCards = eventsGridRef.current.querySelectorAll('.event-item')
      
      gsap.fromTo(eventCards,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: eventsGridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
      
      // Add hover animations for event cards
      eventCards.forEach((card: any) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" })
        })
      })
    }

    // Animate section labels and headings
    if (sectionsRef.current) {
      const sectionLabel = sectionsRef.current.querySelector('.events-section-label')
      const sectionHeading = sectionsRef.current.querySelector('h2')
      
      if (sectionLabel && sectionHeading) {
        gsap.fromTo([sectionLabel, sectionHeading],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
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
      <nav ref={navbarRef} className={`events-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="events-nav-container">
          <div className="events-nav-logo">
            <Link to="/">
              <span className="events-logo-part-1">Tamil Pasanga</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <ul className="events-nav-menu">
            <li className="events-nav-item">
              <Link to="/" className="events-nav-link">Home</Link>
            </li>
            <li className="events-nav-item">
              <Link to="/about" className="events-nav-link">About</Link>
            </li>
            <li className="events-nav-item">
              <Link to="/rules" className="events-nav-link">Rules</Link>
            </li>
            <li className="events-nav-item">
              <Link to="/events" className="events-nav-link active">Events</Link>
            </li>
            <li className="events-nav-item">
              <Link to="/team" className="events-nav-link">Our Team</Link>
            </li>
            <li className="events-nav-item">
              <a href="#gallery" className="events-nav-link">Gallery</a>
            </li>
            <li className="events-nav-item">
              <Link to="/contact" className="events-nav-link">Contact</Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="events-mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`events-hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Mobile Menu */}
          <div className={`events-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="events-mobile-nav-menu">
              <li className="events-mobile-nav-item">
                <Link to="/" className="events-mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li className="events-mobile-nav-item">
                <Link to="/about" className="events-mobile-nav-link" onClick={toggleMobileMenu}>About</Link>
              </li>
              <li className="events-mobile-nav-item">
                <Link to="/rules" className="events-mobile-nav-link" onClick={toggleMobileMenu}>Rules</Link>
              </li>
              <li className="events-mobile-nav-item">
                <Link to="/events" className="events-mobile-nav-link active" onClick={toggleMobileMenu}>Events</Link>
              </li>
              <li className="events-mobile-nav-item">
                <Link to="/team" className="events-mobile-nav-link" onClick={toggleMobileMenu}>Our Team</Link>
              </li>
              <li className="events-mobile-nav-item">
                <a href="#gallery" className="events-mobile-nav-link" onClick={toggleMobileMenu}>Gallery</a>
              </li>
              <li className="events-mobile-nav-item">
                <Link to="/contact" className="events-mobile-nav-link" onClick={toggleMobileMenu}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Events Page Header */}
      <section className="events-page-header">
        <div className="events-page-header-content">
          <div ref={breadcrumbRef} className="events-breadcrumb">
            <Link to="/">HOME</Link>
            <span className="events-separator"> / </span>
            <span className="events-current">EVENTS</span>
          </div>
          <h1 ref={titleRef} className="events-page-title">
            <span className="events-title-accent"></span>
            EVENTS
          </h1>
        </div>
      </section>

      {/* Events Content Section */}
      <section ref={sectionsRef} className="events-content-section">
        <div className="events-container">
          <div className="events-section-label">UPCOMING CONVOYS</div>
          <h2>Tamil Pasanga Events & Convoys</h2>
          
          <div ref={eventsGridRef} className="events-grid">
            <div className="event-item">
              <div className="event-date">
                <span className="event-day">25</span>
                <span className="event-month">DEC</span>
              </div>
              <div className="event-content">
                <h3>Christmas Convoy 2025</h3>
                <p className="event-description">
                  Join us for our annual Christmas convoy celebration! We'll be driving through the festive routes of Europe, spreading holiday cheer across the virtual highways.
                </p>
                <div className="event-details">
                  <span>🚛 Route: Calais → Berlin</span>
                  <span>⏰ Time: 19:00 UTC</span>
                  <span>🎯 Meeting Point: Calais</span>
                </div>
              </div>
            </div>
            
            <div className="event-item">
              <div className="event-date">
                <span className="event-day">31</span>
                <span className="event-month">DEC</span>
              </div>
              <div className="event-content">
                <h3>New Year's Eve Special</h3>
                <p className="event-description">
                  Ring in the new year with Tamil Pasanga! A special midnight convoy to celebrate 2026 with our amazing community members.
                </p>
                <div className="event-details">
                  <span>🚛 Route: Paris → Amsterdam</span>
                  <span>⏰ Time: 22:00 UTC</span>
                  <span>🎯 Meeting Point: Paris</span>
                </div>
              </div>
            </div>
            
            <div className="event-item">
              <div className="event-date">
                <span className="event-day">15</span>
                <span className="event-month">JAN</span>
              </div>
              <div className="event-content">
                <h3>Weekly Training Session</h3>
                <p className="event-description">
                  New to VTC convoys? Join our weekly training sessions where experienced drivers teach convoy rules, formations, and safety protocols.
                </p>
                <div className="event-details">
                  <span>🚛 Route: Training Circuit</span>
                  <span>⏰ Time: 18:00 UTC</span>
                  <span>🎯 Meeting Point: Duisburg</span>
                </div>
              </div>
            </div>
            
            <div className="event-item">
              <div className="event-date">
                <span className="event-day">22</span>
                <span className="event-month">JAN</span>
              </div>
              <div className="event-content">
                <h3>Tamil Culture Day</h3>
                <p className="event-description">
                  Celebrating Tamil heritage with a special themed convoy! Join us as we showcase Tamil culture and connect with our roots on the virtual roads.
                </p>
                <div className="event-details">
                  <span>🚛 Route: Mumbai → Chennai</span>
                  <span>⏰ Time: 16:00 UTC</span>
                  <span>🎯 Meeting Point: Mumbai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="events-footer">
        <div className="events-container">
          <p>&copy; 2025 Tamil Pasanga. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Events