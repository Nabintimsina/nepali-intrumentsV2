import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Award, Music } from 'lucide-react'
import AudioPlayer from '../components/AudioPlayer'
import { api } from '../api/client'
import './ExpertDetail.css'

function ExpertDetail() {
  const { id } = useParams()
  const [expert, setExpert] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadExpert = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await api.get(`experts/${id}/`)
        if (isMounted) {
          setExpert(response)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setExpert(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadExpert()

    return () => {
      isMounted = false
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Loading expert profile...</h2>
      </div>
    )
  }

  if (error || !expert) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Expert not found</h2>
        {error && <p>{error}</p>}
        <Link to="/experts" className="btn btn-primary">
          Back to Experts
        </Link>
      </div>
    )
  }

  const expertInstruments = expert.instruments || []

  return (
    <div className="expert-detail-page">
      {/* Back Button */}
      <div className="container">
        <Link to="/experts" className="back-link">
          <ArrowLeft size={20} />
          Back to Experts
        </Link>
      </div>

      {/* Expert Profile Header */}
      <div className="expert-profile-header">
        <div className="container">
          <div className="profile-content">
            <div className="profile-photo-large">
              {expert.photo ? (
                <img src={expert.photo} alt={expert.name} />
              ) : (
                <div className="placeholder-avatar">
                  {expert.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <div className="profile-info">
              <h1>{expert.name}</h1>
              <p className="expert-expertise-large">{expert.expertise}</p>
              <div className="expert-instruments-tags">
                <Music size={18} />
                {expertInstruments.map((inst, index) => (
                  <span key={index} className="instrument-tag">{inst.name || inst}</span>
                ))}
              </div>
              <a href={`mailto:${expert.contact_email}`} className="contact-button">
                <Mail size={18} />
                Contact {expert.name.split(' ')[0]}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Biography Section */}
      <section className="section bio-section">
        <div className="container">
          <h2>Biography</h2>
          <div className="bio-content">
            <p className="bio-quote">"{expert.bio}"</p>
            <p className="bio-detailed">{expert.detailed_bio}</p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section achievements-section bg-secondary">
        <div className="container">
          <h2 className="section-title">
            <Award size={28} />
            Achievements & Recognition
          </h2>
          <ul className="achievements-list">
            {expert.achievements?.map((achievement, index) => (
              <li key={index} className="achievement-item">
                <Award size={20} className="achievement-icon" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Teaching Sample Section */}
      <section className="section teaching-section">
        <div className="container">
          <h2>Teaching Sample</h2>
          <p className="teaching-intro">
            Listen to {expert.name.split(' ')[0]} explain techniques and cultural context
          </p>
          <div className="audio-container">
            {expert.teaching_audio ? (
              <AudioPlayer 
                audioSrc={expert.teaching_audio} 
                title={`${expert.name} - Teaching Excerpt`}
              />
            ) : (
              <p>No teaching audio available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Specialized Instruments */}
      <section className="section specialized-instruments bg-secondary">
        <div className="container">
          <h2 className="section-title">Specialized Instruments</h2>
          <p className="section-subtitle">
            Instruments {expert.name.split(' ')[0]} has mastered
          </p>
          <div className="instruments-list">
            {expertInstruments.map(instrument => (
              <Link 
                key={instrument.id} 
                to={`/instruments/${instrument.id}`}
                className="instrument-link-card"
              >
                <div className="instrument-preview">
                  <img src={instrument.image || '/placeholder-instrument.jpg'} alt={instrument.name} />
                </div>
                <div className="instrument-link-info">
                  <h3>{instrument.name}</h3>
                  <p>{instrument.category} • {instrument.region}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ExpertDetail
