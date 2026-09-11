from rest_framework.routers import DefaultRouter
from .views import ContactMessageViewSet


router = DefaultRouter()

router.register('contactmessages', ContactMessageViewSet)

urlpatterns = router.urls