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

    // Animate statistics section with counter animation
    if (teamRef.current) {
      const statisticItems = teamRef.current.querySelectorAll('.statistic-item')
      const counters = teamRef.current.querySelectorAll('.counter')
      
      // Animate the statistic items
      gsap.fromTo(statisticItems, 
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
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate the counters with React-safe approach
      counters.forEach((counter: any) => {
        const target = parseInt(counter.getAttribute('data-target'))
        if (!isNaN(target)) {
          const obj = { value: 0 }
          gsap.to(obj, {
            value: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: teamRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            onUpdate: function() {
              if (counter) {
                counter.textContent = Math.ceil(obj.value).toString()
              }
            }
          })
        }
      })
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
              <span className="logo-part-1">Tamil Pasanga</span>
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
                Tamil Pasanga Is Virtual Trucking Company based around Euro Truck Simulator 2 and American Truck Simulator. It was Founded On 13 Aug 2024 To Bring People Together. It Was Founded By Powerful Gaming.
              </p>
              <p>
                Welcome to the Tamil Pasanga Virtual Trucking Community, where the open road meets endless opportunity! Immerse yourself in a world where innovation and camaraderie fuel the miles you'll conquer. Designed for trucking enthusiasts of all levels, our community provides an immersive experience that redefines virtual logistics—as you roll through breathtaking routes and engage in dynamic missions that transport you into the driver's seat.
              </p>
              <p>
                Our community celebrates the spirit of trucking through a vibrant online platform, connecting players around the globe. Whether you're a seasoned veteran of the simulation or a newcomer eager to explore, Tamil Pasanga is your haven for sharing knowledge, logistics tips, and unforgettable trucking adventures. With a robust support system in place, members can tap into rich resources—from realistic trucking strategies to tech tutorials—ensuring everyone hits the road at their best.
              </p>
              <p>
                At Tamil Pasanga, we believe that every mile matters. Our regularly-hosted events, convoy drives, and competitive challenges bring excitement and friendly rivalry to your experience, making your virtual journeys not just everyday missions, but memorable escapades. As part of our community, you'll join a family that thrives on the joy of the journey, celebrating milestones and achievements together.
              </p>
              <p>
                Safety and respect are at the forefront of our ethos, fostering a welcoming environment for all members to enjoy their virtual trucking experience.
              </p>
            </div>
            <div className="about-image">
              <img 
                src="/images/aboutus.PNG" 
                alt="Tamil Pasanga About Us" 
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  console.log('Image failed to load:', (e.target as HTMLImageElement).src);
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
     

      {/* Our Values Section */}
      <section ref={valuesRef} className="workflow-section">
        <div className="workflow-overlay"></div>
        <div className="container">
          <div className="section-header">
            <div className="section-label">OUR VALUES</div>
            <h2>What We Stand For</h2>
          </div>
          <div className="workflow-grid">
            <div className="workflow-item">
              <div className="workflow-icon">
                <span className="icon-circle">🚛</span>
              </div>
              <h3>Professional Driving</h3>
              <p>Safe and realistic driving style.</p>
            </div>
            <div className="workflow-item">
              <div className="workflow-icon">
                <span className="icon-circle">🤝</span>
              </div>
              <h3>Team Spirit</h3>
              <p>Helping each other and staying united as a family.</p>
            </div>
            <div className="workflow-item">
              <div className="workflow-icon">
                <span className="icon-circle">🌍</span>
              </div>
              <h3>Community Vibes</h3>
              <p>Open to all, but proud to represent Tamil culture worldwide.</p>
            </div>
            <div className="workflow-item">
              <div className="workflow-icon">
                <span className="icon-circle">📅</span>
              </div>
              <h3>Convoys & Events</h3>
              <p>Regular convoys, both public and private, ensuring everyone enjoys the journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={teamRef} className="statistics-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">OUR ACHIEVEMENTS</div>
            <h2>Community Statistics</h2>
          </div>
          <div className="statistics-grid">
            <div className="statistic-item">
              <div className="statistic-icon">
                <span className="icon-circle">👥</span>
              </div>
              <div className="statistic-number">
                <span className="counter" data-target="50">0</span>
                <span className="plus">+</span>
              </div>
              <h3>Active Drivers</h3>
              <p>Professional drivers from around the world</p>
            </div>
            <div className="statistic-item">
              <div className="statistic-icon">
                <span className="icon-circle">🎉</span>
              </div>
              <div className="statistic-number">
                <span className="counter" data-target="100">0</span>
                <span className="plus">+</span>
              </div>
              <h3>Events Completed</h3>
              <p>Successful convoys and community events</p>
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

export default About