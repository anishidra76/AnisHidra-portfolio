from rest_framework.routers import DefaultRouter
from .views import AboutContentViewSet


router = DefaultRouter()

router.register('aboutcontents', AboutContentViewSet)

urlpatterns = router.urls