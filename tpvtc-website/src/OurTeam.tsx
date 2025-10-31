import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

  const location = useLocation();

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
          // Don't sort here - let the component handle sorting by rolePriority
          setTeamMembers(data.response.members)
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

  const rolePriority = [
    'Managing Director',
    'Developer',
    'Marketing Executive',
    'Human Resources Team',
    'Trainer',
    'Events Team',
    'Event Organizer',
    'Designing Team',
    'Media Team',
    'Media Manager',
    'Media Staff',
    'Media Editor',
    'Senior Driver',
    'Driver',
    'Trainee'
  ];

  // Sort groups by the predefined role priority
  const sortedRoleGroups = Object.entries(groupedMembers).sort(([roleA], [roleB]) => {
    const indexA = rolePriority.indexOf(roleA);
    const indexB = rolePriority.indexOf(roleB);
    
    // If role is not in priority list, put it at the end
    const finalIndexA = indexA === -1 ? 999 : indexA;
    const finalIndexB = indexB === -1 ? 999 : indexB;
    
    return finalIndexA - finalIndexB;
  });

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
    window.open(`https://truckersmp.com/user/${userId}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="about">
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
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
            </li>
            <li className="nav-item">
              <Link to="/rules" className={`nav-link ${location.pathname === '/rules' ? 'active' : ''}`}>Rules</Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}>Events</Link>
            </li>
            <li className="nav-item">
              <Link to="/team" className={`nav-link ${location.pathname === '/team' ? 'active' : ''}`}>Our Team</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
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
                <Link to="/" className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/about" className={`mobile-nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={toggleMobileMenu}>About</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/rules" className={`mobile-nav-link ${location.pathname === '/rules' ? 'active' : ''}`} onClick={toggleMobileMenu}>Rules</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/events" className={`mobile-nav-link ${location.pathname === '/events' ? 'active' : ''}`} onClick={toggleMobileMenu}>Events</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/team" className={`mobile-nav-link ${location.pathname === '/team' ? 'active' : ''}`} onClick={toggleMobileMenu}>Our Team</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/contact" className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={toggleMobileMenu}>Contact</Link>
              </li>
            </ul>
          </div>
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
            <h1 className="team-hero-title" ref={titleRef}>Meet Our Team</h1>
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