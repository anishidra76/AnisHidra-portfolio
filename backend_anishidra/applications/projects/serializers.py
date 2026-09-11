from rest_framework import serializers
from .models import ProjectCard


class ProjectCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCard
        fields = ['id', 'type', 'name', 'description', 'sourcecodelink', 'projectlink', 'morelink', 'image']