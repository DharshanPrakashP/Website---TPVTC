import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Events.css'

gsap.registerPlugin(ScrollTrigger)

interface Event {
  id: number;
  name: string;
  banner: string;
  meetup_at: string;
  start_at: string;
  departure: {
    city: string;
    location: string;
  };
  arrive: {
    city: string;
    location: string;
  };
}

function Events() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/.netlify/functions/events')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setEvents(data.response || [])
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleMoreInfo = (id: number) => {
    console.log(`More info for event ID: ${id}`);
  };

  const handleViewEvent = (id: number) => {
    window.open(`https://truckersmp.com/events/${id}`, '_blank');
  };

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

          {loading && <p>Loading events...</p>}
          {error && <p>Error: {error}</p>}

          {!loading && !error && (
            <div ref={eventsGridRef} className="events-grid">
              {events.map((event) => (
                <div key={event.id} className="event-card">
                  <img src={event.banner} alt={event.name} className="event-banner" />
                  <div className="event-details">
                    <h3 className="event-name">{event.name}</h3>
                    <p className="event-game">ETS2 • To be determined</p>
                    <p className="event-time">Meet: {new Date(event.meetup_at).toLocaleString()}</p>
                    <p className="event-time">Start: {new Date(event.start_at).toLocaleString()}</p>
                    <p className="event-route">
                      From <strong>{event.departure.city}</strong> ({event.departure.location}) → <strong>{event.arrive.city}</strong> ({event.arrive.location})
                    </p>
                    <div className="event-buttons">
                      <button onClick={() => handleMoreInfo(event.id)} className="event-btn details-btn">Details</button>
                      <button onClick={() => handleViewEvent(event.id)} className="event-btn view-btn">View Event</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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