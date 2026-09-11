from rest_framework import serializers
from .models import AboutContent


class AboutContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutContent
        fields = ['id', 'image', 'description']