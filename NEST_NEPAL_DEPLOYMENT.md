# Deploying to Nest Nepal Hosting

**Platform**: Nepali Instruments Platform v1.2.0  
**Target**: Nest Nepal Cloud Hosting  
**Date**: February 6, 2026

---

## ✅ Compatibility Check

Nest Nepal supports everything you need:

✅ **Python Support** - All cloud plans  
✅ **Django** - Dedicated Django hosting support  
✅ **NodeJS** - For frontend build  
✅ **PostgreSQL** - 30+ MySQL databases available  
✅ **SSH Access** - For command-line deployment  
✅ **cPanel** - Easy file management  
✅ **SSL Certificates** - Free SSL included  
✅ **Daily Backups** - Automatic backup included  

---

## 📊 Recommended Plan

### **Cloud Babaal** (RECOMMENDED)
- **Price**: ₨390/month (70% savings tri-annual)
- **OR**: ₨650/month monthly billing
- **Storage**: Unlimited NVMe SSD
- **RAM**: 2GB (can upgrade to 4GB Cloud Mazzako if needed)
- **Bandwidth**: Unlimited
- **MySQL Databases**: Unlimited
- **Email Accounts**: Unlimited
- **SSL**: Free
- **Backups**: Daily automated
- **Support**: 24/7

**Why this plan?**
- Unlimited storage for your app + media
- Enough RAM for Django + React build
- Supports multiple websites
- Best value for production

---

## 🚀 Deployment Steps

### Step 1: Purchase Hosting & Domain

1. Go to https://nestnepal.com/cloud-hosting/
2. Select **Cloud Babaal** plan
3. Choose billing cycle (tri-annual = 70% savings)
4. Select domain:
   - Register new: `nepali-instruments.com.np` or similar
   - OR use existing domain
5. Complete payment with Khalti/eSewa/other Nepali payment gateway

**What you'll get:**
- cPanel login credentials
- FTP/SSH access
- Database credentials
- Email accounts

---

### Step 2: Setup SSH Access

1. **Access cPanel**: https://yourdomain.com/cpanel
2. **Enable SSH**:
   - Go to SSH Keys
   - Create new SSH key
   - Download private key
   - Authorize public key

3. **Connect via SSH**:
   ```bash
   # Windows (using Git Bash or WSL)
   ssh username@yourdomain.com
   
   # Or use PuTTY if you prefer GUI
   ```

---

### Step 3: Deploy Backend (Django)

#### 3A. Upload Backend Files

```bash
# Connect to server
ssh username@yourdomain.com

# Create app directory
mkdir -p ~/public_html/api
cd ~/public_html/api

# Upload files (from local machine)
scp -r backend/* username@yourdomain.com:~/public_html/api/
```

#### 3B. Setup Python Environment

```bash
# SSH into server
ssh username@yourdomain.com

# Navigate to api directory
cd ~/public_html/api

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

#### 3C. Configure Django Settings

Create `backend/nepali_platform/settings_production.py`:

```python
# settings_production.py
from .settings import *

DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com', 'api.yourdomain.com']

# Database (using provided MySQL)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'db_name',
        'USER': 'db_user',
        'PASSWORD': 'db_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

# Security
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000

# Static & Media
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

#### 3D: Run Migrations

```bash
cd ~/public_html/api

# Activate virtual environment
source venv/bin/activate

# Create database tables
python manage.py migrate --settings=nepali_platform.settings_production

# Create superuser
python manage.py createsuperuser --settings=nepali_platform.settings_production

# Collect static files
python manage.py collectstatic --settings=nepali_platform.settings_production

# Load sample data (optional)
python setup_backend.py
```

#### 3E: Configure Passenger/WSGI

1. In cPanel → **Python Apps** (or Setup Python App)
2. Create app with:
   - **App URI**: `/api`
   - **App Folder**: `~/public_html/api`
   - **Python Version**: 3.9+ (choose latest available)
   - **Entry Point**: `nepali_platform.wsgi:application`
   - **Passenger Log File**: Log errors

3. Restart the app:
   ```bash
   cPanel → Python Apps → Restart
   ```

---

### Step 4: Deploy Frontend (React)

#### 4A. Create .env for Production

Create `.env.production`:

```env
VITE_API_URL=https://yourdomain.com/api
VITE_ENV=production
```

#### 4B: Build React Frontend

```bash
# On your local machine
npm run build

# Creates dist/ folder with production build
```

#### 4C: Upload Frontend

```bash
# Delete old content in public_html
# Upload dist/* to ~/public_html

scp -r dist/* username@yourdomain.com:~/public_html/
```

#### 4D: Configure .htaccess for React Router

Create `public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # If the requested filename is not a directory
  RewriteCond %{REQUEST_FILENAME} !-d
  # If the requested filename is not a file
  RewriteCond %{REQUEST_FILENAME} !-f
  
  # Rewrite all requests to index.html (React Router)
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

---

### Step 5: Configure Domain & SSL

1. **Add Domain in cPanel**:
   - cPanel → Addon Domains
   - Add your domain
   - Document root: `public_html`

2. **Enable SSL Certificate**:
   - cPanel → AutoSSL
   - Generate free certificate (included)
   - Wait 5-10 minutes

3. **Force HTTPS**:
   - In `.htaccess` add:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

### Step 6: Configure Email (cPanel)

1. Create email account: `info@yourdomain.com`
2. Test email sending from Django
3. Configure SMTP in `settings_production.py`:

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.yourdomain.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'info@yourdomain.com'
EMAIL_HOST_PASSWORD = 'password'
DEFAULT_FROM_EMAIL = 'info@yourdomain.com'
```

---

## 🗄️ Database Setup

### Using cPanel MySQL

