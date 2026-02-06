import { useState } from 'react'
import { Filter } from 'lucide-react'
import InstrumentCard from '../components/InstrumentCard'
import { instrumentsData } from '../data/mockData'
import './Instruments.css'

function Instruments() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedRegion, setSelectedRegion] = useState('All')

  const categories = ['All', 'String', 'Wind', 'Percussion']
  const regions = ['All', 'Central Nepal', 'Western Nepal', 'Eastern Nepal', 'Far Western Nepal', 'Throughout Nepal']

  const filteredInstruments = instrumentsData.filter(instrument => {
    const categoryMatch = selectedCategory === 'All' || instrument.category === selectedCategory
    const regionMatch = selectedRegion === 'All' || instrument.region === selectedRegion
    return categoryMatch && regionMatch
  })

  return (
    <div className="instruments-page">
      <div className="page-header">
        <div className="container">
          <h1>Traditional Musical Instruments</h1>
          <p>Explore Nepal's rich collection of traditional instruments</p>
        </div>
      </div>

      <div className="instruments-content container">
        {/* Filter Panel */}
        <aside className="filter-panel">
          <div className="filter-header">
            <Filter size={20} />
            <h3>Filter Instruments</h3>
          </div>

          <div className="filter-section">
            <h4>Category</h4>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Region</h4>
            <div className="filter-options">
              {regions.map(region => (
                <label key={region} className="filter-option">
                  <input
                    type="radio"
                    name="region"
                    value={region}
                    checked={selectedRegion === region}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  />
                  <span>{region}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            className="btn btn-outline btn-small"
            onClick={() => {
              setSelectedCategory('All')
              setSelectedRegion('All')
            }}
          >
            Clear Filters
          </button>
        </aside>

        {/* Instruments Grid */}
        <div className="instruments-grid-container">
          <div className="results-header">
            <h2>
              {filteredInstruments.length} {filteredInstruments.length === 1 ? 'Instrument' : 'Instruments'} Found
            </h2>
          </div>

          {filteredInstruments.length > 0 ? (
            <div className="grid grid-3 instruments-grid">
              {filteredInstruments.map(instrument => (
                <InstrumentCard key={instrument.id} instrument={instrument} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No instruments found matching your filters.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSelectedCategory('All')
                  setSelectedRegion('All')
                }}
              >
                View All Instruments
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Instruments
