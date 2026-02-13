import { useState } from 'react'
import { ChevronDown, ChevronUp, Play } from 'lucide-react'
import './VideoTutorial.css'

function VideoTutorial({ tutorials = [] }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedTutorial, setSelectedTutorial] = useState(tutorials.length > 0 ? tutorials[0] : null)

  if (!tutorials || tutorials.length === 0) {
    return null
  }

  const extractVideoId = (url) => {
    if (!url) return null
    // Handle YouTube URLs
    let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    if (match && match[1]) return match[1]
    // If it's already a video ID or direct URL
    return url.includes('youtube') ? null : url
  }

  const getEmbedUrl = (url) => {
    const videoId = extractVideoId(url)
    if (videoId && url.includes('youtube')) {
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  const formatDuration = (duration) => {
    if (!duration) return ''
    return duration.includes(':') ? duration : `${duration} minutes`
  }

  if (!selectedTutorial) {
    return null
  }

  return (
    <section className="section video-tutorial-section">
      <div className="container">
        <div className="tutorial-header" onClick={() => setIsExpanded(!isExpanded)}>
          <h2 className="section-title">
            <Play size={24} />
            Video Tutorials
          </h2>
          <button className="expand-btn" aria-label="Toggle section">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>

        {isExpanded && (
          <>
            {/* Video Player */}
            <div className="video-player-container">
              <div className="video-frame">
                {selectedTutorial.video_url ? (
                  <iframe
                    src={getEmbedUrl(selectedTutorial.video_url)}
                    title={selectedTutorial.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="video-placeholder">
                    <p>Video not available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tutorial Info */}
            <div className="tutorial-info">
              <h3>{selectedTutorial.title}</h3>
              <div className="tutorial-meta">
                <span className="instructor">
                  <strong>Instructor:</strong> {selectedTutorial.instructor_name}
                </span>
                {formatDuration(selectedTutorial.duration) && (
                  <span className="duration">
                    <strong>Duration:</strong> {formatDuration(selectedTutorial.duration)}
                  </span>
                )}
              </div>
              <p className="tutorial-description">{selectedTutorial.description}</p>
            </div>

            {/* Tutorial List */}
            {tutorials.length > 1 && (
              <div className="tutorials-list">
                <h4>More Tutorials</h4>
                <div className="tutorial-cards">
                  {tutorials.map((tutorial) => (
                    <div
                      key={tutorial.id}
                      className={`tutorial-card ${selectedTutorial.id === tutorial.id ? 'active' : ''}`}
                      onClick={() => setSelectedTutorial(tutorial)}
                    >
                      <div className="tutorial-card-icon">
                        <Play size={16} />
                      </div>
                      <div className="tutorial-card-content">
                        <h5>{tutorial.title}</h5>
                        <p>{tutorial.instructor_name}</p>
                        {formatDuration(tutorial.duration) && (
                          <span className="tutorial-card-duration">{formatDuration(tutorial.duration)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default VideoTutorial
