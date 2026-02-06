import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nepali_platform.settings_production')
django.setup()

from django.contrib.auth.models import User

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@bajanepal.com',
        password='admin123'  # CHANGE THIS!
    )
    print('Superuser created: admin / admin123')
else:
    print("Superuser 'admin' already exists")
