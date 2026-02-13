import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Settings2, ChevronDown, ChevronUp } from 'lucide-react'
import { PitchDetector } from '../utils/pitchDetection'
import './Tuner.css'

function Tuner({ tunerConfig = null }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const [frequency, setFrequency] = useState(null)
  const [closestNote, setClosestNote] = useState(null)
  const [error, setError] = useState('')
  const [permission, setPermission] = useState('pending')

  const audioContextRef = useRef(null)
  const pitchDetectorRef = useRef(null)
  const animationFrameRef = useRef(null)
  const streamRef = useRef(null)

  // Default tuning (Guitar standard)
  const defaultTuning = {
    tuning_name: 'Guitar Standard',
    notes: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
    frequencies: [82.41, 110.00, 146.83, 196.00, 246.94, 329.63]
  }

  const activeTuning = tunerConfig || defaultTuning

  // Frequency-note mapping
  const getFrequencyMap = () => {
    return activeTuning.frequencies.map((freq, idx) => ({
      note: activeTuning.notes[idx],
      frequency: freq
    }))
  }

  const startListening = async () => {
    try {
      setError('')

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }

      if (!pitchDetectorRef.current) {
        pitchDetectorRef.current = new PitchDetector(audioContextRef.current)
      }

      const stream = await pitchDetectorRef.current.setupMicrophone()
      streamRef.current = stream
      setPermission('granted')
      setIsListening(true)

      const detectPitch = () => {
        const freq = pitchDetectorRef.current.getFrequency()

        if (freq > -1) {
          setFrequency(freq)

          const frequencyMap = getFrequencyMap()
          const closest = pitchDetectorRef.current.findClosestNote(freq, frequencyMap)
          setClosestNote(closest)
        } else {
          setFrequency(null)
          setClosestNote(null)
        }

        animationFrameRef.current = requestAnimationFrame(detectPitch)
      }

      animationFrameRef.current = requestAnimationFrame(detectPitch)
    } catch (err) {
      setError(err.message)
      setPermission('denied')
      setIsListening(false)
    }
  }

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }

    setIsListening(false)
    setFrequency(null)
    setClosestNote(null)
  }

  const getTuningStatus = () => {
    if (!closestNote) return 'waiting'
    if (Math.abs(closestNote.cents) < 5) return 'in-tune'
    if (closestNote.cents > 0) return 'sharp'
    return 'flat'
  }

  const getStatusMessage = () => {
    const status = getTuningStatus()
    if (status === 'waiting') return 'Listening...'
    if (status === 'in-tune') return '✓ In Tune'
    if (status === 'sharp') return '↑ Too Sharp'
    return '↓ Too Flat'
  }

  const getTuningBar = () => {
    if (!closestNote) return 0
    // Convert cents to a 0-100 scale (±50 cents = 0-100)
    const cents = closestNote.cents
    return Math.max(0, Math.min(100, 50 + cents))
  }

  return (
    <section className="section tuner-section">
      <div className="container">
        <div className="tuner-header" onClick={() => setIsExpanded(!isExpanded)}>
          <h2 className="section-title">
            <Settings2 size={24} />
            Instrument Tuner
          </h2>
          <button className="expand-btn" aria-label="Toggle tuner">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>

        {isExpanded && (
          <div className="tuner-content">
            {/* Tuning Info */}
            <div className="tuning-info">
              <p className="tuning-name">
                <strong>Tuning:</strong> {activeTuning.tuning_name}
              </p>
              <div className="target-notes">
                <strong>Target Notes:</strong>
                <span className="notes-list">
                  {activeTuning.notes.map((note, idx) => (
                    <span key={idx} className="note-badge">
                      {note}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            {/* Permission & Error */}
            {error && (
              <div className="error-message">
                <p>{error}</p>
                {permission === 'denied' && (
                  <p className="help-text">
                    Please allow microphone access in your browser settings to use the tuner.
                  </p>
                )}
              </div>
            )}

            {/* Main Tuner Interface */}
            {!error && (
              <div className="tuner-interface">
                {/* Frequency Display */}
                <div className="frequency-display">
                  {frequency ? (
                    <>
                      <div className="frequency-value">{frequency.toFixed(1)} Hz</div>
                      {closestNote && (
                        <div className="note-info">
                          <div className={`note-name ${getTuningStatus()}`}>
                            {closestNote.note}
                          </div>
                          <div className="cent-diff">
                            {closestNote.cents > 0 ? '+' : ''}
                            {closestNote.cents.toFixed(1)} ¢
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="frequency-value waiting">--</div>
                  )}
                </div>

                {/* Tuning Meter */}
                <div className="tuning-meter">
                  <div className="meter-label">
                    <span>Flat</span>
                    <span className={`status ${getTuningStatus()}`}>{getStatusMessage()}</span>
                    <span>Sharp</span>
                  </div>
                  <div className="meter-bar">
                    <div className="meter-scale">
                      {[0, 25, 50, 75, 100].map((val) => (
                        <div key={val} className="scale-mark" style={{ left: `${val}%` }} />
                      ))}
                    </div>
                    <div className="meter-fill">
                      <div
                        className={`meter-needle ${getTuningStatus()}`}
                        style={{ left: `${getTuningBar()}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Tuning Status Indicator */}
                <div className={`tuning-indicator ${getTuningStatus()}`}>
                  <div className="indicator-dot" />
                  <span>{getStatusMessage()}</span>
                </div>

                {/* Control Button */}
                <button
                  className={`mic-button ${isListening ? 'listening' : ''}`}
                  onClick={isListening ? stopListening : startListening}
                  aria-label={isListening ? 'Stop listening' : 'Start listening'}
                >
                  {isListening ? (
                    <>
                      <MicOff size={24} />
                      <span>Stop Tuning</span>
                    </>
                  ) : (
                    <>
                      <Mic size={24} />
                      <span>Start Tuning</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Instructions */}
            <div className="tuner-instructions">
              <h4>How to use:</h4>
              <ul>
                <li>Click "Start Tuning" to begin listening</li>
                <li>Hold the microphone close to your instrument</li>
                <li>Adjust the instrument until it matches the target note</li>
                <li>The indicator shows if you're sharp or flat</li>
                <li>Green dot means your note is in tune</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Tuner
