import { useMemo, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Maximize, Minimize, RotateCw } from 'lucide-react'
import './Viewer3D.css'

function Model({ src, rotationY }) {
  const { scene } = useGLTF(src)
  return <primitive object={scene} rotation={[0, rotationY, 0]} />
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="model-loading">Loading 3D model...</div>
    </Html>
  )
}

function Viewer3D({ modelSrc, title }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [rotation, setRotation] = useState(0)
  const rotationY = useMemo(() => (rotation * Math.PI) / 180, [rotation])

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
        {modelSrc ? (
          <Canvas camera={{ position: [0, 1.2, 3], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 6, 4]} intensity={1} />
            <Suspense fallback={<LoadingFallback />}>
              <Model src={modelSrc} rotationY={rotationY} />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls enablePan enableZoom />
          </Canvas>
        ) : (
          <div className="model-placeholder">
            <div className="model-icon">
              <svg viewBox="0 0 100 100" width="100" height="100">
                <polygon points="50,10 90,70 10,70" fill="var(--primary-maroon)" opacity="0.3" />
                <polygon points="50,30 70,60 30,60" fill="var(--accent-gold)" opacity="0.5" />
                <circle cx="50" cy="50" r="20" fill="var(--primary-maroon)" opacity="0.4" />
              </svg>
            </div>
            <p className="placeholder-text">
              3D Model Unavailable
            </p>
            <p className="integration-note">
              Upload a model file to enable interactive 3D viewing.
            </p>
          </div>
        )}
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
