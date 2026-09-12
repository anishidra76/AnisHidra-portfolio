from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import HomeStatic
from .serializers import HomeStaticSerializer
from rest_framework.permissions import AllowAny

from django.http import JsonResponse


class HomeStaticViewSet(ModelViewSet):
    queryset = HomeStatic.objects.all()
    serializer_class = HomeStaticSerializer
    permission_classes = [AllowAny]

def health_check(request):
    return JsonResponse({"status": "visit ok"})