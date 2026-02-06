from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, InstrumentViewSet, MediaViewSet, ExpertViewSet, LearningContentViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('instruments', InstrumentViewSet)
router.register('media', MediaViewSet)
router.register('experts', ExpertViewSet)
router.register('learning', LearningContentViewSet)

urlpatterns = router.urls
