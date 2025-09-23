import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  // GSAP refs
  const navbarRef = useRef<HTMLElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contactFormRef = useRef<HTMLDivElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)

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

    // Animate contact form
    if (contactFormRef.current) {
      gsap.fromTo(contactFormRef.current, 
        {
          x: -60,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactFormRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Animate contact info
    if (contactInfoRef.current) {
      gsap.fromTo(contactInfoRef.current, 
        {
          x: 60,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="Contact">
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
              <Link to="/team" className="nav-link">Our Team</Link>
            </li>
            <li className="nav-item">
              <a href="#gallery" className="nav-link">Gallery</a>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link active">Contact</Link>
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
                <Link to="/team" className="mobile-nav-link" onClick={toggleMobileMenu}>Our Team</Link>
              </li>
              <li className="mobile-nav-item">
                <a href="#gallery" className="mobile-nav-link" onClick={toggleMobileMenu}>Gallery</a>
              </li>
              <li className="mobile-nav-item">
                <Link to="/contact" className="mobile-nav-link active" onClick={toggleMobileMenu}>Contact</Link>
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
            <span className="current">Contact</span>
          </div>
          <h1 ref={titleRef} className="page-title">
            <span className="title-accent"></span>
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Form */}
            <div ref={contactFormRef} className="contact-form-wrapper">
              <div className="section-header">
                <div className="section-label">GET IN TOUCH</div>
                <h2>Send Us a Message</h2>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div ref={contactInfoRef} className="contact-info-wrapper">
              <div className="section-header">
                <div className="section-label">REACH US</div>
                <h2>Contact Information</h2>
              </div>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <span>💬</span>
                  </div>
                  <div className="contact-details">
                    <h3>Discord Server</h3>
                    <p>Join our community on Discord for real-time chat and convoy coordination.</p>
                    <a href="#" className="contact-link">Join Discord</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <span>🎮</span>
                  </div>
                  <div className="contact-details">
                    <h3>TruckersMP Profile</h3>
                    <p>Find us on TruckersMP for convoy schedules and virtual trucking.</p>
                    <a href="#" className="contact-link">View Profile</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <span>📧</span>
                  </div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p>Send us an email for business inquiries or partnership opportunities.</p>
                    <a href="mailto:contact@tamilpasanga.com" className="contact-link">contact@tamilpasanga.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <span>🌐</span>
                  </div>
                  <div className="contact-details">
                    <h3>Social Media</h3>
                    <p>Follow us on social media for updates and community highlights.</p>
                    <div className="social-links">
                      <a href="#" className="contact-link">YouTube</a>
                      <a href="#" className="contact-link">Instagram</a>
                    </div>
                  </div>
                </div>
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

export default Contact