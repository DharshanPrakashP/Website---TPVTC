import { useState, useEffect, useRef } from 'react'
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
  joinDate: stri                  <div className="team-info">
                    <h3>{member.displayName || member.username || 'Unknown Member'}</h3>
                    <p className="team-role">{member.role?.name || 'Member'}</p>
                    <p className="team-description">
                      {member.role?.name && member.role.name.toLowerCase().includes('founder') 
                        ? "Visionary leader who founded Tamil Pasanga VTC to bring the Tamil trucking community together."
                        : "Strategic partner ensuring smooth operations and community growth."
                      }
                    </p>
                    <div className="team-stats">
                      <span>👑 {member.role?.name || 'Member'}</span>
                      <span>📅 Since {member.joinDate ? new Date(member.joinDate).getFullYear() : '2024'}</span>
                    </div>
                  </div>face ApiResponse {
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

  // Fetch team members from TruckersMP API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true)
        
        // Try multiple approaches to fetch data
        const apiUrls = [
          // Netlify function (best option for production)
          '/.netlify/functions/team-members',
          // Direct API call (might work in some environments)
          'https://api.truckersmp.com/v2/vtc/73933/members',
          // CORS proxy alternatives
          'https://api.allorigins.win/get?url=' + encodeURIComponent('https://api.truckersmp.com/v2/vtc/73933/members')
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
            
            // Handle AllOrigins proxy response format
            if (url.includes('allorigins')) {
              if (responseData.contents) {
                data = JSON.parse(responseData.contents)
              } else {
                throw new Error('Invalid AllOrigins response')
              }
            } else {
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

  // Helper function to get avatar initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  // Helper function to categorize roles
  const isManagementRole = (roleName: string | undefined) => {
    if (!roleName || typeof roleName !== 'string') return false
    const managementRoles = ['founder', 'ceo', 'co-owner', 'owner', 'director', 'manager']
    return managementRoles.some(role => roleName.toLowerCase().includes(role))
  }

  // Filter members by role category
  const managementMembers = teamMembers.filter(member => 
    member && member.role && member.role.name && isManagementRole(member.role.name)
  )
  const staffMembers = teamMembers.filter(member => 
    member && member.role && member.role.name && !isManagementRole(member.role.name)
  )

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
          
          {loading && (
            <div className="loading-message">
              <p>Loading team members...</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
              <p className="error-subtitle">Live data will be available when deployed to production.</p>
            </div>
          )}
          
          {!loading && !error && managementMembers.length > 0 && (
            <div className="team-grid">
              {managementMembers.map((member) => (
                <div key={member.id} className="team-card">
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
                    <h3>{member.displayName || member.username}</h3>
                    <p className="team-role">{member.role.name}</p>
                    <p className="team-description">
                      {member.role.name.toLowerCase().includes('founder') 
                        ? "Visionary leader who founded Tamil Pasanga VTC to bring the Tamil trucking community together."
                        : "Strategic partner ensuring smooth operations and community growth."
                      }
                    </p>
                    <div className="team-stats">
                      <span>👑 {member.role.name}</span>
                      <span>� Since {new Date(member.joinDate).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && !error && managementMembers.length === 0 && (
            <div className="no-members-message">
              <p>No management team members found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Staff & Moderators Section */}
      <section ref={moderatorsRef} className="moderators-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">SUPPORT TEAM</div>
            <h2>Staff & Members</h2>
          </div>
          
          {!loading && !error && staffMembers.length > 0 && (
            <div className="team-grid">
              {staffMembers.slice(0, 9).map((member) => (
                <div key={member.id} className="team-card">
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
                    <h3>{member.displayName || member.username || 'Unknown Member'}</h3>
                    <p className="team-role">{member.role?.name || 'Member'}</p>
                    <p className="team-description">
                      {member.role?.name && member.role.name.toLowerCase().includes('moderator') 
                        ? "Ensuring community guidelines and helping members with their queries."
                        : member.role?.name && member.role.name.toLowerCase().includes('event')
                        ? "Organizing and managing all convoys and community events."
                        : "Contributing to the growth and success of our virtual trucking community."
                      }
                    </p>
                    <div className="team-stats">
                      <span>🎖️ {member.role?.name || 'Member'}</span>
                      <span>📅 Since {member.joinDate ? new Date(member.joinDate).getFullYear() : '2024'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && !error && staffMembers.length === 0 && (
            <div className="no-members-message">
              <p>No staff members found.</p>
            </div>
          )}
          
          {!loading && !error && staffMembers.length > 9 && (
            <div className="view-all-message">
              <p>Showing 9 of {staffMembers.length} team members</p>
              <p className="total-members">Total VTC Members: {teamMembers.length}</p>
            </div>
          )}
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