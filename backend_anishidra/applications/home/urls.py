from rest_framework.routers import DefaultRouter
from .views import HomeStaticViewSet, health_check


router = DefaultRouter()

router.register('homestatics', HomeStaticViewSet, health_check)

urlpatterns = router.urls