from rest_framework.routers import DefaultRouter
from .views import AchievementCardViewSet


router = DefaultRouter()

router.register('achievementcards', AchievementCardViewSet)

urlpatterns = router.urls