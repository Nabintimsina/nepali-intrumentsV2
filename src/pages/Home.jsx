import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Music, Users, Box, BookOpen } from 'lucide-react'
import InstrumentCard from '../components/InstrumentCard'
import { api } from '../api/client'
import './Home.css'

function Home() {
  const [featuredInstruments, setFeaturedInstruments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadFeatured = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await api.get('instruments/', { is_featured: true })
        const items = Array.isArray(response) ? response : response?.results || []
        if (isMounted) {
          setFeaturedInstruments(items.slice(0, 3))
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadFeatured()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <h1 className="hero-title">Traditional Musical Instruments of Nepal</h1>
          <p className="hero-subtitle">
            Interactive Digital Learning Platform for Cultural Preservation and Education
          </p>
          <div className="hero-buttons">
            <Link to="/instruments" className="btn btn-primary btn-large">
              Explore Instruments <ArrowRight size={20} />
            </Link>
            <Link to="/learn" className="btn btn-outline btn-large">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Project Section */}
      <section className="section why-section bg-secondary">
        <div className="container">
          <h2 className="section-title">Why This Project?</h2>
          <p className="section-subtitle">
            Preserving Nepal's rich musical heritage through digital innovation
          </p>
          <div className="grid grid-4">
            <div className="feature-card">
              <div className="feature-icon">
                <Music size={40} />
              </div>
              <h3>Cultural Preservation</h3>
              <p>
                Document and safeguard traditional instruments and playing techniques 
                for future generations through digital archiving.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <BookOpen size={40} />
              </div>
              <h3>Digital Learning</h3>
              <p>
                Make traditional music education accessible to everyone through 
                interactive online resources and expert guidance.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Box size={40} />
              </div>
              <h3>3D Visualization</h3>
              <p>
                Explore instruments in detail with interactive 3D models, 
                understanding construction and playing techniques.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={40} />
              </div>
              <h3>Expert Knowledge</h3>
              <p>
                Learn directly from master musicians and scholars who have 
                dedicated their lives to these traditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instruments Section */}
      <section className="section featured-section">
        <div className="container">
          <h2 className="section-title">Featured Instruments</h2>
          <p className="section-subtitle">
            Discover traditional Nepali instruments from different regions and categories
          </p>
          {isLoading ? (
            <div className="text-center">
              <p>Loading featured instruments...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p>Unable to load featured instruments. {error}</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {featuredInstruments.map(instrument => (
                <InstrumentCard key={instrument.id} instrument={instrument} />
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <Link to="/instruments" className="btn btn-secondary">
              View All Instruments
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-it-works bg-secondary">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Select Instrument</h3>
              <p>Browse our collection of traditional Nepali instruments organized by category, region, or type.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Explore 3D & Sound</h3>
              <p>Interact with detailed 3D models and listen to authentic recordings of each instrument.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Learn from Experts</h3>
              <p>Watch videos and read insights from master musicians and cultural scholars.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Explore?</h2>
            <p>
              Join us in preserving and celebrating Nepal's musical heritage. 
              Start your journey into traditional Nepali music today.
            </p>
            <div className="cta-buttons">
              <Link to="/instruments" className="btn btn-primary btn-large">
                Start Exploring
              </Link>
              <Link to="/about" className="btn btn-outline btn-large">
                About This Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
