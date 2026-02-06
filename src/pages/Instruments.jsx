import { useEffect, useMemo, useState } from 'react'
import { Filter } from 'lucide-react'
import InstrumentCard from '../components/InstrumentCard'
import { api } from '../api/client'
import './Instruments.css'

function Instruments() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState([{ slug: 'all', name: 'All' }])
  const [instruments, setInstruments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const regions = useMemo(() => {
    const uniqueRegions = Array.from(new Set(instruments.map((item) => item.region))).filter(Boolean)
    return ['All', ...uniqueRegions]
  }, [instruments])

  useEffect(() => {
    let isMounted = true

    const loadCategories = async () => {
      try {
        const response = await api.get('categories/')
        const items = Array.isArray(response) ? response : response?.results || []
        if (isMounted && items.length > 0) {
          setCategories([{ slug: 'all', name: 'All' }, ...items])
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
        }
      }
    }

    loadCategories()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadInstruments = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await api.get('instruments/', {
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          region: selectedRegion === 'all' ? undefined : selectedRegion,
          search: searchTerm.trim() || undefined
        })
        const items = Array.isArray(response) ? response : response?.results || []
        if (isMounted) {
          setInstruments(items)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setInstruments([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadInstruments()

    return () => {
      isMounted = false
    }
  }, [selectedCategory, selectedRegion, searchTerm])

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
            <h4>Search</h4>
            <input
              type="text"
              className="filter-search"
              placeholder="Search instruments"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-section">
            <h4>Category</h4>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category.slug} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value={category.slug}
                    checked={selectedCategory === category.slug}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>{category.name}</span>
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
                    checked={selectedRegion === region.toLowerCase()}
                    onChange={(e) => setSelectedRegion(e.target.value.toLowerCase())}
                  />
                  <span>{region}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            className="btn btn-outline btn-small"
            onClick={() => {
              setSelectedCategory('all')
              setSelectedRegion('all')
              setSearchTerm('')
            }}
          >
            Clear Filters
          </button>
        </aside>

        {/* Instruments Grid */}
        <div className="instruments-grid-container">
          <div className="results-header">
            <h2>
              {instruments.length} {instruments.length === 1 ? 'Instrument' : 'Instruments'} Found
            </h2>
          </div>

          {isLoading ? (
            <div className="no-results">
              <p>Loading instruments...</p>
            </div>
          ) : error ? (
            <div className="no-results">
              <p>Unable to load instruments. {error}</p>
            </div>
          ) : instruments.length > 0 ? (
            <div className="grid grid-3 instruments-grid">
              {instruments.map(instrument => (
                <InstrumentCard key={instrument.id} instrument={instrument} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No instruments found matching your filters.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedRegion('all')
                  setSearchTerm('')
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
