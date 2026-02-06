import { useState } from 'react'
import { Maximize, Minimize, RotateCw } from 'lucide-react'
import './Viewer3D.css'

function Viewer3D({ modelSrc, title }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [rotation, setRotation] = useState(0)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const rotate = () => {
    setRotation(rotation + 90)
  }

  return (
    <div className={`viewer-3d ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="viewer-header">
        <h3>{title}</h3>
        <div className="viewer-controls">
          <button onClick={rotate} aria-label="Rotate" title="Rotate">
            <RotateCw size={20} />
          </button>
          <button onClick={toggleFullscreen} aria-label="Toggle fullscreen" title="Fullscreen">
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>

      <div className="viewer-canvas">
        {/* Placeholder for 3D model viewer */}
        {/* In production, integrate libraries like Three.js or react-three-fiber */}
        <div 
          className="model-placeholder"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="model-icon">
            <svg viewBox="0 0 100 100" width="100" height="100">
              <polygon points="50,10 90,70 10,70" fill="var(--primary-maroon)" opacity="0.3" />
              <polygon points="50,30 70,60 30,60" fill="var(--accent-gold)" opacity="0.5" />
              <circle cx="50" cy="50" r="20" fill="var(--primary-maroon)" opacity="0.4" />
            </svg>
          </div>
          <p className="placeholder-text">
            3D Model Viewer
            <br />
            <small>Path: {modelSrc}</small>
          </p>
          <p className="integration-note">
            Integrate with Three.js, React Three Fiber, or Model Viewer library
          </p>
        </div>
      </div>

      <div className="viewer-instructions">
        <p>
          <strong>Controls:</strong> Click and drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </div>
    </div>
  )
}

export default Viewer3D
