import { Target, Users, Cpu, Building } from 'lucide-react'
import './About.css'

function About() {
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

      {/* Technology Used */}
      <section className="section tech-section bg-secondary">
        <div className="container">
          <h2 className="section-title">
            <Cpu size={28} />
            Technology Stack
          </h2>
          <div className="tech-content">
            <div className="tech-category">
              <h3>Frontend Development</h3>
              <ul>
                <li><strong>React 18:</strong> Modern component-based UI development</li>
                <li><strong>React Router:</strong> Client-side routing and navigation</li>
                <li><strong>Vite:</strong> Fast build tool and development server</li>
                <li><strong>CSS3:</strong> Custom styling with traditional Nepali color themes</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Planned Integrations</h3>
              <ul>
                <li><strong>Three.js / React Three Fiber:</strong> Interactive 3D model visualization</li>
                <li><strong>Web Audio API:</strong> Enhanced audio playback and manipulation</li>
                <li><strong>Backend API:</strong> Node.js/Express or Python/Django for data management</li>
                <li><strong>Database:</strong> MongoDB or PostgreSQL for content storage</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Future Features</h3>
              <ul>
                <li>User authentication and personalized learning paths</li>
                <li>Interactive 3D model manipulation</li>
                <li>Video streaming for expert demonstrations</li>
                <li>Multi-language support (Nepali, English, Hindi)</li>
                <li>Mobile applications (iOS and Android)</li>
              </ul>
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
              <h4>Ministry of Culture, Tourism & Civil Aviation</h4>
              <p>Government of Nepal</p>
            </div>
            <div className="institution-card">
              <h4>Nepal Music Academy</h4>
              <p>Education & Research</p>
            </div>
            <div className="institution-card">
              <h4>UNESCO Nepal</h4>
              <p>Cultural Preservation Support</p>
            </div>
            <div className="institution-card">
              <h4>Tribhuvan University</h4>
              <p>Department of Music</p>
            </div>
            <div className="institution-card">
              <h4>Nepal Academy of Music and Drama</h4>
              <p>Traditional Arts Preservation</p>
            </div>
            <div className="institution-card">
              <h4>Various Cultural Organizations</h4>
              <p>Community Partners</p>
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
