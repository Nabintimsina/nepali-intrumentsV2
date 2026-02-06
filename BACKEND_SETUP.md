# Backend Setup & Configuration

## Overview

The backend is built with **Django 4.2**, **Django REST Framework (DRF)**, and uses PostgreSQL/SQLite. It provides a complete REST API for managing instruments, experts, media, and learning content.

---

## Project Structure

```
backend/
├── manage.py                    # Django management command
├── requirements.txt             # Python dependencies
├── setup_backend.py            # Sample data initialization script
├── nepali_platform/             # Main project
│   ├── settings.py             # Configuration
│   ├── urls.py                 # URL routing
│   ├── asgi.py
│   └── wsgi.py
└── catalog/                     # Core API app
    ├── models.py               # Database models
    ├── serializers.py          # API serializers
    ├── views.py                # ViewSets for REST API
    ├── urls.py                 # App routing
    ├── admin.py                # Django admin configuration
    ├── permissions.py          # Custom permissions
    ├── filters.py              # Advanced filtering
    └── migrations/             # Database migrations
```

---

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Create Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
DJANGO_SECRET_KEY=your-secret-key-here
DJANGO_DEBUG=true
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_DB_ENGINE=django.db.backends.sqlite3
DJANGO_DB_NAME=db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 3. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

### 5. Load Sample Data

```bash
python setup_backend.py
```

### 6. Start Development Server

```bash
python manage.py runserver
```

The API will be available at: **http://localhost:8000/api**
Admin panel: **http://localhost:8000/admin**

---

## API Endpoints

### Categories
- `GET /api/categories/` - List all categories
- `POST /api/categories/` - Create category (admin)
- `GET /api/categories/{id}/` - Category details
- `PUT /api/categories/{id}/` - Update category (admin)
- `DELETE /api/categories/{id}/` - Delete category (admin)

### Instruments
- `GET /api/instruments/` - List instruments with filtering
  - Query params: `category`, `region`, `search`, `is_featured`
  - Example: `/api/instruments/?category=string&region=Central+Nepal`
- `POST /api/instruments/` - Create instrument (admin)
- `GET /api/instruments/{id}/` - Instrument details with related experts
- `PUT /api/instruments/{id}/` - Update instrument (admin)
- `DELETE /api/instruments/{id}/` - Delete instrument (admin)

### Media
- `GET /api/media/` - List all media files
- `POST /api/media/` - Upload media (admin)
- `GET /api/media/{id}/` - Media details
- `DELETE /api/media/{id}/` - Delete media (admin)

### Experts
- `GET /api/experts/` - List all experts
- `POST /api/experts/` - Create expert (admin)
- `GET /api/experts/{id}/` - Expert details with linked instruments
- `PUT /api/experts/{id}/` - Update expert (admin)
- `DELETE /api/experts/{id}/` - Delete expert (admin)

### Learning Content
- `GET /api/learning/` - List all learning topics
- `POST /api/learning/` - Create topic (admin)
- `GET /api/learning/{id}/` - Topic details
- `PUT /api/learning/{id}/` - Update topic (admin)
- `DELETE /api/learning/{id}/` - Delete topic (admin)

### Authentication
- `POST /api/auth/token/` - Obtain JWT token
  ```bash
  curl -X POST http://localhost:8000/api/auth/token/ \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"password"}'
  ```
- `POST /api/auth/token/refresh/` - Refresh JWT token

---

## Models

### Category
- `id` (PK)
- `name` (CharField)
- `slug` (SlugField, unique)
- `description` (TextField)
- `created_at` (DateTime)

### Instrument
- `id` (PK)
- `name` (CharField)
- `category` (FK → Category)
- `region` (CharField)
- `description` (TextField)
- `history` (TextField)
- `materials` (TextField)
- `playing_technique` (TextField)
- `cultural_significance` (TextField)
- `primary_image` (ImageField)
- `is_featured` (BooleanField)
- `created_at`, `updated_at` (DateTime)

### Media
- `id` (PK)
- `instrument` (FK → Instrument)
- `media_type` (Choices: image, audio, model_3d, video)
- `file` (FileField)
- `title` (CharField)
- `is_primary` (BooleanField)
- `uploaded_at` (DateTime)

