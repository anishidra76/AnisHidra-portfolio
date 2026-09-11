from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import AchievementCard
from .serializers import AchievementCardSerializer
from rest_framework.permissions import AllowAny


class AchievementCardViewSet(ModelViewSet):
    queryset = AchievementCard.objects.all()
    serializer_class = AchievementCardSerializer
    permission_classes = [AllowAny]