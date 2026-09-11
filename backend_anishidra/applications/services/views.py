from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import ServiceCard
from .serializers import ServiceCardSerializer
from rest_framework.permissions import AllowAny


class ServiceCardViewSet(ModelViewSet):
    queryset = ServiceCard.objects.all()
    serializer_class = ServiceCardSerializer
    permission_classes = [AllowAny]