1. **Create Database**:
   - cPanel → MySQL Databases
   - Create: `username_nepali_db`
   - Create user: `username_nepali_user`
   - Add all privileges

2. **Access via SSH**:
   ```bash
   mysql -h localhost -u username_nepali_user -p username_nepali_db
   ```

3. **Backup Database**:
   ```bash
   mysqldump -u user -p dbname > backup.sql
   ```

### Optional: Upgrade to PostgreSQL

If Nest Nepal offers PostgreSQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'database_name',
        'USER': 'db_user',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

---

## 📁 Final Directory Structure

```
public_html/
├── index.html                    # React app
├── assets/                       # JS, CSS, fonts (built)
├── .htaccess                     # React Router config
│
api/                              # Django backend
├── manage.py
├── venv/                         # Virtual environment
├── db.sqlite3 (or connected to MySQL)
├── nepali_platform/
│   ├── settings_production.py
│   ├── wsgi.py
│   └── urls.py
├── catalog/
│   ├── models.py
│   ├── views.py
│   └── ...
├── staticfiles/                  # Collected static files
├── media/                        # User uploads
└── requirements.txt

cgi-bin/                          # System folder
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend API responding on HTTPS
- [ ] Frontend loading on HTTPS
- [ ] React Router working (refresh pages)
- [ ] API endpoints accessible
- [ ] Database migrations applied
- [ ] Admin panel accessible at `/admin`
- [ ] Static files loading (CSS, JS, images)
- [ ] Audio files playable
- [ ] 3D models loading
- [ ] Email notifications working
- [ ] SSL certificate showing (no warnings)
- [ ] Database backups configured
- [ ] Error logging configured

---

## 🔧 Common Issues & Solutions

### Issue: API CORS Errors

**Solution**: Update `settings_production.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
]
```

### Issue: Static Files Not Loading

**Solution**:
```bash
python manage.py collectstatic --settings=nepali_platform.settings_production --noinput
```

### Issue: 500 Error on Production

**Solution**: Check error logs:
```bash
# SSH into server
tail -50 ~/logs/error_log
tail -50 ~/logs/access_log
```

### Issue: Database Connection Failed

**Solution**: Verify credentials in `.env`:
```bash
# Test MySQL connection
mysql -h localhost -u username_user -p database_name -e "SELECT 1;"
```

### Issue: API Not Found (404)

**Solution**: Ensure Passenger is configured for `/api` path and restarted

---

## 📊 Performance Optimization

### 1. Enable Gzip Compression
Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### 2. Set Cache Headers
```apache
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

### 3. Enable Browser Caching
Nest Nepal → cPanel → Optimize Website (enable)

### 4: Database Optimization
```sql
-- SSH into MySQL
OPTIMIZE TABLE catalog_instrument;
OPTIMIZE TABLE catalog_expert;
OPTIMIZE TABLE catalog_category;
CREATE INDEX idx_featured ON catalog_instrument(is_featured);
```

---

## 🔒 Security Best Practices

✅ **Do**:
- Use HTTPS (enabled via SSL)
- Set `DEBUG = False` in production
- Use strong database passwords
- Enable daily backups
- Regular security updates
- Monitor error logs

❌ **Don't**:
- Commit `.env` files
- Use weak passwords
- Expose `SECRET_KEY`
- Allow direct database access
- Disable SSL certificate

---

## 📞 Support & Troubleshooting

**Nest Nepal Support**:
- **Phone**: +977-9815-1111-99
- **Email**: support@nestnepal.com
- **Knowledgebase**: https://myaccount.nestwebhost.com/knowledgebase
- **Ticket System**: https://myaccount.nestwebhost.com/supporttickets.php

**Useful Links**:
- **cPanel Docs**: https://documentation.cpanel.net/
- **SSH Guide**: https://myaccount.nestwebhost.com/knowledgebase/5/SSH-Access.html
- **Python Apps**: https://documentation.cpanel.net/display/EA4/Python+Applications

---

## 📈 Scaling for Growth

### If Traffic Increases:

1. **Upgrade Plan**:
   - Cloud Mazzako (4GB RAM, ₨720/month)
   - Or switch to VPS hosting

2. **Database Optimization**:
   - Add indexes on frequently searched fields
   - Enable query caching

3. **Frontend CDN**:
   - Use Cloudflare (free) for global CDN
   - Caches static assets worldwide

4. **Media Storage**:
   - If media gets large, migrate to AWS S3
   - Configure Django to serve from S3

---

## 💰 Cost Breakdown

| Item | Monthly Cost | Notes |
|------|--------------|-------|
| Cloud Babaal Plan | ₨390 * 3 = ₨1,170/year | Or ₨650/month |
| Domain (.com.np) | ₨300-500 | First year usually cheaper |
| SSL Certificate | FREE | Included with plan |
| Email (5 accounts) | FREE | Included with plan |
| PostgreSQL Upgrade | ₨0-2,000 | If needed (MySQL is free) |
| **Total/Year** | **~₨5,000-8,000** | Very affordable! |

---

## ✨ Next Steps

1. **Purchase hosting** (Cloud Babaal recommended)
2. **Follow deployment guide** above
3. **Test thoroughly** in staging first
4. **Configure monitoring** (error logs)
5. **Setup automatic backups** (cPanel handles this)
6. **Go live** when ready!

---

## 📝 Notes

- Nest Nepal has excellent Nepali support
- Payment via Khalti/eSewa accepted
- 24/7 customer support available
- Suitable for production deployment
- Good for 10,000+ monthly visitors
- Can handle simultaneous users easily

---

**Ready to deploy?** Contact Nest Nepal sales team:  
📞 +977-9815-1111-99  
🌐 https://nestnepal.com/cloud-hosting/

---

*Updated: February 6, 2026*  
*Version: 1.2.0 Deployment Guide*
