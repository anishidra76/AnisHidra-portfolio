from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import HomeStatic
from .serializers import HomeStaticSerializer
from rest_framework.permissions import AllowAny



class HomeStaticViewSet(ModelViewSet):
    queryset = HomeStatic.objects.all()
    serializer_class = HomeStaticSerializer
    permission_classes = [AllowAny]