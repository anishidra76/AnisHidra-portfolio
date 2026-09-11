from rest_framework import serializers
from .models import ServiceCard


class ServiceCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCard
        fields = ['id', 'domain', 'title', 'description']