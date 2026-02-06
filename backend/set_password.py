import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nepali_platform.settings')
django.setup()

from django.contrib.auth.models import User

try:
    u = User.objects.get(username='admin')
    u.set_password('admin123')
    u.save()
    print('✅ Admin password set successfully!')
    print('Username: admin')
    print('Password: admin123')
except User.DoesNotExist:
    print('❌ Admin user not found')
