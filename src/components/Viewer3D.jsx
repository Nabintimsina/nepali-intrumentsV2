import { useMemo, useState, Suspense, Component, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, Center, Environment, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Maximize, Minimize, RotateCw } from 'lucide-react'
import './Viewer3D.css'

// Error Boundary Component
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Model Error:', error)
    console.error('Error Info:', errorInfo)
    console.error('Component Stack:', errorInfo.componentStack)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div style={{ 
            color: '#dc3545', 
            textAlign: 'center', 
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '400px'
          }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>Failed to load 3D model</p>
            <p style={{ margin: '8px 0 0', fontSize: '0.9em' }}>
              {this.state.error?.message || 'Unknown error'}
            </p>
            <p style={{ margin: '8px 0 0', fontSize: '0.85em', color: '#666' }}>
              Check browser console for details
            </p>
          </div>
        </Html>
      )
    }
    return this.props.children
  }
}

function Model({ src, rotationY }) {
  try {
    const { scene } = useGLTF(src)
    return (
      <Center>
        <primitive object={scene} rotation={[0, rotationY, 0]} />
      </Center>
    )
  } catch (error) {
    console.error('useGLTF Error:', error)
    console.error('Model source:', src)
    throw error // Re-throw to be caught by ErrorBoundary
  }
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="model-loading">Loading 3D model...</div>
    </Html>
  )
}

function ErrorFallback() {
  return (
    <Html center>
      <div style={{ 
        color: '#dc3545', 
        textAlign: 'center', 
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Failed to load 3D model</p>
        <p style={{ margin: '8px 0 0', fontSize: '0.9em' }}>
          Please ensure the file is a valid .glb or .gltf format<br/>
          (.gltf files require a .bin buffer file in the same directory)
        </p>
      </div>
    </Html>
  )
}

function Viewer3D({ modelSrc, title }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [modelError, setModelError] = useState(false)
  const rotationY = useMemo(() => (rotation * Math.PI) / 180, [rotation])

  // Debug logging
  useEffect(() => {
    console.log('Viewer3D mounted with modelSrc:', modelSrc)
    console.log('Model source type:', typeof modelSrc)
    console.log('Is valid model:', isValidModel)
  }, [modelSrc])

  // Validate model source
  const isValidModel = useMemo(() => {
    if (!modelSrc) return false
    const validExtensions = ['.glb', '.gltf', '.bin']
    const lowerSrc = modelSrc.toLowerCase()
    return validExtensions.some(ext => lowerSrc.endsWith(ext))
  }, [modelSrc])

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
        {modelSrc && isValidModel ? (
          <Canvas 
            camera={{ position: [0, 0.5, 4], fov: 50 }}
            onCreated={({ gl }) => {
              gl.physicallyCorrectLights = true
            }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 6, 4]} intensity={1} />
            <ModelErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Bounds fit clip observe margin={1.2}>
                  <Model src={modelSrc} rotationY={rotationY} />
                </Bounds>
                <Environment preset="city" />
              </Suspense>
            </ModelErrorBoundary>
            <OrbitControls enablePan enableZoom makeDefault />
          </Canvas>
        ) : modelSrc && !isValidModel ? (
          <div className="model-placeholder">
            <div className="model-icon">
              <svg viewBox="0 0 100 100" width="100" height="100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary-maroon)" strokeWidth="3" />
                <line x1="30" y1="30" x2="70" y2="70" stroke="var(--primary-maroon)" strokeWidth="3" />
                <line x1="70" y1="30" x2="30" y2="70" stroke="var(--primary-maroon)" strokeWidth="3" />
              </svg>
            </div>
            <p className="placeholder-text" style={{ color: '#dc3545' }}>
              Invalid 3D Model Format
            </p>
            <p className="integration-note">
              Only .glb, .gltf, or .bin files are supported.<br/>
              Please upload a valid glTF model file.
            </p>
          </div>
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
