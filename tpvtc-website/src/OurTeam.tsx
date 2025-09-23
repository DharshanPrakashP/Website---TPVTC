import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './OurTeam.css'

gsap.registerPlugin(ScrollTrigger)

interface Role {
  id: number
  name: string
  order: number
  owner: boolean
  created_at: string
  updated_at: string
}

interface TeamMember {
  id: number
  user_id: number
  username: string
  steam_id: number
  steamID64: number
  steamID: string
  roles: Role[]
  role_id: number
  role: string
  is_owner: boolean
  joinDate: string
}

interface ApiResponse {
  error: boolean
  response: {
    members: TeamMember[]
    members_count: number
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
  const sectionRef = useRef<HTMLElement>(null)

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
  }, [])

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true)
        
        const apiUrls = [
          '/.netlify/functions/team-members',
          'https://corsproxy.io/?url=' + encodeURIComponent('https://api.truckersmp.com/v2/vtc/73933/members'),
          'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent('https://api.truckersmp.com/v2/vtc/73933/members'),
          'https://thingproxy.freeboard.io/fetch/' + encodeURIComponent('https://api.truckersmp.com/v2/vtc/73933/members'),
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
            data = responseData
            
            if (data && data.response && data.response.members) {
              console.log('Successfully fetched data from:', url)
              break
            }
            
          } catch (err) {
            console.error(`Failed to fetch from ${url}:`, err)
            lastError = err instanceof Error ? err : new Error('Unknown error')
            continue
          }
        }
        
        if (data && data.response && data.response.members) {
          // Sort members by role order (from the roles array in each member)
          const sortedMembers = data.response.members.sort((a, b) => {
            const aOrder = a.roles?.[0]?.order || 999
            const bOrder = b.roles?.[0]?.order || 999
            return aOrder - bOrder
          })
          setTeamMembers(sortedMembers)
        } else {
          setError(lastError?.message || 'Failed to fetch team members')
        }
      } catch (err) {
        console.error('Error fetching team members:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  // Group members by their role
  const groupedMembers = teamMembers.reduce((groups: { [key: string]: TeamMember[] }, member) => {
    const roleName = member.role || 'Unknown'
    if (!groups[roleName]) {
      groups[roleName] = []
    }
    groups[roleName].push(member)
    return groups
  }, {})

  // Sort groups by the role order (descending - highest order first)
  const sortedRoleGroups = Object.entries(groupedMembers).sort(([, membersA], [, membersB]) => {
    const orderA = membersA[0]?.roles?.[0]?.order || 999
    const orderB = membersB[0]?.roles?.[0]?.order || 999
    return orderB - orderA
  })

  useEffect(() => {
    if (teamMembers.length > 0 && sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.team-member-card')
      
      gsap.fromTo(cards, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }
  }, [teamMembers])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const openUserProfile = (userId: number) => {
    alert(`User ID: ${userId}`)
  }

  return (
    <div className="about">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} ref={navbarRef}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/TP_NEW_WB_PNGxxxhdpi.png" alt="Tamil Pasanga VTC" className="logo-img" />
          </Link>
          <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/our-team" className="nav-link active" onClick={() => setIsMobileMenuOpen(false)}>
              Our Team
            </Link>
            <Link to="/events" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Events
            </Link>
            <Link to="/rules" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Rules
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </div>
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="container">
            <div className="breadcrumb" ref={breadcrumbRef}>
              <Link to="/">Home</Link>
              <span className="separator">›</span>
              <span className="current">Our Team</span>
            </div>
            <h1 className="hero-title" ref={titleRef}>Meet Our Team</h1>
            <p className="hero-description">
              Discover the passionate individuals who drive Tamil Pasanga VTC forward
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="main-content" ref={sectionRef}>
        <div className="container">
          {loading && (
            <div className="loading-section">
              <div className="loading-content">
                <div className="spinner"></div>
                <h3>Loading team members...</h3>
                <p>Please wait while we fetch our team data</p>
              </div>
            </div>
          )}

          {error && (
            <div className="error-section">
              <div className="error-content">
                <h3>Unable to load team data</h3>
                <p>{error}</p>
                <p>Please try refreshing the page or contact support if the issue persists.</p>
              </div>
            </div>
          )}

          {!loading && teamMembers.length > 0 && (
            <>
              <div className="section-header">
                <h2>Our Team Members</h2>
                <p>Meet the talented individuals who make our VTC community thrive</p>
                <div className="team-stats">
                  <div className="stat-item">
                    <span className="stat-number">{teamMembers.length}</span>
                    <span className="stat-label">Total Members</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{sortedRoleGroups.length}</span>
                    <span className="stat-label">Different Roles</span>
                  </div>
                </div>
              </div>

              <div className="team-content">
                {sortedRoleGroups.map(([roleName, members]) => (
                  <div key={roleName} className="role-section">
                    <div className="role-header">
                      <h3 className="role-title">{roleName}</h3>
                      <span className="member-count">{members.length} member{members.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="members-grid">
                      {members.map((member) => (
                        <div key={member.id} className="member-card">
                          <div className="member-card-inner">
                            <div className="member-avatar">
                              <div className="avatar-circle">
                                <span className="avatar-letter">
                                  {member.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="member-details">
                              <h4 className="member-name">{member.username}</h4>
                              <p className="member-role">{member.role}</p>
                              <div className="member-badges">
                                {member.role.toLowerCase().includes('managing director') && (
                                  <span className="badge leadership">👑 Leadership</span>
                                )}
                                {member.role.toLowerCase().includes('staff') && (
                                  <span className="badge staff">🛡️ Staff</span>
                                )}
                                {member.role.toLowerCase().includes('event') && (
                                  <span className="badge event">🎉 Events</span>
                                )}
                              </div>
                              <button 
                                className="profile-btn"
                                onClick={() => openUserProfile(member.user_id)}
                                title={`View ${member.username}'s profile`}
                              >
                                <span>Open Profile</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; 2025 Tamil Pasanga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default OurTeam