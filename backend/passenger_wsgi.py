import os
import sys

project_home = '/home1/bajanepa/bajanepal/backend'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

os.environ['DJANGO_SETTINGS_MODULE'] = 'nepali_platform.settings_production'

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
