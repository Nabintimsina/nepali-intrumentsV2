import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Tag, User } from 'lucide-react'
import Viewer3D from '../components/Viewer3D'
import AudioPlayer from '../components/AudioPlayer'
import { instrumentsData, expertsData } from '../data/mockData'
import './InstrumentDetail.css'

function InstrumentDetail() {
  const { id } = useParams()
  const instrument = instrumentsData.find(inst => inst.id === parseInt(id))

  if (!instrument) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Instrument not found</h2>
        <Link to="/instruments" className="btn btn-primary">
          Back to Instruments
        </Link>
      </div>
    )
  }

  // Find experts associated with this instrument
  const relatedExperts = expertsData.filter(expert => 
    expert.linkedInstruments?.includes(instrument.id)
  )

  return (
    <div className="instrument-detail-page">
      {/* Back Button */}
      <div className="container">
        <Link to="/instruments" className="back-link">
          <ArrowLeft size={20} />
          Back to Instruments
        </Link>
      </div>

      {/* Instrument Header */}
      <div className="instrument-header">
        <div className="container">
          <div className="header-content">
            <div className="header-badges">
              <span className="badge badge-category">
                <Tag size={16} />
                {instrument.category}
              </span>
              <span className="badge badge-region">
                <MapPin size={16} />
                {instrument.region}
              </span>
            </div>
            <h1>{instrument.name}</h1>
            <p className="instrument-intro">{instrument.description}</p>
          </div>
        </div>
      </div>

      {/* 3D Viewer and Sound Section */}
      <section className="section viewer-section">
        <div className="container">
          <div className="viewer-grid">
            <div className="viewer-container">
              <h2>3D Model</h2>
              <Viewer3D modelSrc={instrument.model3D} title={instrument.name} />
            </div>
            <div className="sound-container">
              <h2>Authentic Sound</h2>
              <AudioPlayer audioSrc={instrument.sound} title={`${instrument.name} Sample`} />
              <div className="sound-info">
                <h3>About the Sound</h3>
                <p>
                  This is an authentic recording of the {instrument.name} being played by 
                  a master musician. The sound captures the unique tonal qualities and 
                  resonance characteristic of this traditional instrument.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="section info-section bg-secondary">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3>History & Origin</h3>
              <p>{instrument.history}</p>
            </div>
            <div className="info-card">
              <h3>Cultural Significance</h3>
              <p>{instrument.culturalSignificance}</p>
            </div>
            <div className="info-card">
              <h3>Materials & Construction</h3>
              <p>{instrument.materials}</p>
            </div>
            <div className="info-card">
              <h3>Playing Technique</h3>
              <p>{instrument.playingTechnique}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Insights Section */}
      {relatedExperts.length > 0 && (
        <section className="section experts-section">
          <div className="container">
            <h2 className="section-title">Learn from Experts</h2>
            <p className="section-subtitle">
              Insights from master musicians who specialize in this instrument
            </p>
            <div className="experts-list">
              {relatedExperts.map(expert => (
                <div key={expert.id} className="expert-insight-card">
                  <div className="expert-info">
                    <div className="expert-avatar">
                      {expert.photo ? (
                        <img src={expert.photo} alt={expert.name} />
                      ) : (
                        <User size={40} />
                      )}
                    </div>
                    <div>
                      <h3>{expert.name}</h3>
                      <p className="expert-title">{expert.expertise}</p>
                    </div>
                  </div>
                  <p className="expert-bio">{expert.bio}</p>
                  <Link to={`/experts/${expert.id}`} className="btn btn-outline btn-small">
                    View Full Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Instruments */}
      <section className="section related-section bg-secondary">
        <div className="container">
          <h2 className="section-title">Explore More Instruments</h2>
          <div className="related-links">
            <Link to="/instruments" className="btn btn-primary">
              View All Instruments
            </Link>
            <Link to="/learn" className="btn btn-outline">
              Learn About Nepali Music
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InstrumentDetail
