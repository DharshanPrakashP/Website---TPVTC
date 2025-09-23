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
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  // Sort groups by the role order
  const sortedRoleGroups = Object.entries(groupedMembers).sort(([, membersA], [, membersB]) => {
    const orderA = membersA[0]?.roles?.[0]?.order || 999
    const orderB = membersB[0]?.roles?.[0]?.order || 999
    return orderA - orderB
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
    <div className="our-team">
      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/TP_NEW_WB_PNGxxxhdpi.png" alt="Tamil Pasanga VTC" />
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
          <div className="nav-toggle" onClick={toggleMobileMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="team-hero">
        <div className="hero-content">
          <h1>Our Team</h1>
          <p>Meet the dedicated members who make Tamil Pasanga VTC a thriving community</p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="team-section" ref={sectionRef}>
        <div className="container">
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading team members...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>Error: {error}</p>
              <p>Showing offline data for demonstration.</p>
            </div>
          )}

          {!loading && teamMembers.length > 0 && (
            <>
              <div className="team-stats">
                <div className="stat">
                  <span className="stat-number">{teamMembers.length}</span>
                  <span className="stat-label">Total Members</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{sortedRoleGroups.length}</span>
                  <span className="stat-label">Different Roles</span>
                </div>
              </div>

              {sortedRoleGroups.map(([roleName, members]) => (
                <div key={roleName} className="role-section">
                  <h2 className="team-category-header">{roleName}</h2>
                  <div className="team-grid">
                    {members.map((member) => (
                      <div key={member.id} className="team-member-card">
                        <div className="member-avatar">
                          <div className="avatar-placeholder">
                            {member.username.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="member-info">
                          <h3 className="member-name">{member.username}</h3>
                          <p className="team-role">{member.role}</p>
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
                            className="user-profile-btn"
                            onClick={() => openUserProfile(member.user_id)}
                            title="View User Profile"
                          >
                            Open Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Tamil Pasanga VTC</h3>
              <p>A premier virtual trucking company dedicated to bringing together Tamil-speaking trucking enthusiasts from around the world.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/our-team">Our Team</Link></li>
                <li><Link to="/events">Events</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Join our community and start your trucking journey with us!</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Tamil Pasanga VTC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default OurTeam