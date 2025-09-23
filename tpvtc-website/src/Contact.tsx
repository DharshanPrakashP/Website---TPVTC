import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // GSAP refs
  const navbarRef = useRef<HTMLDivElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const contactFormRef = useRef<HTMLDivElement>(null)

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

    // Animate contact form on scroll
    if (contactFormRef.current) {
      const formElements = contactFormRef.current.querySelectorAll('.contact-card, .contact-info-item')
      
      gsap.fromTo(formElements,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: contactFormRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Animate section labels and headings
    if (sectionsRef.current) {
      const sectionLabel = sectionsRef.current.querySelector('.contact-section-label')
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
    <div className="Contact">
      {/* Navigation */}
      <nav ref={navbarRef} className={`contact-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="contact-nav-container">
          <div className="contact-nav-logo">
            <Link to="/">
              <span className="contact-logo-part-1">Tamil Pasanga</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <ul className="contact-nav-menu">
            <li className="contact-nav-item">
              <Link to="/" className="contact-nav-link">Home</Link>
            </li>
            <li className="contact-nav-item">
              <Link to="/about" className="contact-nav-link">About</Link>
            </li>
            <li className="contact-nav-item">
              <Link to="/rules" className="contact-nav-link">Rules</Link>
            </li>
            <li className="contact-nav-item">
              <Link to="/events" className="contact-nav-link">Events</Link>
            </li>
            <li className="contact-nav-item">
              <Link to="/team" className="contact-nav-link">Our Team</Link>
            </li>
            <li className="contact-nav-item">
              <Link to="/contact" className="contact-nav-link active">Contact</Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="contact-mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`contact-hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Mobile Menu */}
          <div className={`contact-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="contact-mobile-nav-menu">
              <li className="contact-mobile-nav-item">
                <Link to="/" className="contact-mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li className="contact-mobile-nav-item">
                <Link to="/about" className="contact-mobile-nav-link" onClick={toggleMobileMenu}>About</Link>
              </li>
              <li className="contact-mobile-nav-item">
                <Link to="/rules" className="contact-mobile-nav-link" onClick={toggleMobileMenu}>Rules</Link>
              </li>
              <li className="contact-mobile-nav-item">
                <Link to="/events" className="contact-mobile-nav-link" onClick={toggleMobileMenu}>Events</Link>
              </li>
              <li className="contact-mobile-nav-item">
                <Link to="/team" className="contact-mobile-nav-link" onClick={toggleMobileMenu}>Our Team</Link>
              </li>
              <li className="contact-mobile-nav-item">
                <Link to="/contact" className="contact-mobile-nav-link active" onClick={toggleMobileMenu}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contact Page Header */}
      <section className="contact-page-header">
        <div className="contact-page-header-content">
          <div ref={breadcrumbRef} className="contact-breadcrumb">
            <Link to="/">HOME</Link>
            <span className="contact-separator"> / </span>
            <span className="contact-current">CONTACT</span>
          </div>
          <h1 ref={titleRef} className="contact-page-title">
            <span className="contact-title-accent"></span>
            CONTACT US
          </h1>
        </div>
      </section>

      {/* Contact Content Section */}
      <section ref={sectionsRef} className="contact-content-section">
        <div className="contact-container">
          <div className="contact-section-label">GET IN TOUCH</div>
          <h2>Contact Tamil Pasanga VTC</h2>
          
          <div ref={contactFormRef} className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <div className="contact-info-item">
                <h4>Discord Community</h4>
                <p>Join our active Discord server for real-time communication, convoy announcements, and community discussions.</p>
                <a href="https://discord.gg/S6uRJCn6uD" target="_blank" rel="noopener noreferrer" className="contact-link">
                  Join Discord Server
                </a>
              </div>
              
              <div className="contact-info-item">
                <h4>TruckersMP Profile</h4>
                <p>Visit our official TruckersMP VTC page to see our latest statistics, member list, and convoy schedules.</p>
                <a href="https://truckersmp.com/vtc/73933" target="_blank" rel="noopener noreferrer" className="contact-link">
                  View VTC Profile
                </a>
              </div>
              
              <div className="contact-info-item">
                <h4>Recruitment</h4>
                <p>Interested in joining Tamil Pasanga? We welcome drivers of all skill levels who share our passion for trucking.</p>
                <div className="recruitment-requirements">
                  <ul>
                    <li>✓ Active TruckersMP account</li>
                    <li>✓ Respectful and friendly attitude</li>
                    <li>✓ Willingness to follow VTC rules</li>
                    <li>✓ Participate in community events</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="contact-footer">
        <div className="contact-container">
          <p>&copy; 2025 Tamil Pasanga. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Contact