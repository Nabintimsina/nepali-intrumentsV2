import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Target, Users, Cpu, Building } from 'lucide-react'
import './About.css'

function About() {
  const location = useLocation()

  useEffect(() => {
    // Scroll to element if hash exists
    if (location.hash) {
      const elementId = location.hash.replace('#', '')
      const element = document.getElementById(elementId)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 0)
      }
    } else {
      // Scroll to top if no hash
      window.scrollTo(0, 0)
    }
  }, [location])
  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <h1>About This Project</h1>
          <p>Preserving Nepal's Musical Heritage Through Digital Innovation</p>
        </div>
      </div>

      {/* Introduction */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-content">
            <h2>Project Introduction</h2>
            <p>
              The Interactive Platform for Traditional Musical Instruments of Nepal is a comprehensive 
              digital initiative dedicated to the documentation, preservation, and promotion of Nepal's 
              rich musical heritage. This project bridges traditional knowledge with modern technology, 
              making authentic cultural education accessible to people worldwide.
            </p>
            <p>
              Traditional Nepali musical instruments carry centuries of cultural wisdom, artistic 
              expression, and community identity. Many of these instruments face the risk of being 
              forgotten as modernization accelerates. Through detailed 3D models, authentic recordings, 
              expert insights, and educational resources, we aim to ensure these precious traditions 
              thrive for generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section objectives-section bg-secondary">
        <div className="container">
          <h2 className="section-title">
            <Target size={28} />
            Project Objectives
          </h2>
          <div className="grid grid-2 objectives-grid">
            <div className="objective-card">
              <h3>Cultural Preservation</h3>
              <p>
                Document traditional instruments, playing techniques, and cultural contexts before 
                they are lost. Create a permanent digital archive accessible to researchers, 
                musicians, and cultural enthusiasts.
              </p>
            </div>
            <div className="objective-card">
              <h3>Educational Access</h3>
              <p>
                Provide free, high-quality educational resources about Nepali musical traditions. 
                Make learning accessible to students, researchers, and music lovers regardless of 
                geographic location.
              </p>
            </div>
            <div className="objective-card">
              <h3>Expert Knowledge Sharing</h3>
              <p>
                Connect master musicians and scholars with new generations of learners. Create a 
                platform where traditional knowledge can be passed down through digital means.
              </p>
            </div>
            <div className="objective-card">
              <h3>Cultural Promotion</h3>
              <p>
                Raise global awareness about Nepal's musical heritage. Celebrate the diversity and 
                richness of traditional Nepali music and instruments on an international stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="section users-section">
        <div className="container">
          <h2 className="section-title">
            <Users size={28} />
            Target Users
          </h2>
          <div className="users-list">
            <div className="user-card">
              <h4>Students & Learners</h4>
              <p>
                Individuals interested in learning about traditional Nepali music, whether for 
                academic study, personal interest, or musical practice.
              </p>
            </div>
            <div className="user-card">
              <h4>Researchers & Scholars</h4>
              <p>
                Ethnomusicologists, anthropologists, and cultural researchers studying South Asian 
                musical traditions and cultural heritage.
              </p>
            </div>
            <div className="user-card">
              <h4>Musicians & Artists</h4>
              <p>
                Professional and amateur musicians seeking to understand, learn, or incorporate 
                traditional Nepali instruments into their practice.
              </p>
            </div>
            <div className="user-card">
              <h4>Educators & Institutions</h4>
              <p>
                Schools, universities, and cultural organizations looking for teaching resources 
                about Nepali music and cultural heritage.
              </p>
            </div>
            <div className="user-card">
              <h4>Cultural Enthusiasts</h4>
              <p>
                Anyone with an interest in traditional music, cultural preservation, or Nepali 
                heritage and traditions.
              </p>
            </div>
            <div className="user-card">
              <h4>Diaspora Communities</h4>
              <p>
                Nepali communities abroad seeking to maintain connection with their cultural roots 
                and pass traditions to younger generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Institutions */}
      <section className="section institutions-section">
        <div className="container">
          <h2 className="section-title">
            <Building size={28} />
            Supporting Institutions
          </h2>
          <div className="institutions-list">
            <div className="institution-card">
              <h4>Ministry of Education, Science and Technology (MoEST)</h4>
              <p>Government of Nepal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Team */}
      <section id="development-team" className="section development-team-section">
        <div className="container">
          <h2 className="section-title">Development Team</h2>
          <div className="team-content">
            <p className="team-intro">
              This platform was developed by a dedicated team of engineering students committed to 
              preserving Nepal's cultural heritage through technology.
            </p>
            
            <div className="developers-list">
              <div className="developer-card">
                <h3>Nabin Timsina</h3>
                <p className="developer-education">
                  Bachelor of Engineering (Electronics, Communication & Information Engineering)<br/>
                  Advanced College of Engineering and Management
                </p>
              </div>
              
              <div className="developer-card">
                <h3>Yuttena Singh Dangol</h3>
                <p className="developer-education">
                  Bachelor of Engineering (Electronics, Communication & Information Engineering)<br/>
                  Advanced College of Engineering and Management
                </p>
              </div>
              
              <div className="developer-card">
                <h3>Prepshuna Dhakal</h3>
                <p className="developer-education">
                  Bachelor of Engineering (Electronics, Communication & Information Engineering)<br/>
                  Advanced College of Engineering and Management
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Mission</h2>
            <p>
              Help us preserve and promote Nepal's musical heritage. Whether you're a musician, 
              researcher, donor, or enthusiast, there are many ways to contribute to this important work.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-large">Support This Project</button>
              <button className="btn btn-outline btn-large">Get Involved</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
