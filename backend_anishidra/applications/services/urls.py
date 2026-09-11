from rest_framework.routers import DefaultRouter
from .views import ServiceCardViewSet


router = DefaultRouter()

router.register('servicecards', ServiceCardViewSet)

urlpatterns = router.urls