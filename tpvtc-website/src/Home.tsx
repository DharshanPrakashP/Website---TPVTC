import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLElement>(null)
  const navbarRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const videoButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP Hero Entrance Animations
    const tl = gsap.timeline({ delay: 0.5 })
    
    // Animate navbar
    if (navbarRef.current) {
      gsap.set(navbarRef.current, { y: -100, opacity: 0 })
      tl.to(navbarRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, 0)
    }

    // Animate hero title
    if (titleRef.current) {
      gsap.set(titleRef.current, { y: 100, opacity: 0 })
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }, 0.3)
    }

    // Animate hero description
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { y: 50, opacity: 0 })
      tl.to(descriptionRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, 0.8)
    }

    // Animate video button
    if (videoButtonRef.current) {
      gsap.set(videoButtonRef.current, { scale: 0, opacity: 0 })
      tl.to(videoButtonRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, 1.2)
    }

    // Animate benefits cards on scroll
    gsap.utils.toArray('.benefit-item').forEach((card: any, index) => {
      gsap.fromTo(card, 
        {
          y: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.1
        }
      )
    })

    // Animate workflow items
    gsap.utils.toArray('.workflow-item').forEach((item: any, index) => {
      gsap.fromTo(item, 
        {
          y: 80,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.15
        }
      )
    })

    // Animate testimonial items
    gsap.utils.toArray('.testimonial-item').forEach((item: any, index) => {
      gsap.fromTo(item, 
        {
          y: 60,
          opacity: 0,
          rotationY: 15
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      )
    })

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
    return () => {
      window.removeEventListener('scroll', handleScroll)
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="Home">
      {/* Navigation */}
      <nav ref={navbarRef} className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <span className="logo-part-1">Tamil Pasanga</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link active">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/rules" className="nav-link">Rules</Link>
            </li>
            <li className="nav-item">
              <a href="#events" className="nav-link">Events</a>
            </li>
            <li className="nav-item">
              <a href="#team" className="nav-link">Our Team</a>
            </li>
            <li className="nav-item">
              <a href="#gallery" className="nav-link">Gallery</a>
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
                <Link to="/" className="mobile-nav-link active" onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/about" className="mobile-nav-link" onClick={toggleMobileMenu}>About</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/rules" className="mobile-nav-link" onClick={toggleMobileMenu}>Rules</Link>
              </li>
              <li className="mobile-nav-item">
                <a href="#events" className="mobile-nav-link" onClick={toggleMobileMenu}>Events</a>
              </li>
              <li className="mobile-nav-item">
                <a href="#team" className="mobile-nav-link" onClick={toggleMobileMenu}>Our Team</a>
              </li>
              <li className="mobile-nav-item">
                <a href="#gallery" className="mobile-nav-link" onClick={toggleMobileMenu}>Gallery</a>
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
            <h1 ref={titleRef} className="hero-title">
              <span className="hero-highlight">Welcome to TAMIL PASANGA</span>
            </h1>
            <p ref={descriptionRef} className="hero-description">
              Tamil Pasanga is a friendly and active Virtual Trucking Company built by Tamil gamers and truck enthusiasts who love driving together on TruckersMP. Our goal is to create a fun, realistic, and respectful community where players can enjoy convoys, explore Europe's roads, and represent Tamil unity on the trucking platform.
            </p>
            <div ref={videoButtonRef} className="hero-video">
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

      {/* Why Join Our Logistics Section */}
      <section ref={parallaxRef} className="full-width-image-section">
        <div className="full-width-image-overlay"></div>
        <div className="full-width-image-content">
          <div className="container">
            <div className="why-join-section">
              <h2>Why Join Tamil Pasanga?</h2>
              <p>
                Experience the ultimate virtual trucking adventure with a community that values 
                friendship, professionalism, and the thrill of the open road. Join hundreds of 
                drivers from around the world in our growing family.
              </p>
              
              <div className="benefits-grid">
                <div className="benefit-item">
                  <span className="benefit-icon">🚛</span>
                  <h3>Regular Convoys</h3>
                  <p>Weekly/monthly convoys across Europe & ProMods.</p>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">🤝</span>
                  <h3>Friendly Community</h3>
                  <p>A family-like atmosphere, always ready to help.</p>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">🛡️</span>
                  <h3>Professional Standards</h3>
                  <p>Realistic rules, safe convoys, and clean driving.</p>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">🏁</span>
                  <h3>Cultural Unity</h3>
                  <p>Representing Tamil pride and values globally.</p>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">📅</span>
                  <h3>Events & Partnerships</h3>
                  <p>Join international VTC events and collaborations.</p>
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
              <p>More than just a Logistics company, we're a community. Join us for regular events, custom paint jobs, and a friendly network of drivers who make every haul an adventure.</p>
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
          <p>&copy; 2025 Tamil Pasanga. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home