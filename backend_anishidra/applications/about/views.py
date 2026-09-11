from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import AboutContent
from .serializers import AboutContentSerializer
from rest_framework.permissions import AllowAny


class AboutContentViewSet(ModelViewSet):
    queryset = AboutContent.objects.all()
    serializer_class = AboutContentSerializer
    permission_classes = [AllowAny]