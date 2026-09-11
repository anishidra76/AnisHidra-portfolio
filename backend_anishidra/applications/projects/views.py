from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import ProjectCard
from .serializers import ProjectCardSerializer
from rest_framework.permissions import AllowAny


class ProjectCardViewSet(ModelViewSet):
    queryset = ProjectCard.objects.all()
    serializer_class = ProjectCardSerializer
    permission_classes = [AllowAny]