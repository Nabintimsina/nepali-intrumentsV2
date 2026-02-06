from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    InstrumentViewSet,
    MediaViewSet,
    ExpertViewSet,
    LearningContentViewSet,
    ContactViewSet,
)

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('instruments', InstrumentViewSet)
router.register('media', MediaViewSet)
router.register('experts', ExpertViewSet)
router.register('learning', LearningContentViewSet)
router.register('contact', ContactViewSet)

urlpatterns = router.urls
