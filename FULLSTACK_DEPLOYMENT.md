# Deployment Guide - Full Stack

Comprehensive deployment instructions for the complete platform (frontend + backend).

---

## Pre-Deployment Checklist

- [ ] Unit tests passing (frontend & backend)
- [ ] E2E tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Static files collected (Django)
- [ ] CORS properly configured
- [ ] Images compressed
- [ ] 3D models optimized
- [ ] Audio files optimized
- [ ] Error tracking setup (Sentry)
- [ ] Analytics configured
- [ ] Backup strategy tested

---

## Backend Deployment

### Render (Recommended - Free Tier Available)

1. **Create Render account** at https://render.com

2. **Create PostgreSQL database**:
   - Service: Database
   - Instance: Free tier
   - Note the connection string

3. **Create Web Service**:
   - Repository: Your GitHub repo
   - Runtime: Python 3.11
   - Build Command: `pip install -r backend/requirements.txt && python backend/manage.py migrate`
   - Start Command: `gunicorn nepali_platform.wsgi:application`

4. **Environment Variables**:
   - `DJANGO_SECRET_KEY`: Generate with `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
   - `DJANGO_DEBUG`: false
   - `DATABASE_URL`: (from PostgreSQL service)
   - `CORS_ALLOWED_ORIGINS`: Your frontend URL
   - `ALLOWED_HOSTS`: Your Render domain

5. **Deploy**: Commit and push to trigger auto-deploy

**Result**: Backend API at `https://your-project.onrender.com/api`

### Heroku

1. **Create account** at https://www.heroku.com
2. **Install Heroku CLI**: `npm install -g heroku`
3. **Login**: `heroku login`
4. **Create app**: `heroku create your-app-name`
5. **Add PostgreSQL addon**: `heroku addons:create heroku-postgresql:hobby-dev`
6. **Set environment variables**:
   ```bash
   heroku config:set DJANGO_SECRET_KEY=...
   heroku config:set DJANGO_DEBUG=false
   heroku config:set CORS_ALLOWED_ORIGINS=your-frontend-url
   ```
7. **Create Procfile** in root:
   ```
   web: gunicorn nepali_platform.wsgi:application
   release: python backend/manage.py migrate
   ```
8. **Deploy**: `git push heroku main`

### PythonAnywhere

1. **Create account** at https://www.pythonanywhere.com
2. **Upload files** via Web Interface
3. **Create virtual environment**
4. **Install dependencies**: `pip install -r requirements.txt`
5. **Upload database** or run migrations
6. **Create WSGI file** pointing to Django app
7. **Set up Web** to use WSGI file
8. **Configure allowed hosts** and static/media files

---

## Frontend Deployment

### Vercel (Recommended - Optimized for Vite)

1. **Create Vercel account** at https://vercel.com

2. **Connect repository**:
   - Click "Import Project"
   - Select your GitHub repo
   - Select root directory: `.`

3. **Configure Build**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Environment Variables**:
   - `VITE_API_URL`: Your backend API URL
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

5. **Deploy**: Vercel auto-deploys on push

**Result**: Frontend at `https://your-project.vercel.app`

### Netlify

1. **Connect repository** at https://app.netlify.com
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment variables**:
   - `VITE_API_URL`: Your backend API URL
4. **Deploy**

### GitHub Pages

Works best for pure frontend; skip if using Django backend.

```bash
# Update vite.config.js
export default {
  base: '/nepali-instruments/',
  // ...
}

# Build
npm run build

# Push dist/ to gh-pages branch
```

### Static Hosting (AWS S3 + CloudFront)

1. **Create S3 bucket**
2. **Upload `dist/` contents**
3. **Create CloudFront distribution**
4. **Configure domain + SSL**
5. **Set up CORS headers**

---

## Full Stack Integration

### Architecture

```
Domain: nepali-instruments.com
├── Frontend: https://nepali-instruments.com
│   └── Vercel/Netlify
└── Backend API: https://api.nepali-instruments.com
    └── Render/Heroku
```

### CORS Configuration

