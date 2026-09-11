from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, externalIncomeViewSet, externalExpenseViewSet


router = DefaultRouter()

router.register('clients', ClientViewSet)
router.register('externalincomes', externalIncomeViewSet)
router.register('externalexpenses', externalExpenseViewSet)

urlpatterns = router.urls