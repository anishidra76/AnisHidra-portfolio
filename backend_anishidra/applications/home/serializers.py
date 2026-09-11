from rest_framework import serializers
from .models import HomeStatic


class HomeStaticSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeStatic
        fields = ['id', 'yearsExperience', 'projectsCompleted']