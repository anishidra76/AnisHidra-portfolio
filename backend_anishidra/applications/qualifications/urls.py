from rest_framework.routers import DefaultRouter
from .views import EducationCardViewSet, CertificateCardViewSet


router = DefaultRouter()

router.register('educationcards', EducationCardViewSet)
router.register('certificatecards', CertificateCardViewSet)

urlpatterns = router.urls