**Django settings.py**:
```python
CORS_ALLOWED_ORIGINS = [
    'https://nepali-instruments.com',
    'https://www.nepali-instruments.com',
]

ALLOWED_HOSTS = [
    'api.nepali-instruments.com',
    'nepali-instruments.com',
]
```

**Frontend .env.production**:
```env
VITE_API_URL=https://api.nepali-instruments.com/api
```

### SSL/HTTPS

All platforms above provide free SSL. Configure:
1. **DNS**: Point domain to hosting
2. **SSL**: Auto-provisioned by platform
3. **Redirect HTTP→HTTPS**: Usually auto-configured

---

## Database

### Render PostgreSQL

- Included with Web Service
- Automatic backups
- Connection pooling
- Scalable

### Heroku PostgreSQL

- `heroku-postgresql` addon
- Automated backups
- Follower databases for HA
- Scalable tiers

### Self-Hosted (DigitalOcean, AWS RDS)

For production:

1. **DigitalOcean Managed Database**:
   ```bash
   # Get connection string from cluster
   # Set as DATABASE_URL env var
   ```

2. **AWS RDS**:
   - Multi-AZ for redundancy
   - Automated backups
   - Parameter groups for optimization

---

## Media Storage

### S3 + CloudFront (Recommended)

1. **Create S3 bucket**: `nepali-instruments-media`
2. **Create IAM user** with S3 access
3. **Configure Django**:
   ```bash
   pip install django-storages[s3]
   ```
   ```python
   # settings.py
   if not DEBUG:
       DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
       AWS_STORAGE_BUCKET_NAME = 'nepali-instruments-media'
       AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
       MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'
   ```
4. **Create CloudFront distribution** for CDN
5. **Set environment variables**:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_STORAGE_BUCKET_NAME`

### Cloudinary

Easier alternative to S3:

```bash
pip install cloudinary
```

```python
# settings.py
import cloudinary
cloudinary.config(cloud_name='xxx', api_key='xxx', api_secret='xxx')
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
```

### Local Storage (Dev Only)

For development, local file storage is fine:
```python
MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = '/media/'
```

---

## Monitoring & Logging

### Sentry (Error Tracking)

```bash
pip install sentry-sdk
```

```python
# settings.py
import sentry_sdk

if not DEBUG:
    sentry_sdk.init(
        dsn="your-sentry-dsn",
        traces_sample_rate=0.1,
        environment="production"
    )
```

### Google Analytics (Frontend)

```javascript
// src/main.jsx
import ReactGA from 'react-ga'
ReactGA.initialize('GA-XXXXX')
```

### Application Performance Monitoring

- **New Relic**: Enterprise-grade APM
- **Datadog**: Full observability
- **Heroku Logging**: Basic logs included

---

## Performance Optimization

### Frontend

1. **Minification**: Done by Vite build
2. **Code splitting**: Lazy load routes
   ```javascript
   const Home = lazy(() => import('./pages/Home'))
   <Suspense fallback={<Loading />}>
     <Home />
   </Suspense>
   ```
3. **Image optimization**: Use next-gen formats
4. **Caching**: Vercel auto-caches
5. **CDN**: All platforms include CDN

### Backend

1. **Database indexing**: Indexes on frequently queried fields
   ```python
   class Meta:
       indexes = [
           models.Index(fields=['category', 'region']),
       ]
   ```
2. **Query optimization**: Use `select_related` and `prefetch_related`
3. **Caching**: Redis for expensive queries
   ```python
   from django.core.cache import cache
   cache.set('instruments', data, 3600)
   ```
4. **Pagination**: Limit result sets
   ```python
   class InstrumentViewSet(viewsets.ModelViewSet):
       pagination_class = PageNumberPagination
   ```
5. **Async workers**: Celery for background tasks

---

## Backup & Recovery

### Database Backups

**Render**: Automatic daily backups (14-day retention)

**Heroku**: 
```bash
heroku pg:backups:capture
heroku pg:backups:download
```

**Local backup**:
```bash
python manage.py dumpdata > backup.json
```

### Media Backups

- S3 versioning enabled
- CloudFront caching for redundancy
- Regular scheduled backups

### Recovery

```bash
# Restore database
heroku pg:restore <BACKUP_ID> --app your-app

