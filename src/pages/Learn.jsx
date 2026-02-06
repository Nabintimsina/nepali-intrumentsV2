import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/client'
import './Learn.css'

function Learn() {
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadTopics = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await api.get('learning/')
        const items = Array.isArray(response) ? response : response?.results || []
        if (isMounted) {
          setTopics(items)
          setSelectedTopic(items[0] || null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setTopics([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTopics()

    return () => {
      isMounted = false
    }
  }, [])

  const topicIndex = useMemo(() => {
    return topics.findIndex((topic) => topic.id === selectedTopic?.id)
  }, [topics, selectedTopic])

  return (
    <div className="learn-page">
      <div className="page-header">
        <div className="container">
          <h1>Learn About Nepali Music</h1>
          <p>Comprehensive educational resources on traditional Nepali musical instruments</p>
        </div>
      </div>

      <div className="learn-content container">
        {/* Left Topic List */}
        <aside className="topics-sidebar">
          <h3>Topics</h3>
          {isLoading ? (
            <p>Loading lessons...</p>
          ) : error ? (
            <p>Unable to load lessons. {error}</p>
          ) : (
            <nav className="topics-list">
              {topics.map(topic => (
                <button
                  key={topic.id}
                  className={`topic-item ${selectedTopic?.id === topic.id ? 'active' : ''}`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  <span className="topic-number">{topic.order ?? topic.id}</span>
                  <span className="topic-title">{topic.title}</span>
                </button>
              ))}
            </nav>
          )}
        </aside>

        {/* Right Content Viewer */}
        <main className="content-viewer">
          {selectedTopic ? (
            <>
              <article className="content-article">
                <h2>{selectedTopic.title}</h2>
                <div 
                  className="content-body"
                  dangerouslySetInnerHTML={{ 
                    __html: selectedTopic.content
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }}
                />
              </article>

              <div className="content-nav">
                {topicIndex > 0 && (
                  <button 
                    className="btn btn-outline"
                    onClick={() => setSelectedTopic(topics[topicIndex - 1])}
                  >
                    ← Previous Topic
                  </button>
                )}
                {topicIndex < topics.length - 1 && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => setSelectedTopic(topics[topicIndex + 1])}
                  >
                    Next Topic →
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="content-article">
              <h2>No lessons available</h2>
              <p>Add learning content from the admin panel to get started.</p>
            </div>
          )}

          <div className="additional-resources">
            <h3>Additional Resources</h3>
            <div className="resource-links">
              <a href="#video-tutorials" className="resource-card">
                <h4>Video Tutorials</h4>
                <p>Watch demonstrations and learn from masters</p>
              </a>
              <a href="#practice-exercises" className="resource-card">
                <h4>Practice Exercises</h4>
                <p>Downloadable exercises for beginners</p>
              </a>
              <a href="#reading-materials" className="resource-card">
                <h4>Reading Materials</h4>
                <p>Research papers and documentation</p>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Learn
