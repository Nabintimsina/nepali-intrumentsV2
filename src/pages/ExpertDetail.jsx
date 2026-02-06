import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Award, Music } from 'lucide-react'
import AudioPlayer from '../components/AudioPlayer'
import { expertsData, instrumentsData } from '../data/mockData'
import './ExpertDetail.css'

function ExpertDetail() {
  const { id } = useParams()
  const expert = expertsData.find(exp => exp.id === parseInt(id))

  if (!expert) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Expert not found</h2>
        <Link to="/experts" className="btn btn-primary">
          Back to Experts
        </Link>
      </div>
    )
  }

  // Find instruments this expert specializes in
  const expertInstruments = instrumentsData.filter(inst => 
    expert.linkedInstruments?.includes(inst.id)
  )

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
                {expert.instruments.map((inst, index) => (
                  <span key={index} className="instrument-tag">{inst}</span>
                ))}
              </div>
              <a href={`mailto:${expert.contact}`} className="contact-button">
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
            <p className="bio-detailed">{expert.detailedBio}</p>
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
            {expert.achievements.map((achievement, index) => (
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
            <AudioPlayer 
              audioSrc={expert.teachingAudio} 
              title={`${expert.name} - Teaching Excerpt`}
            />
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
                  <img src={instrument.image} alt={instrument.name} />
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
