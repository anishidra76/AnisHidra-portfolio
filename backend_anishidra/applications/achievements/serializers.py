from rest_framework import serializers
from .models import AchievementCard


class AchievementCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = AchievementCard
        fields = ['id', 'title', 'link', 'icon', 'description', 'value1', 'label1', 'value2', 'label2', 'value3', 'label3',]