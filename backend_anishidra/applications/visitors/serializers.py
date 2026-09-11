from rest_framework import serializers
from .models import Visitor


class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields = ['id', 'ip_address', 'user_agent', 'visited_at']