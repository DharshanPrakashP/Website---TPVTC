import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Rules.css'

gsap.registerPlugin(ScrollTrigger)

function Rules() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // GSAP refs
  const navbarRef = useRef<HTMLDivElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const rulesGridRef = useRef<HTMLDivElement>(null)

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

    // Animate rules grid on scroll
    if (rulesGridRef.current) {
      const ruleCards = rulesGridRef.current.querySelectorAll('.rule-category')
      
      gsap.fromTo(ruleCards,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: rulesGridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
      
      // Add hover animations for rule cards
      ruleCards.forEach((card: any) => {
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
      const sectionLabel = sectionsRef.current.querySelector('.rules-section-label')
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
    <div className="Rules">
      {/* Navigation */}
      <nav ref={navbarRef} className={`rules-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="rules-nav-container">
          <div className="rules-nav-logo">
            <Link to="/">
              <span className="rules-logo-part-1">Tamil Pasanga</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <ul className="rules-nav-menu">
            <li className="rules-nav-item">
              <Link to="/" className="rules-nav-link">Home</Link>
            </li>
            <li className="rules-nav-item">
              <Link to="/about" className="rules-nav-link">About</Link>
            </li>
            <li className="rules-nav-item">
              <Link to="/rules" className="rules-nav-link active">Rules</Link>
            </li>
            <li className="rules-nav-item">
              <Link to="/events" className="rules-nav-link">Events</Link>
            </li>
            <li className="rules-nav-item">
              <Link to="/team" className="rules-nav-link">Our Team</Link>
            </li>
            <li className="rules-nav-item">
              <Link to="/contact" className="rules-nav-link">Contact</Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="rules-mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`rules-hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Mobile Menu */}
          <div className={`rules-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="rules-mobile-nav-menu">
              <li className="rules-mobile-nav-item">
                <Link to="/" className="rules-mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li className="rules-mobile-nav-item">
                <Link to="/about" className="rules-mobile-nav-link" onClick={toggleMobileMenu}>About</Link>
              </li>
              <li className="rules-mobile-nav-item">
                <Link to="/rules" className="rules-mobile-nav-link active" onClick={toggleMobileMenu}>Rules</Link>
              </li>
              <li className="rules-mobile-nav-item">
                <Link to="/events" className="rules-mobile-nav-link" onClick={toggleMobileMenu}>Events</Link>
              </li>
              <li className="rules-mobile-nav-item">
                <Link to="/team" className="rules-mobile-nav-link" onClick={toggleMobileMenu}>Our Team</Link>
              </li>
              <li className="rules-mobile-nav-item">
                <Link to="/contact" className="rules-mobile-nav-link" onClick={toggleMobileMenu}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Rules Page Header */}
      <section className="rules-page-header">
        <div className="rules-page-header-content">
          <div ref={breadcrumbRef} className="rules-breadcrumb">
            <Link to="/">HOME</Link>
            <span className="rules-separator"> / </span>
            <span className="rules-current">RULES</span>
          </div>
          <h1 ref={titleRef} className="rules-page-title">
            <span className="rules-title-accent"></span>
            RULES
          </h1>
        </div>
      </section>

      {/* Rules Content Section */}
      <section ref={sectionsRef} className="rules-content-section">
        <div className="rules-container">
          <div className="rules-section-label">COMPANY GUIDELINES</div>
          <h2>Tamil Pasanga Rules & Regulations</h2>
          
          <div ref={rulesGridRef} className="rules-grid">
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
                <li>Represent Tamil Pasanga with pride</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="rules-footer">
        <div className="rules-container">
          <p>&copy; 2025 Tamil Pasanga. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Rules