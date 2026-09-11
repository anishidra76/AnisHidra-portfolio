from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import DomainSerializer, SectorSerializer, SectionSerializer, SkillSerializer
from .models import Domain, Sector, Section, Skill
from rest_framework.permissions import AllowAny


class DomainViewSet(ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = [AllowAny]

class SectorViewSet(ModelViewSet):
    queryset = Sector.objects.all()
    serializer_class = SectorSerializer
    permission_classes = [AllowAny]

class SectionViewSet(ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [AllowAny]

class SkillViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]