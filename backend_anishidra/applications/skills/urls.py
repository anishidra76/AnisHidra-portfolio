from rest_framework.routers import DefaultRouter
from .views import DomainViewSet, SectorViewSet, SectionViewSet, SkillViewSet


router = DefaultRouter()

router.register('domains', DomainViewSet)
router.register('sectors', SectorViewSet)
router.register('sections', SectionViewSet)
router.register('skills', SkillViewSet)


urlpatterns = router.urls