# Restore from JSON dump
python manage.py loaddata backup.json
```

---

## Scaling

### Vertical Scaling

- **Render**: Upgrade to higher instance tier
- **Heroku**: Change dyno type
- **Database**: Upgrade PostgreSQL plan

### Horizontal Scaling

- **Application servers**: Multiple Gunicorn workers
- **Load balancing**: Built into most platforms
- **Caching layer**: Redis for session/cache
- **Database replicas**: Read-only replicas for reporting

### Auto-scaling

Configure with:
- **Render**: Auto-scaling in settings
- **Heroku**: Add New Relic addon, configure scaling policy
- **AWS**: Use Application Auto Scaling with target metrics

---

## Domain & DNS

### Register Domain

- Namecheap, Google Domains, Route53, etc.

### Configure DNS

For `api.nepali-instruments.com` → Render backend:

```dns
CNAME api nepali-instruments.onrender.com
```

For `nepali-instruments.com` → Vercel frontend:

```dns
CNAME @ cname.vercel-dns.com
```

### SSL Certificate

- **Vercel**: Auto-provisioned
- **Render**: Auto-provisioned
- **Custom**: Use Certbot/Let's Encrypt

---

## Maintenance

### Regular Updates

```bash
# Check outdated packages
npm outdated

# Update dependencies
npm update
pip list --outdated
pip install --upgrade -r requirements.txt
```

### Security Patches

Subscribe to security notifications:
- GitHub dependabot
- Django security mailing list
- npm security advisories

### Logs & Monitoring

- Monitor error rates in Sentry
- Check performance metrics
- Review access logs for anomalies
- Set up alerts for high error rates

---

## Rollback Strategy

### Git Revert

```bash
git log --oneline
git revert <commit-hash>
git push
# Auto-deploys to Vercel/Render
```

### Database Rollback

```bash
heroku pg:backups:restore <BACKUP_ID> --app your-app
# Or restore from backup.json
python manage.py loaddata backup.json
```

### Emergency Hotfix

1. Create hotfix branch: `git checkout -b hotfix/issue`
2. Fix bug
3. Test locally
4. Merge to main: `git merge hotfix/issue`
5. Push: Auto-deploys
6. Monitor Sentry for errors

---

## Security Considerations

### Environment Variables

**NEVER** commit secrets to Git:

```bash
# .gitignore
.env
.env.local
.env.*.local
```

Use platform-provided env var management:
- Vercel: Dashboard → Settings → Environment Variables
- Render: Dashboard → Environment
- Heroku: CLI or Dashboard

### Django Security

```python
# settings.py (production)
DEBUG = False
ALLOWED_HOSTS = ['api.nepaliinstruments.com']
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = 'DENY'
```

### CORS Security

```python
CORS_ALLOWED_ORIGINS = [
    'https://nepaliinstruments.com',
]
CORS_ALLOW_CREDENTIALS = True
```

---

## Live Deployment Checklist

- [ ] Backend deployed and running
- [ ] Database migrations applied
- [ ] Environment variables set
- [ ] Frontend deployed and accessible
- [ ] CORS configured correctly
- [ ] API endpoints tested from frontend
- [ ] SSL certificates valid
- [ ] Domain DNS configured
- [ ] Error tracking (Sentry) configured
- [ ] Analytics tracking configured
- [ ] Backups enabled
- [ ] Monitoring alerts configured
- [ ] Logged in and tested all pages
- [ ] Tested on mobile devices
- [ ] Check Lighthouse score
- [ ] Security audit passed

---

## Post-Deployment

### Day 1

- Monitor error rates
- Check Lighthouse performance
- Test user journeys
- Review logs for issues
- Get feedback from test users

### Week 1

- Monitor performance metrics
- Check database performance
- Review user analytics
- Fix any reported bugs
- Optimize slow queries

### Ongoing

- Weekly security updates
- Monthly dependency updates
- Quarterly security audits
- Monitor hosting costs
- Backup verification

---

**Last Updated**: February 2026

For more info, see:
- [BACKEND_SETUP.md](BACKEND_SETUP.md)
- [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)
- [TECH_STACK.md](TECH_STACK.md)
