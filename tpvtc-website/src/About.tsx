import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // GSAP refs
  const navbarRef = useRef<HTMLElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

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

    // Animate mission section
    if (missionRef.current) {
      gsap.fromTo(missionRef.current.children, 
        {
          y: 60,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Animate values section
    if (valuesRef.current) {
      const valueItems = valuesRef.current.querySelectorAll('.value-item')
      gsap.fromTo(valueItems, 
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
            trigger: valuesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Animate team section
    if (teamRef.current) {
      const teamMembers = teamRef.current.querySelectorAll('.team-member')
      gsap.fromTo(teamMembers, 
        {
          y: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamRef.current,
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
    <div className="About">
      {/* Navigation */}
      <nav ref={navbarRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <span className="logo-part-1">Tamil Pasanga </span>
              <span className="logo-part-2">Logistics</span>
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
              <a href="#gallery" className="nav-link">Gallery</a>
            </li>
            <li className="nav-item">
              <Link to="/rules" className="nav-link">Rules</Link>
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
                <a href="#gallery" className="mobile-nav-link" onClick={toggleMobileMenu}>Gallery</a>
              </li>
              <li className="mobile-nav-item">
                <Link to="/rules" className="mobile-nav-link" onClick={toggleMobileMenu}>Rules</Link>
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
          <div ref={breadcrumbRef} className="breadcrumb">
            <Link to="/">HOME</Link>
            <span className="separator"> / </span>
            <span className="current">About Us</span>
          </div>
          <h1 ref={titleRef} className="page-title">
            <span className="title-accent"></span>
            About Us
          </h1>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={missionRef} className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <div className="section-label">ABOUT US</div>
              <h2>Tamil Pasanga Virtual Trucking Company</h2>
              <p>
                Tamil Pasanga Logistics Is Virtual Trucking Company based around Euro Truck Simulator 2 and American Truck Simulator. It was Founded On 13 Aug 2024 To Bring People Together. It Was Founded By Powerful Gaming.
              </p>
              <p>
                Welcome to the Tamil Pasanga Virtual Trucking Community, where the open road meets endless opportunity! Immerse yourself in a world where innovation and camaraderie fuel the miles you'll conquer. Designed for trucking enthusiasts of all levels, our community provides an immersive experience that redefines virtual logistics—as you roll through breathtaking routes and engage in dynamic missions that transport you into the driver's seat.
              </p>
              <p>
                Our community celebrates the spirit of trucking through a vibrant online platform, connecting players around the globe. Whether you're a seasoned veteran of the simulation or a newcomer eager to explore, Tamil Pasanga Logistics is your haven for sharing knowledge, logistics tips, and unforgettable trucking adventures. With a robust support system in place, members can tap into rich resources—from realistic trucking strategies to tech tutorials—ensuring everyone hits the road at their best.
              </p>
              <p>
                At Tamil Pasanga Logistics, we believe that every mile matters. Our regularly-hosted events, convoy drives, and competitive challenges bring excitement and friendly rivalry to your experience, making your virtual journeys not just everyday missions, but memorable escapades. As part of our community, you'll join a family that thrives on the joy of the journey, celebrating milestones and achievements together.
              </p>
              <p>
                Safety and respect are at the forefront of our ethos, fostering a welcoming environment for all members to enjoy their virtual trucking experience.
              </p>
            </div>
            <div className="about-image">
              <img src="/src/assets/images/aboutus.PNG" alt="Tamil Pasanga Logistics About Us" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
     

      {/* How it works Section */}
      <section ref={valuesRef} className="workflow-section">
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
      <section ref={teamRef} className="testimonials-section">
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
          <p>&copy; 2025 Tamil Pasanga Logistics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default About