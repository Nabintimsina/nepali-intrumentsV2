"""
Production settings for Nest Nepal deployment
No environment variables required - all configured directly
"""
from .settings import *

# SECURITY WARNING: Generate a new secret key for production!
SECRET_KEY = 'mv7*cd7vtiopfvq)_-%*a%1e73t@$o43sf6as+-ke-sc8mb%hp'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [
    'www.bajanepal.com',
    'bajanepal.com',
]

CORS_ALLOWED_ORIGINS = [
    'https://www.bajanepal.com',
    'https://bajanepal.com',
]

CSRF_TRUSTED_ORIGINS = [
    'https://www.bajanepal.com',
    'https://bajanepal.com',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

STATIC_URL = '/api/static/'
STATIC_ROOT = '/home1/bajanepa/public_html/api/static'

MEDIA_URL = '/api/media/'
# Store media inside public_html so Apache can serve /api/media/* directly
MEDIA_ROOT = '/home1/bajanepa/public_html/api/media'

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = False  # cPanel handles SSL

CORS_ALLOW_CREDENTIALS = True
