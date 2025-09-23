import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './OurTeam.css'

gsap.registerPlugin(ScrollTrigger)

function OurTeam() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // GSAP refs
  const navbarRef = useRef<HTMLElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const managementRef = useRef<HTMLDivElement>(null)
  const moderatorsRef = useRef<HTMLDivElement>(null)

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

    // Animate management section
    if (managementRef.current) {
      const teamCards = managementRef.current.querySelectorAll('.team-card')
      gsap.fromTo(teamCards, 
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
            trigger: managementRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Animate moderators section
    if (moderatorsRef.current) {
      const modCards = moderatorsRef.current.querySelectorAll('.team-card')
      gsap.fromTo(modCards, 
        {
          y: 80,
          opacity: 0,
          rotationY: 15
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: moderatorsRef.current,
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
    <div className="OurTeam">
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
              <Link to="/events" className="nav-link">Events</Link>
            </li>
            <li className="nav-item">
              <Link to="/team" className="nav-link active">Our Team</Link>
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
                <Link to="/events" className="mobile-nav-link" onClick={toggleMobileMenu}>Events</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/team" className="mobile-nav-link active" onClick={toggleMobileMenu}>Our Team</Link>
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
            <span className="current">Our Team</span>
          </div>
          <h1 ref={titleRef} className="page-title">
            <span className="title-accent"></span>
            Our Team
          </h1>
        </div>
      </section>

      {/* Management Team Section */}
      <section ref={managementRef} className="team-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">LEADERSHIP</div>
            <h2>Management Team</h2>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">PG</div>
              </div>
              <div className="team-info">
                <h3>Powerful Gaming</h3>
                <p className="team-role">Founder & CEO</p>
                <p className="team-description">Visionary leader who founded Tamil Pasanga VTC to bring the Tamil trucking community together.</p>
                <div className="team-stats">
                  <span>👑 Founder</span>
                  <span>🚛 Expert Driver</span>
                </div>
              </div>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">CO</div>
              </div>
              <div className="team-info">
                <h3>Co-Owner</h3>
                <p className="team-role">Co-Founder & Operations</p>
                <p className="team-description">Strategic partner ensuring smooth operations and community growth.</p>
                <div className="team-stats">
                  <span>⚙️ Operations</span>
                  <span>📈 Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moderators Section */}
      <section ref={moderatorsRef} className="moderators-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">SUPPORT TEAM</div>
            <h2>Moderators & Staff</h2>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">M1</div>
              </div>
              <div className="team-info">
                <h3>Senior Moderator</h3>
                <p className="team-role">Community Manager</p>
                <p className="team-description">Ensuring community guidelines and helping members with their queries.</p>
                <div className="team-stats">
                  <span>🛡️ Moderator</span>
                  <span>🤝 Community</span>
                </div>
              </div>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">M2</div>
              </div>
              <div className="team-info">
                <h3>Event Coordinator</h3>
                <p className="team-role">Events Manager</p>
                <p className="team-description">Organizing and managing all convoys and community events.</p>
                <div className="team-stats">
                  <span>📅 Events</span>
                  <span>🎯 Planning</span>
                </div>
              </div>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">M3</div>
              </div>
              <div className="team-info">
                <h3>Technical Support</h3>
                <p className="team-role">IT Specialist</p>
                <p className="team-description">Managing technical aspects and helping with mod installations.</p>
                <div className="team-stats">
                  <span>💻 Technical</span>
                  <span>🔧 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Team Section */}
      <section className="join-team-section">
        <div className="container">
          <div className="join-team-content">
            <h2>Want to Join Our Team?</h2>
            <p>We're always looking for passionate drivers and community members to help us grow.</p>
            <Link to="/contact" className="join-team-btn">Get In Touch</Link>
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

export default OurTeam