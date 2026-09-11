from django.urls import path
from .views import health_check


urlpatterns = [
    path("health_auto", health_check),
]