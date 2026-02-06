import { Link } from 'react-router-dom'
import { User, Music } from 'lucide-react'
import './ExpertCard.css'

function ExpertCard({ expert }) {
  const { id, name, expertise, instruments, photo, bio } = expert

  return (
    <div className="expert-card card">
      <div className="expert-card-header">
        <div className="expert-photo">
          {photo ? (
            <img src={photo} alt={name} />
          ) : (
            <User size={60} />
          )}
        </div>
      </div>
      <div className="expert-card-content">
        <h3>{name}</h3>
        <p className="expert-expertise">{expertise}</p>
        <div className="expert-instruments">
          <Music size={16} />
          <span>{instruments?.join(', ') || 'Various instruments'}</span>
        </div>
        <p className="expert-bio">
          {bio?.substring(0, 120)}...
        </p>
        <Link to={`/experts/${id}`} className="btn btn-outline btn-small">
          View Profile
        </Link>
      </div>
    </div>
  )
}

export default ExpertCard
