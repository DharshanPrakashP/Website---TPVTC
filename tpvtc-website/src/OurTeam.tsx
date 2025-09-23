import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './OurTeam.css'

gsap.registerPlugin(ScrollTrigger)

interface TeamMember {
  id: number
  username: string
  displayName?: string
  role: {
    id: number
    name: string
    order: number
  }
  avatar?: string
  joinDate: string
}

interface ApiResponse {
  response: {
    members: TeamMember[]
    pagination: {
      current: number
      count: number
      total: number
    }
  }
}

function OurTeam() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // GSAP refs
  const navbarRef = useRef<HTMLDivElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const teamGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch team members from TruckersMP API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true)
        
        // Try multiple approaches to fetch data
        const apiUrls = [
          // Netlify function (best option for production)
          '/.netlify/functions/team-members',
          // CORS proxy alternatives (more reliable)
          'https://corsproxy.io/?url=' + encodeURIComponent('https://api.truckersmp.com/v2/vtc/73933/members'),
          'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent('https://api.truckersmp.com/v2/vtc/73933/members'),
          'https://thingproxy.freeboard.io/fetch/' + encodeURIComponent('https://api.truckersmp.com/v2/vtc/73933/members'),
          // Direct API call (might work in some environments)
          'https://api.truckersmp.com/v2/vtc/73933/members'
        ]
        
        let data: ApiResponse | null = null
        let lastError: Error | null = null
        
        for (const url of apiUrls) {
          try {
            console.log(`Attempting to fetch from: ${url}`)
            
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            })
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const responseData = await response.json()
            
            // Handle different proxy response formats
            if (url.includes('allorigins')) {
              if (responseData.contents) {
                data = JSON.parse(responseData.contents)
              } else {
                throw new Error('Invalid AllOrigins response')
              }
            } else if (url.includes('corsproxy.io') || url.includes('codetabs.com') || url.includes('thingproxy')) {
              // These proxies return the data directly
              data = responseData
            } else {
              // Direct API call or Netlify function
              data = responseData
            }
            
            // If we got valid data, break the loop
            if (data && data.response && data.response.members) {
              console.log('Successfully fetched data from:', url)
              break
            }
            
          } catch (err) {
            console.log(`Failed to fetch from ${url}:`, err)
            lastError = err as Error
            continue
          }
        }
        
        if (data && data.response && data.response.members) {
          // Sort members by role order (management first)
          const sortedMembers = data.response.members.sort((a, b) => a.role.order - b.role.order)
          setTeamMembers(sortedMembers)
          setError(null)
          console.log(`Loaded ${sortedMembers.length} team members`)
        } else {
          throw lastError || new Error('No valid data received from any API endpoint')
        }
        
      } catch (err) {
        console.error('Error fetching team members:', err)
        setError('Unable to load live team data. Showing static information.')
        
        // Enhanced fallback data with more realistic information
        setTeamMembers([
          {
            id: 1,
            username: "PowerfulGaming",
            displayName: "Powerful Gaming",
            role: { id: 1, name: "Founder & CEO", order: 1 },
            joinDate: "2024-08-13"
          },
          {
            id: 2,
            username: "CoOwner",
            displayName: "Co-Owner",
            role: { id: 2, name: "Co-Founder", order: 2 },
            joinDate: "2024-08-13"
          },
          {
            id: 3,
            username: "SeniorMod",
            displayName: "Senior Moderator",
            role: { id: 3, name: "Senior Moderator", order: 3 },
            joinDate: "2024-08-20"
          },
          {
            id: 4,
            username: "EventManager",
            displayName: "Event Manager",
            role: { id: 4, name: "Event Coordinator", order: 4 },
            joinDate: "2024-09-01"
          },
          {
            id: 5,
            username: "TechSupport",
            displayName: "Tech Support",
            role: { id: 5, name: "Technical Support", order: 5 },
            joinDate: "2024-09-10"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
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

    // Animate team grid on scroll
    if (teamGridRef.current) {
      const teamCards = teamGridRef.current.querySelectorAll('.team-member')
      
      gsap.fromTo(teamCards,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: teamGridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
      
      // Add hover animations for team cards
      teamCards.forEach((card: any) => {
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
      const sectionLabel = sectionsRef.current.querySelector('.team-section-label')
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

  // Helper function to get avatar initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  // Group members by their roles
  const groupedMembers = useMemo(() => {
    const groups: { [key: string]: typeof teamMembers } = {}
    
    teamMembers.forEach(member => {
      if (member && member.role && member.role.name) {
        const roleName = member.role.name
        if (!groups[roleName]) {
          groups[roleName] = []
        }
        groups[roleName].push(member)
      }
    })
    
    // Sort groups by role order (lowest order first)
    const sortedGroups = Object.entries(groups).sort(([, membersA], [, membersB]) => {
      const orderA = membersA[0]?.role?.order || 999
      const orderB = membersB[0]?.role?.order || 999
      return orderA - orderB
    })
    
    return sortedGroups
  }, [teamMembers])

  return (
    <div className="OurTeam">
      {/* Navigation */}
      <nav ref={navbarRef} className={`team-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="team-nav-container">
          <div className="team-nav-logo">
            <Link to="/">
              <span className="team-logo-part-1">Tamil Pasanga</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <ul className="team-nav-menu">
            <li className="team-nav-item">
              <Link to="/" className="team-nav-link">Home</Link>
            </li>
            <li className="team-nav-item">
              <Link to="/about" className="team-nav-link">About</Link>
            </li>
            <li className="team-nav-item">
              <Link to="/rules" className="team-nav-link">Rules</Link>
            </li>
            <li className="team-nav-item">
              <Link to="/events" className="team-nav-link">Events</Link>
            </li>
            <li className="team-nav-item">
              <Link to="/team" className="team-nav-link active">Our Team</Link>
            </li>
            <li className="team-nav-item">
              <a href="#gallery" className="team-nav-link">Gallery</a>
            </li>
            <li className="team-nav-item">
              <Link to="/contact" className="team-nav-link">Contact</Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="team-mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`team-hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Mobile Menu */}
          <div className={`team-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="team-mobile-nav-menu">
              <li className="team-mobile-nav-item">
                <Link to="/" className="team-mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li className="team-mobile-nav-item">
                <Link to="/about" className="team-mobile-nav-link" onClick={toggleMobileMenu}>About</Link>
              </li>
              <li className="team-mobile-nav-item">
                <Link to="/rules" className="team-mobile-nav-link" onClick={toggleMobileMenu}>Rules</Link>
              </li>
              <li className="team-mobile-nav-item">
                <Link to="/events" className="team-mobile-nav-link" onClick={toggleMobileMenu}>Events</Link>
              </li>
              <li className="team-mobile-nav-item">
                <Link to="/team" className="team-mobile-nav-link active" onClick={toggleMobileMenu}>Our Team</Link>
              </li>
              <li className="team-mobile-nav-item">
                <a href="#gallery" className="team-mobile-nav-link" onClick={toggleMobileMenu}>Gallery</a>
              </li>
              <li className="team-mobile-nav-item">
                <Link to="/contact" className="team-mobile-nav-link" onClick={toggleMobileMenu}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Team Page Header */}
      <section className="team-page-header">
        <div className="team-page-header-content">
          <div ref={breadcrumbRef} className="team-breadcrumb">
            <Link to="/">HOME</Link>
            <span className="team-separator"> / </span>
            <span className="team-current">OUR TEAM</span>
          </div>
          <h1 ref={titleRef} className="team-page-title">
            <span className="team-title-accent"></span>
            OUR TEAM
          </h1>
        </div>
      </section>

      {/* Team Content Section */}
      <section ref={sectionsRef} className="team-content-section">
        <div className="team-container">
          <div className="team-section-label">MEET THE CREW</div>
          <h2>Tamil Pasanga Team Members</h2>
          
          {loading && (
            <div className="team-loading-message">
              <p>Loading team members...</p>
            </div>
          )}
          
          {error && (
            <div className="team-error-message">
              <p>⚠️ {error}</p>
            </div>
          )}
          
          <div ref={teamGridRef} className="team-grid">
            {/* Dynamically render groups by roles */}
            {groupedMembers.map(([roleName, members]) => (
              <div key={roleName} className="team-role-section">
                <div className="team-category-header">
                  <h3>{roleName}</h3>
                </div>
                {members.map((member) => (
                  <div key={member.id} className="team-member">
                    <div className="team-avatar">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.displayName || member.username} />
                      ) : (
                        <div className="avatar-placeholder">
                          {getInitials(member.displayName || member.username)}
                        </div>
                      )}
                    </div>
                    <div className="team-info">
                      <h4>{member.displayName || member.username}</h4>
                      <p className="team-role">{member.role.name}</p>
                      <p className="team-description">
                        {member.role.name.toLowerCase().includes('founder') || member.role.name.toLowerCase().includes('managing director') 
                          ? "Visionary leader guiding Tamil Pasanga VTC to bring the Tamil trucking community together."
                          : member.role.name.toLowerCase().includes('moderator') 
                          ? "Ensuring community guidelines and helping members with their queries."
                          : member.role.name.toLowerCase().includes('event')
                          ? "Organizing and managing all convoys and community events."
                          : "Contributing to the growth and success of our virtual trucking community."
                        }
                      </p>
                      <div className="team-stats">
                        <span>🎖️ {member.role.name}</span>
                        <span>📅 Since {new Date(member.joinDate).getFullYear()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            
            {/* Fallback when no data */}
            {!loading && !error && teamMembers.length === 0 && (
              <div className="team-member">
                <div className="team-info">
                  <h4>No team data available</h4>
                  <p className="team-description">Team information will be loaded from TruckersMP API.</p>
                </div>
              </div>
            )}
          </div>
          
          {!loading && !error && teamMembers.length > 0 && (
            <div className="team-view-all">
              <p className="team-total">Total VTC Members: {teamMembers.length}</p>
              <p>Members grouped by roles: {groupedMembers.length} different roles</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="team-footer">
        <div className="team-container">
          <p>&copy; 2025 Tamil Pasanga. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default OurTeam