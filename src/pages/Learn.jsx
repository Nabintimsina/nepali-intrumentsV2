import { useState } from 'react'
import { learningTopics } from '../data/mockData'
import './Learn.css'

function Learn() {
  const [selectedTopic, setSelectedTopic] = useState(learningTopics[0])

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
          <nav className="topics-list">
            {learningTopics.map(topic => (
              <button
                key={topic.id}
                className={`topic-item ${selectedTopic.id === topic.id ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic)}
              >
                <span className="topic-number">{topic.id}</span>
                <span className="topic-title">{topic.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Content Viewer */}
        <main className="content-viewer">
          <article className="content-article">
            <h2>{selectedTopic.title}</h2>
            <div 
              className="content-body"
              dangerouslySetInnerHTML={{ 
                __html: selectedTopic.content.replace(/\n\n/g, '</p><p>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
              }}
            />
          </article>

          <div className="content-nav">
            {selectedTopic.id > 1 && (
              <button 
                className="btn btn-outline"
                onClick={() => setSelectedTopic(learningTopics[selectedTopic.id - 2])}
              >
                ← Previous Topic
              </button>
            )}
            {selectedTopic.id < learningTopics.length && (
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedTopic(learningTopics[selectedTopic.id])}
              >
                Next Topic →
              </button>
            )}
          </div>

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
