from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

api_prefix = 'api/' if settings.DEBUG else ''

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{api_prefix}', include('catalog.urls')),
    path(f'{api_prefix}auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(f'{api_prefix}auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
