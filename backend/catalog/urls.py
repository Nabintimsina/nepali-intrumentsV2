from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    InstrumentViewSet,
    MediaViewSet,
    ExpertViewSet,
    LearningContentViewSet,
    ContactViewSet,
    TutorialViewSet,
    TunerConfigurationViewSet,
)

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('instruments', InstrumentViewSet)
router.register('media', MediaViewSet)
router.register('experts', ExpertViewSet)
router.register('learning', LearningContentViewSet)
router.register('contact', ContactViewSet)
router.register('tutorials', TutorialViewSet)
router.register('tuner-configurations', TunerConfigurationViewSet)

urlpatterns = router.urls