### Expert
- `id` (PK)
- `name` (CharField)
- `expertise` (CharField)
- `bio` (TextField)
- `detailed_bio` (TextField)
- `contact_email` (EmailField)
- `photo` (ImageField)
- `achievements` (JSONField)
- `instruments` (M2M → Instrument)
- `performance_video` (FileField)
- `teaching_audio` (FileField)
- `created_at` (DateTime)

### LearningContent
- `id` (PK)
- `title` (CharField)
- `content` (TextField)
- `order` (PositiveIntegerField)
- `is_published` (BooleanField)
- `created_at`, `updated_at` (DateTime)

---

## Admin Interface

Access at `/admin` with your superuser credentials.

Features:
- CRUD for all models
- Inline media management for instruments
- Many-to-many instruments for experts
- Full-text search
- Filtering by category, region, published status

---

## Filtering & Search

### Instrument Filtering

```bash
# By category (slug)
GET /api/instruments/?category=string

# By region
GET /api/instruments/?region=Central+Nepal

# Featured only
GET /api/instruments/?is_featured=true

# Full-text search
GET /api/instruments/?search=madal

# Combine filters
GET /api/instruments/?category=percussion&region=Central+Nepal

# Ordering
GET /api/instruments/?ordering=-created_at
GET /api/instruments/?ordering=name
```

### Expert Search

```bash
GET /api/experts/?search=sarangi
GET /api/experts/?search=jhalak
```

---

## Authentication & Permissions

### Default Permissions

| Endpoint | Anonymous | Authenticated | Admin |
|----------|-----------|---------------|-------|
| GET (list/detail) | ✓ | ✓ | ✓ |
| POST (create) | ✗ | ✗ | ✓ |
| PUT/PATCH (update) | ✗ | ✗ | ✓ |
| DELETE | ✗ | ✗ | ✓ |

### Using JWT Tokens

```bash
# Get token
TOKEN=$(curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}' \
  | jq -r '.access')

# Use token in request
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/instruments/ \
  -X POST -H "Content-Type: application/json" \
  -d '{...}'
```

---

## CORS Configuration

Configured in `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
    # Add your frontend URL here
]
```

---

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| DJANGO_SECRET_KEY | dev-secret-key | Secret key for Django |
| DJANGO_DEBUG | true | Debug mode (false in production) |
| DJANGO_ALLOWED_HOSTS | localhost,127.0.0.1 | Allowed hosts |
| DJANGO_DB_ENGINE | sqlite3 | Database engine |
| DJANGO_DB_NAME | db.sqlite3 | Database file/name |
| DJANGO_DB_USER | (empty) | Database user |
| DJANGO_DB_PASSWORD | (empty) | Database password |
| DJANGO_DB_HOST | (empty) | Database host |
| DJANGO_DB_PORT | (empty) | Database port |
| CORS_ALLOWED_ORIGINS | http://localhost:3000 | CORS whitelist |

---

## Deployment

### Using Gunicorn

```bash
pip install gunicorn
gunicorn nepali_platform.wsgi:application --bind 0.0.0.0:8000
```

### Using Docker

Create `Dockerfile`:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "nepali_platform.wsgi:application", "--bind", "0.0.0.0:8000"]
```

### Using Render, Heroku, or PythonAnywhere

See deployment guide in the root `DEPLOYMENT.md`

---

## Troubleshooting

### Port 8000 Already in Use

```bash
# Find and kill process
lsof -i :8000
kill -9 <PID>

# Or use different port
python manage.py runserver 8001
```

### Migration Errors

```bash
# Fake migrations if needed
python manage.py migrate --fake

# Create fresh database
python manage.py flush
python manage.py migrate
python setup_backend.py
```

### CORS Issues

Ensure `CORS_ALLOWED_ORIGINS` includes your frontend URL and the Django `ALLOWED_HOSTS` includes your backend domain.

---

## Testing the API

### Using cURL

```bash
# Get all instruments
curl http://localhost:8000/api/instruments/

# Get specific instrument
curl http://localhost:8000/api/instruments/1/

# Filter by category
curl http://localhost:8000/api/instruments/?category=string

# Search
curl http://localhost:8000/api/instruments/?search=madal
```

### Using Python requests

```python
import requests

# List instruments
response = requests.get('http://localhost:8000/api/instruments/')
instruments = response.json()
print(instruments)

# Get details
detail = requests.get('http://localhost:8000/api/instruments/1/').json()
print(detail)
```

---

**Last Updated**: February 6, 2026
