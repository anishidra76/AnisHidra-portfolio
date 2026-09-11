from rest_framework.routers import DefaultRouter
from .views import HomeStaticViewSet


router = DefaultRouter()

router.register('homestatics', HomeStaticViewSet)

urlpatterns = router.urls