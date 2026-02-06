# Frontend-Backend Integration Guide

This document describes how the React frontend integrates with the Django REST API.

---

## Architecture Overview

```
Frontend (React + Vite)
    ↓ (HTTP requests)
    ↓ (fetch / axios)
Backend (Django REST Framework)
    ↓ (JSON responses)
    ↓ (Media files)
Database (SQLite or PostgreSQL)
```

---

## API Client Configuration

### Location: `src/api/client.js`

A lightweight fetch-based client with:
- Automatic token management (JWT)
- Query parameter building
- Error handling
- Base URL configuration

```javascript
import { api, getAuthToken, setAuthToken, clearAuthToken } from '../api/client'

// Usage
const instruments = await api.get('instruments/', { category: 'string' })
const expert = await api.get(`experts/${id}/`)
const result = await api.post('contact/', { name: 'John', email: '...' })
```

---

## Frontend Pages & API Integration

### Home Page (`src/pages/Home.jsx`)

**Endpoint**: `GET /api/instruments/?is_featured=true`

**State**:
- `featuredInstruments` - Featured instruments (max 3)
- `isLoading` - Loading state
- `error` - Error message

**Features**:
- Loads featured instruments on mount
- Shows fallback if API unavailable (uses mock data as backup)
- Handles loading and error states

### Instruments List (`src/pages/Instruments.jsx`)

**Endpoints**:
- `GET /api/categories/` - Load categories for filter
- `GET /api/instruments/` - Get filtered instruments

**Query Parameters**:
- `category` - Filter by category slug
- `region` - Filter by region name
- `search` - Full-text search

**State**:
- `instruments` - List of instruments
- `selectedCategory` - Active category filter
- `selectedRegion` - Active region filter
- `searchTerm` - Search text
- `isLoading`, `error` - Loading/error states

**Features**:
- Dynamic category loading from API
- Real-time search as user types
- Multi-filter support
- Responsive grid layout
- "No results" handling

### Instrument Detail (`src/pages/InstrumentDetail.jsx`)

**Endpoint**: `GET /api/instruments/:id/`

**Response includes**:
- Basic info (name, category, region, description)
- History, materials, playing technique, cultural significance
- Related media (audio_sample, model_3d from media relationships)
- Related experts (experts array)

**Components**:
- `AudioPlayer` - Plays `audio_sample` from API
- `Viewer3D` - Loads `model_3d` from API
  - Falls back if model unavailable
  - Updates with Three.js/React Three Fiber

**Features**:
- Lazy loads single instrument detail
- Handles "not found" case
- Related experts auto-populated from API

### Experts List (`src/pages/Experts.jsx`)

**Endpoint**: `GET /api/experts/`

**Features**:
- Loads all experts on mount
- Shows expert cards with name, expertise, instruments

### Expert Detail (`src/pages/ExpertDetail.jsx`)

**Endpoint**: `GET /api/experts/:id/`

**Response includes**:
- Basic info (name, expertise, bio, detailed_bio)
- Photo, contact_email
- Achievements (JSON array)
- Linked instruments (M2M relationship)
- Media (performance_video, teaching_audio)

**Components**:
- `AudioPlayer` - Plays `teaching_audio` from API
- Instrument links - Navigate to instrument detail pages

### Learning Content (`src/pages/Learn.jsx`)

**Endpoint**: `GET /api/learning/`

**Features**:
- Sorts by `order` field
- Supports pagination (if implemented)
- Renders markdown-like content

---

## Media Handling

### Image Fields

Images are served from:
- **Instruments**: `/api/instruments/{id}/` returns `image` (alias for primary_image)
- **Experts**: `/api/experts/{id}/` returns `photo`

Images are stored in:
- Frontend fallback: `/placeholder-instrument.jpg`, `/placeholder-expert.jpg`
- Backend storage: `media/` directory (configured in Django)

### Audio Files

Audio is served from:
- **Instruments**: Via `Media` relationship, `audio_sample` serializer field
- **Experts**: `teaching_audio` field

Playback with `<AudioPlayer>` component which:
- Accepts `audioSrc` prop (full URL from API)
- Provides play/pause, seek, volume controls
- Uses HTML5 `<audio>` element

### 3D Models

3D models are served from:
- **Instruments**: Via `Media` relationship, `model_3d` serializer field

Rendering with `<Viewer3D>` component which:
- Accepts `modelSrc` prop (full URL from API)
- Uses React Three Fiber + Three.js
- Provides rotation, zoom, pan controls
- Falls back if model unavailable

---

## Authentication Flow (Admin/Login)

### Login Page (`src/pages/Login.jsx`)

**Current**: Mock implementation with localStorage

**To integrate with backend**:

1. Update endpoint to POST to `/api/auth/token/`:
```javascript
const handleLogin = async (email, password) => {
  const response = await api.post('auth/token/', {
    username: email,  // or username field
    password
  })
  setAuthToken(response.access)  // Store JWT token
  // Redirect to admin dashboard
}
```

2. Use token for authenticated requests:
```javascript
const adminData = await api.get('admin/dashboard/', {
  headers: { 'Authorization': `Bearer ${getAuthToken()}` }
})
```

3. Implement logout:
```javascript
const handleLogout = () => {
  clearAuthToken()
  // Redirect to login
}
```

