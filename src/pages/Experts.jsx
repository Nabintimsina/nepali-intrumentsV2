import { useEffect, useState } from 'react'
import ExpertCard from '../components/ExpertCard'
import { api } from '../api/client'
import './Experts.css'

function Experts() {
  const [experts, setExperts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadExperts = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await api.get('experts/')
        const items = Array.isArray(response) ? response : response?.results || []
        if (isMounted) {
          setExperts(items)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setExperts([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadExperts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="experts-page">
      <div className="page-header">
        <div className="container">
          <h1>Meet the Experts</h1>
          <p>Learn from master musicians and scholars preserving Nepal's musical traditions</p>
        </div>
      </div>

      <section className="section experts-section">
        <div className="container">
          <div className="experts-intro">
            <p>
              Our experts are master musicians, ethnomusicologists, and cultural preservationists 
              who have dedicated their lives to traditional Nepali music. Each brings unique knowledge 
              and decades of experience in their respective fields.
            </p>
          </div>

          {isLoading ? (
            <div className="no-results">
              <p>Loading experts...</p>
            </div>
          ) : error ? (
            <div className="no-results">
              <p>Unable to load experts. {error}</p>
            </div>
          ) : (
            <div className="grid grid-3 experts-grid">
              {experts.map(expert => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Become an Expert Section */}
      <section className="section become-expert-section bg-secondary">
        <div className="container">
          <div className="become-expert-content">
            <h2>Share Your Expertise</h2>
            <p>
              Are you a master musician, researcher, or cultural expert? 
              Join our platform to share your knowledge and help preserve Nepal's musical heritage.
            </p>
            <div className="expert-benefits">
              <div className="benefit">
                <h4>Share Knowledge</h4>
                <p>Contribute to cultural preservation through teaching and documentation</p>
              </div>
              <div className="benefit">
                <h4>Reach Students Globally</h4>
                <p>Connect with learners from around the world interested in Nepali music</p>
              </div>
              <div className="benefit">
                <h4>Preserve Traditions</h4>
                <p>Help ensure traditional techniques and knowledge are passed to future generations</p>
              </div>
            </div>
            <button className="btn btn-primary btn-large">
              Apply to Become an Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Experts
