from rest_framework.routers import DefaultRouter
from .views import ProjectCardViewSet


router = DefaultRouter()

router.register('projectcards', ProjectCardViewSet)

urlpatterns = router.urls