---

## Error Handling

### Global Error Handling

The `api` client throws errors on non-2xx responses:

```javascript
try {
  const data = await api.get('instruments/')
} catch (error) {
  // error.message contains response detail or statusText
  console.error('API Error:', error.message)
  setError(error.message)
}
```

### Page-Level Error States

All integrated pages show:
- **Loading state**: "Loading instruments..."
- **Error state**: "Unable to load instruments. {error}"
- **Empty state**: "No results found"
- **Fallback**: Can use mock data if API unavailable

---

## Environment Configuration

### Frontend (.env.example)

```env
VITE_API_URL=http://localhost:8000/api
VITE_ENABLE_3D_VIEWER=true
```

### Backend settings.py

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Vite dev server
    'http://localhost:5173',  # Alternative Vite port
]
```

---

## API Response Examples

### GET /api/instruments/1/

```json
{
  "id": 1,
  "name": "Sarangi",
  "category": "String",
  "region": "Western Nepal",
  "image": "/media/instruments/sarangi.jpg",
  "description": "...",
  "history": "...",
  "materials": "...",
  "playing_technique": "...",
  "cultural_significance": "...",
  "audio_sample": "/media/instruments/audio/sarangi-sample.mp3",
  "model_3d": "/media/instruments/models/sarangi.glb",
  "media": [
    {
      "id": 1,
      "media_type": "audio",
      "file": "/media/instruments/audio/sarangi-sample.mp3",
      "title": "Sample Performance",
      "is_primary": true
    }
  ],
  "experts": [
    {
      "id": 1,
      "name": "Jhalak Gandharva",
      "expertise": "Sarangi Master",
      "photo": "/media/experts/photos/jhalak.jpg"
    }
  ]
}
```

### GET /api/experts/1/

```json
{
  "id": 1,
  "name": "Jhalak Gandharva",
  "expertise": "Sarangi Master",
  "photo": "/media/experts/photos/jhalak.jpg",
  "bio": "Renowned Sarangi virtuoso...",
  "detailed_bio": "Born into a family of traditional musicians...",
  "achievements": [
    "National Music Award, 2015",
    "Cultural Heritage Ambassador, 2018"
  ],
  "contact_email": "jhalak@nepalimusic.org",
  "performance_video": "/media/experts/videos/jhalak-performance.mp4",
  "teaching_audio": "/media/experts/audio/jhalak-teaching.mp3",
  "instruments": [
    {
      "id": 2,
      "name": "Sarangi",
      "category": "String",
      "region": "Western Nepal",
      "image": "/media/instruments/sarangi.jpg"
    }
  ]
}
```

---

## Data Flow Diagrams

### Instruments Page Flow

```
User visits /instruments
    ↓
Load categories from API
    ↓
Load instruments (default: all)
    ↓
User filters/searches
    ↓
Fetch filtered instruments
    ↓
Display results in grid
    ↓
User clicks card
    ↓
Navigate to /instruments/:id
```

### Instrument Detail Flow

```
User navigates to /instruments/:id
    ↓
Fetch single instrument from API
    ↓
Render 3D viewer with model_3d URL
    ↓
Render audio player with audio_sample URL
    ↓
Fetch and display expert cards
    ↓
User can click expert → /experts/:id
```

---

## Best Practices

### 1. Always Use `useEffect` for API Calls

```javascript
useEffect(() => {
  let isMounted = true
  
  const fetchData = async () => {
    try {
      const data = await api.get('endpoint/')
      if (isMounted) setData(data)
    } catch (err) {
      if (isMounted) setError(err.message)
    }
  }
  
  fetchData()
  return () => { isMounted = false }
}, [dependencies])
```

### 2. Add Loading/Error States

Every page should show:
- Loading indicator while fetching
- Error message if request fails
- Empty state if no results

### 3. Cache Data When Appropriate

For frequently accessed data (categories, static content):
```javascript
const categories = useMemo(() => categories, [])
```

### 4. Validate Images & Media

```javascript
<img src={item.image || '/placeholder.jpg'} alt={item.name} />
{item.audio_sample && <AudioPlayer src={item.audio_sample} />}
```

### 5. Handle Missing Data Gracefully

```javascript
const experts = instrument.experts || []
const achievements = expert.achievements?.map(...) || []
```

---

## Testing the Integration

### Manual Testing Checklist

- [ ] Frontend loads instruments from API
- [ ] Filtering works (category, region, search)
- [ ] Instrument detail loads with 3D model
- [ ] Audio player works with API audio files
- [ ] Expert list loads
- [ ] Expert detail shows instruments
- [ ] Images load correctly
- [ ] Error handling works (offline, 404, 500)

### Testing Commands

```bash
# Backend
cd backend
python manage.py runserver 8000

# Frontend
cd .
npm run dev

# Test API directly
curl http://localhost:8000/api/instruments/
curl http://localhost:8000/api/experts/
```

---

## Future Enhancements

- [ ] Search suggestions/autocomplete
- [ ] Pagination for large datasets
- [ ] Infinite scroll
- [ ] Caching with React Query
- [ ] Optimistic updates
- [ ] Real-time notifications (WebSocket)
- [ ] User accounts & favorites
- [ ] Comments & ratings

---

**Last Updated**: February 6, 2026
